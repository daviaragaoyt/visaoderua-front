"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({ value, onIncrement, onDecrement, min = 1, max = 99, size = "sm", className }: QuantityStepperProps) {
  const btn = cn(
    "flex items-center justify-center text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:bg-white/10",
    size === "sm" ? "h-8 w-8" : "h-10 w-10",
  );
  return (
    <div className={cn("inline-flex items-center overflow-hidden rounded border border-line-strong bg-asphalt-900", className)} role="group" aria-label="Quantidade">
      <button type="button" className={btn} onClick={onDecrement} disabled={value <= min} aria-label="Diminuir quantidade">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className={cn("relative flex items-center justify-center overflow-hidden font-mono text-sm tabular-nums", size === "sm" ? "h-8 w-9" : "h-10 w-11")}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.16 }}
            aria-live="polite"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button type="button" className={btn} onClick={onIncrement} disabled={value >= max} aria-label="Aumentar quantidade">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
