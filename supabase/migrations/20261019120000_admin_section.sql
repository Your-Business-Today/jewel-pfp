create extension if not exists pgcrypto;

create table if not exists public.page_content (
  page text primary key check (char_length(page) <= 50),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (char_length(slug) <= 200),
  title text not null check (char_length(title) <= 200),
  summary text not null check (char_length(summary) <= 2000),
  detail text not null check (char_length(detail) <= 2000),
  points text[] not null default '{}',
  cta_label text not null default '' check (char_length(cta_label) <= 200),
  cta_href text not null default '' check (char_length(cta_href) <= 500),
  visible boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.accreditations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 200),
  role text not null default '' check (char_length(role) <= 200),
  href text not null check (char_length(href) <= 500),
  visible boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 200),
  email text not null check (char_length(email) <= 200),
  phone text not null default '' check (char_length(phone) <= 50),
  building text not null default '' check (char_length(building) <= 200),
  service text not null default '' check (char_length(service) <= 200),
  message text not null check (char_length(message) <= 5000),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

create table if not exists public.admin_login_attempts (
  id uuid primary key default gen_random_uuid(),
  ip text not null check (char_length(ip) <= 100),
  username text not null default '' check (char_length(username) <= 100),
  success boolean not null,
  attempted_at timestamptz not null default now()
);

create index if not exists admin_login_attempts_ip_idx on public.admin_login_attempts (ip, attempted_at desc);

alter table public.page_content enable row level security;
alter table public.services enable row level security;
alter table public.accreditations enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_login_attempts enable row level security;

revoke all on public.page_content, public.services, public.accreditations, public.enquiries, public.admin_login_attempts
  from anon, authenticated;
