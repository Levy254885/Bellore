import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-jewelry.jpg";
import aboutArtisan from "@/assets/about-artisan.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categoryHomeDecor from "@/assets/category-homeDecor.jpg";

const tiles = [
  { img: heroImage, title: "The Heritage Edit", subtitle: "Statement gold pieces", span: "lg:col-span-2 lg:row-span-2" },
  { img: aboutArtisan, title: "Artisan Stories", subtitle: "Behind the craft" },
  { img: categoryAccessories, title: "Modern Minimal", subtitle: "Everyday elegance" },
  { img: categoryHomeDecor, title: "Home & Living", subtitle: "Décor that speaks" },
];

export default function Lookbook() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Lookbook</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Inspired by Africa, Worn by the World</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 md:gap-4 lg:h-[600px]">
          {tiles.map((t, i) => (
            <Link
              to="/shop"
              key={i}
              className={`group relative overflow-hidden rounded-sm aspect-square lg:aspect-auto ${t.span ?? ""}`}
            >
              <img
                src={t.img}
                alt={t.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                <p className="font-body text-[10px] sm:text-xs uppercase tracking-widest text-gold mb-1">{t.subtitle}</p>
                <h3 className="font-heading text-base sm:text-xl font-bold text-cream">{t.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
