-- Show each founder's first name in the admin user list and user page.
--
-- The name is the one people enter at signup (or on the dashboard prompt). It
-- lives in the account's user metadata under "full_name". These functions keep
-- the same admin-only protection as before: security definer, refuse to run
-- unless public.is_admin(), and revoked from anon.

-- admin_users returns a new column, so it has to be dropped and recreated.
drop function if exists public.admin_users(integer, integer, text);

create function public.admin_users(
  p_limit integer default 25,
  p_offset integer default 0,
  p_search text default null
)
returns table (
  id uuid,
  email text,
  name text,
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
    nullif(btrim(u.raw_user_meta_data ->> 'full_name'), ''),
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
     or position(lower(btrim(p_search)) in lower(coalesce(u.raw_user_meta_data ->> 'full_name', ''))) > 0
  order by u.created_at desc
  limit least(greatest(coalesce(p_limit, 25), 1), 100)
  offset greatest(coalesce(p_offset, 0), 0);
end;
$$;

revoke execute on function public.admin_users(integer, integer, text) from public, anon;
grant execute on function public.admin_users(integer, integer, text) to authenticated;

-- Same signature as before, so create or replace keeps its existing grants.
create or replace function public.admin_user_detail(p_user uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  result jsonb;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'id', u.id,
    'email', u.email,
    'name', nullif(btrim(u.raw_user_meta_data ->> 'full_name'), ''),
    'created_at', u.created_at,
    'last_sign_in_at', u.last_sign_in_at,
    'confirmed', u.email_confirmed_at is not null,
    'is_admin', exists (select 1 from public.admins a where a.user_id = u.id),
    'ventures', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', v.id,
        'name', v.name,
        'venture_type', v.venture_type,
        'current_stage', v.current_stage,
        'is_public', v.is_public,
        'created_at', v.created_at,
        'interviews', (select count(*) from public.interviews i where i.venture_id = v.id),
        'coach_messages', (select count(*) from public.coach_messages c where c.venture_id = v.id and c.role = 'user')
      ) order by v.created_at desc), '[]'::jsonb)
      from public.ventures v
      where v.user_id = u.id
    )
  )
  into result
  from auth.users u
  where u.id = p_user;

  if result is null then
    raise exception 'user not found' using errcode = 'P0002';
  end if;

  perform public.admin_log_access('view_user', p_user, null);
  return result;
end;
$$;
