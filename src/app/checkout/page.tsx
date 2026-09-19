"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, AlertTriangle, CheckCircle2, Copy, CreditCard as CreditCardIcon, QrCode } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<"address" | "payment" | "pix_waiting">("address");
  
  // Address Form State
  const [cep, setCep] = useState("");
  const [addressData, setAddressData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    complemento: "",
    ra: "",
  });
  const [cepError, setCepError] = useState("");
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card">("pix");
  
  // Backend Integration State
  const [pixData, setPixData] = useState<{ qr_code_base64?: string; qr_code?: string } | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // PIX State
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    if (items.length === 0 && step !== "pix_waiting") {
      router.push("/");
    }
  }, [items, router, step]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let pollInterval: NodeJS.Timeout;

    if (step === "pix_waiting") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Poll backend for PIX status
      if (orderId) {
        pollInterval = setInterval(async () => {
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
            const res = await fetch(`${apiUrl}/api/orders/${orderId}/status`);
            if (res.ok) {
              const data = await res.json();
              if (data.status === "PAID") {
                handleSuccess();
              }
            }
          } catch (err) {
            console.error("Erro ao verificar status", err);
          }
        }, 5000);
      }

      return () => {
        clearInterval(interval);
        if (pollInterval) clearInterval(pollInterval);
      };
    }
  }, [step, orderId]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    
    // Format as 00000-000
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    
    setCep(value);
    setCepError("");
  };

  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length < 9) {
      setCepError("CEP inválido.");
      return;
    }
    const form = e.target as HTMLFormElement;
    setAddressData({
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      cpf: (form.elements.namedItem('cpf') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefone: (form.elements.namedItem('telefone') as HTMLInputElement).value,
      logradouro: (form.elements.namedItem('logradouro') as HTMLInputElement).value,
      numero: (form.elements.namedItem('numero') as HTMLInputElement).value,
      complemento: (form.elements.namedItem('complemento') as HTMLInputElement).value,
      ra: (form.elements.namedItem('ra') as HTMLSelectElement).value,
    });
    setStep("payment");
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
      
      const payload = {
        customer: {
          name: addressData.nome,
          email: addressData.email,
          cpf: addressData.cpf.replace(/\D/g, ""),
          phone: addressData.telefone
        },
        address: {
          street: addressData.logradouro,
          number: addressData.numero,
          complement: addressData.complemento,
          neighborhood: addressData.ra,
          city: "Brasília", // Hardcoded per your default
          cep: cep
        },
        items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
        paymentMethod: paymentMethod === "pix" ? "PIX" : "CREDIT_CARD",
      };

      const response = await fetch(`${apiUrl}/api/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido");
      }

      const data = await response.json();
      setOrderId(data.orderId);

      if (paymentMethod === "pix") {
        setPixData(data.paymentResult);
        setStep("pix_waiting");
      } else {
        handleSuccess(); // Mock success for credit card
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro ao processar o pagamento.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccess = () => {
    clearCart();
    router.push("/success?order=" + Math.floor(Math.random() * 1000000));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (items.length === 0 && step !== "pix_waiting") return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-stencil text-3xl mb-8 flex items-center gap-3">
        <ShoppingBag className="text-blood" />
        {step === "address" ? "ENDEREÇO DE ENTREGA" : step === "payment" ? "PAGAMENTO" : "PAGAMENTO PIX"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {step === "address" && (
            <form onSubmit={proceedToPayment} className="bg-graphite p-6 rounded-lg border border-graphite-light">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Dados Pessoais</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nome Completo</label>
                  <input required name="nome" type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">CPF (Para Nota/PIX)</label>
                  <input required name="cpf" type="text" placeholder="000.000.000-00" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">E-mail</label>
                  <input required name="email" type="email" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Telefone / WhatsApp</label>
                  <input required name="telefone" type="text" placeholder="(61) 90000-0000" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Endereço</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">CEP</label>
                  <input 
                    required 
                    name="cep" 
                    type="text" 
                    value={cep} 
                    onChange={handleCepChange}
                    placeholder="70000-000" 
                    className={`w-full bg-background border rounded p-2 text-white ${cepError ? "border-red-500" : "border-gray-700"}`} 
                  />
                  {cepError && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> {cepError}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Logradouro / Quadra (Ex: QNN 32, SQN 205)</label>
                  <input name="logradouro" required type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Número</label>
                  <input name="numero" required type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Complemento</label>
                  <input name="complemento" type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Região Administrativa (RA)</label>
                  <select name="ra" required className="w-full bg-background border border-gray-700 rounded p-2 text-white">
                    <option value="">Selecione...</option>
                    <option value="ceilandia">Ceilândia</option>
                    <option value="taguatinga">Taguatinga</option>
                    <option value="samambaia">Samambaia</option>
                    <option value="plano">Plano Piloto</option>
                    <option value="guara">Guará</option>
                    <option value="aguasclaras">Águas Claras</option>
                    <option value="outra">Outra RA no DF</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!!cepError || cep.length < 9}
                className="w-full mt-8 bg-blood hover:bg-blood-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-stencil text-xl py-4 rounded transition-colors"
              >
                IR PARA PAGAMENTO
              </button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handlePayment} className="bg-graphite p-6 rounded-lg border border-graphite-light">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Forma de Pagamento</h2>
              
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${paymentMethod === "pix" ? "border-blood bg-blood/10" : "border-gray-700 hover:border-gray-500"}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "pix"} onChange={() => setPaymentMethod("pix")} className="w-5 h-5 accent-blood" />
                  <QrCode className={paymentMethod === "pix" ? "text-blood" : "text-gray-400"} />
                  <div>
                    <p className="font-bold">PIX</p>
                    <p className="text-sm text-gray-400">Aprovação imediata. (5% de desconto)</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${paymentMethod === "credit_card" ? "border-blood bg-blood/10" : "border-gray-700 hover:border-gray-500"}`}>
                  <input type="radio" name="payment" checked={paymentMethod === "credit_card"} onChange={() => setPaymentMethod("credit_card")} className="w-5 h-5 accent-blood" />
                  <CreditCardIcon className={paymentMethod === "credit_card" ? "text-blood" : "text-gray-400"} />
                  <div>
                    <p className="font-bold">Cartão de Crédito</p>
                    <p className="text-sm text-gray-400">Até 3x sem juros</p>
                  </div>
                </label>
              </div>

              {paymentMethod === "credit_card" && (
                <div className="mt-6 space-y-4 p-4 bg-background border border-gray-700 rounded">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Número do Cartão</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-graphite border border-gray-700 rounded p-2 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Validade</label>
                      <input required type="text" placeholder="MM/AA" className="w-full bg-graphite border border-gray-700 rounded p-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">CVV</label>
                      <input required type="text" placeholder="123" className="w-full bg-graphite border border-gray-700 rounded p-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Nome no Cartão</label>
                    <input required type="text" className="w-full bg-graphite border border-gray-700 rounded p-2 text-white" />
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button 
                  type="button" 
                  onClick={() => setStep("address")}
                  className="w-1/3 bg-background border border-gray-700 hover:bg-gray-800 text-white font-stencil py-4 rounded transition-colors"
                >
                  VOLTAR
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-2/3 bg-blood hover:bg-blood-hover disabled:opacity-50 text-white font-stencil text-xl py-4 rounded transition-colors"
                >
                  {isProcessing ? "PROCESSANDO..." : "FINALIZAR COMPRA"}
                  </button>
              </div>
            </form>
          )}

          {step === "pix_waiting" && (
            <div className="bg-graphite p-8 rounded-lg border border-graphite-light text-center">
              <h2 className="text-2xl font-bold mb-2">Quase lá, Visionário!</h2>
              <p className="text-gray-400 mb-8">Pague via PIX para garantir sua lupa.</p>
              
              <div className="bg-white p-4 rounded-xl inline-block mb-6">
                {pixData?.qr_code_base64 ? (
                  <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} alt="QR Code PIX" className="w-48 h-48" />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center relative animate-pulse">
                     <QrCode className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="bg-background border border-gray-700 p-4 rounded flex items-center justify-between mb-8 max-w-md mx-auto">
                <p className="text-sm font-mono text-gray-300 truncate mr-4">
                  {pixData?.qr_code || "Gerando PIX..."}
                </p>
                <button 
                  type="button"
                  onClick={() => pixData?.qr_code && navigator.clipboard.writeText(pixData.qr_code)}
                  className="text-blood hover:text-white transition flex items-center gap-1 font-bold text-sm"
                >
                  <Copy className="w-4 h-4" /> Copiar
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xl font-bold">
                Aguardando pagamento... 
                <span className={timeLeft < 60 ? "text-red-500" : "text-blood"}>{formatTime(timeLeft)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-4">(Assim que pago, você será redirecionado automaticamente.)</p>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-graphite p-6 rounded-lg border border-graphite-light sticky top-24">
            <h2 className="font-stencil text-xl mb-4 border-b border-gray-700 pb-2">Resumo</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{item.quantity}x</span>
                    <span className="truncate max-w-[120px]">{item.name}</span>
                  </div>
                  <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Frete (Brasil)</span>
                <span className="text-green-500 font-bold">Grátis</span>
              </div>
              {paymentMethod === "pix" && step === "payment" && (
                <div className="flex justify-between text-blood">
                  <span>Desconto PIX (5%)</span>
                  <span>- {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total * 0.05)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-700">
                <span>Total</span>
                <span className="text-blood">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                    paymentMethod === "pix" && step === "payment" ? total * 0.95 : total
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
