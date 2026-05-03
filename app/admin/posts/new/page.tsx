import { createSupabaseServerClient } from '@/lib/supabase-server';
import { AdminField } from '@/components/AdminField';
import { AdminImagePicker } from '@/components/AdminImagePicker';
import { RichTextEditor } from '@/components/RichTextEditor';
import { createPost } from '../../actions';

export default async function NewPostPage() {
  const supabase = await createSupabaseServerClient();
  const { data: categories } = await supabase.from('categories').select('id,name').order('name');
  return (
    <div>
      <h1>New Blog Post</h1>
      <form className="form" action={createPost}>
        <AdminField label="Post title" help="Shown as the article headline and used as the default SEO title.">
          <input className="input" name="title" placeholder="Example: 10 Soft Decor Ideas for a Calm Bedroom" required />
        </AdminField>
        <AdminField label="URL slug" help="Optional. Leave blank to create it from the title, or enter a short URL like calm-bedroom-decor.">
          <input className="input" name="slug" placeholder="calm-bedroom-decor" />
        </AdminField>
        <AdminField label="Short excerpt" help="Shown on blog cards, search results, and used as a fallback SEO description.">
          <textarea name="excerpt" placeholder="A short summary of the article." />
        </AdminField>
        <RichTextEditor name="content" help="Write the full article here. Use Internal Link for your own pages, External Link for normal sites, and Affiliate Link for sponsored product links." />
        <AdminImagePicker name="cover_image" label="Cover image" help="Main article image shown on blog cards and at the top of the post." />
        <AdminField label="Cover image alt text" help="Describe the cover image for accessibility and SEO. Example: Neutral bedroom with linen bedding and soft light.">
          <input className="input" name="cover_image_alt" placeholder="Describe the cover image" />
        </AdminField>
        <AdminField label="Category" help="Controls where the post appears in category archive pages and navigation.">
          <select name="category_id"><option value="">Select category</option>{categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </AdminField>
        <AdminField label="Publish status" help="Draft posts stay hidden. Published posts appear on the public website.">
          <select name="status"><option value="draft">Draft</option><option value="published">Published</option></select>
        </AdminField>
        <h2 className="form-section-title">SEO</h2>
        <AdminField label="SEO title" help="Title shown in Google and browser tabs. Leave blank to use the post title.">
          <input className="input" name="meta_title" placeholder="Best Decor Ideas for a Calm Bedroom" />
        </AdminField>
        <AdminField label="SEO description" help="Short search result description. Keep it under 160 characters.">
          <textarea name="meta_description" placeholder="A concise reason someone should click this post." maxLength={160} />
        </AdminField>
        <AdminField label="SEO keywords" help="Optional comma-separated topics for your own organization.">
          <input className="input" name="seo_keywords" placeholder="bedroom decor, soft living, home styling" />
        </AdminField>
        <AdminField label="Canonical URL" help="Optional. Use only if another URL is the original source for this article.">
          <input className="input" name="canonical_url" placeholder="https://example.com/original-post" />
        </AdminField>
        <AdminImagePicker name="og_image" label="Social share image" help="Image used when this post is shared on social media. Leave blank to use the cover image." />
        <button className="btn">Save Post</button>
      </form>
    </div>
  );
}
