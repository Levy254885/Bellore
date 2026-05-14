import { User, Package, MapPin, LogOut, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardPage() {
  const { user, isAdmin, signOut } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle().then(({ data }) => {
      setName(data?.full_name || "");
    });
  }, [user]);

  return (
    <main className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-primary text-primary-foreground"><User size={18} /> Profile</div>
            <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm text-foreground hover:bg-secondary"><Package size={18} /> Orders</Link>
            <div className="flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm text-muted-foreground"><MapPin size={18} /> Addresses</div>
            {isAdmin && <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm text-gold hover:bg-secondary"><ShieldCheck size={18} /> Admin Panel</Link>}
            <button onClick={signOut} className="flex w-full items-center gap-3 px-4 py-3 rounded-sm font-body text-sm text-foreground hover:bg-secondary"><LogOut size={18} /> Sign out</button>
          </div>
          <div className="md:col-span-2 bg-card border border-border rounded-sm p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div><p className="font-body text-xs font-medium text-muted-foreground mb-1">Full Name</p><p className="font-body text-sm text-foreground">{name || "—"}</p></div>
              <div><p className="font-body text-xs font-medium text-muted-foreground mb-1">Email</p><p className="font-body text-sm text-foreground">{user?.email}</p></div>
              <div><p className="font-body text-xs font-medium text-muted-foreground mb-1">Role</p><p className="font-body text-sm text-foreground">{isAdmin ? "Administrator" : "Customer"}</p></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
