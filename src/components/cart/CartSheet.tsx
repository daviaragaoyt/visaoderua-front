"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { formatCurrency } from "@/lib/format";
import { spring } from "@/lib/motion";
import { useCart } from "@/context/CartContext";
import { Sheet, CloseButton } from "@/components/ui/dialog";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartItemRow } from "@/components/cart/CartItemRow";

export function CartSheet() {
  const { isOpen, close, items, totalItems, subtotal, clear } = useCart();
  const router = useRouter();

  const whatsappMessage = () => {
    const lines = items.map((i) => `- ${i.quantity}x ${i.name} (${formatCurrency(i.price * i.quantity)})`).join("\n");
    return `Salve! Quero levar o seguinte kit da ${site.name}:\n\n${lines}\n\n*Total: ${formatCurrency(subtotal)}*\n\nFico no aguardo da chave PIX!`;
  };

  const goCheckout = () => {
    close();
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onClose={close} labelledBy="cart-title">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <h2 id="cart-title" className="font-display text-3xl tracking-widest text-foreground">
            SEU BALAIO
          </h2>
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span key="count" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={spring}>
                <Badge variant="blood">{totalItems}</Badge>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <CloseButton onClick={close} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {items.length === 0 ? (
          <EmptyState onBrowse={close} />
        ) : (
          <ul className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={spring}
            className="border-t border-line bg-asphalt-800 px-5 py-5 pb-safe"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted">Total do kit</span>
              <motion.span key={subtotal} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl tracking-wider text-blood">
                {formatCurrency(subtotal)}
              </motion.span>
            </div>
            <p className="mb-5 text-xs text-subtle">
              Frete grátis · PIX com {Math.round(site.pixDiscount * 100)}% de desconto no checkout.
            </p>
            <div className="flex flex-col gap-2">
              <Button size="lg" fullWidth onClick={goCheckout} rightIcon={<ArrowRight className="h-5 w-5" />}>
                Finalizar compra
              </Button>
              <ButtonLink variant="whatsapp" size="md" fullWidth href={whatsappLink(whatsappMessage())} leftIcon={<MessageCircle className="h-5 w-5" />}>
                Pedir pelo WhatsApp
              </ButtonLink>
              <button
                type="button"
                onClick={clear}
                className="mt-1 inline-flex items-center justify-center gap-1.5 self-center text-xs text-subtle transition-colors hover:text-blood-300"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden /> Esvaziar balaio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sheet>
  );
}

function EmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
      <div className="relative">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-line bg-asphalt-800">
          <ShoppingBag className="h-9 w-9 text-foreground/60" aria-hidden />
        </div>
      </div>
      <div>
        <p className="font-display text-2xl tracking-widest text-foreground">BALAIO VAZIO</p>
        <p className="mt-1 text-sm text-muted">Seu balaio tá vazio, parceiro. Bora escolher uma lupa?</p>
      </div>
      <ButtonLink href="/#catalogo" variant="outline" onClick={onBrowse}>
        Ver catálogo
      </ButtonLink>
    </motion.div>
  );
}
