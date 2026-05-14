import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const items = [
  { icon: Truck, t: "Free Worldwide Shipping", d: "On orders over $40" },
  { icon: Shield, t: "Secure Payment", d: "256-bit SSL encryption" },
  { icon: RefreshCw, t: "30-Day Returns", d: "Hassle-free refunds" },
  { icon: Headphones, t: "24/7 Support", d: "Real human help" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 lg:px-8">
        {items.map(i => (
          <div key={i.t} className="flex items-center gap-3">
            <i.icon className="text-gold flex-shrink-0" size={28} />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">{i.t}</p>
              <p className="font-body text-xs text-muted-foreground">{i.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
