"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="w-full flex flex-col z-50">
      {/* Main Header */}
      <header className="w-full relative flex items-center justify-between px-4 md:px-12 py-4 bg-[#080808] border-b border-black">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2 relative z-10 w-auto md:w-1/3">
          <div className="relative w-56 md:w-80 h-20 md:h-28 flex items-center cursor-pointer">
            {/* Imagem real (escondida se quebrar) */}
            <Image
              src="/images/logo-main.png"
              alt="Visão de Rua Logo"
              fill
              className="object-contain object-left"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
                e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-start');
                const nextEl = e.currentTarget.nextElementSibling;
                if (nextEl) {
                   nextEl.classList.remove('hidden');
                   nextEl.classList.add('flex');
                }
              }}
            />
            {/* Fallback Text (Só aparece se a imagem falhar) */}
            <div className="hidden items-center gap-2">
              <span className="text-white text-2xl">🔍</span> {/* Ícone genérico de lupa */}
              <span className="text-white font-bebas text-2xl font-bold tracking-wider whitespace-nowrap">
                VISÃO DE <span className="text-blood text-shadow-neon italic transform -skew-x-12 inline-block">RUA</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
           <a href="#" className="text-white/80 hover:text-blood font-bebas text-2xl tracking-widest transition-colors">HOME</a>
           <a href="#catalogo" className="text-white/80 hover:text-blood font-bebas text-2xl tracking-widest transition-colors">CATÁLOGO</a>
           <a href="#sobre" className="text-white/80 hover:text-blood font-bebas text-2xl tracking-widest transition-colors">O MOVIMENTO</a>
           <a href="#footer" className="text-white/80 hover:text-blood font-bebas text-2xl tracking-widest transition-colors">CONTATO</a>
        </nav>

        {/* Right Side: Icons & Mobile Menu */}
        <div className="flex items-center justify-end gap-6 w-1/4">
           {/* Search Icon */}
           <button className="text-white/80 hover:text-blood transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
           </button>
           
           {/* Cart Icon with Badge */}
           <button onClick={() => setIsCartOpen(true)} className="text-white/80 hover:text-blood transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {/* Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blood text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
           </button>

           {/* Mobile Menu Hamburger */}
           <button className="md:hidden text-white/80 hover:text-blood transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
           </button>
        </div>
      </header>

      {/* Sub-header Warning Bar */}
      <div className="w-full bg-[#111111] border-y border-blood/50 py-1 flex items-center justify-center shadow-neon-red-sm relative overflow-hidden">
        {/* Subtle red glow line effect inside */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blood/10 to-transparent"></div>
        <p className="text-white font-bold text-xs md:text-sm tracking-[0.2em] flex items-center gap-3 relative z-10">
          <span className="text-blood text-base">⚠️</span>
          <span>EXCLUSIVO <span className="text-blood">BRASÍLIA - DF</span> | ENTREGA EM ATÉ <span className="text-blood">4 DIAS</span></span>
          <span className="text-blood text-base">⚠️</span>
        </p>
      </div>
    </div>
  );
}
