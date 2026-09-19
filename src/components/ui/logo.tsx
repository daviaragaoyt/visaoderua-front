"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

interface LogoProps {
  className?: string;
  priority?: boolean;
  compact?: boolean;
}

/** Logo da marca com fallback tipográfico caso a imagem não carregue. */
export function Logo({ className, priority, compact }: LogoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Link href="/#top" aria-label={`${site.name} — início`} className={cn("group/logo relative flex items-center", className)}>
      {!failed ? (
        <Image
          src="/images/logo-main.png"
          alt={site.name}
          width={1280}
          height={853}
          priority={priority}
          sizes="(max-width: 768px) 200px, 280px"
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-auto object-contain object-left transition-transform duration-400 ease-out-expo group-hover/logo:scale-[1.03]",
          )}
        />
      ) : (
        <span className="flex items-baseline gap-2 font-display text-3xl tracking-widest text-foreground">
          VISÃO DE{""}
          <span className={cn("italic text-blood", compact && "text-2xl")}>RUA</span>
        </span>
      )}
    </Link>
  );
}
