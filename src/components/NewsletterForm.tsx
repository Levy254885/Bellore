import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      // Persist locally so the welcome code is honoured at checkout
      const list = JSON.parse(localStorage.getItem("bc_newsletter") || "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("bc_newsletter", JSON.stringify(list));
      localStorage.setItem("bc_welcome_code", "WELCOME15");
      await new Promise(r => setTimeout(r, 400));
      setDone(true);
      toast({ title: "Welcome to BelloreCrafts!", description: "Use code WELCOME15 for 15% off your first order." });
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-gold/15 border border-gold/40 rounded-sm p-3 text-sm text-cream flex items-start gap-2">
        <Check size={16} className="text-gold mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">You're in.</p>
          <p className="text-xs text-cream/70">Use code <span className="text-gold font-semibold">WELCOME15</span> at checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="flex" onSubmit={onSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        className="flex-1 px-3 py-2 bg-cream/10 border border-cream/20 text-cream font-body text-sm rounded-l-sm focus:outline-none focus:border-gold placeholder:text-cream/40"
      />
      <button type="submit" disabled={loading} className="btn-gold rounded-l-none rounded-r-sm text-sm px-4 py-2 disabled:opacity-60">
        {loading ? "..." : "Join"}
      </button>
    </form>
  );
}
