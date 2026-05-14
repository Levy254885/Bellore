import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Truck, RotateCcw, HelpCircle, Ruler, Package, Briefcase, Mail, Phone } from "lucide-react";

const sections = [
  {
    id: "shipping",
    icon: Truck,
    title: "Shipping & Returns",
    body: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p><strong>Shipping:</strong> We ship worldwide from Nairobi, Kenya. Orders are processed within 1–2 business days.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Kenya: 1–3 business days · Free over $50</li>
          <li>Africa: 4–7 business days · From $9.99</li>
          <li>Worldwide (US, EU, UK): 5–10 business days · From $14.99</li>
          <li>Express (DHL): 2–4 business days · From $34.99</li>
        </ul>
        <p><strong>Returns:</strong> 30-day hassle-free returns on unworn items. Email <a href="mailto:info@bellorecrafts.com" className="text-gold underline">info@bellorecrafts.com</a> with your order number to start a return. Refunds are processed within 5 business days of receipt.</p>
      </div>
    ),
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "Frequently Asked Questions",
    body: (
      <div className="space-y-4 text-sm leading-relaxed">
        <div><p className="font-semibold">Are your products authentic and handmade?</p><p>Yes. Every piece is crafted by master artisans across Africa using traditional techniques.</p></div>
        <div><p className="font-semibold">Do you offer custom orders?</p><p>Absolutely. Email us at info@bellorecrafts.com with your design idea and we'll respond within 24 hours.</p></div>
        <div><p className="font-semibold">Will my jewelry tarnish?</p><p>Our gold-plated brass pieces are sealed with a protective coating. Store dry and avoid water/perfume to extend life.</p></div>
        <div><p className="font-semibold">What payment methods do you accept?</p><p>Visa, Mastercard, Amex, Apple/Google Pay (via Stripe) and M-Pesa within Kenya.</p></div>
        <div><p className="font-semibold">Is checkout secure?</p><p>Yes — all payments are processed via Stripe with 256-bit SSL encryption.</p></div>
      </div>
    ),
  },
  {
    id: "size-guide",
    icon: Ruler,
    title: "Size Guide",
    body: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p><strong>Necklaces:</strong> Choker 14" · Princess 18" · Matinee 22" · Opera 30"</p>
        <p><strong>Bracelets:</strong> XS 6" · S 6.5" · M 7" · L 7.5" · XL 8"</p>
        <p><strong>Rings:</strong> Measure circumference of finger in mm. We offer US sizes 4–12.</p>
        <p>Unsure? Email <a href="mailto:info@bellorecrafts.com" className="text-gold underline">info@bellorecrafts.com</a> with a photo and we'll recommend a size.</p>
      </div>
    ),
  },
  {
    id: "track-order",
    icon: Package,
    title: "Track Your Order",
    body: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>Sign in to view live order status and tracking numbers in your dashboard.</p>
        <Link to="/orders" className="inline-block btn-gold mt-2">Go to My Orders</Link>
        <p className="pt-2">Don't have an account? Email <a href="mailto:info@bellorecrafts.com" className="text-gold underline">info@bellorecrafts.com</a> with your order number for an update.</p>
      </div>
    ),
  },
  {
    id: "wholesale",
    icon: Briefcase,
    title: "Wholesale & Stockists",
    body: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>We partner with boutiques, museums, and concept stores worldwide. Minimum order $500 with 40% wholesale discount.</p>
        <p>To apply, send your store details, location, and Instagram to <a href="mailto:info@bellorecrafts.com" className="text-gold underline">info@bellorecrafts.com</a> or call <a href="tel:+254785650464" className="text-gold underline">+254 785 650 464</a>.</p>
      </div>
    ),
  },
];

export default function HelpPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <main className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Help Center</h1>
          <p className="font-body text-muted-foreground">Everything you need to shop with confidence.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="text-xs font-body uppercase tracking-wider px-3 py-1.5 border border-border rounded-full hover:border-gold hover:text-gold transition-colors">
              {s.title}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {sections.map(s => (
            <section key={s.id} id={s.id} className="scroll-mt-24 bg-card border border-border rounded-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold/10 p-2 rounded-full"><s.icon size={20} className="text-gold" /></div>
                <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">{s.title}</h2>
              </div>
              <div className="text-foreground/80">{s.body}</div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-charcoal text-cream rounded-sm p-6 md:p-8 text-center">
          <h3 className="font-heading text-xl mb-3">Still need help?</h3>
          <p className="text-sm text-cream/70 mb-4">Our team usually replies within a few hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:info@bellorecrafts.com" className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal px-5 py-2.5 rounded-sm font-body text-sm font-semibold hover:bg-gold/90"><Mail size={16} /> info@bellorecrafts.com</a>
            <a href="tel:+254785650464" className="inline-flex items-center justify-center gap-2 border border-cream/30 px-5 py-2.5 rounded-sm font-body text-sm hover:border-gold hover:text-gold"><Phone size={16} /> +254 785 650 464</a>
          </div>
        </div>
      </div>
    </main>
  );
}
