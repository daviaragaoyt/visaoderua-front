"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import type { Product, ProductLine } from "@/types";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { PRODUCT_LINES } from "@/lib/products";
import { catalogStore, useCatalogStore } from "@/store/catalog-store";

export function CatalogFilters({ products }: { products: Product[] }) {
  const line = useCatalogStore((s) => s.line);
  const query = useCatalogStore((s) => s.query);

  const counts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.line] = (acc[p.line] ?? 0) + 1;
    return acc;
  }, {});

  const chips: { key: ProductLine | "all"; label: string; count: number }[] = [
    { key: "all", label: "Todas", count: products.length },
    ...PRODUCT_LINES.filter((l) => counts[l.key]).map((l) => ({ key: l.key, label: l.short, count: counts[l.key] })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Filtrar por linha" className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((chip) => {
          const active = line === chip.key;
          return (
            <button
              key={chip.key}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => catalogStore.set({ line: chip.key })}
              className={cn(
                "relative flex shrink-0 items-center rounded-full border px-5 py-2 font-display text-lg tracking-widest transition-colors duration-200",
                active ? "border-blood text-white" : "border-line text-foreground/60 hover:border-line-strong hover:text-foreground",
              )}
            >
              {active && <motion.span layoutId="catalog-chip" transition={spring} className="absolute inset-0 rounded-full bg-blood" aria-hidden />}
              <span className="relative">{chip.label}</span>
            </button>
          );
        })}
      </div>

      {query && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted">
          <Search className="h-4 w-4" aria-hidden />
          Buscando por <strong className="text-foreground">“{query}”</strong>
          <button
            type="button"
            onClick={() => catalogStore.set({ query: "" })}
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-xs transition-colors hover:border-blood hover:text-foreground"
          >
            <X className="h-3 w-3" aria-hidden /> limpar
          </button>
        </motion.div>
      )}
    </div>
  );
}
