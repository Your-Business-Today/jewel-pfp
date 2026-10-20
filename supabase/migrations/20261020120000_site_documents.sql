create table if not exists public.site_documents (
  document text primary key check (char_length(document) <= 50),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_documents enable row level security;

revoke all on public.site_documents from anon, authenticated;
