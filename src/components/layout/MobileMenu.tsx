"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, whatsappLink } from "@/lib/site";
import { ease } from "@/lib/motion";
import { catalogStore, useCatalogStore } from "@/store/catalog-store";
import { Sheet, CloseButton } from "@/components/ui/dialog";
import { ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/layout/SocialLinks";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: string | null;
}

const list = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: ease.out } },
};

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const query = useCatalogStore((s) => s.query);
  const router = useRouter();
  const pathname = usePathname();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    if (pathname !== "/") router.push("/#catalogo");
    else document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sheet open={open} onClose={onClose} labelledBy="mobile-menu-title" className="max-w-full sm:max-w-sm">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span id="mobile-menu-title" className="font-display text-2xl tracking-widest text-foreground">
          MENU
        </span>
        <CloseButton onClick={onClose} />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
        <form onSubmit={submitSearch} className="relative mb-8">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
          <input
            value={query}
            onChange={(e) => catalogStore.set({ query: e.target.value })}
            placeholder="Buscar lupa…"
            aria-label="Buscar no catálogo"
            className="h-12 w-full rounded border border-line-strong bg-asphalt-800 pl-11 pr-4 text-base text-foreground placeholder:text-subtle focus:border-blood focus:outline-none"
          />
        </form>

        <motion.nav aria-label="Menu" variants={list} initial="hidden" animate="visible" className="flex flex-col">
          {site.nav.map((n) => {
            const isActive = active === n.section;
            return (
              <motion.div key={n.href} variants={item}>
                <Link
                  href={n.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between border-b border-line py-4 font-display text-3xl tracking-widest transition-colors",
                    isActive ? "text-blood" : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {n.label}
                  <ArrowRight className="h-5 w-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5, ease: ease.out }} className="mt-auto flex flex-col gap-6 pt-10">
          <ButtonLink variant="whatsapp" size="lg" fullWidth href={whatsappLink("Salve! Quero saber mais sobre as lupas da Visão de Rua.")}>
            Chamar no WhatsApp
          </ButtonLink>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-subtle">Siga o movimento</span>
            <SocialLinks size="sm" />
          </div>
        </motion.div>
      </div>
    </Sheet>
  );
}
