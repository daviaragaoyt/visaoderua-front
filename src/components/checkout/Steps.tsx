"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { STEPS, type CheckoutStep } from "@/components/checkout/types";

export function Steps({ current }: { current: CheckoutStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  const progress = currentIndex / (STEPS.length - 1);

  return (
    <ol className="relative flex items-center justify-between" aria-label="Etapas do checkout">
      <div className="absolute left-4 right-4 top-4 h-px bg-line-strong" aria-hidden />
      <motion.div
        className="absolute left-4 top-4 h-px bg-blood"
        style={{ right: "1rem", transformOrigin: "left" }}
        initial={false}
        animate={{ scaleX: progress }}
        transition={spring}
        aria-hidden
      />
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step.key} className="relative flex flex-col items-center gap-2" aria-current={active ? "step" : undefined}>
            <motion.span
              initial={false}
              animate={{ scale: active ? 1.1 : 1 }}
              transition={spring}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs font-bold transition-colors duration-300",
                done && "border-blood bg-blood text-white",
                active && "border-blood bg-asphalt-900 text-blood",
                !done && !active && "border-line-strong bg-asphalt-900 text-subtle",
              )}
            >
              {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
            </motion.span>
            <span className={cn("text-[10px] font-bold uppercase tracking-widest sm:text-xs", active ? "text-foreground" : "text-subtle")}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
