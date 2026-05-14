import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", address: "", city: "", state: "", zip: "", country: "" });

  const shipping = totalPrice >= 100 ? 0 : 9.99;

  if (items.length === 0) {
    return (
      <main className="section-padding text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Nothing to Checkout</h1>
        <Link to="/shop" className="btn-gold inline-block rounded-sm">Shop Now</Link>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Stripe integration will go here
    alert("Stripe checkout will be integrated when backend is connected.");
  };

  return (
    <main className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "firstName", label: "First Name", span: 1 },
                { key: "lastName", label: "Last Name", span: 1 },
                { key: "email", label: "Email", span: 2 },
                { key: "address", label: "Address", span: 2 },
                { key: "city", label: "City", span: 1 },
                { key: "state", label: "State", span: 1 },
                { key: "zip", label: "ZIP Code", span: 1 },
                { key: "country", label: "Country", span: 1 },
              ].map(f => (
                <div key={f.key} className={f.span === 2 ? "col-span-2" : ""}>
                  <label className="font-body text-xs font-medium text-foreground block mb-1">{f.label}</label>
                  <input
                    required
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="btn-gold w-full rounded-sm mt-4">
              Pay ${(totalPrice + shipping).toFixed(2)}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-secondary p-6 rounded-sm h-fit">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between">
                  <span className="font-body text-sm text-foreground truncate pr-2">{product.name} × {quantity}</span>
                  <span className="font-body text-sm font-medium">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-body text-sm">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-muted-foreground">Shipping</span>
                <span className="font-body text-sm">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-heading text-base font-bold">Total</span>
                <span className="font-heading text-base font-bold">${(totalPrice + shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
