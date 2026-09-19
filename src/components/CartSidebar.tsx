"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "5561999999999"; // Substituir pelo número real depois
    
    let message = "Salve! Quero levar o seguinte kit da Visão de Rua:%0A%0A";
    
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.price})%0A`;
    });
    
    const formattedTotal = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalPrice);
    message += `%0A*Total: ${formattedTotal}*%0A%0AFico no aguardo da chave PIX!`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0a0a0a] shadow-[-10px_0_30px_rgba(255,0,0,0.1)] z-50 flex flex-col border-l border-blood/20">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-bebas text-3xl text-white tracking-widest flex items-center gap-3">
            SEU BALAIO
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-blood transition text-2xl font-bold">
            ✕
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center text-white/30 mt-20 flex flex-col items-center gap-4">
              <p className="font-sans text-lg">Seu balaio tá vazio, parceiro.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-[#111] p-4 rounded border border-white/5 relative group">
                <div className="w-20 h-20 bg-[#1a1a1a] rounded flex-shrink-0 flex items-center justify-center p-2">
                  <img src={item.imageSrc} alt={item.name} className="object-contain w-full h-full" />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <h3 className="font-bebas text-xl text-white tracking-wider leading-none mb-1 pr-6">{item.name}</h3>
                  <p className="text-blood font-bold font-sans text-sm">{item.price}</p>
                  <span className="text-white/50 text-xs mt-1">Qtd: {item.quantity}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-white/30 hover:text-blood transition opacity-100 md:opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#111]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/60 font-sans tracking-widest text-sm uppercase">Total do kit:</span>
              <span className="font-bebas text-white text-3xl text-shadow-neon text-blood">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalPrice)}
              </span>
            </div>
            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bebas text-2xl py-4 rounded transition-colors shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)]"
            >
              FINALIZAR NO WHATSAPP
            </button>
          </div>
        )}
      </div>
    </>
  );
}
