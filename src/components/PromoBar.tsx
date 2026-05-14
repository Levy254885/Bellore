import { useEffect, useState } from "react";
import { Truck, Sparkles, Gift } from "lucide-react";

const messages = [
  { icon: Sparkles, text: "MEGA SALE — Up to 40% Off Selected Pieces • Use Code BELLORE40" },
  { icon: Truck, text: "FREE Worldwide Shipping on Orders Over $100" },
  { icon: Gift, text: "Buy 2 Get 1 Free on All Earrings This Week" },
];

export default function PromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);

  const M = messages[index];
  const Icon = M.icon;

  return (
    <div className="bg-charcoal text-cream py-2 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 animate-fade-in" key={index}>
        <Icon size={14} className="text-gold flex-shrink-0" />
        <p className="font-body text-[11px] sm:text-xs tracking-wide text-center">
          {M.text}
        </p>
      </div>
    </div>
  );
}
