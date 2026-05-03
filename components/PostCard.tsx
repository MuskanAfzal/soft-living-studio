import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function PostCard({ post }: { post: any }) {
  return (
    <article className="post-card">
      <Link href={`/blog/${post.slug}`} className="post-card-image">
        <img src={post.cover_image || '/placeholder.svg'} alt={post.cover_image_alt || post.title} />
      </Link>
      <div className="post-card-body">
        <div className="meta">{post.categories?.name || 'Style'}</div>
        <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <time>{formatDate(post.created_at)}</time>
        <p>{post.excerpt}</p>
        <Link className="read-more" href={`/blog/${post.slug}`}>Read More</Link>
      </div>
    </article>
  );
}
