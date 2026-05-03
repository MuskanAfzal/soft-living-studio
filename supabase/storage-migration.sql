-- Run this once to store website/editor images in Supabase Storage.
-- The app uploads to the public `website-images` bucket.

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
