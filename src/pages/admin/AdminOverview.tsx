import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function AdminOverview() {
  const [s, setS] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  useEffect(() => {
    (async () => {
      const [p, o, u, r] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total").eq("status", "paid"),
      ]);
      setS({
        products: p.count ?? 0, orders: o.count ?? 0, users: u.count ?? 0,
        revenue: (r.data ?? []).reduce((sum, x: { total: number }) => sum + Number(x.total || 0), 0),
      });
    })();
  }, []);
  const cards = [
    { label: "Products", value: s.products, icon: Package },
    { label: "Orders", value: s.orders, icon: ShoppingBag },
    { label: "Customers", value: s.users, icon: Users },
    { label: "Revenue (paid)", value: `$${s.revenue.toFixed(2)}`, icon: DollarSign },
  ];
  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="border border-border p-4 rounded-sm">
            <c.icon className="text-gold mb-2" size={20} />
            <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">{c.label}</p>
            <p className="font-heading text-2xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
