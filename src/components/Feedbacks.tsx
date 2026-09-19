import React from 'react';
import Image from 'next/image';

interface FeedbackCardProps {
  imageSrc: string;
  quote: string;
  location: string;
}

export function FeedbackCard({ imageSrc, quote, location }: FeedbackCardProps) {
  return (
    <div className="relative flex flex-col w-48 md:w-56 transition-transform duration-300 hover:scale-105 group mx-auto cursor-pointer">
      
      {/* Top Image Portion */}
      <div className="w-full h-40 relative rounded-t-xl overflow-hidden bg-graphite-light z-0">
        <Image
          src={imageSrc}
          alt="Feedback"
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white/20">Sem Foto</div>';
          }}
        />
        {/* Shadow overlay at bottom of image to blend with plaque */}
        <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Bottom Metallic Plaque Portion */}
      <div className="w-full bg-gradient-to-b from-[#2a2a2a] to-[#151515] p-4 rounded-b-xl border-t-2 border-white/20 shadow-2xl relative z-10 -mt-2">
        {/* Fake screws in corners */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.2)]"></div>
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.2)]"></div>

        {/* Stars */}
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[#ffb800] text-sm drop-shadow-[0_0_2px_rgba(255,184,0,0.8)]">★</span>
          ))}
        </div>

        <p className="text-white font-bold text-xs uppercase leading-tight">&quot;{quote}&quot;</p>
        <p className="text-white/60 text-[10px] mt-2 tracking-wider">{location}</p>
      </div>

    </div>
  );
}

export default function Feedbacks() {
  const feedbacks = [
    { id: 1, quote: 'BRABO DEMAIS!', location: 'Brasília 061', imageSrc: '/images/feedback-1.jpg' },
    { id: 2, quote: '...', location: 'Brasília 061', imageSrc: '/images/feedback-2.jpg' },
    { id: 3, quote: 'BRABO DEMAIS!', location: 'Brasília 061', imageSrc: '/images/feedback-3.jpg' },
    { id: 4, quote: 'DOUBLEX CARBON...', location: 'Brasília 061', imageSrc: '/images/feedback-4.jpg' },
    { id: 5, quote: 'STRIGNAÇÃO!', location: 'Brasília 061', imageSrc: '/images/feedback-4.jpg' }, // Duplicate for layout matching
  ];

  return (
    <section className="w-full bg-[#050505] py-16 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        <h2 className="text-center text-white font-bebas text-4xl tracking-widest mb-10 uppercase text-shadow-neon">
          FEEDBACK DOS VISIONÁRIOS
        </h2>

        <div className="flex items-center justify-between gap-2 md:gap-6">
          {/* Left Arrow (Chalk style) */}
          <button className="text-white hover:text-blood transition-colors text-4xl font-black drop-shadow-md pb-12 hidden md:block">
            &larr;
          </button>
          
          <div className="flex-1 flex overflow-x-auto snap-x hide-scrollbar justify-start md:justify-center gap-4 pb-8">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="snap-center shrink-0">
                <FeedbackCard {...fb} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="text-white hover:text-blood transition-colors text-4xl font-black drop-shadow-md pb-12 hidden md:block">
            &rarr;
          </button>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
        </div>

      </div>
    </section>
  );
}
