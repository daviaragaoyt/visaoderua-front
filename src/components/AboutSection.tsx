import React from 'react';

export default function AboutSection() {
  return (
    <section id="sobre" className="w-full bg-[#080808] border-t border-white/5 py-24 relative z-10 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blood/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        {/* Left Side: Typography & Copy */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-6 flex items-center gap-4">
             <div className="w-12 h-1 bg-blood"></div>
             <span className="text-blood font-sans text-sm tracking-[0.3em] font-bold">A ESSÊNCIA</span>
          </div>
          
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-widest leading-none mb-8">
            NÃO VENDEMOS ÓCULOS.<br/>
            <span className="text-white/50">VENDEMOS CULTURA.</span>
          </h2>
          
          <p className="text-white/70 font-sans text-lg leading-relaxed mb-8">
            A <strong className="text-white">Visão de Rua</strong> nasceu no asfalto. Nosso estilo é forjado na correria do dia a dia, na estética Mandrake e na cultura urbana de quem não tem medo de ser autêntico. 
          </p>

          <p className="text-white/70 font-sans text-lg leading-relaxed mb-10">
            Cada lupa que você encontra aqui é escolhida a dedo para garantir que você tenha o kit mais brabo do rolê, com qualidade absurda e presença inconfundível. A rua inspira. Você usa.
          </p>

          <button className="self-start px-8 py-3 border-2 border-blood text-white font-bebas text-xl tracking-widest hover:bg-blood hover:text-black transition-all duration-300 shadow-neon-red-sm">
            CONHEÇA O MOVIMENTO
          </button>
        </div>

        {/* Right Side: Imagery/Vibe */}
        <div className="w-full md:w-1/2 relative min-h-[400px]">
           <div className="absolute inset-0 border border-white/10 rounded-2xl transform rotate-3 scale-105"></div>
           <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center p-8">
              {/* If user uploads a brand image later, it goes here. For now, abstract typography art */}
              <div className="flex flex-col items-center justify-center opacity-30 transform -rotate-12">
                 <h3 className="font-bebas text-[8rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-black">VISÃO</h3>
                 <h3 className="font-bebas text-[8rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-blood to-black -mt-12 ml-12">DE RUA</h3>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
