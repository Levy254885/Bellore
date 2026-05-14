import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Order { id: string; email: string; total: number; status: string; created_at: string; }
const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const load = async () => {
    const { data } = await supabase.from("orders").select("id,email,total,status,created_at").order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const update = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Order updated"); load();
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-6">Orders</h2>
      {orders.length === 0 ? <p className="text-sm text-muted-foreground">No orders yet.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="py-2">Order</th><th>Email</th><th>Total</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-border/60">
                  <td className="py-3 font-mono text-xs">{o.id.slice(0, 8)}</td>
                  <td>{o.email}</td>
                  <td>${Number(o.total).toFixed(2)}</td>
                  <td>
                    <select value={o.status} onChange={e => update(o.id, e.target.value)} className="border border-border rounded-sm px-2 py-1 bg-background text-xs">
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
