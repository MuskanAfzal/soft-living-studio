'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';

function cleanText(value: FormDataEntryValue | null) {
  return String(value || '').trim();
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = cleanText(formData.get('email')).toLowerCase();
  const source = cleanText(formData.get('source')) || 'website';

  if (!email) {
    redirect('/contact?error=email');
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from('subscriptions').upsert({ email, source }, { onConflict: 'email' });

  redirect('/contact?subscribed=1');
}

export async function submitInquiry(formData: FormData) {
  const name = cleanText(formData.get('name'));
  const email = cleanText(formData.get('email')).toLowerCase();
  const subject = cleanText(formData.get('subject'));
  const message = cleanText(formData.get('message'));

  if (!name || !email || !message) {
    redirect('/contact?error=inquiry');
  }

  const supabase = await createSupabaseServerClient();
  await supabase.from('inquiries').insert({ name, email, subject, message });

  redirect('/contact?sent=1');
}
