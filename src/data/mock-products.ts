import type { Product } from "@/types";

/**
 * Catálogo de desenvolvimento. Só é usado quando NODE_ENV=development e a API
 * não responde. Nunca aparece em produção. As fotos são do Unsplash (licença
 * livre) e servem só como placeholder até existirem fotos reais dos produtos.
 */
export const mockProducts: Product[] = [
  { id: "m1", name: "Juliet X-Metal Ruby", price: 1999, stock: 3, imageUrl: "https://images.unsplash.com/photo-1530432999454-016a47c78af3?auto=format&fit=crop&w=900&q=80", line: "juliet" },
  { id: "m2", name: "Juliet Fire Iridium", price: 1899, stock: 8, imageUrl: "https://images.unsplash.com/photo-1610904347227-94142558dfa8?auto=format&fit=crop&w=900&q=80", line: "juliet" },
  { id: "m3", name: "Juliet Ice Thug", price: 1999, stock: 2, imageUrl: "https://images.unsplash.com/photo-1708702101923-f06afcb4e2b7?auto=format&fit=crop&w=900&q=80", line: "juliet" },
  { id: "m4", name: "Romeo 2 Plasma", price: 2199, stock: 5, imageUrl: "https://images.unsplash.com/photo-1658499489144-8d001cd63f96?auto=format&fit=crop&w=900&q=80", line: "romeo" },
  { id: "m5", name: "Romeo 1 Carbon", price: 2299, stock: 1, imageUrl: "https://images.unsplash.com/photo-1732139637065-1088495050db?auto=format&fit=crop&w=900&q=80", line: "romeo" },
  { id: "m6", name: "Monster Dog Black", price: 899, stock: 12, imageUrl: "https://images.unsplash.com/photo-1708799366362-f3533dd266c2?auto=format&fit=crop&w=900&q=80", line: "monster-dog" },
  { id: "m7", name: "Minute Machine", price: 1499, stock: 6, imageUrl: "https://images.unsplash.com/photo-1563146434-7d9ab85789d8?auto=format&fit=crop&w=900&q=80", line: "minute" },
  { id: "m8", name: "Double X Carbon", price: 1699, stock: 4, imageUrl: "https://images.unsplash.com/photo-1788500657788-ddd329542124?auto=format&fit=crop&w=900&q=80", line: "outros" },
];
