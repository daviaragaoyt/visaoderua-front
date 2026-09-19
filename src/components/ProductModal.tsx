"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: string;
    imageSrc: string;
    description?: string;
  } | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { addToCart } = useCart();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc
    });
    // Opcional: mostrar um toast aqui ou fechar o modal
    onClose();
  };

  const defaultDescription = "Armação robusta com design autêntico. Lentes de alta qualidade com proteção total para você dominar a rua com muito estilo e atitude. O kit perfeito para quem tem visão.";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-blood/30 shadow-[0_0_50px_rgba(255,0,0,0.15)] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-blood text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
        >
          ✕
        </button>

        {/* Left Side: Image Viewer */}
        <div className="w-full md:w-1/2 bg-[#111] p-8 md:p-12 relative min-h-[300px] md:min-h-[500px] flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
           <div className="relative w-full h-full min-h-[250px]">
             <Image
               src={product.imageSrc}
               alt={product.name}
               fill
               className="object-contain drop-shadow-2xl scale-110 hover:scale-125 transition-transform duration-500 cursor-zoom-in"
               onError={(e) => {
                 (e.target as HTMLElement).style.display = 'none';
               }}
             />
           </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
           <div className="mb-2">
             <span className="text-blood font-sans text-xs tracking-[0.3em] font-bold uppercase">Lançamento</span>
           </div>
           
           <h2 className="font-bebas text-4xl md:text-5xl text-white tracking-wider leading-none mb-4">
             {product.name}
           </h2>
           
           <div className="text-blood font-bebas text-4xl tracking-widest text-shadow-neon mb-8">
             {product.price}
           </div>
           
           <div className="w-full h-px bg-white/10 mb-8"></div>
           
           <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed mb-10">
             {product.description || defaultDescription}
           </p>
           
           <div className="mt-auto">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-blood text-white font-bebas text-2xl py-4 hover:bg-blood-hover transition-colors shadow-neon-red border-b-4 border-blood-hover active:border-b-0 active:mt-[4px]"
              >
                BOTAR NO BALAIO
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
