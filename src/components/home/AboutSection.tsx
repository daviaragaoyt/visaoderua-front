"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HoloCard } from "@/components/ui/holo-card";

export function AboutSection() {
  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-hidden border-t border-line bg-asphalt-900 py-24 md:py-32">

      <Container className="relative grid grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-24">
        <div className="flex flex-col">
          <Reveal className="mb-6 flex items-center gap-4">
            <span className="h-1 w-12 bg-blood" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-widest2 text-blood">A essência</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-display-md uppercase text-foreground sm:text-display-lg xl:text-display-xl">
              Não vendemos óculos.
              <br />
              <span className="text-foreground/40">Vendemos cultura.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/70">
              A <strong className="text-foreground">Visão de Rua</strong> nasceu no asfalto. Nosso estilo é forjado na correria do dia a dia, na estética
              Mandrake e na cultura urbana de quem não tem medo de ser autêntico.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70">
              Cada lupa que você encontra aqui é escolhida a dedo para garantir o kit mais brabo do rolê, com qualidade absurda e presença inconfundível. A
              rua inspira. Você usa.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <ButtonLink href="https://www.instagram.com/visaoderua061/" target="_blank" variant="outline" size="lg" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
              Conheça o movimento
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.15}>
          <TiltCard />
        </Reveal>
      </Container>
    </section>
  );
}

/** Card com a lupa da marca que inclina e brilha igual carta Pokémon. */
function TiltCard() {
  return (
    <HoloCard
      className="w-full max-w-sm mx-auto"
      behindGlowEnabled
      behindGlowColor="rgba(255, 0, 0, 0.4)"
      iconUrl="/images/logo-main.png"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-900/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="relative w-full max-w-xs">
          <Image src="/images/logo-main.png" alt="Logo Visão de Rua" width={1280} height={853} sizes="(max-width: 768px) 80vw, 400px" className="h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 pointer-events-none">
        <span className="font-display text-5xl leading-none text-white/10">VDR</span>
        <span className="text-[10px] font-bold uppercase tracking-widest2 text-foreground/40">Est. Brasília · DF</span>
      </div>
    </HoloCard>
  );
}
