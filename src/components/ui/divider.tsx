import { cn } from "@/lib/utils";

/** Linha divisória com degradê, opcionalmente em vermelho neon. */
export function Divider({ className, blood }: { className?: string; blood?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent to-transparent",
        blood ? "via-blood/60" : "via-white/15",
        className,
      )}
    />
  );
}
