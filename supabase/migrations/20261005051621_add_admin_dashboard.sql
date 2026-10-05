-- Admin dashboard support.
--
-- Admins see site-wide statistics and a user list, but never anyone's private
-- content (notes, interviews, evidence, coach messages). That is enforced here,
-- in the database, not just in the UI:
--   * public.admins lists the admin accounts. It has row level security enabled
--     and no policies, so no browser client can read or write it directly.
--   * Every admin function is security definer and checks public.is_admin()
--     first, so a non-admin who calls one gets an error instead of data.
--   * Functions return aggregates and basic account info only.

-- ---------------------------------------------------------------- admins table

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- No policies on purpose: with RLS on and nothing granted, anon and
-- authenticated clients cannot touch this table. Only the security definer
-- functions below can read it. Admins are added with the service role / SQL.
revoke all on public.admins from anon, authenticated;

-- ------------------------------------------------------------------- is_admin

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- -------------------------------------------------------------- admin_overview

create or replace function public.admin_overview()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'users_total', (select count(*) from auth.users),
    'users_7d', (select count(*) from auth.users where created_at > now() - interval '7 days'),
    'users_30d', (select count(*) from auth.users where created_at > now() - interval '30 days'),
    'users_active_7d', (select count(*) from auth.users where last_sign_in_at > now() - interval '7 days'),
    'users_unconfirmed', (select count(*) from auth.users where email_confirmed_at is null),
    'ventures_total', (select count(*) from public.ventures),
    'ventures_7d', (select count(*) from public.ventures where created_at > now() - interval '7 days'),
    'ventures_public', (select count(*) from public.ventures where is_public),
    'lessons_passed', (select count(*) from public.lesson_progress where passed),
    'tasks_done', (select count(*) from public.roadmap_tasks where status = 'done'),
    'interviews', (select count(*) from public.interviews),
    'hypotheses', (select count(*) from public.hypotheses),
    'hypotheses_tested', (select count(*) from public.hypotheses where tested > 0),
    'claims', (select count(*) from public.claims),
    'evidence_items', (select count(*) from public.evidence_items),
    'competitors', (select count(*) from public.competitors),
    'mvp_features', (select count(*) from public.mvp_features),
    'decisions', (select count(*) from public.decisions),
    'launch_items_done', (select count(*) from public.launch_items where done),
    'coach_messages_total', (select count(*) from public.coach_messages where role = 'user'),
    'coach_messages_24h', (select count(*) from public.coach_messages where role = 'user' and created_at > now() - interval '24 hours'),
    'coach_messages_7d', (select count(*) from public.coach_messages where role = 'user' and created_at > now() - interval '7 days'),
    'coach_users_7d', (select count(distinct user_id) from public.coach_messages where role = 'user' and created_at > now() - interval '7 days'),
    'waitlist_total', (select count(*) from public.waitlist_signups),
    'ventures_by_type', (
      select coalesce(jsonb_object_agg(venture_type, n), '{}'::jsonb)
      from (select venture_type, count(*) as n from public.ventures group by venture_type) t
    ),
    'ventures_by_stage', (
      select coalesce(jsonb_object_agg(current_stage, n), '{}'::jsonb)
      from (select current_stage, count(*) as n from public.ventures group by current_stage) t
    )
  );
end;
$$;

revoke execute on function public.admin_overview() from public, anon;
grant execute on function public.admin_overview() to authenticated;

-- ----------------------------------------------------------------- admin_daily

create or replace function public.admin_daily(p_days integer default 30)
returns table (
  day date,
  signups bigint,
  ventures bigint,
  lessons_passed bigint,
  coach_messages bigint
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  span integer := least(greatest(coalesce(p_days, 30), 1), 365);
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  return query
  select
    d::date as day,
    (select count(*) from auth.users u where u.created_at::date = d::date),
    (select count(*) from public.ventures v where v.created_at::date = d::date),
    (select count(*) from public.lesson_progress l where l.passed and l.passed_at::date = d::date),
    (select count(*) from public.coach_messages c where c.role = 'user' and c.created_at::date = d::date)
  from generate_series(
    (current_date - (span - 1))::timestamp,
    current_date::timestamp,
    interval '1 day'
  ) as d
  order by d;
end;
$$;

revoke execute on function public.admin_daily(integer) from public, anon;
grant execute on function public.admin_daily(integer) to authenticated;

-- ----------------------------------------------------------------- admin_users

create or replace function public.admin_users(
  p_limit integer default 25,
  p_offset integer default 0,
  p_search text default null
)
returns table (
  id uuid,
  email text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  confirmed boolean,
  ventures bigint,
  lessons_passed bigint,
  tasks_done bigint,
  coach_messages bigint,
  is_admin boolean,
  total bigint
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  return query
  select
    u.id,
    u.email::text,
    u.created_at,
    u.last_sign_in_at,
    u.email_confirmed_at is not null,
    (select count(*) from public.ventures v where v.user_id = u.id),
    (select count(*) from public.lesson_progress l where l.user_id = u.id and l.passed),
    (select count(*) from public.roadmap_tasks t where t.user_id = u.id and t.status = 'done'),
    (select count(*) from public.coach_messages c where c.user_id = u.id and c.role = 'user'),
    exists (select 1 from public.admins a where a.user_id = u.id),
    count(*) over ()
  from auth.users u
  where p_search is null
     or btrim(p_search) = ''
     or position(lower(btrim(p_search)) in lower(coalesce(u.email, ''))) > 0
  order by u.created_at desc
  limit least(greatest(coalesce(p_limit, 25), 1), 100)
  offset greatest(coalesce(p_offset, 0), 0);
end;
$$;

revoke execute on function public.admin_users(integer, integer, text) from public, anon;
grant execute on function public.admin_users(integer, integer, text) to authenticated;
