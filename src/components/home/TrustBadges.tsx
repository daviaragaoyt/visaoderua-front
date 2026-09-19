"use client";

import { motion } from "framer-motion";
import { Gem, RefreshCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import { ease } from "@/lib/motion";
import { Container } from "@/components/ui/container";

const badges: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ShieldCheck, title: "Compra segura", desc: "100% protegida" },
  { icon: Truck, title: "Entrega expressa", desc: `No DF em até ${site.deliveryDaysDF} dias` },
  { icon: Gem, title: "Qualidade premium", desc: "Materiais de 1ª linha" },
  { icon: RefreshCcw, title: "Garantia", desc: "Troca facilitada" },
];

const list = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};

export function TrustBadges() {
  return (
    <section className="relative z-10 border-y border-line bg-asphalt-800 py-8 shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.9)]">
      <Container>
        <motion.ul variants={list} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map(({ icon: Icon, title, desc }) => (
            <motion.li
              key={title}
              variants={card}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-4 rounded-lg border border-line bg-asphalt-700 px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-white/15"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-asphalt-800 text-foreground/80 transition-all duration-300 group-hover:border-blood/60 group-hover:text-blood">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-widest text-foreground">{title}</span>
                <span className="text-xs uppercase tracking-wider text-muted">{desc}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
