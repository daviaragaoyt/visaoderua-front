import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  glow?: boolean;
}

/** Cabeçalho padrão de seção: eyebrow com barra vermelha + título Bebas + descrição. */
export function SectionHeading({ eyebrow, title, description, align = "center", className, glow = true }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={cn("flex flex-col gap-4", centered ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest2 text-blood">
          <span className="h-px w-8 bg-blood" aria-hidden />
          {eyebrow}
          {centered && <span className="h-px w-8 bg-blood" aria-hidden />}
        </span>
      )}
      <h2 className={cn("font-display text-display-md uppercase text-foreground md:text-display-lg", glow && "")}>
        {title}
      </h2>
      {description && <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  );
}
