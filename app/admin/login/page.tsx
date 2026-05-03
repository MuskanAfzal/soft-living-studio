import { loginAdmin } from '../actions';
import { AdminField } from '@/components/AdminField';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="container section" style={{ maxWidth: 480 }}>
      <h1>Admin Login</h1>
      {error && <p className="notice">Login failed. Check credentials or make sure this user exists in admin_users.</p>}
      <form className="form" action={loginAdmin}>
        <AdminField label="Admin email" help="Use the email address created in Supabase Auth and allowed in admin_users.">
          <input className="input" name="email" type="email" placeholder="admin@example.com" required />
        </AdminField>
        <AdminField label="Password" help="Use the password for this Supabase Auth user.">
          <input className="input" name="password" type="password" placeholder="Password" required />
        </AdminField>
        <button className="btn">Login</button>
      </form>
    </main>
  );
}
