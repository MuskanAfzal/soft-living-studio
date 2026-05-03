-- Run this once if your Supabase project already exists.
-- It stores newsletter subscriptions and contact inquiries.

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text default '',
  message text not null,
  status text not null default 'new' check (status in ('new','read','archived')),
  created_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "Public create subscriptions" on public.subscriptions;
create policy "Public create subscriptions" on public.subscriptions for insert with check (true);

drop policy if exists "Public create inquiries" on public.inquiries;
create policy "Public create inquiries" on public.inquiries for insert with check (true);

drop policy if exists "Admins manage subscriptions" on public.subscriptions;
create policy "Admins manage subscriptions" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage inquiries" on public.inquiries;
create policy "Admins manage inquiries" on public.inquiries for all using (public.is_admin()) with check (public.is_admin());
