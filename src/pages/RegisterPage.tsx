import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match.");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters.");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: { full_name: form.name },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created! Check your email to confirm.");
    nav("/login");
  };

  const handleGoogle = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    if (r.error) toast.error("Google sign-in failed");
  };

  return (
    <main className="section-padding flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="font-body text-muted-foreground">Join Bellore and discover Africa's finest</p>
        </div>

        <button onClick={handleGoogle} type="button" className="w-full flex items-center justify-center gap-2 border border-border rounded-sm py-3 font-body text-sm hover:bg-secondary mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Sign up with Google
        </button>
        <div className="flex items-center gap-3 my-4"><div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">OR</span><div className="flex-1 h-px bg-border" /></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs font-medium text-foreground block mb-1">Full Name</label>
            <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-foreground block mb-1">Email</label>
            <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary" />
          </div>
          <div className="relative">
            <label className="font-body text-xs font-medium text-foreground block mb-1">Password</label>
            <input type={showPass ? "text" : "password"} required minLength={6} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary pr-10" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-muted-foreground">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div>
            <label className="font-body text-xs font-medium text-foreground block mb-1">Confirm Password</label>
            <input type="password" required value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
              className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary" />
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full rounded-sm disabled:opacity-50">{loading ? "Creating…" : "Create Account"}</button>
        </form>

        <p className="font-body text-sm text-center text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </main>
  );
}
