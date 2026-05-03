import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);
const bucketName = 'website-images';

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to upload images.' }, { status: 401 });
    }

    const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).single();

    if (!admin) {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    if (!allowed.has(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, and WEBP images are allowed.' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Images must be smaller than 5MB.' }, { status: 400 });
    }

    const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1] || 'webp';
    const filename = `${crypto.randomUUID()}.${extension}`;
    const filePath = `${user.id}/${filename}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        cacheControl: '31536000',
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
