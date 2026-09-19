"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { ease } from "@/lib/motion";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
};

const highlights = ["Pronta entrega no DF", "Envio para todo o Brasil", `PIX com ${Math.round(site.pixDiscount * 100)}% de desconto`];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden bg-asphalt-950 py-16 md:py-24">
      {/* Fundo: a rua, com parallax discreto */}
      <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-0 -z-20" aria-hidden>
        <Image src="/images/bg-street.png" alt="" fill priority sizes="100vw" className="scale-105 object-cover object-center opacity-50" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-asphalt-950/90 via-asphalt-950/50 to-asphalt-950" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-asphalt-950/70 via-transparent to-asphalt-950/70" aria-hidden />

      <Container>
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span variants={item} className="inline-flex items-center gap-3 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/60 sm:tracking-widest2">
            <span className="h-px w-6 bg-blood" aria-hidden />
            Lupas exclusivas · {site.city} {site.state}
            <span className="h-px w-6 bg-blood" aria-hidden />
          </motion.span>

          <motion.div variants={item} className="relative mt-6 w-full max-w-[640px]">
            <div className="relative aspect-[1.7/1] w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.7)]">
              <Image src="/images/logo-slogan.png" alt={site.slogan} fill priority sizes="(max-width: 768px) 100vw, 640px" className="object-cover object-[center_42%]" />
            </div>
          </motion.div>

          <motion.h1 variants={item} className="mt-4 font-display text-display-md uppercase text-foreground md:text-display-lg">
            Lupas exclusivas pra quem tem <span className="text-blood">visão</span>.
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Juliet, Romeo, Monster Dog e outros modelos originais, escolhidos a dedo. Pronta entrega no DF e envio para todo o Brasil.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/#catalogo" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Ver catálogo
            </ButtonLink>
            <ButtonLink href={whatsappLink("Salve! Quero saber mais sobre as lupas da Visão de Rua.")} variant="secondary" size="lg" className="w-full sm:w-auto" leftIcon={<MessageCircle className="h-5 w-5" />}>
              Falar no WhatsApp
            </ButtonLink>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-medium uppercase tracking-widest text-foreground/50">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-blood" aria-hidden />
                {h}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>

      <div className="absolute bottom-0 left-1/2 h-px w-full max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
    </section>
  );
}
