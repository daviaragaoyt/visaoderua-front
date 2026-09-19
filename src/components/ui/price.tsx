import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";

interface PriceProps {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
}

const sizes = { sm: "text-base", md: "text-xl", lg: "text-3xl", xl: "text-4xl md:text-5xl" };

/** Preço em Bebas, no vermelho da marca. */
export function Price({ value, className, size = "md", glow }: PriceProps) {
  return (
    <span className={cn("font-display tabular-nums tracking-wider text-blood", sizes[size], glow && "", className)}>
      {formatCurrency(value)}
    </span>
  );
}
