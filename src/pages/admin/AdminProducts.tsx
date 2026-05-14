import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string; name: string; description: string; price: number; original_price: number | null;
  image: string; category: string; material: string; stock: number; is_new: boolean;
  on_sale: boolean; best_seller: boolean; featured: boolean; badge: string | null;
}

const blank: Omit<Product, "id"> = {
  name: "", description: "", price: 0, original_price: null, image: "", category: "Necklaces",
  material: "", stock: 10, is_new: false, on_sale: false, best_seller: false, featured: false, badge: null,
};

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<(Omit<Product, "id"> & { id?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as Product[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    const payload = { ...rest, price: Number(rest.price), original_price: rest.original_price ? Number(rest.original_price) : null, stock: Number(rest.stock) };
    const { error } = id
      ? await supabase.from("products").update(payload).eq("id", id)
      : await supabase.from("products").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(id ? "Product updated" : "Product created");
    setEditing(null); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-semibold">Products</h2>
        <button onClick={() => setEditing({ ...blank })} className="btn-gold rounded-sm flex items-center gap-2 text-sm"><Plus size={16} /> New</button>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products yet. Click "New" to add your first product.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead className="border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2">Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id} className="border-b border-border/60">
                  <td className="py-3 font-medium text-foreground">{p.name}</td>
                  <td>{p.category}</td>
                  <td>${Number(p.price).toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td className="text-right">
                    <button onClick={() => setEditing(p)} className="p-2 hover:text-primary"><Pencil size={14} /></button>
                    <button onClick={() => del(p.id)} className="p-2 hover:text-destructive"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-card max-w-2xl w-full p-6 rounded-sm max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-semibold">{editing.id ? "Edit" : "New"} Product</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-2">Name<input className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></label>
              <label className="col-span-2">Description<textarea className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" rows={3} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></label>
              <label>Price (USD)<input type="number" step="0.01" className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.price} onChange={e => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} /></label>
              <label>Original price<input type="number" step="0.01" className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.original_price ?? ""} onChange={e => setEditing({ ...editing, original_price: e.target.value ? parseFloat(e.target.value) : null })} /></label>
              <label>Category<input className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} /></label>
              <label>Material<input className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.material} onChange={e => setEditing({ ...editing, material: e.target.value })} /></label>
              <label>Stock<input type="number" className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.stock} onChange={e => setEditing({ ...editing, stock: parseInt(e.target.value) || 0 })} /></label>
              <label>Badge<input className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.badge ?? ""} onChange={e => setEditing({ ...editing, badge: e.target.value || null })} /></label>
              <label className="col-span-2">Image URL<input className="w-full mt-1 border border-border rounded-sm px-3 py-2 bg-background" value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} /></label>
              <div className="col-span-2 flex flex-wrap gap-4 text-xs">
                {(["is_new", "on_sale", "best_seller", "featured"] as const).map(k => (
                  <label key={k} className="flex items-center gap-2"><input type="checkbox" checked={editing[k]} onChange={e => setEditing({ ...editing, [k]: e.target.checked })} /> {k.replace("_", " ")}</label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={save} className="btn-gold rounded-sm">Save</button>
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-border rounded-sm font-body text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
