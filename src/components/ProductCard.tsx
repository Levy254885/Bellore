import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-sm overflow-hidden border border-border card-hover flex flex-col">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.badge && (
          <span className="bg-charcoal text-cream text-[9px] sm:text-[10px] font-body font-bold tracking-wider px-2 py-0.5 rounded-sm">
            {product.badge}
          </span>
        )}
        {discount > 0 && !product.badge?.includes("%") && (
          <span className="bg-destructive text-destructive-foreground text-[9px] sm:text-[10px] font-body font-bold px-2 py-0.5 rounded-sm">
            -{discount}%
          </span>
        )}
      </div>

      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-2.5 sm:p-4 flex flex-col flex-1">
        <p className="font-body text-[9px] sm:text-[11px] uppercase tracking-widest text-muted-foreground mb-1 truncate">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="font-heading text-xs sm:text-base font-semibold text-foreground leading-snug mb-1.5 sm:mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-0.5 mb-1.5 sm:mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={10}
              className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}
            />
          ))}
          <span className="font-body text-[9px] sm:text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mb-2 sm:mb-3">
          <span className="font-heading text-sm sm:text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-[10px] sm:text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full font-body text-[10px] sm:text-xs font-semibold tracking-wide uppercase px-2 py-2 sm:px-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          <ShoppingBag size={12} />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  );
}
