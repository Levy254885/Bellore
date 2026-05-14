import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="section-padding text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="font-body text-muted-foreground mb-6">Discover our beautiful collection of handmade African jewelry.</p>
        <Link to="/shop" className="btn-gold inline-block rounded-sm">Shop Now</Link>
      </main>
    );
  }

  return (
    <main className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 bg-card border border-border rounded-sm">
              <Link to={`/product/${product.id}`} className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-heading text-sm font-semibold text-foreground truncate hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="font-body text-xs text-muted-foreground">{product.category}</p>
                <p className="font-heading text-base font-bold text-foreground mt-1">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center border border-border rounded-sm">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary transition-colors"><Minus size={12} /></button>
                  <span className="w-8 text-center font-body text-xs font-medium">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary transition-colors"><Plus size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-secondary p-6 rounded-sm">
          <div className="flex justify-between mb-2">
            <span className="font-body text-sm text-muted-foreground">Subtotal</span>
            <span className="font-heading text-sm font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-body text-sm text-muted-foreground">Shipping</span>
            <span className="font-body text-sm text-muted-foreground">{totalPrice >= 100 ? "Free" : "$9.99"}</span>
          </div>
          <div className="border-t border-border my-4" />
          <div className="flex justify-between mb-6">
            <span className="font-heading text-lg font-bold">Total</span>
            <span className="font-heading text-lg font-bold">${(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-gold block text-center rounded-sm w-full">Proceed to Checkout</Link>
        </div>
      </div>
    </main>
  );
}
