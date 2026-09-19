import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "blood" | "outline" | "neutral" | "success" | "gold" | "glass";

const variants: Record<Variant, string> = {
  blood: "bg-blood text-white",
  outline: "border border-blood/60 text-blood-300",
  neutral: "border border-line bg-asphalt-700 text-foreground/80",
  success: "border border-whatsapp/40 bg-whatsapp/10 text-whatsapp",
  gold: "border border-gold/40 bg-gold/10 text-gold",
  glass: "border border-white/10 bg-white/5 text-foreground/80 backdrop-blur-sm",
};

export function Badge({ variant = "neutral", className, ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.18em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
