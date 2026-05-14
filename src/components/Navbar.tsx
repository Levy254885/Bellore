import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, User, Search, Heart, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.jpg";

type MegaItem = { label: string; to: string };
type MegaCol = { heading: string; items: MegaItem[] };
type NavLinkDef = { to: string; label: string; mega?: MegaCol[]; highlight?: boolean };

const navLinks: NavLinkDef[] = [
  { to: "/", label: "Home" },
  {
    to: "/shop",
    label: "Shop",
    mega: [
      {
        heading: "Jewelry",
        items: [
          { label: "Necklaces", to: "/shop?category=necklaces" },
          { label: "Earrings", to: "/shop?category=earrings" },
          { label: "Bracelets", to: "/shop?category=bracelets" },
          { label: "Rings", to: "/shop?category=rings" },
        ],
      },
      {
        heading: "Lifestyle",
        items: [
          { label: "Accessories", to: "/shop?category=accessories" },
          { label: "Home Décor", to: "/shop?category=home-decor" },
          { label: "Headwraps", to: "/shop?category=headwraps" },
          { label: "Bags", to: "/shop?category=bags" },
        ],
      },
      {
        heading: "Collections",
        items: [
          { label: "New Arrivals", to: "/shop?filter=new" },
          { label: "Best Sellers", to: "/shop?filter=bestsellers" },
          { label: "Sale", to: "/shop?filter=sale" },
          { label: "Gift Sets", to: "/shop?filter=gift-sets" },
        ],
      },
    ],
  },
  { to: "/shop?filter=sale", label: "Sale", highlight: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileShopOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BelloreCrafts" className="h-12 w-12 md:h-14 md:w-14 object-cover rounded-full border-2 border-gold" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading text-lg md:text-xl font-bold text-foreground">BelloreCrafts</span>
            <span className="text-[9px] font-body tracking-[0.2em] text-gold uppercase -mt-0.5">African Designs</span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.mega && setMegaOpen(true)}
              onMouseLeave={() => link.mega && setMegaOpen(false)}
            >
              <Link
                to={link.to}
                className={`font-body text-sm tracking-wide transition-colors duration-200 hover:text-primary flex items-center gap-1 ${
                  location.pathname === link.to ? "text-primary font-semibold" : "text-foreground"
                } ${link.highlight ? "!text-destructive font-semibold" : ""}`}
              >
                {link.label}
                {link.mega && <ChevronDown size={12} />}
              </Link>
              {link.mega && megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                  <div className="bg-card border border-border shadow-2xl rounded-sm p-6 grid grid-cols-3 gap-8 w-[520px] animate-fade-in">
                    {link.mega.map(col => (
                      <div key={col.heading}>
                        <p className="font-body text-[10px] uppercase tracking-widest text-gold mb-3">{col.heading}</p>
                        <ul className="space-y-2">
                          {col.items.map(it => (
                            <li key={it.label}>
                              <Link
                                to={it.to}
                                onClick={() => setMegaOpen(false)}
                                className="font-body text-sm text-foreground hover:text-primary transition-colors"
                              >
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-foreground hover:text-primary transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
          <Link to="/dashboard" className="hidden sm:block text-foreground hover:text-primary transition-colors" aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          {isAdmin && (
            <Link to="/admin" className="hidden sm:flex items-center gap-1 text-xs font-body font-semibold text-gold hover:text-primary" aria-label="Admin">
              <LayoutDashboard size={16} /> <span className="hidden lg:inline">Admin</span>
            </Link>
          )}
          {user ? (
            <button onClick={signOut} className="text-foreground hover:text-primary transition-colors" aria-label="Sign out" title="Sign out">
              <LogOut size={20} />
            </button>
          ) : (
            <Link to="/login" className="text-foreground hover:text-primary transition-colors" aria-label="Account">
              <User size={20} />
            </Link>
          )}
          <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors" aria-label="Cart">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-body font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-border bg-background animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search jewelry, accessories, home décor..."
                className="w-full pl-9 pr-4 py-2.5 border border-border rounded-sm font-body text-sm bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map(link => (
              <li key={link.label} className="border-b border-border/40 last:border-b-0">
                {link.mega ? (
                  <>
                    <button
                      onClick={() => setMobileShopOpen(o => !o)}
                      className={`w-full flex items-center justify-between font-body text-base py-3 transition-colors ${
                        mobileShopOpen ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={16} className={`transition-transform ${mobileShopOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileShopOpen && (
                      <div className="pl-3 pb-3 space-y-3">
                        <Link
                          to="/shop"
                          onClick={closeMobile}
                          className="block font-body text-sm text-primary font-semibold py-1"
                        >
                          → View All Products
                        </Link>
                        {link.mega.map(col => (
                          <div key={col.heading}>
                            <p className="font-body text-[10px] uppercase tracking-widest text-gold mb-1.5">{col.heading}</p>
                            <ul className="space-y-1.5 pl-2">
                              {col.items.map(it => (
                                <li key={it.label}>
                                  <Link
                                    to={it.to}
                                    onClick={closeMobile}
                                    className="font-body text-sm text-foreground/80 hover:text-primary block py-0.5"
                                  >
                                    {it.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.to}
                    onClick={closeMobile}
                    className={`font-body text-base block py-3 transition-colors ${
                      link.highlight ? "text-destructive font-semibold" :
                      location.pathname === link.to ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link to="/admin" onClick={closeMobile} className="font-body text-base block py-3 text-gold font-semibold flex items-center gap-2">
                  <LayoutDashboard size={16} /> Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
