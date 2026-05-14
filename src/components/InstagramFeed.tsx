import { Instagram } from "lucide-react";
import productNecklace from "@/assets/product-necklace.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productRing from "@/assets/product-ring.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categoryHomeDecor from "@/assets/category-homeDecor.jpg";

const tiles = [productNecklace, productEarrings, productBracelet, productRing, categoryAccessories, categoryHomeDecor];

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Instagram className="mx-auto text-gold mb-2" size={28} />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">@belloredeals</h2>
          <p className="font-body text-sm text-muted-foreground">Follow us for daily inspiration</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {tiles.map((src, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden">
              <img src={src} alt="Instagram post" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center">
                <Instagram size={20} className="text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
