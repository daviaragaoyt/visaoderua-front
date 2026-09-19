import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Segundos para uma volta completa. */
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
  fade?: boolean;
}

/** Faixa contínua (CSS puro). O conteúdo é duplicado para o loop ser perfeito. */
export function Marquee({ children, duration = 40, className, pauseOnHover = true, fade = true }: MarqueeProps) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", fade && "mask-fade-x", className)}>
      <div
        className={cn("flex w-max shrink-0 animate-marquee items-center", pauseOnHover && "group-hover/marquee:[animation-play-state:paused]")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
