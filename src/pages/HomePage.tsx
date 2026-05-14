import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Heart, RefreshCw } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categoryHomeDecor from "@/assets/category-homeDecor.jpg";
import productNecklace from "@/assets/product-necklace.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productRing from "@/assets/product-ring.jpg";
import aboutArtisan from "@/assets/about-artisan.jpg";
import ProductCard from "@/components/ProductCard";
import CountdownBanner from "@/components/CountdownBanner";
import Lookbook from "@/components/Lookbook";
import Testimonials from "@/components/Testimonials";
import BrandStrip from "@/components/BrandStrip";
import BlogTeaser from "@/components/BlogTeaser";
import InstagramFeed from "@/components/InstagramFeed";
import AdSlot from "@/components/AdSlot";
import { products } from "@/data/products";

const bestSellers = products.filter(p => p.bestSeller).slice(0, 8);
const newArrivals = products.filter(p => p.isNew).slice(0, 4);
const onSale = products.filter(p => p.onSale).slice(0, 4);

const categoryCards = [
  { name: "Necklaces", image: productNecklace, count: products.filter(p => p.category === "Necklaces").length },
  { name: "Earrings", image: productEarrings, count: products.filter(p => p.category === "Earrings").length },
  { name: "Rings", image: productRing, count: products.filter(p => p.category === "Rings").length },
  { name: "Accessories", image: categoryAccessories, count: products.filter(p => p.category === "Accessories").length },
  { name: "Home Décor", image: categoryHomeDecor, count: products.filter(p => p.category === "Home Décor").length },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="African gold jewelry collection" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-16">
          <div className="max-w-xl animate-fade-in">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">Handcrafted in Africa</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-cream leading-tight mb-6">
              Timeless Jewelry,<br />
              <span className="gold-gradient-text">Modern Elegance</span>
            </h1>
            <p className="font-body text-cream/80 text-base md:text-lg mb-8 leading-relaxed">
              Discover authentic handmade African jewelry — every piece tells a story of heritage, craftsmanship, and beauty.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-gold inline-flex items-center gap-2 rounded-sm">
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-outline-gold rounded-sm border-cream/40 text-cream hover:bg-cream/10 hover:text-cream">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BrandStrip />

      {/* Trust Badges */}
      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Truck, title: "Free Shipping", desc: "Over $100" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected" },
            { icon: RefreshCw, title: "Easy Returns", desc: "30-day policy" },
            { icon: Heart, title: "Artisan Made", desc: "Ethically crafted" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center justify-center gap-3">
              <Icon size={22} className="text-primary flex-shrink-0" />
              <div className="text-left">
                <p className="font-heading text-xs sm:text-sm font-semibold text-foreground">{title}</p>
                <p className="font-body text-[11px] sm:text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Explore</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {categoryCards.map(cat => (
              <Link
                key={cat.name}
                to="/shop"
                className="group relative aspect-square overflow-hidden rounded-sm"
              >
                <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/60 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                  <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-cream">{cat.name}</h3>
                  <p className="font-body text-[10px] sm:text-xs text-cream/80 mt-1">{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot */}
      <div className="container mx-auto px-4 mb-8">
        <AdSlot slot="1111111111" />
      </div>

      {/* Best Sellers */}
      <section className="section-padding bg-secondary pt-0">
        <div className="container mx-auto pt-16">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Most Loved</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {bestSellers.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <CountdownBanner />

      {/* On Sale */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-destructive mb-2">Limited Time</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">On Sale Now</h2>
            </div>
            <Link to="/shop" className="font-body text-sm text-primary hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {onSale.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <Lookbook />

      {/* New Arrivals */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Just In</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {newArrivals.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="btn-gold inline-flex items-center gap-2 rounded-sm">
              Shop Full Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad slot mid-page */}
      <div className="container mx-auto px-4 py-8">
        <AdSlot slot="2222222222" label="Sponsored" />
      </div>

      <Testimonials />

      {/* Brand Story Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutArtisan} alt="African artisan" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-16 text-center max-w-2xl">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">Our Heritage</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-6">Every Piece Tells a Story</h2>
          <p className="font-body text-cream/80 leading-relaxed mb-8">
            From the goldfields of Ghana to the beadwork studios of Kenya, each Bellore creation carries the spirit of African artistry. We partner directly with artisan communities to bring you authentic, ethically-sourced treasures.
          </p>
          <Link to="/about" className="btn-outline-gold border-cream/40 text-cream hover:bg-cream/10 hover:text-cream rounded-sm">
            Learn More
          </Link>
        </div>
      </section>

      {/* Ad slot before blog */}
      <div className="container mx-auto px-4 py-8">
        <AdSlot slot="3333333333" label="Sponsored" />
      </div>

      <BlogTeaser />
      <InstagramFeed />

      {/* Newsletter */}
      <section className="section-padding bg-charcoal text-cream">
        <div className="container mx-auto max-w-xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-2">Members Only</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Join the Bellore Family</h2>
          <p className="font-body text-cream/70 mb-6">Subscribe and get 10% off your first order, plus exclusive deals and artisan stories.</p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-cream/10 border border-cream/20 text-cream rounded-sm font-body text-sm focus:outline-none focus:border-primary placeholder:text-cream/50"
            />
            <button type="submit" className="btn-gold rounded-sm text-sm">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}
