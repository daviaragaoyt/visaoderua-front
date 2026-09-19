"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Truck, Home } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || "123456";

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="w-24 h-24 text-green-500" />
      </div>
      <h1 className="font-stencil text-4xl mb-4 text-white uppercase">Pedido Confirmado!</h1>
      <p className="text-gray-300 text-lg mb-8">
        Sua lupa tá garantida, parceiro. Só aguardar o corre.
      </p>

      <div className="bg-graphite p-8 rounded-lg border border-graphite-light mb-8 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Truck className="w-32 h-32" />
        </div>
        <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
          <Truck className="text-blood" /> Detalhes da Entrega
        </h2>
        
        <div className="space-y-4 relative z-10">
          <div>
            <p className="text-sm text-gray-400">Código do Pedido</p>
            <p className="font-mono text-lg text-blood font-bold">#{orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Prazo Estimado</p>
            <p className="font-bold text-white text-lg">Em até 4 dias úteis</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Status</p>
            <p className="inline-block bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-bold border border-green-500/50 mt-1">
              Pagamento Aprovado
            </p>
          </div>
        </div>
      </div>

      <Link 
        href="/"
        className="inline-flex items-center gap-2 bg-blood hover:bg-blood-hover text-white font-stencil text-lg py-4 px-8 rounded transition-colors uppercase"
      >
        <Home /> VOLTAR PRA LOJA
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-stencil text-2xl text-blood animate-pulse">Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
