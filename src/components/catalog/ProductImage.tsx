"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "https://images.unsplash.com/photo-1653038282660-266890e79e59?auto=format&fit=crop&w=900&q=80";
const LAST_RESORT = "/images/products/placeholder.svg";

interface ProductImageProps {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  compact?: boolean;
}

/** Imagem de produto. Sem foto (ou com erro), cai numa foto genérica e, por último, na ilustração local. */
export function ProductImage({ src, alt, sizes, priority, className, compact }: ProductImageProps) {
  // 0 = foto do produto, 1 = foto genérica, 2 = ilustração local (offline)
  const [level, setLevel] = useState(src ? 0 : 1);
  const isFallback = level > 0;
  const resolved = level === 0 && src ? src : level === 1 ? PLACEHOLDER : LAST_RESORT;

  return (
    <>
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setLevel((l) => Math.min(l + 1, 2))}
        className={cn(level === 2 ? "object-contain opacity-80" : "object-cover", className)}
      />
      {isFallback && !compact && (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest text-foreground/35">
          Foto em breve
        </span>
      )}
    </>
  );
}
