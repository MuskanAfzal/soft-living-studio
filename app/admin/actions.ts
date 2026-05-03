'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { toSlug } from '@/lib/utils';

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).single();
  if (!admin) redirect('/admin/login?error=not-admin');
  return supabase;
}

function cleanOptional(value: FormDataEntryValue | null) {
  const text = String(value || '').trim();
  return text || null;
}

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect('/admin/login?error=invalid');
  redirect('/admin');
}

export async function logoutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function changeAdminPassword(formData: FormData) {
  const supabase = await requireAdmin();
  const password = String(formData.get('password') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');

  if (password.length < 8) {
    redirect('/admin/account?error=short');
  }

  if (password !== confirmPassword) {
    redirect('/admin/account?error=mismatch');
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect('/admin/account?error=update');
  }

  redirect('/admin/account?success=1');
}

export async function createCategory(formData: FormData) {
  const supabase = await requireAdmin();
  const name = String(formData.get('name') || '');
  const slug = toSlug(String(formData.get('slug') || name));
  const description = String(formData.get('description') || '');
  await supabase.from('categories').insert({ name, slug, description });
  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function updateCategory(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id') || '');
  const name = String(formData.get('name') || '');
  const slug = toSlug(String(formData.get('slug') || name));

  await supabase
    .from('categories')
    .update({
      name,
      slug,
      description: String(formData.get('description') || '')
    })
    .eq('id', id);

  revalidatePath('/admin/categories');
}

export async function deleteCategory(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from('categories').delete().eq('id', String(formData.get('id')));
  revalidatePath('/admin/categories');
}

export async function updateWebsiteSettings(formData: FormData) {
  const supabase = await requireAdmin();
  const settingKeys = [
    'site_name',
    'theme_image',
    'blog_banner_image',
    'hero_kicker',
    'hero_title',
    'hero_cta',
    'intro_text',
    'nav_home_label',
    'nav_blog_label',
    'nav_about_label',
    'nav_contact_label',
    'blog_page_title',
    'blog_page_subtitle',
    'search_page_title',
    'search_page_subtitle',
    'search_no_results_text',
    'contact_page_title',
    'contact_page_subtitle',
    'contact_success_message',
    'contact_subscribed_message',
    'contact_error_message',
    'contact_name_label',
    'contact_email_label',
    'contact_subject_label',
    'contact_message_label',
    'contact_submit_label',
    'about_title',
    'about_image',
    'about_text',
    'newsletter_title',
    'newsletter_placeholder',
    'newsletter_button_label',
    'footer_subscription_title',
    'footer_recent_posts_title',
    'footer_explore_title',
    'footer_note',
    'homepage_empty_text',
    'blog_empty_text',
    'category_empty_text',
    'social_facebook',
    'social_twitter',
    'social_pinterest',
    'social_email'
  ];

  const rows = settingKeys.map((key) => ({
    key,
    value: String(formData.get(key) || '').trim(),
    updated_at: new Date().toISOString()
  }));

  await supabase.from('site_settings').upsert(rows);

  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/admin/theme');
  redirect('/admin/theme?success=1');
}

export async function createPost(formData: FormData) {
  const supabase = await requireAdmin();
  const title = String(formData.get('title') || '');
  const slug = toSlug(String(formData.get('slug') || title));
  const payload = {
    title,
    slug,
    excerpt: String(formData.get('excerpt') || ''),
    content: String(formData.get('content') || ''),
    cover_image: String(formData.get('cover_image') || ''),
    cover_image_alt: String(formData.get('cover_image_alt') || ''),
    category_id: String(formData.get('category_id') || '') || null,
    status: String(formData.get('status') || 'draft'),
    meta_title: cleanOptional(formData.get('meta_title')),
    meta_description: cleanOptional(formData.get('meta_description')),
    seo_keywords: cleanOptional(formData.get('seo_keywords')),
    canonical_url: cleanOptional(formData.get('canonical_url')),
    og_image: cleanOptional(formData.get('og_image'))
  };
  await supabase.from('posts').insert(payload);
  revalidatePath('/');
  revalidatePath('/blog');
  redirect('/admin/posts');
}

export async function updatePost(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '');
  const slug = toSlug(String(formData.get('slug') || title));
  const payload = {
    title,
    slug,
    excerpt: String(formData.get('excerpt') || ''),
    content: String(formData.get('content') || ''),
    cover_image: String(formData.get('cover_image') || ''),
    cover_image_alt: String(formData.get('cover_image_alt') || ''),
    category_id: String(formData.get('category_id') || '') || null,
    status: String(formData.get('status') || 'draft'),
    meta_title: cleanOptional(formData.get('meta_title')),
    meta_description: cleanOptional(formData.get('meta_description')),
    seo_keywords: cleanOptional(formData.get('seo_keywords')),
    canonical_url: cleanOptional(formData.get('canonical_url')),
    og_image: cleanOptional(formData.get('og_image')),
    updated_at: new Date().toISOString()
  };

  await supabase.from('posts').update(payload).eq('id', id);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect('/admin/posts');
}

export async function deletePost(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from('posts').delete().eq('id', String(formData.get('id')));
  revalidatePath('/admin');
}
