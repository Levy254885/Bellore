import { Award, Globe, Leaf, ShieldCheck, Sparkles, Users } from "lucide-react";

const items = [
  { icon: Award, label: "Award-Winning Craftsmanship" },
  { icon: Users, label: "500+ Artisan Partners" },
  { icon: Globe, label: "Ships to 60+ Countries" },
  { icon: Leaf, label: "Ethically Sourced" },
  { icon: ShieldCheck, label: "Authenticity Guaranteed" },
  { icon: Sparkles, label: "Hand-Finished" },
];

export default function BrandStrip() {
  return (
    <section className="bg-charcoal py-6 border-y border-cream/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon size={20} className="text-gold" />
              <p className="font-body text-[10px] sm:text-xs text-cream/80 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
