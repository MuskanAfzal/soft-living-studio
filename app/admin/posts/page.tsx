import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { deletePost } from '../actions';
import { formatDate } from '@/lib/utils';

export default async function PostsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('id,title,slug,status,created_at,categories(name)')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="admin-title-row">
        <div>
          <h1>Posts</h1>
          <p className="lead">Create, edit, publish, and optimize blog content.</p>
        </div>
        <Link className="btn" href="/admin/posts/new">New Post</Link>
      </div>

      <table className="table">
        <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>{posts?.map((post: any) => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.categories?.name || '-'}</td>
            <td><span className={`status ${post.status}`}>{post.status}</span></td>
            <td>{formatDate(post.created_at)}</td>
            <td className="actions-cell">
              <Link className="btn secondary" href={`/admin/posts/${post.id}/edit`}>Edit</Link>
              {post.status === 'published' && <Link className="btn secondary" href={`/blog/${post.slug}`}>View</Link>}
              <form action={deletePost}><input type="hidden" name="id" value={post.id} /><button className="btn danger">Delete</button></form>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
