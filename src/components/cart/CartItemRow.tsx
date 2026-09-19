"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { CartItem } from "@/types";
import { formatCurrency } from "@/lib/format";
import { spring } from "@/lib/motion";
import { useCart } from "@/context/CartContext";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ProductImage } from "@/components/catalog/ProductImage";

export function CartItemRow({ item }: { item: CartItem }) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 32, height: 0, marginBottom: 0, transition: { duration: 0.22 } }}
      transition={spring}
      className="group relative flex gap-4 rounded-lg border border-line bg-asphalt-800 p-3"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-asphalt-700">
        <ProductImage src={item.imageUrl} alt={item.name} sizes="80px" compact />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate pr-6 font-display text-xl tracking-wider text-foreground" title={item.name}>
          {item.name}
        </h3>
        <p className="text-xs text-muted">{formatCurrency(item.price)} cada</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantityStepper value={item.quantity} onIncrement={() => increment(item.id)} onDecrement={() => decrement(item.id)} />
          <span className="font-display text-xl tracking-wider text-blood">{formatCurrency(item.price * item.quantity)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        aria-label={`Remover ${item.name}`}
        className="absolute right-2 top-2 rounded-full p-1 text-subtle transition-colors hover:bg-blood/10 hover:text-blood"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.li>
  );
}
