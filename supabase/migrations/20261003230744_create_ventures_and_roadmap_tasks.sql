-- Core product data: a user's ventures and the roadmap tasks generated for them.
-- Everything is private to the owning user. Only the `authenticated` role gets
-- policies; `anon` has no access to these tables.

create table if not exists public.ventures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  idea text not null check (char_length(idea) between 1 and 2000),
  problem text check (char_length(problem) <= 2000),
  target_customer text check (char_length(target_customer) <= 1000),
  venture_type text not null
    check (venture_type in ('service', 'physical_product', 'software', 'nonprofit', 'other')),
  current_stage text not null default 'idea'
    check (current_stage in (
      'idea', 'validation', 'customer', 'solution', 'mvp',
      'testing', 'feedback', 'iteration', 'business', 'growth'
    )),
  created_at timestamptz not null default now()
);

create table if not exists public.roadmap_tasks (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  stage text not null
    check (stage in (
      'idea', 'validation', 'customer', 'solution', 'mvp',
      'testing', 'feedback', 'iteration', 'business', 'growth'
    )),
  title text not null check (char_length(title) between 1 and 200),
  description text check (char_length(description) <= 2000),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ventures enable row level security;
alter table public.roadmap_tasks enable row level security;

create index if not exists ventures_user_id_idx on public.ventures (user_id);
create index if not exists roadmap_tasks_user_id_idx on public.roadmap_tasks (user_id);
create index if not exists roadmap_tasks_venture_id_idx on public.roadmap_tasks (venture_id);

-- ventures
create policy "authenticated can select own ventures"
  on public.ventures for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own ventures"
  on public.ventures for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "authenticated can update own ventures"
  on public.ventures for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own ventures"
  on public.ventures for delete to authenticated
  using ((select auth.uid()) = user_id);

-- roadmap_tasks
create policy "authenticated can select own roadmap tasks"
  on public.roadmap_tasks for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own roadmap tasks"
  on public.roadmap_tasks for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own roadmap tasks"
  on public.roadmap_tasks for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own roadmap tasks"
  on public.roadmap_tasks for delete to authenticated
  using ((select auth.uid()) = user_id);
