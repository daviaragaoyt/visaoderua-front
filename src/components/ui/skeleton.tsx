import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Placeholder com brilho varrendo, no tom do asfalto. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded bg-asphalt-600/60", className)}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
