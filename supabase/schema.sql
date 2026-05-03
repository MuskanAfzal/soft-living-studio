-- Run this in Supabase SQL Editor after creating your project.
-- Then create your admin user in Supabase Auth > Users and insert its auth user id into admin_users.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image text not null default '',
  cover_image_alt text not null default '',
  category_id uuid references public.categories(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','published')),
  meta_title text,
  meta_description text,
  seo_keywords text,
  canonical_url text,
  og_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

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

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.subscriptions enable row level security;
alter table public.inquiries enable row level security;

-- Public can read only published content.
drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories" on public.categories for select using (true);

drop policy if exists "Public read published posts" on public.posts;
create policy "Public read published posts" on public.posts for select using (status = 'published' or public.is_admin());

drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings for select using (true);

drop policy if exists "Public create subscriptions" on public.subscriptions;
create policy "Public create subscriptions" on public.subscriptions for insert with check (true);

drop policy if exists "Public create inquiries" on public.inquiries;
create policy "Public create inquiries" on public.inquiries for insert with check (true);

-- Admins can manage everything.
drop policy if exists "Admins read admin_users" on public.admin_users;
create policy "Admins read admin_users" on public.admin_users for select using (public.is_admin());

drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage posts" on public.posts;
create policy "Admins manage posts" on public.posts for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage subscriptions" on public.subscriptions;
create policy "Admins manage subscriptions" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage inquiries" on public.inquiries;
create policy "Admins manage inquiries" on public.inquiries for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'website-images',
  'website-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read website images" on storage.objects;
create policy "Public read website images"
on storage.objects for select
using (bucket_id = 'website-images');

drop policy if exists "Admins upload website images" on storage.objects;
create policy "Admins upload website images"
on storage.objects for insert
with check (bucket_id = 'website-images' and public.is_admin());

drop policy if exists "Admins update website images" on storage.objects;
create policy "Admins update website images"
on storage.objects for update
using (bucket_id = 'website-images' and public.is_admin())
with check (bucket_id = 'website-images' and public.is_admin());

drop policy if exists "Admins delete website images" on storage.objects;
create policy "Admins delete website images"
on storage.objects for delete
using (bucket_id = 'website-images' and public.is_admin());

insert into public.categories (name, slug, description)
values
  ('Home Decor', 'home-decor', 'Room styling, cozy corners, and decor inspiration'),
  ('Clothing', 'clothing', 'Outfit ideas, seasonal fashion, and style guides')
on conflict (slug) do nothing;
