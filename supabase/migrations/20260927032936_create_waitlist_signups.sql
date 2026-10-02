-- Waitlist signups collected from the public landing page.
-- Anonymous visitors may submit their email (and an optional idea
-- description); nobody can read, update, or delete rows through the
-- public API, keeping submitted emails private.
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  idea text,
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;

create index if not exists waitlist_signups_email_idx
  on public.waitlist_signups (email);

create policy "anon can insert waitlist signups"
  on public.waitlist_signups
  for insert
  to anon
  with check (true);

create policy "authenticated can insert waitlist signups"
  on public.waitlist_signups
  for insert
  to authenticated
  with check (true);
