import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container not-found">
      <div className="meta">404</div>
      <h1>Page Not Found</h1>
      <p className="lead">The page you are looking for may have moved, or the link may be outdated.</p>
      <div className="button-row">
        <Link className="btn" href="/">Home</Link>
        <Link className="btn secondary" href="/blog">Browse Blog</Link>
      </div>
    </main>
  );
}
