import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main className="section-padding text-center">
        <p className="font-body text-muted-foreground">Product not found.</p>
        <Link to="/shop" className="btn-gold mt-4 inline-block rounded-sm">Back to Shop</Link>
      </main>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="section-padding">
      <div className="container mx-auto">
        <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-sm bg-secondary">
            <img src={product.image} alt={product.name} width={800} height={800} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-primary mb-2">{product.category}</p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"} />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="font-heading text-3xl font-bold text-foreground mb-6">${product.price.toFixed(2)}</p>

            <p className="font-body text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <p className="font-body text-sm font-medium text-foreground mb-1">Material</p>
                <p className="font-body text-sm text-muted-foreground">{product.material}</p>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-foreground mb-1">Availability</p>
                <p className={`font-body text-sm ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Quantity & Add */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-sm">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2.5 hover:bg-secondary transition-colors"><Minus size={14} /></button>
                <span className="w-10 text-center font-body text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-2.5 hover:bg-secondary transition-colors"><Plus size={14} /></button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                className="btn-gold flex-1 rounded-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
            </div>

            <Link to="/checkout" onClick={() => addToCart(product, qty)} className="btn-outline-gold text-center rounded-sm">
              Buy Now
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
