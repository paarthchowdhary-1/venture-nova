-- Lets roadmap tasks record what actually happened (evidence) and tie a task row
-- back to the built-in task catalog so seeding is idempotent. AI-generated or
-- custom tasks leave catalog_slug null. Existing RLS policies already limit
-- every row to its owner, so no policy changes are needed.

alter table public.roadmap_tasks
  add column if not exists evidence text check (char_length(evidence) <= 2000),
  add column if not exists completed_at timestamptz,
  add column if not exists catalog_slug text check (char_length(catalog_slug) <= 100);

-- Nulls are distinct, so any number of custom tasks (null slug) are allowed.
alter table public.roadmap_tasks
  add constraint roadmap_tasks_venture_catalog_slug_key
  unique (venture_id, catalog_slug);
