# Soft Living Studio - Home Decor + Clothing Affiliate Blog

A Next.js App Router website for a home decor and clothing blog with affiliate links placed directly inside rich blog articles.

## Features

- Public homepage
- Blog listing and single post pages
- Admin login using Supabase Auth
- Admin-only dashboard
- Create/edit/delete categories
- Create/edit/delete blog posts
- Rich blog editor with headings, lists, quotes, alignment, images, internal links, external links, and affiliate links
- SEO fields for posts
- Supabase Postgres tables with RLS policies
- Local image upload API that saves files to `public/uploads`

## Important Image Note

The upload route stores images in `public/uploads`, which is okay for local development or a traditional Node/VPS deployment. On Vercel/serverless hosting, runtime writes to the public folder are not persistent. For production on Vercel, use Supabase Storage, Cloudflare R2, or another object storage provider.

## Setup

1. Install packages:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set `NEXT_PUBLIC_SITE_URL` to your real domain, for example `https://softlivingstudio.com`. The sitemap, robots.txt, canonical URLs, and social share metadata use this value.

Deployment checklist:

- Set `NEXT_PUBLIC_SITE_URL` to your live domain.
- Set Supabase URL and publishable key in the host dashboard.
- Run all migration SQL files listed below before launch.
- Rotate any Supabase secret keys/passwords that were shared during setup.
- Confirm `/sitemap.xml` and `/robots.txt` load on the live domain.

3. In Supabase, open SQL Editor and run:

```sql
-- paste everything from supabase/schema.sql
```

4. Seed an admin user:

```sql
-- paste everything from supabase/seed-admin.sql
```

Default seed login:

- Email: `admin@example.com`
- Password: `ChangeMe123!`

Change the seeded password after first login, or edit `supabase/seed-admin.sql` before running it.

5. If upgrading an existing database, run:

```sql
-- paste everything from supabase/seo-admin-migration.sql
```

If you no longer need old product data, you may also run:

```sql
-- paste everything from supabase/remove-products-migration.sql
```

To enable editable theme settings on an existing database, run:

```sql
-- paste everything from supabase/site-settings-migration.sql
```

To store newsletter subscriptions and contact inquiries, run:

```sql
-- paste everything from supabase/messages-migration.sql
```

6. Start development:

```bash
npm run dev
```

Open:

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

## Affiliate Links

Use the blog editor toolbar:

- `Internal Link` for links to pages on your own site
- `External Link` for normal outbound links
- `Affiliate Link` for sponsored affiliate URLs

Affiliate links are saved with `nofollow sponsored noopener noreferrer`.
