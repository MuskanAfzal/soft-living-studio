export function LegalPage({
  children,
  subtitle,
  title
}: {
  children: React.ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <main>
      <section className="page-banner legal-banner">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>
      <section className="container legal-content">
        {children}
      </section>
    </main>
  );
}
