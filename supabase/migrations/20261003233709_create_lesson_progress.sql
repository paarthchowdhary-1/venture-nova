-- Tracks which lessons a user has attempted and passed for each of their ventures.
-- Lesson content itself lives in application code; only progress is stored here.
-- Only the `authenticated` role has policies, and every row is private to its owner.

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_slug text not null check (char_length(lesson_slug) between 1 and 100),
  best_score integer not null default 0 check (best_score between 0 and 20),
  attempts integer not null default 1 check (attempts >= 1),
  passed boolean not null default false,
  passed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (venture_id, lesson_slug)
);

alter table public.lesson_progress enable row level security;

create index if not exists lesson_progress_user_id_idx on public.lesson_progress (user_id);
create index if not exists lesson_progress_venture_id_idx on public.lesson_progress (venture_id);

create policy "authenticated can select own lesson progress"
  on public.lesson_progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own lesson progress"
  on public.lesson_progress for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own lesson progress"
  on public.lesson_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own lesson progress"
  on public.lesson_progress for delete to authenticated
  using ((select auth.uid()) = user_id);
