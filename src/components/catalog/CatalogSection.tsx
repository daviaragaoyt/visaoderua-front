"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, SearchX, WifiOff } from "lucide-react";
import type { Product } from "@/types";
import { fetchProducts } from "@/lib/api";
import { filterProducts, groupByLine } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/providers/ToastProvider";
import { catalogStore, useCatalogStore } from "@/store/catalog-store";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductGridSkeleton } from "@/components/catalog/ProductGridSkeleton";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { ProductModal } from "@/components/catalog/ProductModal";

type Status = "loading" | "error" | "success";

export function CatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [selected, setSelected] = useState<Product | null>(null);
  const [attempt, setAttempt] = useState(0);
  const { addItem, open: openCart } = useCart();
  const { toast } = useToast();
  const query = useCatalogStore((s) => s.query);
  const line = useCatalogStore((s) => s.line);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchProducts(controller.signal)
      .then((list) => {
        setProducts(list);
        setStatus("success");
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("[catalog]", error);
        setStatus("error");
      });
    return () => controller.abort();
  }, [attempt]);

  const handleAdd = useCallback(
    (product: Product) => {
      addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
    },
    [addItem],
  );

  const handleAddFromModal = useCallback(
    (product: Product, quantity: number) => {
      addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl }, { quantity, open: false });
      setSelected(null);
      toast({
        variant: "success",
        title: "Botou no balaio!",
        description: `${quantity}x ${product.name}`,
        action: { label: "Ver balaio", onClick: openCart },
      });
    },
    [addItem, toast, openCart],
  );

  const filtered = useMemo(() => filterProducts(products, query, line), [products, query, line]);
  const grouped = useMemo(() => (line === "all" && !query ? groupByLine(filtered) : null), [filtered, line, query]);

  return (
    <section id="catalogo" className="relative scroll-mt-24 border-t border-line bg-asphalt-950 py-20 md:py-28">
      <Container className="relative">
        <SectionHeading
          eyebrow="O arsenal"
          title="Catálogo completo"
          description="Lupas originais, escolhidas a dedo. Pronta entrega em Brasília e envio para todo o Brasil."
          className="mb-12"
        />

        {status === "loading" && <ProductGridSkeleton />}

        {status === "error" && (
          <ErrorState onRetry={() => setAttempt((a) => a + 1)} />
        )}

        {status === "success" && products.length === 0 && (
          <EmptyState title="Nenhuma lupa no momento" description="O arsenal está sendo reabastecido. Chama no WhatsApp pra saber dos próximos drops." />
        )}

        {status === "success" && products.length > 0 && (
          <div className="flex flex-col gap-10">
            <Reveal delay={0.1}>
              <CatalogFilters products={products} />
            </Reveal>

            {filtered.length === 0 ? (
              <EmptyState
                title="Nada encontrado"
                description={`Nenhuma lupa bate com “${query}”. Tenta outro nome ou limpa os filtros.`}
                action={
                  <Button variant="outline" onClick={() => catalogStore.reset()}>
                    Limpar filtros
                  </Button>
                }
              />
            ) : grouped ? (
              grouped.map((group, gi) => (
                <div key={group.key} className="flex flex-col gap-6">
                  <Reveal delay={0.05 * gi} className="flex items-center gap-4">
                    <h3 className="border-l-4 border-blood pl-4 font-display text-3xl tracking-widest text-foreground/90">
                      {group.label}
                    </h3>
                    <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" aria-hidden />
                    <span className="font-mono text-xs text-subtle">{group.products.length}</span>
                  </Reveal>
                  <ProductGrid products={group.products} onOpen={setSelected} onAdd={handleAdd} />
                </div>
              ))
            ) : (
              <ProductGrid products={filtered} onOpen={setSelected} onAdd={handleAdd} />
            )}
          </div>
        )}
      </Container>

      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={handleAddFromModal} />
    </section>
  );
}

function ProductGrid({ products, onOpen, onAdd }: { products: Product[]; onOpen: (p: Product) => void; onAdd: (p: Product) => void }) {
  return (
    <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} onAdd={onAdd} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line-strong px-6 py-16 text-center">
      <SearchX className="h-10 w-10 text-foreground/30" aria-hidden />
      <p className="font-display text-3xl tracking-widest text-foreground">{title}</p>
      <p className="max-w-md text-sm text-muted">{description}</p>
      {action ?? (
        <ButtonLink variant="whatsapp" href={whatsappLink("Salve! Quando chegam as próximas lupas?")}>
          Chamar no WhatsApp
        </ButtonLink>
      )}
    </motion.div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 rounded-lg border border-blood/30 bg-blood/5 px-6 py-16 text-center">
      <WifiOff className="h-10 w-10 text-blood-300" aria-hidden />
      <p className="font-display text-3xl tracking-widest text-foreground">Não deu pra carregar o arsenal</p>
      <p className="max-w-md text-sm text-muted">Falha ao buscar o catálogo. Verifique sua conexão e tente de novo.</p>
      <Button variant="outline" onClick={onRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>
        Tentar novamente
      </Button>
    </motion.div>
  );
}
