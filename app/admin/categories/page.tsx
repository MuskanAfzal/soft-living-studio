import { createSupabaseServerClient } from '@/lib/supabase-server';
import { AdminField } from '@/components/AdminField';
import { createCategory, deleteCategory, updateCategory } from '../actions';

export default async function CategoriesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  return (
    <div>
      <h1>Categories</h1>
      <form className="form" action={createCategory} style={{ marginBottom:28 }}>
        <AdminField label="Category name" help="Shown in the public navbar, sidebar, and category archive page.">
          <input className="input" name="name" placeholder="Example: Home Decor" required />
        </AdminField>
        <AdminField label="Category URL slug" help="Optional. Leave blank to create it from the name, or enter a short URL like home-decor.">
          <input className="input" name="slug" placeholder="home-decor" />
        </AdminField>
        <AdminField label="Category description" help="Shown under the category title on the public category page.">
          <input className="input" name="description" placeholder="Room styling, cozy corners, and decor inspiration" />
        </AdminField>
        <button className="btn">Add Category</button>
      </form>
      <p className="field-help" style={{ marginBottom: 12 }}>Edit existing categories below. Slugs control the public category URL.</p>
      <table className="table"><thead><tr><th>Name</th><th>Slug</th><th>Description</th><th>Actions</th></tr></thead><tbody>
        {categories?.map((cat) => (
          <tr key={cat.id}>
            <td colSpan={4}>
              <form className="table-form" action={updateCategory}>
                <input type="hidden" name="id" value={cat.id} />
                <label><span className="field-label">Name</span><input className="input" name="name" defaultValue={cat.name} required /></label>
                <label><span className="field-label">Slug</span><input className="input" name="slug" defaultValue={cat.slug} required /></label>
                <label><span className="field-label">Description</span><input className="input" name="description" defaultValue={cat.description || ''} /></label>
                <button className="btn secondary">Save</button>
              </form>
              <form action={deleteCategory} className="inline-delete">
                <input type="hidden" name="id" value={cat.id} />
                <button className="btn danger">Delete</button>
              </form>
            </td>
          </tr>
        ))}
      </tbody></table>
    </div>
  );
}
