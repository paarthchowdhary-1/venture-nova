-- Read-only admin access to individual founders' workspaces, with an audit trail.
--
-- Admins can open a user's ventures and see their content (tasks, interviews,
-- hypotheses, evidence, competitors, features, decisions) and coach chats, for
-- support and to keep young users safe. Every such view is written to
-- public.admin_access_log by the same function that returns the data, so there
-- is no way to read private content through these functions without leaving a
-- record. Nothing here can modify founder data.
--
-- Like the earlier admin functions, each one is security definer and refuses to
-- run unless public.is_admin() is true. The log table has row level security on
-- and no policies, so browsers cannot read or write it directly.

-- ------------------------------------------------------------- access log table

create table if not exists public.admin_access_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users (id) on delete set null,
  action text not null check (action in ('view_user', 'view_venture', 'view_coach')),
  target_user_id uuid,
  venture_id uuid,
  created_at timestamptz not null default now()
);

alter table public.admin_access_log enable row level security;
revoke all on public.admin_access_log from anon, authenticated;

create index if not exists admin_access_log_created_at_idx
  on public.admin_access_log (created_at desc);

-- Internal helper, callable only by the other functions (which run as the
-- table owner). Not granted to any client role.
create or replace function public.admin_log_access(
  p_action text,
  p_user uuid,
  p_venture uuid
)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.admin_access_log (admin_id, action, target_user_id, venture_id)
  values ((select auth.uid()), p_action, p_user, p_venture);
$$;

revoke execute on function public.admin_log_access(text, uuid, uuid) from public, anon, authenticated;

-- ------------------------------------------------------------- admin_user_detail

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

revoke execute on function public.admin_user_detail(uuid) from public, anon;
grant execute on function public.admin_user_detail(uuid) to authenticated;

-- ---------------------------------------------------------- admin_venture_detail

create or replace function public.admin_venture_detail(p_venture uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  result jsonb;
  owner uuid;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select v.user_id into owner from public.ventures v where v.id = p_venture;
  if owner is null then
    raise exception 'venture not found' using errcode = 'P0002';
  end if;

  select jsonb_build_object(
    'venture', (
      select jsonb_build_object(
        'id', v.id,
        'user_id', v.user_id,
        'owner_email', (select u.email from auth.users u where u.id = v.user_id),
        'name', v.name,
        'idea', v.idea,
        'problem', v.problem,
        'target_customer', v.target_customer,
        'venture_type', v.venture_type,
        'current_stage', v.current_stage,
        'is_public', v.is_public,
        'created_at', v.created_at
      )
      from public.ventures v where v.id = p_venture
    ),
    'tasks', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'stage', t.stage, 'title', t.title, 'status', t.status,
        'evidence', t.evidence, 'completed_at', t.completed_at
      ) order by t.position), '[]'::jsonb)
      from public.roadmap_tasks t where t.venture_id = p_venture
    ),
    'lessons', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'lesson_slug', l.lesson_slug, 'best_score', l.best_score,
        'attempts', l.attempts, 'passed', l.passed, 'passed_at', l.passed_at
      ) order by l.created_at), '[]'::jsonb)
      from public.lesson_progress l where l.venture_id = p_venture
    ),
    'interviews', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'interviewee', i.interviewee, 'interviewed_on', i.interviewed_on,
        'notes', i.notes, 'key_quote', i.key_quote, 'tags', i.tags
      ) order by i.interviewed_on desc, i.created_at desc), '[]'::jsonb)
      from public.interviews i where i.venture_id = p_venture
    ),
    'hypotheses', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'statement', h.statement, 'experiment', h.experiment, 'questions', h.questions,
        'sample_target', h.sample_target, 'threshold_pct', h.threshold_pct,
        'tested', h.tested, 'supported', h.supported, 'results_notes', h.results_notes
      ) order by h.created_at desc), '[]'::jsonb)
      from public.hypotheses h where h.venture_id = p_venture
    ),
    'claims', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'statement', c.statement,
        'evidence', (
          select coalesce(jsonb_agg(jsonb_build_object(
            'kind', e.kind, 'quantity', e.quantity, 'description', e.description
          ) order by e.created_at), '[]'::jsonb)
          from public.evidence_items e where e.claim_id = c.id
        )
      ) order by c.created_at desc), '[]'::jsonb)
      from public.claims c where c.venture_id = p_venture
    ),
    'competitors', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'name', c.name, 'strength', c.strength, 'weakness', c.weakness, 'target', c.target
      ) order by c.created_at), '[]'::jsonb)
      from public.competitors c where c.venture_id = p_venture
    ),
    'features', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'name', f.name, 'bucket', f.bucket
      ) order by f.created_at), '[]'::jsonb)
      from public.mvp_features f where f.venture_id = p_venture
    ),
    'decisions', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'decided_on', d.decided_on, 'decision', d.decision,
        'reason', d.reason, 'evidence', d.evidence
      ) order by d.decided_on desc, d.created_at desc), '[]'::jsonb)
      from public.decisions d where d.venture_id = p_venture
    ),
    'launch_done', (
      select coalesce(jsonb_agg(li.slug order by li.slug), '[]'::jsonb)
      from public.launch_items li where li.venture_id = p_venture and li.done
    ),
    'coach_messages', (
      select count(*) from public.coach_messages c where c.venture_id = p_venture
    )
  )
  into result;

  perform public.admin_log_access('view_venture', owner, p_venture);
  return result;
end;
$$;

revoke execute on function public.admin_venture_detail(uuid) from public, anon;
grant execute on function public.admin_venture_detail(uuid) to authenticated;

-- ------------------------------------------------------------ admin_coach_chat

create or replace function public.admin_coach_chat(p_venture uuid)
returns table (
  role text,
  content text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  owner uuid;
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select v.user_id into owner from public.ventures v where v.id = p_venture;
  if owner is null then
    raise exception 'venture not found' using errcode = 'P0002';
  end if;

  perform public.admin_log_access('view_coach', owner, p_venture);

  return query
  select m.role, m.content, m.created_at
  from public.coach_messages m
  where m.venture_id = p_venture
  order by m.created_at asc
  limit 500;
end;
$$;

revoke execute on function public.admin_coach_chat(uuid) from public, anon;
grant execute on function public.admin_coach_chat(uuid) to authenticated;

-- ------------------------------------------------------- admin_access_log_recent

create or replace function public.admin_access_log_recent(p_limit integer default 50)
returns table (
  created_at timestamptz,
  admin_email text,
  action text,
  target_email text,
  venture_name text
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
    l.created_at,
    (select u.email::text from auth.users u where u.id = l.admin_id),
    l.action,
    (select u.email::text from auth.users u where u.id = l.target_user_id),
    (select v.name from public.ventures v where v.id = l.venture_id)
  from public.admin_access_log l
  order by l.created_at desc
  limit least(greatest(coalesce(p_limit, 50), 1), 200);
end;
$$;

revoke execute on function public.admin_access_log_recent(integer) from public, anon;
grant execute on function public.admin_access_log_recent(integer) to authenticated;
