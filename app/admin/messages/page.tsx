import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatDate } from '@/lib/utils';

export default async function MessagesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1>Messages</h1>
      <p className="lead">View contact inquiries and newsletter subscriptions from the website.</p>

      <h2 className="form-section-title">Inquiries</h2>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th></tr></thead>
        <tbody>{inquiries?.map((inquiry) => (
          <tr key={inquiry.id}>
            <td>{inquiry.name}</td>
            <td><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a></td>
            <td>{inquiry.subject || '-'}</td>
            <td>{inquiry.message}</td>
            <td>{formatDate(inquiry.created_at)}</td>
          </tr>
        ))}</tbody>
      </table>
      {(!inquiries || inquiries.length === 0) && <p className="empty-state">No inquiries yet.</p>}

      <h2 className="form-section-title">Subscriptions</h2>
      <table className="table">
        <thead><tr><th>Email</th><th>Source</th><th>Date</th></tr></thead>
        <tbody>{subscriptions?.map((subscription) => (
          <tr key={subscription.id}>
            <td><a href={`mailto:${subscription.email}`}>{subscription.email}</a></td>
            <td>{subscription.source}</td>
            <td>{formatDate(subscription.created_at)}</td>
          </tr>
        ))}</tbody>
      </table>
      {(!subscriptions || subscriptions.length === 0) && <p className="empty-state">No subscriptions yet.</p>}
    </div>
  );
}
