"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { isValidEmail } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/layout/SocialLinks";

const columns = [
  {
    title: "Links úteis",
    links: [
      { label: "Catálogo completo", href: "/#catalogo" },
      { label: "Sobre a Visão de Rua", href: "/#sobre" },
      { label: "Rastrear meu pedido", href: whatsappLink("Salve! Quero rastrear meu pedido.") },
      { label: "Dúvidas frequentes", href: whatsappLink("Salve! Tenho uma dúvida sobre as lupas.") },
    ],
  },
  {
    title: "Políticas",
    links: [
      { label: "Trocas e devoluções", href: "#" },
      { label: "Termos de serviço", href: "#" },
      { label: "Política de privacidade", href: "#" },
      { label: "Garantia de produtos", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contato" className="relative border-t border-line bg-asphalt-950 pt-16 pb-8">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.3fr] lg:gap-10">
          <Reveal className="flex flex-col">
            <span className="font-display text-4xl tracking-widest text-foreground">
              VISÃO DE <span className="italic text-blood">RUA</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              O autêntico estilo Mandrake. Trazendo a cultura e a essência do asfalto direto para o seu visual. A rua inspira.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-whatsapp"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp" aria-hidden />
              {site.whatsapp.display}
            </a>
            <SocialLinks className="mt-6" />
          </Reveal>

          {columns.map((col, i) => (
            <Reveal key={col.title} delay={0.1 * (i + 1)}>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest2 text-foreground">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={0.3} className="sm:col-span-2 lg:col-span-1">
            <Newsletter />
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 md:flex-row">
          <div className="flex items-center gap-4 text-foreground/70">
            <span className="font-display text-2xl tracking-widest">PIX</span>
            <span className="h-6 w-px bg-line-strong" aria-hidden />
            <ul className="flex gap-2" aria-label="Bandeiras aceitas">
              {["VISA", "MASTER", "ELO"].map((b) => (
                <li key={b} className="flex h-6 w-10 items-center justify-center rounded-xs border border-line bg-white/5 text-[9px] font-bold tracking-wider">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-[11px] uppercase tracking-wider text-subtle md:text-right">
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
            <span className="block text-foreground/20 md:ml-2 md:inline">CNPJ {site.cnpj}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground";
  const bar = <span className="h-px w-0 bg-blood transition-all duration-300 ease-out-expo group-hover:w-4" aria-hidden />;
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {bar}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {bar}
      {children}
    </Link>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    // TODO: integrar com o backend/newsletter quando existir endpoint.
    setStatus("done");
  };

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest2 text-foreground">Seja um visionário</h3>
      <p className="mb-4 text-sm text-muted">Entre na lista VIP e receba os drops e descontos antes de todo mundo.</p>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded border border-whatsapp/30 bg-whatsapp/10 px-4 py-3 text-sm text-whatsapp"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden /> Inscrição confirmada. Bem-vindo à Visão de Rua!
          </motion.p>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -8 }} onSubmit={submit} className="flex flex-col gap-2" noValidate>
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Seu melhor e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Seu melhor e-mail"
                aria-invalid={status === "error" || undefined}
                className={`h-12 w-full rounded border bg-asphalt-800 px-4 text-sm text-foreground placeholder:text-subtle focus:outline-none ${
                  status === "error" ? "border-blood" : "border-line-strong focus:border-blood"
                }`}
              />
              {status === "error" && <p className="mt-1 text-xs text-blood-300">Informe um e-mail válido.</p>}
            </div>
            <Button type="submit" size="md" fullWidth>
              Inscrever
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
