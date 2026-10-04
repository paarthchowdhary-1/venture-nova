-- Everything a venture workspace needs beyond lessons and tasks: customer interviews,
-- validation experiments, an evidence vault, competitors, MVP features, decisions, the
-- launch checklist, the AI coach conversation, and an opt-in public share summary.
-- Every table is private to its owner (authenticated role only) with one policy per
-- operation. The only thing anonymous visitors can ever read is a venture the owner
-- has explicitly made public, and only through a limited set of columns.

create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  interviewee text not null check (char_length(interviewee) between 1 and 120),
  interviewed_on date not null default current_date,
  notes text check (char_length(notes) <= 4000),
  key_quote text check (char_length(key_quote) <= 500),
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.interviews enable row level security;

create index if not exists interviews_user_id_idx on public.interviews (user_id);
create index if not exists interviews_venture_id_idx on public.interviews (venture_id);

create policy "authenticated can select own interviews"
  on public.interviews for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own interviews"
  on public.interviews for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own interviews"
  on public.interviews for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own interviews"
  on public.interviews for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.hypotheses (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  statement text not null check (char_length(statement) between 1 and 500),
  experiment text check (char_length(experiment) <= 1000),
  questions text check (char_length(questions) <= 2000),
  sample_target integer not null default 10 check (sample_target between 1 and 1000),
  threshold_pct integer not null default 60 check (threshold_pct between 1 and 100),
  tested integer not null default 0 check (tested >= 0),
  supported integer not null default 0 check (supported >= 0),
  results_notes text check (char_length(results_notes) <= 2000),
  created_at timestamptz not null default now(),
  constraint hypotheses_supported_within_tested check (supported <= tested)
);

alter table public.hypotheses enable row level security;

create index if not exists hypotheses_user_id_idx on public.hypotheses (user_id);
create index if not exists hypotheses_venture_id_idx on public.hypotheses (venture_id);

create policy "authenticated can select own hypotheses"
  on public.hypotheses for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own hypotheses"
  on public.hypotheses for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own hypotheses"
  on public.hypotheses for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own hypotheses"
  on public.hypotheses for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  statement text not null check (char_length(statement) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.claims enable row level security;

create index if not exists claims_user_id_idx on public.claims (user_id);
create index if not exists claims_venture_id_idx on public.claims (venture_id);

create policy "authenticated can select own claims"
  on public.claims for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own claims"
  on public.claims for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own claims"
  on public.claims for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own claims"
  on public.claims for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null references public.claims (id) on delete cascade,
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('interview', 'survey', 'competitor', 'experiment', 'observation')),
  description text not null check (char_length(description) between 1 and 500),
  quantity integer not null default 1 check (quantity between 1 and 10000),
  created_at timestamptz not null default now()
);

alter table public.evidence_items enable row level security;

create index if not exists evidence_items_user_id_idx on public.evidence_items (user_id);
create index if not exists evidence_items_venture_id_idx on public.evidence_items (venture_id);

create policy "authenticated can select own evidence items"
  on public.evidence_items for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own evidence items"
  on public.evidence_items for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own evidence items"
  on public.evidence_items for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own evidence items"
  on public.evidence_items for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.competitors (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  strength text check (char_length(strength) <= 500),
  weakness text check (char_length(weakness) <= 500),
  target text check (char_length(target) <= 300),
  created_at timestamptz not null default now()
);

alter table public.competitors enable row level security;

create index if not exists competitors_user_id_idx on public.competitors (user_id);
create index if not exists competitors_venture_id_idx on public.competitors (venture_id);

create policy "authenticated can select own competitors"
  on public.competitors for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own competitors"
  on public.competitors for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own competitors"
  on public.competitors for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own competitors"
  on public.competitors for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.mvp_features (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 200),
  bucket text not null check (bucket in ('must', 'should', 'later')),
  created_at timestamptz not null default now()
);

alter table public.mvp_features enable row level security;

create index if not exists mvp_features_user_id_idx on public.mvp_features (user_id);
create index if not exists mvp_features_venture_id_idx on public.mvp_features (venture_id);

create policy "authenticated can select own mvp features"
  on public.mvp_features for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own mvp features"
  on public.mvp_features for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own mvp features"
  on public.mvp_features for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own mvp features"
  on public.mvp_features for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  decided_on date not null default current_date,
  decision text not null check (char_length(decision) between 1 and 500),
  reason text check (char_length(reason) <= 1000),
  evidence text check (char_length(evidence) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.decisions enable row level security;

create index if not exists decisions_user_id_idx on public.decisions (user_id);
create index if not exists decisions_venture_id_idx on public.decisions (venture_id);

create policy "authenticated can select own decisions"
  on public.decisions for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own decisions"
  on public.decisions for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own decisions"
  on public.decisions for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own decisions"
  on public.decisions for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.launch_items (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  slug text not null check (char_length(slug) between 1 and 100),
  done boolean not null default false,
  done_at timestamptz,
  created_at timestamptz not null default now(),
  unique (venture_id, slug)
);

alter table public.launch_items enable row level security;

create index if not exists launch_items_user_id_idx on public.launch_items (user_id);
create index if not exists launch_items_venture_id_idx on public.launch_items (venture_id);

create policy "authenticated can select own launch items"
  on public.launch_items for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own launch items"
  on public.launch_items for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own launch items"
  on public.launch_items for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own launch items"
  on public.launch_items for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.coach_messages (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null check (char_length(content) between 1 and 8000),
  created_at timestamptz not null default now()
);

alter table public.coach_messages enable row level security;

create index if not exists coach_messages_user_id_idx on public.coach_messages (user_id);
create index if not exists coach_messages_venture_id_idx on public.coach_messages (venture_id);

create policy "authenticated can select own coach messages"
  on public.coach_messages for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "authenticated can insert own coach messages"
  on public.coach_messages for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.ventures v
      where v.id = venture_id and v.user_id = (select auth.uid())
    )
  );

create policy "authenticated can update own coach messages"
  on public.coach_messages for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "authenticated can delete own coach messages"
  on public.coach_messages for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Opt-in public sharing. public_summary is a snapshot of achievements the owner
-- chose to share; it never contains names, emails, or interview contents.
alter table public.ventures
  add column if not exists is_public boolean not null default false,
  add column if not exists public_summary jsonb;

create index if not exists ventures_public_idx on public.ventures (is_public) where is_public;

-- Anonymous visitors may only see public ventures, and only these columns
-- (user_id, problem, and target_customer stay private).
revoke select on public.ventures from anon;
grant select (id, name, idea, venture_type, current_stage, is_public, public_summary, created_at)
  on public.ventures to anon;

create policy "anon can select public ventures"
  on public.ventures for select to anon
  using (is_public = true);
