-- In-site feedback: a signed-in student sends a short message from the
-- "Help & feedback" page and the admin reads it in the admin view.
--
-- Students can add feedback and read back their own. Nobody else can read it
-- through the normal API. Admins read everything through a security definer
-- function that checks public.is_admin() first.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  message text not null check (char_length(btrim(message)) between 1 and 2000),
  page text check (page is null or char_length(page) <= 200),
  created_at timestamptz not null default now()
);

create index if not exists feedback_user_id_created_at_idx
  on public.feedback (user_id, created_at desc);

alter table public.feedback enable row level security;

drop policy if exists "feedback_insert_own" on public.feedback;
create policy "feedback_insert_own" on public.feedback
  for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "feedback_select_own" on public.feedback;
create policy "feedback_select_own" on public.feedback
  for select to authenticated
  using (user_id = (select auth.uid()));

revoke all on public.feedback from anon;

-- The admin's view of all feedback, newest first.
create or replace function public.admin_feedback(p_limit integer default 100)
returns table (
  id uuid,
  created_at timestamptz,
  user_email text,
  user_name text,
  message text,
  page text
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
    f.id,
    f.created_at,
    u.email::text,
    nullif(btrim(u.raw_user_meta_data ->> 'full_name'), ''),
    f.message,
    f.page
  from public.feedback f
  left join auth.users u on u.id = f.user_id
  order by f.created_at desc
  limit least(greatest(coalesce(p_limit, 100), 1), 500);
end;
$$;

revoke execute on function public.admin_feedback(integer) from public, anon;
grant execute on function public.admin_feedback(integer) to authenticated;
