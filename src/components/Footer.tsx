import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="BelloreCrafts African Designs" className="h-20 w-auto mb-3 rounded-sm" />
            <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
              BelloreCrafts — Crafted in Africa. Loved Worldwide. Authentic handmade jewelry, accessories, and home décor from Africa's master artisans.
            </p>
            <div className="space-y-2 text-sm text-cream/70">
              <p className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> Nairobi, Kenya</p>
              <a href="mailto:info@bellorecrafts.com" className="flex items-center gap-2 hover:text-gold transition-colors"><Mail size={14} className="text-gold" /> info@bellorecrafts.com</a>
              <a href="tel:+254785650464" className="flex items-center gap-2 hover:text-gold transition-colors"><Phone size={14} className="text-gold" /> +254 785 650 464</a>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/BelloreCrafts/" target="_blank" rel="noopener" aria-label="Facebook" className="bg-cream/10 hover:bg-gold p-2 rounded-full transition-colors"><Facebook size={16} /></a>
              <a href="https://www.instagram.com/bellorecrafts/" target="_blank" rel="noopener" aria-label="Instagram" className="bg-cream/10 hover:bg-gold p-2 rounded-full transition-colors"><Instagram size={16} /></a>
              <a href="https://www.youtube.com/@bellorecraftsafrica" target="_blank" rel="noopener" aria-label="YouTube" className="bg-cream/10 hover:bg-gold p-2 rounded-full transition-colors"><Youtube size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-gold">Shop</h4>
            <ul className="space-y-2">
              {[
                { to: "/shop", l: "All Products" },
                { to: "/shop?category=necklaces", l: "Necklaces" },
                { to: "/shop?category=earrings", l: "Earrings" },
                { to: "/shop?category=bracelets", l: "Bracelets" },
                { to: "/shop?category=accessories", l: "Accessories" },
                { to: "/shop?category=home-decor", l: "Home & Living" },
                { to: "/shop?filter=sale", l: "Sale" },
              ].map(x => (
                <li key={x.l}><Link to={x.to} className="font-body text-sm text-cream/70 hover:text-gold transition-colors">{x.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-gold">Help</h4>
            <ul className="space-y-2">
              {[
                { to: "/help#shipping", l: "Shipping & Returns" },
                { to: "/help#faq", l: "FAQ" },
                { to: "/help#size-guide", l: "Size Guide" },
                { to: "/help#track-order", l: "Track Order" },
                { to: "/help#wholesale", l: "Wholesale" },
                { to: "/contact", l: "Contact Us" },
              ].map(x => (
                <li key={x.l}>
                  <Link to={x.to} className="font-body text-sm text-cream/70 hover:text-gold transition-colors">{x.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-gold">Newsletter</h4>
            <p className="font-body text-sm text-cream/70 mb-3">Join 12,000+ collectors. Get <span className="text-gold font-semibold">15% OFF</span> your first order, plus early access to new drops.</p>
            <NewsletterForm />
            <p className="text-[10px] text-cream/40 mt-2">By subscribing you agree to our terms. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-cream/50">© {new Date().getFullYear()} BelloreCrafts African Designs. All rights reserved.</p>
          <p className="font-body text-xs text-cream/50">Visa · Mastercard · Amex · Stripe · M-Pesa</p>
        </div>
      </div>
    </footer>
  );
}
