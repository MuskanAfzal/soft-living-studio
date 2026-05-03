-- Optional cleanup: run this only if you no longer need old affiliate product data.
-- Affiliate links now live inside blog post content.

drop policy if exists "Public read published products" on public.affiliate_products;
drop policy if exists "Admins manage products" on public.affiliate_products;
drop table if exists public.affiliate_products;
