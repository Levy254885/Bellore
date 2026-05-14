import { Package } from "lucide-react";
import { Link } from "react-router-dom";

const mockOrders = [
  { id: "ORD-001", date: "2026-03-15", status: "Delivered", total: 254.00, items: 2 },
  { id: "ORD-002", date: "2026-03-22", status: "Shipped", total: 79.00, items: 1 },
];

export default function OrderHistoryPage() {
  return (
    <main className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Order History</h1>
          <Link to="/dashboard" className="font-body text-sm text-primary hover:underline">Back to Dashboard</Link>
        </div>

        {mockOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-body text-muted-foreground">No orders yet.</p>
            <Link to="/shop" className="btn-gold inline-block rounded-sm mt-4">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{order.id}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700" :
                    order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
                  <span className="font-heading text-base font-bold text-foreground">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
