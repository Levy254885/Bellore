import { NavLink, Outlet } from "react-router-dom";
import { Package, ShoppingBag, Users, LayoutDashboard } from "lucide-react";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout() {
  return (
    <main className="section-padding">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold">Admin</p>
            <h1 className="font-heading text-3xl font-bold text-foreground">Bellore Control Panel</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          <aside className="space-y-1">
            {items.map(it => (
              <NavLink key={it.to} to={it.to} end={it.end}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>
                <it.icon size={16} /> {it.label}
              </NavLink>
            ))}
          </aside>
          <section className="bg-card border border-border rounded-sm p-6 min-h-[400px]"><Outlet /></section>
        </div>
      </div>
    </main>
  );
}
