import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products, categories, materials } from "@/data/products";

const categoryAliases: Record<string, string> = {
  "necklaces": "Necklaces",
  "earrings": "Earrings",
  "bracelets": "Bracelets",
  "rings": "Rings",
  "accessories": "Accessories",
  "home-decor": "Home Décor",
  "home-living": "Home Décor",
  "headwraps": "Accessories",
  "bags": "Accessories",
};

export default function ShopPage() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [material, setMaterial] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const filter = params.get("filter"); // sale | new | bestsellers

  useEffect(() => {
    const c = params.get("category");
    if (c) setCategory(categoryAliases[c.toLowerCase()] || "All");
    else setCategory("All");
  }, [params]);

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchCat = category === "All" || p.category === category;
      const matchMat = material === "All" || p.material === material;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchFlag =
        !filter ||
        (filter === "sale" && p.onSale) ||
        (filter === "new" && p.isNew) ||
        (filter === "bestsellers" && p.bestSeller) ||
        (filter === "gift-sets" && p.featured);
      return matchCat && matchMat && matchSearch && matchFlag;
    });
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, category, material, sortBy, filter]);

  return (
    <main className="section-padding">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Our Collection</h1>
          <p className="font-body text-muted-foreground">Handcrafted African jewelry & artisan products</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={material}
            onChange={e => setMaterial(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
          >
            {materials.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-sm font-body text-sm bg-background text-foreground focus:outline-none focus:border-primary"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
