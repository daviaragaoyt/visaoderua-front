import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  price: string;
  imageSrc: string;
}

export function ProductCard({ name, price, imageSrc }: ProductCardProps) {
  return (
    <div className="relative group bg-graphite rounded-lg border border-blood/50 p-4 flex flex-col items-center justify-between transition-all duration-300 hover:box-shadow-neon w-full max-w-sm">
      <div className="w-full text-center mb-4">
        <h3 className="font-bebas text-white text-xl tracking-wider uppercase truncate" title={name}>
          {name}
        </h3>
        <p className="text-blood font-bold text-lg mt-1">{price}</p>
      </div>

      <div className="relative w-full h-32 flex items-center justify-center mb-6">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-contain"
          onError={(e) => {
             // Fallback for missing image
            (e.target as HTMLElement).style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '<div class="text-white/20 text-sm">Imagem não encontrada</div>';
          }}
        />
      </div>

      <button className="w-full py-2 bg-blood text-white font-bebas text-lg tracking-wider rounded transition-colors duration-300 hover:bg-blood-hover hover:box-shadow-neon">
        BOTAR NO BALAIO
      </button>
    </div>
  );
}

export default function Products() {
  const products = [
    {
      id: 1,
      name: 'OAKLEY JULIET X-METAL RUBY',
      price: 'R$ 1.999,00',
      imageSrc: '/images/juliet-1.png',
    },
    {
      id: 2,
      name: 'OAKLEY JULIET FIRE',
      price: 'R$ 1.999,00',
      imageSrc: '/images/juliet-2.png',
    },
    {
      id: 3,
      name: 'OAKLEY JULIET X-ROMEO',
      price: 'R$ 1.999,00',
      imageSrc: '/images/juliet-3.png',
    },
  ];

  return (
    <section className="w-full bg-black py-16 px-4 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
    </section>
  );
}
