import { redirect } from 'next/navigation';
import { changeAdminPassword } from '../actions';
import { AdminField } from '@/components/AdminField';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const errorMessages: Record<string, string> = {
  short: 'Password must be at least 8 characters.',
  mismatch: 'Passwords do not match.',
  update: 'Could not update the password. Try again.'
};

export default async function AccountPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).single();
  if (!admin) redirect('/admin/login?error=not-admin');

  const { error, success } = await searchParams;

  return (
    <div>
      <h1>Account</h1>
      <p className="lead">Update the password for {user.email}.</p>

      {success && <p className="notice success">Password updated.</p>}
      {error && <p className="notice">{errorMessages[error] || 'Could not update the password.'}</p>}

      <form className="form" action={changeAdminPassword}>
        <AdminField label="New password" help="Use at least 8 characters. This changes the password for the currently logged-in admin.">
          <input className="input" name="password" type="password" placeholder="New password" minLength={8} required />
        </AdminField>
        <AdminField label="Confirm new password" help="Type the same password again to avoid mistakes.">
          <input
            className="input"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            minLength={8}
            required
          />
        </AdminField>
        <button className="btn">Change Password</button>
      </form>
    </div>
  );
}
