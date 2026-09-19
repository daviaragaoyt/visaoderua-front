import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#050505] overflow-hidden py-12">

      {/* Background Image/Texture */}
      <div className="absolute inset-0 bg-asphalt-texture bg-cover bg-center bg-no-repeat opacity-50 mix-blend-luminosity"></div>

      {/* Ambient Darkness Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-transparent to-[#050505] z-0"></div>

      {/* Red Splatters (CSS simulation fallback + Image) */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blood/20 via-transparent to-transparent blur-2xl z-0 mix-blend-screen pointer-events-none"></div>
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blood/20 via-transparent to-transparent blur-2xl z-0 mix-blend-screen pointer-events-none"></div>

      {/* Background Typography (CULTURA DE RUA / MANDRAKE STYLE) */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none z-0 overflow-hidden">
        <h2 className="font-bebas text-6xl md:text-8xl lg:text-[10rem] text-white/5 opacity-40 whitespace-nowrap transform -translate-x-1/4 md:translate-x-0 tracking-widest select-none">
          CULTURA DE RUA
        </h2>
        <h2 className="font-bebas text-6xl md:text-8xl lg:text-[10rem] text-white/5 opacity-40 whitespace-nowrap transform translate-x-1/4 md:translate-x-0 tracking-widest select-none">
          MANDRAKE STYLE
        </h2>
      </div>

      {/* Huge Central Slogan Image */}
      <div className="relative z-20 flex justify-center w-full px-2 md:px-8 pointer-events-none drop-shadow-2xl transform scale-110 md:scale-125">
        <div className="relative w-full max-w-none aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
          <Image
            src="/images/logo-slogan.png"
            alt="A Rua Inspira, Você Usa"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Separator / Floor Line indicator at bottom */}
      <div className="absolute bottom-10 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
}
