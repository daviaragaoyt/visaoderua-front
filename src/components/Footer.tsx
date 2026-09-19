"use client";

import React from 'react';

export default function Footer() {
  const handleSubscribe = () => {
    alert("Inscrição confirmada! Bem-vindo à Visão de Rua.");
  };

  return (
    <footer id="footer" className="w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col">
            <h3 className="font-bebas text-3xl text-white tracking-widest mb-4">VISÃO DE RUA</h3>
            <p className="text-white/50 font-sans text-sm leading-relaxed mb-6">
              O autêntico estilo Mandrake. Trazendo a cultura e a essência do asfalto direto para o seu visual. A rua inspira.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-blood transition-colors">f</div>
              <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-blood transition-colors">ig</div>
              <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-blood transition-colors">yt</div>
              <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-blood transition-colors">tk</div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col">
            <h4 className="font-sans font-bold text-white tracking-widest uppercase mb-6 text-sm">Links Úteis</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#catalogo" className="text-white/60 hover:text-blood text-sm transition-colors">Catálogo Completo</a></li>
              <li><a href="#sobre" className="text-white/60 hover:text-blood text-sm transition-colors">Sobre a Visão de Rua</a></li>
              <li><a href="#" className="text-white/60 hover:text-blood text-sm transition-colors">Rastrear Meu Pedido</a></li>
              <li><a href="#" className="text-white/60 hover:text-blood text-sm transition-colors">Dúvidas Frequentes (FAQ)</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="flex flex-col">
            <h4 className="font-sans font-bold text-white tracking-widest uppercase mb-6 text-sm">Políticas</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-white/60 hover:text-blood text-sm transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="text-white/60 hover:text-blood text-sm transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="text-white/60 hover:text-blood text-sm transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-white/60 hover:text-blood text-sm transition-colors">Garantia de Produtos</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
            <h4 className="font-sans font-bold text-white tracking-widest uppercase mb-6 text-sm">Seja um Visionário</h4>
            <p className="text-white/50 text-sm mb-4">Assine nossa lista VIP para receber drops exclusivos e descontos antes de todo mundo.</p>
            <div className="flex flex-col gap-2">
               <input 
                 type="email" 
                 placeholder="Seu melhor e-mail" 
                 className="bg-[#111] border border-white/10 text-white px-4 py-3 outline-none focus:border-blood transition-colors text-sm"
               />
               <button 
                 onClick={handleSubscribe}
                 className="bg-blood text-white font-bebas text-xl tracking-widest py-2 hover:bg-blood-hover transition-colors shadow-neon-red-sm"
               >
                 INSCREVER
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Payments & Copyright) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          
          <div className="flex items-center gap-4 opacity-70">
            <span className="text-white font-bebas text-2xl tracking-widest leading-none">PIX</span>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex gap-2">
               <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] text-white/80 border border-white/20">VISA</div>
               <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] text-white/80 border border-white/20">MASTER</div>
               <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] text-white/80 border border-white/20">ELO</div>
            </div>
          </div>

          <p className="text-white/30 text-xs uppercase text-center md:text-right">
            © 2023 VISÃO DE RUA. TODOS OS DIREITOS RESERVADOS. <br className="md:hidden" />
            <span className="text-white/20 ml-2">CNPJ: 00.000.000/0001-00</span>
          </p>

        </div>

      </div>
    </footer>
  );
}
