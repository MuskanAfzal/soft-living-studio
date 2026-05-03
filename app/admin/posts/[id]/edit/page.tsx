import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { AdminField } from '@/components/AdminField';
import { AdminImagePicker } from '@/components/AdminImagePicker';
import { RichTextEditor } from '@/components/RichTextEditor';
import { updatePost } from '../../../actions';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();
  const { data: categories } = await supabase.from('categories').select('id,name').order('name');

  if (!post) notFound();

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <form className="form" action={updatePost}>
        <input type="hidden" name="id" value={post.id} />
        <AdminField label="Post title" help="Shown as the article headline and used as the default SEO title.">
          <input className="input" name="title" placeholder="Title" defaultValue={post.title} required />
        </AdminField>
        <AdminField label="URL slug" help="Controls the post URL. Changing this changes the public link.">
          <input className="input" name="slug" placeholder="Slug" defaultValue={post.slug} required />
        </AdminField>
        <AdminField label="Short excerpt" help="Shown on blog cards, search results, and used as a fallback SEO description.">
          <textarea name="excerpt" placeholder="Short excerpt" defaultValue={post.excerpt} />
        </AdminField>
        <RichTextEditor name="content" defaultValue={post.content} help="Edit the full article here. Use Affiliate Link for sponsored product links with clean visible text." />
        <AdminImagePicker name="cover_image" label="Cover image" defaultValue={post.cover_image} help="Main article image shown on blog cards and at the top of the post." />
        <AdminField label="Cover image alt text" help="Describe the cover image for accessibility and SEO. Example: Neutral bedroom with linen bedding and soft light.">
          <input className="input" name="cover_image_alt" placeholder="Describe the cover image" defaultValue={post.cover_image_alt || ''} />
        </AdminField>
        <AdminField label="Category" help="Controls where the post appears in category archive pages and navigation.">
          <select name="category_id" defaultValue={post.category_id || ''}>
            <option value="">Select category</option>
            {categories?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </AdminField>
        <AdminField label="Publish status" help="Draft posts stay hidden. Published posts appear on the public website.">
          <select name="status" defaultValue={post.status}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </AdminField>
        <h2 className="form-section-title">SEO</h2>
        <AdminField label="SEO title" help="Title shown in Google and browser tabs. Leave blank to use the post title.">
          <input className="input" name="meta_title" placeholder="SEO title" defaultValue={post.meta_title || ''} />
        </AdminField>
        <AdminField label="SEO description" help="Short search result description. Keep it under 160 characters.">
          <textarea name="meta_description" placeholder="SEO description" maxLength={160} defaultValue={post.meta_description || ''} />
        </AdminField>
        <AdminField label="SEO keywords" help="Optional comma-separated topics for your own organization.">
          <input className="input" name="seo_keywords" placeholder="Keywords, comma separated" defaultValue={post.seo_keywords || ''} />
        </AdminField>
        <AdminField label="Canonical URL" help="Optional. Use only if another URL is the original source for this article.">
          <input className="input" name="canonical_url" placeholder="Canonical URL, optional" defaultValue={post.canonical_url || ''} />
        </AdminField>
        <AdminImagePicker name="og_image" label="Social share image" defaultValue={post.og_image || ''} help="Image used when this post is shared on social media. Leave blank to use the cover image." />
        <button className="btn">Save Changes</button>
      </form>
    </div>
  );
}
