import { ArrowRight } from "lucide-react";
import aboutArtisan from "@/assets/about-artisan.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const posts = [
  { img: aboutArtisan, tag: "Heritage", title: "The Story Behind Ashanti Goldsmithing", date: "May 2, 2026" },
  { img: productNecklace, tag: "Style Guide", title: "5 Ways to Layer Statement Necklaces", date: "Apr 28, 2026" },
  { img: categoryAccessories, tag: "Artisan Spotlight", title: "Meet the Maasai Beadwork Collective", date: "Apr 19, 2026" },
];

export default function BlogTeaser() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Journal</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Stories & Style</h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1 font-body text-sm text-primary hover:gap-2 transition-all">
            View all <ArrowRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(p => (
            <a key={p.title} href="#" className="group block bg-card rounded-sm overflow-hidden border border-border card-hover">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="font-body text-[10px] uppercase tracking-widest text-gold mb-2">{p.tag}</p>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="font-body text-xs text-muted-foreground">{p.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
