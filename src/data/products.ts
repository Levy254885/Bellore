import productNecklace from "@/assets/product-necklace.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productRing from "@/assets/product-ring.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categoryHomeDecor from "@/assets/category-homeDecor.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  material: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  badge?: string;
}

const images = [productNecklace, productEarrings, productBracelet, productRing, categoryAccessories, categoryHomeDecor];
const imgFor = (cat: string, i: number) => {
  if (cat === "Necklaces") return productNecklace;
  if (cat === "Earrings") return productEarrings;
  if (cat === "Bracelets") return productBracelet;
  if (cat === "Rings") return productRing;
  if (cat === "Accessories") return categoryAccessories;
  if (cat === "Home Décor") return categoryHomeDecor;
  return images[i % images.length];
};

const seed: Omit<Product, "id" | "image">[] = [
  { name: "Ashanti Gold Collar Necklace", description: "Handcrafted Ashanti collar with 18K gold-plated accents and traditional geometric beadwork.", price: 149, originalPrice: 189, category: "Necklaces", material: "Gold-plated brass", rating: 4.9, reviews: 124, inStock: true, featured: true, bestSeller: true, onSale: true, badge: "BESTSELLER" },
  { name: "Maasai Sunset Earrings", description: "Chandelier earrings with hand-rolled gold beads and pearl drops.", price: 79, category: "Earrings", material: "Gold-plated brass", rating: 4.8, reviews: 89, inStock: true, featured: true, bestSeller: true, isNew: true, badge: "NEW" },
  { name: "Zulu Heritage Bracelet", description: "Cuff bracelet woven with traditional Zulu beadwork and gold studs.", price: 65, category: "Bracelets", material: "Woven brass & beads", rating: 4.7, reviews: 67, inStock: true, featured: true },
  { name: "Akan Adinkra Ring", description: "Bold ring with hand-engraved Adinkra symbols of wisdom.", price: 55, category: "Rings", material: "Gold-plated brass", rating: 4.9, reviews: 45, inStock: true, bestSeller: true, badge: "BESTSELLER" },
  { name: "Fulani Twisted Gold Hoops", description: "Lightweight twisted hoop earrings inspired by Fulani goldsmithing.", price: 95, category: "Earrings", material: "Gold-plated brass", rating: 4.6, reviews: 52, inStock: true },
  { name: "Berber Charm Necklace", description: "Layered pendant necklace with hand-cast Berber protective charms.", price: 99, originalPrice: 125, category: "Necklaces", material: "Gold-plated brass", rating: 4.8, reviews: 38, inStock: true, featured: true, onSale: true },
  { name: "Ethiopian Cross Bracelet", description: "Bracelet with miniature Ethiopian cross pendants, lost-wax cast.", price: 85, category: "Bracelets", material: "Gold-plated brass", rating: 4.7, reviews: 29, inStock: true },
  { name: "Tuareg Silver & Gold Ring", description: "Signet ring blending Tuareg silver engraving with gold accents.", price: 72, category: "Rings", material: "Mixed metals", rating: 4.5, reviews: 19, inStock: true },
  { name: "Yoruba Beaded Choker", description: "Vibrant Yoruba beaded choker with brass clasp.", price: 59, category: "Necklaces", material: "Glass beads & brass", rating: 4.6, reviews: 41, inStock: true, isNew: true, badge: "NEW" },
  { name: "Dogon Bronze Pendant", description: "Hand-cast Dogon bronze pendant on adjustable cord.", price: 89, category: "Necklaces", material: "Bronze", rating: 4.7, reviews: 33, inStock: true },
  { name: "Kente Inspired Drop Earrings", description: "Drop earrings inspired by Kente cloth patterns.", price: 49, originalPrice: 69, category: "Earrings", material: "Gold-plated brass", rating: 4.8, reviews: 71, inStock: true, onSale: true, badge: "-30%" },
  { name: "Swahili Coastal Bangles (Set of 3)", description: "Stackable bangles inspired by Swahili coast architecture.", price: 75, category: "Bracelets", material: "Brass", rating: 4.6, reviews: 58, inStock: true, featured: true },
  { name: "Ndebele Painted Hoop Earrings", description: "Hoop earrings hand-painted with Ndebele patterns.", price: 45, category: "Earrings", material: "Gold-plated brass", rating: 4.5, reviews: 22, inStock: true },
  { name: "Sahara Sun Statement Ring", description: "Bold cocktail ring with sunburst motif and amber stone.", price: 110, originalPrice: 140, category: "Rings", material: "Gold-plated brass", rating: 4.9, reviews: 26, inStock: true, onSale: true, bestSeller: true, badge: "-20%" },
  { name: "Marrakech Brass Cuff", description: "Wide brass cuff with engraved Moroccan motifs.", price: 88, category: "Bracelets", material: "Brass", rating: 4.7, reviews: 19, inStock: true, isNew: true, badge: "NEW" },
  { name: "Royal Benin Bronze Necklace", description: "Statement necklace inspired by Benin bronze sculptures.", price: 175, category: "Necklaces", material: "Bronze & gold-plate", rating: 4.9, reviews: 47, inStock: true, featured: true, badge: "PREMIUM" },
  { name: "Tribal Tassel Earrings", description: "Long tassel earrings with brass beads.", price: 39, category: "Earrings", material: "Brass & silk", rating: 4.4, reviews: 88, inStock: true },
  { name: "Ankh Symbol Pendant", description: "Egyptian Ankh pendant on fine gold-plated chain.", price: 69, category: "Necklaces", material: "Gold-plated brass", rating: 4.8, reviews: 54, inStock: true, bestSeller: true },
  { name: "Cowrie Shell Anklet", description: "Adjustable anklet with natural cowrie shells.", price: 29, category: "Accessories", material: "Cowrie & cord", rating: 4.6, reviews: 102, inStock: true, isNew: true, badge: "NEW" },
  { name: "Mudcloth Print Scarf", description: "Soft scarf featuring authentic Mali mudcloth patterns.", price: 49, category: "Accessories", material: "Cotton", rating: 4.7, reviews: 31, inStock: true },
  { name: "Ankara Fabric Headwrap", description: "Vibrant Ankara print headwrap, multiple ways to tie.", price: 25, originalPrice: 35, category: "Accessories", material: "Cotton wax print", rating: 4.8, reviews: 67, inStock: true, onSale: true, badge: "-28%" },
  { name: "Hand-Carved Wooden Bowl", description: "Decorative carved bowl from Kenyan acacia wood.", price: 65, category: "Home Décor", material: "Acacia wood", rating: 4.7, reviews: 23, inStock: true },
  { name: "Woven Sisal Basket", description: "Handwoven sisal storage basket with leather handles.", price: 79, category: "Home Décor", material: "Sisal & leather", rating: 4.8, reviews: 41, inStock: true, featured: true },
  { name: "Soapstone Elephant Figurine", description: "Hand-carved Kisii soapstone elephant.", price: 35, category: "Home Décor", material: "Soapstone", rating: 4.6, reviews: 18, inStock: true },
  { name: "Beaded Wall Hanging", description: "Maasai-inspired beaded wall art panel.", price: 120, category: "Home Décor", material: "Beads & wood", rating: 4.9, reviews: 14, inStock: true, isNew: true, badge: "NEW" },
  { name: "Gold Filigree Stud Earrings", description: "Delicate filigree studs for everyday elegance.", price: 42, category: "Earrings", material: "Gold-plated brass", rating: 4.7, reviews: 95, inStock: true },
  { name: "Tribal Stack Rings (Set of 5)", description: "Mixed metal stack rings with tribal engravings.", price: 58, originalPrice: 78, category: "Rings", material: "Mixed metals", rating: 4.6, reviews: 36, inStock: true, onSale: true, badge: "-25%" },
  { name: "Carnelian Beaded Necklace", description: "Long necklace with carnelian beads and gold accents.", price: 105, category: "Necklaces", material: "Carnelian & gold-plate", rating: 4.8, reviews: 28, inStock: true },
  { name: "Leather Wrap Bracelet", description: "Genuine leather wrap with brass charm.", price: 38, category: "Bracelets", material: "Leather & brass", rating: 4.5, reviews: 71, inStock: true },
  { name: "Brass Spiral Cuff", description: "Sculptural spiral cuff in polished brass.", price: 68, category: "Bracelets", material: "Brass", rating: 4.7, reviews: 25, inStock: true },
  { name: "Tigers Eye Statement Ring", description: "Oval tiger's eye stone in gold-plated bezel.", price: 92, category: "Rings", material: "Gold-plate & stone", rating: 4.8, reviews: 33, inStock: true, featured: true },
  { name: "Beaded Crossbody Bag", description: "Hand-beaded crossbody bag with leather strap.", price: 145, originalPrice: 185, category: "Accessories", material: "Beads & leather", rating: 4.9, reviews: 22, inStock: true, onSale: true, bestSeller: true, badge: "HOT" },
];

export const products: Product[] = seed.map((p, i) => ({
  ...p,
  id: String(i + 1),
  image: imgFor(p.category, i),
}));

export const categories = ["All", "Necklaces", "Earrings", "Bracelets", "Rings", "Accessories", "Home Décor"];
export const materials = ["All", "Gold-plated brass", "Brass", "Bronze", "Mixed metals", "Woven brass & beads", "Glass beads & brass", "Cotton", "Cowrie & cord", "Acacia wood", "Sisal & leather", "Soapstone", "Beads & wood", "Carnelian & gold-plate", "Leather & brass", "Gold-plate & stone", "Beads & leather", "Bronze & gold-plate", "Cotton wax print", "Brass & silk"];
