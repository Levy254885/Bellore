import aboutArtisan from "@/assets/about-artisan.jpg";
import heroJewelry from "@/assets/hero-jewelry.jpg";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroJewelry} alt="African jewelry" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mb-4">Our Story</h1>
          <p className="font-body text-cream/80 max-w-xl mx-auto">Connecting African artisans to the world, one handcrafted piece at a time.</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Who We Are</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Born from a Love of African Craft</h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Bellore Deals was founded with a simple mission: to bring the extraordinary craftsmanship of African artisans to a global audience while ensuring fair wages and sustainable practices.
                </p>
                <p>
                  Every piece in our collection is handmade by skilled artisans across the continent — from Ghana's gold coast to Kenya's Maasai communities, from Ethiopia's highland workshops to South Africa's beading traditions.
                </p>
                <p>
                  We believe in beauty with purpose. When you choose Bellore, you're not just buying jewelry — you're supporting a family, preserving a tradition, and wearing a story.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={aboutArtisan} alt="African artisan crafting jewelry" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Authenticity", desc: "Every product is genuinely handcrafted using traditional techniques passed down through generations." },
              { title: "Fair Trade", desc: "We pay artisans fairly and invest in their communities through education and infrastructure." },
              { title: "Sustainability", desc: "We use ethically sourced materials and eco-friendly packaging to minimize our footprint." },
            ].map(v => (
              <div key={v.title}>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
