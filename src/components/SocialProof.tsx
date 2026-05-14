import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

const events = [
  "Aisha from London just bought Ashanti Gold Collar",
  "Marcus in NYC just bought Maasai Sunset Earrings",
  "Zara in Paris just bought Royal Benin Bronze Necklace",
  "Kwame in Accra just bought Tribal Stack Rings",
  "Lola in Lagos just bought Beaded Crossbody Bag",
  "Sara in Toronto just bought Ankara Headwrap",
];

export default function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setIdx(i % events.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
      i++;
    }, 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`fixed bottom-4 left-4 z-40 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <div className="bg-card border border-gold/40 shadow-xl rounded-sm px-4 py-3 flex items-center gap-3 max-w-xs">
        <div className="bg-gold/20 p-2 rounded-full"><ShoppingBag size={14} className="text-gold" /></div>
        <div>
          <p className="font-body text-xs text-foreground">{events[idx]}</p>
          <p className="font-body text-[10px] text-muted-foreground">just now · verified purchase</p>
        </div>
      </div>
    </div>
  );
}
