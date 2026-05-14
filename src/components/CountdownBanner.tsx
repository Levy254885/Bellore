import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

export default function CountdownBanner() {
  const target = useState(() => Date.now() + 1000 * 60 * 60 * 47 + 1000 * 60 * 23)[0];
  const [t, setT] = useState(getRemaining(target));

  useEffect(() => {
    const i = setInterval(() => setT(getRemaining(target)), 1000);
    return () => clearInterval(i);
  }, [target]);

  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center bg-charcoal/50 backdrop-blur-sm rounded-sm px-3 py-2 min-w-[52px] sm:min-w-[64px]">
      <span className="font-heading text-xl sm:text-3xl font-bold text-gold tabular-nums">
        {String(v).padStart(2, "0")}
      </span>
      <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-widest text-cream/70">{l}</span>
    </div>
  );

  return (
    <section className="relative bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal text-cream py-10 sm:py-14 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold))_0%,transparent_60%)]" />
      <div className="relative container mx-auto px-4 flex flex-col items-center text-center gap-5">
        <div className="flex items-center gap-2 text-gold">
          <Flame size={18} />
          <p className="font-body text-xs uppercase tracking-[0.3em]">Limited Time Offer</p>
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl font-bold">
          Mega Heritage Sale — Up to <span className="gold-gradient-text">40% Off</span>
        </h2>
        <p className="font-body text-sm text-cream/70 max-w-md">
          Curated jewelry from across the continent at the lowest prices of the season. Hurry — ends soon.
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <Box v={t.d} l="Days" />
          <Box v={t.h} l="Hrs" />
          <Box v={t.m} l="Min" />
          <Box v={t.s} l="Sec" />
        </div>
        <Link to="/shop" className="btn-gold rounded-sm mt-2">Shop the Sale</Link>
      </div>
    </section>
  );
}
