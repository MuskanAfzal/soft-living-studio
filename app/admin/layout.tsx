import Link from 'next/link';
import { logoutAdmin } from './actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="logo">Admin</div>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/posts">Posts</Link>
        <Link href="/admin/posts/new">New Post</Link>
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/messages">Messages</Link>
        <Link href="/admin/theme">Website</Link>
        <Link href="/admin/account">Account</Link>
        <Link href="/">View Website</Link>
        <form action={logoutAdmin}><button className="btn secondary">Logout</button></form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
