import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).single();
  if (!admin) redirect('/admin/login?error=not-admin');

  const { data: posts } = await supabase.from('posts').select('id,title,status,created_at').order('created_at', { ascending: false }).limit(8);
  const { count: totalPosts } = await supabase.from('posts').select('*', { count: 'exact', head: true });
  const { count: publishedPosts } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published');
  const { count: categories } = await supabase.from('categories').select('*', { count: 'exact', head: true });
  const { count: inquiries } = await supabase.from('inquiries').select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="lead">Manage blog posts, rich article content, SEO, categories, and affiliate links inside your articles.</p>
      <div style={{ display: 'flex', gap: 12, margin: '22px 0' }}>
        <Link className="btn" href="/admin/posts/new">Create Post</Link>
        <Link className="btn secondary" href="/admin/categories">Categories</Link>
      </div>

      <div className="stats-grid">
        <Link href="/admin/posts" className="stat-card"><strong>{totalPosts || 0}</strong><span>Total posts</span></Link>
        <Link href="/admin/posts" className="stat-card"><strong>{publishedPosts || 0}</strong><span>Published posts</span></Link>
        <Link href="/admin/categories" className="stat-card"><strong>{categories || 0}</strong><span>Categories</span></Link>
        <Link href="/admin/messages" className="stat-card"><strong>{inquiries || 0}</strong><span>Inquiries</span></Link>
      </div>

      <div className="section-head">
        <h2>Recent Posts</h2>
        <Link href="/admin/posts">Manage all</Link>
      </div>
      <table className="table">
        <thead><tr><th>Title</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>{posts?.map((post) => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td><span className={`status ${post.status}`}>{post.status}</span></td>
            <td><Link className="btn secondary" href={`/admin/posts/${post.id}/edit`}>Edit</Link></td>
          </tr>
        ))}</tbody>
      </table>
      {(!posts || posts.length === 0) && <p className="empty-state">No posts yet. Create your first post to begin.</p>}
    </div>
  );
}
