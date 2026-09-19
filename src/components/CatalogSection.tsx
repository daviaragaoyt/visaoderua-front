import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import ProductModal from '@/components/ProductModal';

interface Product {
  id: string;
  name: string;
  price: string | number; // Decimal comes as string from some APIs
  stock_quantity: number;
  image_url: string;
}

export default function CatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<{id: string, name: string, price: string, imageSrc: string} | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const data = await response.json();
          // Adjust for potential nested data depending on backend response format
          const productList = Array.isArray(data) ? data : data.products || [];
          setProducts(productList);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 bg-[#050505] flex items-center justify-center">
        <p className="text-white/50 font-bebas text-2xl animate-pulse tracking-widest">Carregando o Arsenal...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-20 bg-[#050505] flex items-center justify-center border-t border-white/5">
        <p className="text-blood font-bebas text-2xl tracking-widest">Nenhuma lupa encontrada no momento.</p>
      </div>
    );
  }

  // Group products
  const groups: Record<string, Product[]> = {
    'LINHA JULIET': [],
    'LINHA ROMEO': [],
    'LINHA MONSTER DOG': [],
    'LINHA MINUTE': [],
    'OUTROS MODELOS EXCLUSIVOS': [],
  };

  products.forEach((p) => {
    const name = p.name.toLowerCase();
    if (name.includes('juliet')) groups['LINHA JULIET'].push(p);
    else if (name.includes('romeo') || name.includes('romeu')) groups['LINHA ROMEO'].push(p);
    else if (name.includes('monster dog')) groups['LINHA MONSTER DOG'].push(p);
    else if (name.includes('minute')) groups['LINHA MINUTE'].push(p);
    else groups['OUTROS MODELOS EXCLUSIVOS'].push(p);
  });

  const handleOpenModal = (product: Product) => {
    setSelectedProduct({
      id: product.id.toString(),
      name: product.name,
      price: Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      imageSrc: product.image_url || '/images/placeholder.png'
    });
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevents opening modal when clicking button
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      imageSrc: product.image_url || '/images/placeholder.png'
    });
  };

  return (
    <section id="catalogo" className="w-full bg-[#050505] py-20 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-16">
           <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-widest uppercase text-shadow-neon inline-block border-b-2 border-blood pb-2">
             CATÁLOGO COMPLETO
           </h2>
        </div>

        <div className="flex flex-col gap-20">
          {Object.entries(groups).map(([groupName, groupProducts]) => {
            if (groupProducts.length === 0) return null;

            return (
              <div key={groupName} className="flex flex-col">
                <h3 className="font-bebas text-3xl text-white/80 tracking-widest border-l-4 border-blood pl-4 mb-8">
                  {groupName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {groupProducts.map((product) => (
                    <div 
                      key={product.id} 
                      onClick={() => handleOpenModal(product)}
                      className="bg-[#111] border border-white/10 rounded-lg p-4 flex flex-col items-center group hover:border-blood/50 transition-colors cursor-pointer"
                    >
                      <div className="relative w-full h-32 mb-4 bg-gradient-to-t from-white/5 to-transparent rounded flex items-center justify-center p-2">
                         {/* Optional Stock Badge */}
                         {product.stock_quantity > 0 && product.stock_quantity <= 3 && (
                            <span className="absolute top-2 right-2 bg-blood text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase z-10">
                               Apenas {product.stock_quantity}
                            </span>
                         )}
                         <Image 
                           src={product.image_url || '/images/placeholder.png'} 
                           alt={product.name} 
                           fill 
                           className="object-contain group-hover:scale-110 transition-transform duration-500"
                           onError={(e) => {
                             (e.target as HTMLElement).style.display = 'none';
                             e.currentTarget.parentElement!.innerHTML = '<span class="text-white/20 text-xs text-center">Sem Foto</span>';
                           }}
                         />
                      </div>
                      
                      <div className="flex flex-col items-center text-center w-full mt-auto">
                        <h4 className="font-bebas text-white text-lg tracking-wider uppercase mb-1 line-clamp-1" title={product.name}>
                          {product.name}
                        </h4>
                        <p className="text-blood font-bold text-lg mb-4">
                          {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <button 
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full py-2 bg-[#222] text-white font-bebas tracking-widest rounded hover:bg-blood hover:box-shadow-neon transition-all duration-300"
                        >
                          BOTAR NO BALAIO
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Modal is rendered here */}
      <ProductModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </section>
  );
}
