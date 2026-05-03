-- Run this once if your Supabase tables already exist.
-- New projects that run supabase/schema.sql already include these columns.

alter table public.posts
  add column if not exists cover_image_alt text not null default '',
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists seo_keywords text,
  add column if not exists canonical_url text,
  add column if not exists og_image text,
  add column if not exists updated_at timestamptz not null default now();
