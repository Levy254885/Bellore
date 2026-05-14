import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Amara K.", location: "London, UK", text: "Absolutely stunning quality. The Ashanti necklace exceeded my expectations — every detail is perfect.", rating: 5 },
  { name: "Sophia R.", location: "New York, USA", text: "I get compliments every time I wear my Maasai earrings. Fast shipping and beautiful packaging.", rating: 5 },
  { name: "Chioma O.", location: "Lagos, Nigeria", text: "Bellore truly celebrates African heritage. Each piece feels like wearable art.", rating: 5 },
  { name: "Lara M.", location: "Cape Town, SA", text: "The craftsmanship is unmatched. I've ordered three times and will keep coming back.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Loved Worldwide</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map(r => (
            <div key={r.name} className="bg-card border border-border p-6 rounded-sm card-hover relative">
              <Quote size={28} className="text-gold/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">"{r.text}"</p>
              <p className="font-heading text-sm font-semibold text-foreground">{r.name}</p>
              <p className="font-body text-xs text-muted-foreground">{r.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
