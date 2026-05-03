import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
const adminUserId = process.env.SEED_ADMIN_USER_ID || '11111111-1111-1111-1111-111111111111';
const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

if (!supabaseUrl || !supabaseSecretKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const { data: createdUser, error: createError } = await supabase.auth.admin.createUser({
  id: adminUserId,
  email: adminEmail,
  password: adminPassword,
  email_confirm: true
});

let user = createdUser.user;

if (createError) {
  const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(adminUserId, {
    email: adminEmail,
    password: adminPassword,
    email_confirm: true
  });

  if (updateError) {
    console.error(`${createError.message}; ${updateError.message}`);
    process.exit(1);
  }

  user = updatedUser.user;
}

const { error: adminError } = await supabase
  .from('admin_users')
  .upsert({ user_id: user.id, email: adminEmail }, { onConflict: 'user_id' });

if (adminError) {
  console.error(adminError.message);
  process.exit(1);
}

console.log(`Seed admin ready: ${adminEmail}`);
