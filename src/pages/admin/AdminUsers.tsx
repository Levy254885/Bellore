import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, ShieldOff } from "lucide-react";

interface Row { id: string; full_name: string | null; created_at: string; isAdmin: boolean; }

export default function AdminUsers() {
  const [rows, setRows] = useState<Row[]>([]);

  const load = async () => {
    const { data: profiles } = await supabase.from("profiles").select("id,full_name,created_at").order("created_at", { ascending: false });
    const { data: roles } = await supabase.from("user_roles").select("user_id,role");
    const adminIds = new Set((roles ?? []).filter(r => r.role === "admin").map(r => r.user_id));
    setRows((profiles ?? []).map(p => ({ ...p, isAdmin: adminIds.has(p.id) })));
  };
  useEffect(() => { load(); }, []);

  const toggleAdmin = async (id: string, makeAdmin: boolean) => {
    if (makeAdmin) {
      const { error } = await supabase.from("user_roles").insert({ user_id: id, role: "admin" });
      if (error) return toast.error(error.message);
      toast.success("Granted admin");
    } else {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", id).eq("role", "admin");
      if (error) return toast.error(error.message);
      toast.success("Revoked admin");
    }
    load();
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-6">Users</h2>
      {rows.length === 0 ? <p className="text-sm text-muted-foreground">No users yet.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="py-2">Name</th><th>Joined</th><th>Role</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map(u => (
                <tr key={u.id} className="border-b border-border/60">
                  <td className="py-3">{u.full_name || <span className="text-muted-foreground italic">unnamed</span>}</td>
                  <td className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>{u.isAdmin ? <span className="text-xs bg-gold/20 text-foreground px-2 py-1 rounded">admin</span> : <span className="text-xs text-muted-foreground">user</span>}</td>
                  <td className="text-right">
                    <button onClick={() => toggleAdmin(u.id, !u.isAdmin)} className="text-xs flex items-center gap-1 ml-auto hover:text-primary">
                      {u.isAdmin ? <><ShieldOff size={14} /> Revoke</> : <><Shield size={14} /> Make admin</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
