"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { spring } from "@/lib/motion";
import { useActiveSection, useScrolled } from "@/hooks";
import { useCart } from "@/context/CartContext";
import { catalogStore, useCatalogStore } from "@/store/catalog-store";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { Logo } from "@/components/ui/logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

const SECTION_IDS = site.nav.map((n) => n.section);

export function Header() {
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-header border-b transition-[background-color,border-color,box-shadow] duration-400 ease-out-expo",
          scrolled
            ? "border-line bg-asphalt-900/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
            : "border-transparent bg-asphalt-900",
        )}
      >
        <Container className="flex items-center justify-between gap-4">
          <div className={cn("flex items-center py-2 transition-all duration-400 ease-out-expo", scrolled ? "h-16" : "h-[var(--header-height)] md:h-24")}>
            <Logo priority className="h-full" />
          </div>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const isActive = isHome && active === item.section;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 font-display text-xl tracking-widest transition-colors duration-200",
                    isActive ? "text-foreground" : "text-foreground/65 hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={spring}
                      className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-blood"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <SearchControl />
            <CartButton />
            <IconButton label="Abrir menu" className="lg:hidden" onClick={() => setMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </IconButton>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={isHome ? active : null} />
    </>
  );
}

/** Busca inline: expande um campo ao lado do ícone e filtra o catálogo em tempo real. */
function SearchControl() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const query = useCatalogStore((s) => s.query);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const goToCatalog = useCallback(() => {
    if (pathname !== "/") router.push("/#catalogo");
    else document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname, router]);

  const close = () => {
    setOpen(false);
    catalogStore.set({ query: "" });
  };

  return (
    <div className="hidden items-center md:flex">
      <AnimatePresence initial={false}>
        {open && (
          <motion.form
            key="search"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mr-1 overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              goToCatalog();
            }}
          >
            <div className="relative">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  const next = e.target.value;
                  catalogStore.set({ query: next });
                  // Ao começar a digitar, leva o usuário até o catálogo filtrado.
                  if (!query && next) goToCatalog();
                }}
                onKeyDown={(e) => e.key === "Escape" && close()}
                placeholder="Buscar lupa…"
                aria-label="Buscar no catálogo"
                className="h-10 w-full rounded-full border border-line-strong bg-asphalt-800 pl-4 pr-9 text-sm text-foreground placeholder:text-subtle focus:border-blood focus:outline-none"
              />
              <button type="button" onClick={close} aria-label="Fechar busca" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-subtle hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      {!open && (
        <IconButton label="Buscar" onClick={() => setOpen(true)}>
          <Search className="h-5 w-5" />
        </IconButton>
      )}
    </div>
  );
}

function CartButton() {
  const { totalItems, open } = useCart();
  return (
    <IconButton label={`Abrir balaio, ${totalItems} ${totalItems === 1 ? "item" : "itens"}`} onClick={open} className="relative">
      <motion.span key={totalItems} initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={spring} className="flex">
        <ShoppingBag className="h-6 w-6" />
      </motion.span>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={spring}
            className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blood px-1 font-mono text-[10px] font-bold text-white"
          >
            <motion.span key={totalItems} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.18 }}>
              {totalItems > 99 ? "99+" : totalItems}
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
