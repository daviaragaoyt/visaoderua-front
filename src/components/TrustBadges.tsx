import React from 'react';

export default function TrustBadges() {
  const badges = [
    {
      id: 1,
      icon: '🔒',
      title: 'COMPRA SEGURA',
      desc: '100% Protegida'
    },
    {
      id: 2,
      icon: '🚚',
      title: 'ENTREGA EXPRESSA',
      desc: 'No DF em até 4 dias'
    },
    {
      id: 3,
      icon: '💎',
      title: 'QUALIDADE PREMIUM',
      desc: 'Materiais de 1ª linha'
    },
    {
      id: 4,
      icon: '🔄',
      title: 'GARANTIA',
      desc: 'Troca facilitada'
    }
  ];

  return (
    <section className="w-full bg-[#111111] border-y border-white/5 py-8 relative z-20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-wrap justify-center gap-6 md:gap-12">
        {badges.map((badge) => (
          <div key={badge.id} className="flex items-center gap-4 bg-[#1a1a1a] px-6 py-4 rounded-lg border border-white/5 hover:border-blood/30 transition-colors w-full sm:w-auto">
            <span className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{badge.icon}</span>
            <div className="flex flex-col">
              <span className="font-bebas text-xl text-white tracking-widest leading-none">{badge.title}</span>
              <span className="text-white/50 text-xs tracking-wider uppercase mt-1">{badge.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
