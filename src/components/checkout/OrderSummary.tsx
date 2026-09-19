"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ShieldCheck } from "lucide-react";
import type { CartItem } from "@/types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { ProductImage } from "@/components/catalog/ProductImage";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discountRate: number;
}

export function OrderSummary({ items, subtotal, discountRate }: OrderSummaryProps) {
  const [openMobile, setOpenMobile] = useState(false);
  const discount = subtotal * discountRate;
  const total = subtotal - discount;
  const count = items.reduce((a, i) => a + i.quantity, 0);

  return (
    <aside className="surface overflow-hidden lg:sticky lg:top-28">
      <button
        type="button"
        onClick={() => setOpenMobile((o) => !o)}
        aria-expanded={openMobile}
        className="flex w-full items-center justify-between p-5 text-left lg:pointer-events-none"
      >
        <span className="font-display text-2xl tracking-widest text-foreground">
          Resumo <span className="text-subtle">({count})</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wider text-blood lg:hidden">{formatCurrency(total)}</span>
          <ChevronDown className={cn("h-5 w-5 text-subtle transition-transform duration-300 lg:hidden", openMobile && "rotate-180")} aria-hidden />
        </span>
      </button>

      <div className={cn("lg:block", openMobile ? "block" : "hidden")}>
        <ul className="flex flex-col gap-3 border-t border-line px-5 py-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <div className="relative h-full w-full overflow-hidden rounded bg-asphalt-700">
                  <ProductImage src={item.imageUrl} alt={item.name} sizes="56px" compact />
                </div>
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-asphalt-800 bg-blood px-1 font-mono text-[10px] font-bold leading-none text-white"
                  aria-label={`Quantidade: ${item.quantity}`}
                >
                  {item.quantity}
                </span>
              </div>
              <span className="min-w-0 flex-1 truncate text-sm text-foreground/90" title={item.name}>
                {item.name}
              </span>
              <span className="text-sm tabular-nums text-foreground/80">{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <dl className="flex flex-col gap-2 border-t border-line px-5 py-4 text-sm">
          <Row label="Subtotal" value={formatCurrency(subtotal)} />
          <Row label="Frete" value="Grátis" valueClass="font-bold text-whatsapp" />
          <AnimatePresence initial={false}>
            {discountRate > 0 && (
              <motion.div key="discount" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <Row label={`Desconto PIX (${Math.round(discountRate * 100)}%)`} value={`- ${formatCurrency(discount)}`} valueClass="text-blood" labelClass="text-blood" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-2 flex items-center justify-between border-t border-line pt-4">
            <dt className="font-display text-xl tracking-widest text-foreground">Total</dt>
            <dd>
              <motion.span key={total} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl tracking-wider text-blood">
                {formatCurrency(total)}
              </motion.span>
            </dd>
          </div>
        </dl>

        <p className="flex items-center gap-2 border-t border-line bg-asphalt-900 px-5 py-3 text-[11px] text-subtle">
          <ShieldCheck className="h-4 w-4 text-whatsapp" aria-hidden /> Compra 100% protegida
        </p>
      </div>
    </aside>
  );
}

function Row({ label, value, valueClass, labelClass }: { label: string; value: string; valueClass?: string; labelClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={cn("text-muted", labelClass)}>{label}</dt>
      <dd className={cn("tabular-nums", valueClass)}>{value}</dd>
    </div>
  );
}
