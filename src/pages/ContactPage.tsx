import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your message has been received. We'll get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Get in Touch</h1>
          <p className="font-body text-muted-foreground">We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", value: "info@bellorecrafts.com" },
              { icon: Phone, title: "Phone", value: "+254 785 650 464" },
              { icon: MapPin, title: "Address", value: "Nairobi, Kenya" },
            ].map(({ icon: Icon, title, value }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{title}</p>
                  <p className="font-body text-sm text-muted-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-foreground block mb-1">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-foreground block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-foreground block mb-1">Subject</label>
              <input
                required
                value={form.subject}
                onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-foreground block mb-1">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <button type="submit" className="btn-gold rounded-sm">Send Message</button>
          </form>
        </div>
      </div>
    </main>
  );
}
