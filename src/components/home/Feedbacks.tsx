"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Feedback } from "@/types";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";
import { feedbacks } from "@/data/feedbacks";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconButton } from "@/components/ui/icon-button";
import { Reveal } from "@/components/ui/reveal";

const AUTOPLAY_MS = 4500;

export function Feedbacks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = feedbacks.length;

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    const child = track?.children[i] as HTMLElement | undefined;
    if (!track || !child) return;
    track.scrollTo({ left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2, behavior: "smooth" });
  }, []);

  // Descobre qual card está mais próximo do centro após o scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((el, i) => {
          const node = el as HTMLElement;
          const dist = Math.abs(node.offsetLeft + node.clientWidth / 2 - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => scrollTo((index + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, paused, reduce, count, scrollTo]);

  return (
    <section className="relative border-t border-line bg-asphalt-950 py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Quem usa, aprova" title="Feedback dos visionários" className="mb-12" />

        <Reveal
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[calc(50vw-9rem)] py-6 sm:px-[calc(50%-9rem)]"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
          >
            {feedbacks.map((fb, i) => (
              <FeedbackCard key={fb.id} feedback={fb} active={i === index} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-asphalt-950 to-transparent md:block" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-asphalt-950 to-transparent md:block" aria-hidden />

          <div className="mt-4 flex items-center justify-center gap-6">
            <IconButton label="Depoimento anterior" variant="surface" onClick={() => scrollTo((index - 1 + count) % count)}>
              <ChevronLeft className="h-5 w-5" />
            </IconButton>
            <div className="flex items-center gap-2" role="tablist" aria-label="Escolher depoimento">
              {feedbacks.map((fb, i) => (
                <button
                  key={fb.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Depoimento ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={cn("h-1.5 rounded-full transition-all duration-400 ease-out-expo", i === index ? "w-8 bg-blood" : "w-1.5 bg-white/25 hover:bg-white/50")}
                />
              ))}
            </div>
            <IconButton label="Próximo depoimento" variant="surface" onClick={() => scrollTo((index + 1) % count)}>
              <ChevronRight className="h-5 w-5" />
            </IconButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function FeedbackCard({ feedback, active }: { feedback: Feedback; active: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = feedback.imageSrc && !imgFailed;

  return (
    <article
      className={cn(
        "relative flex w-72 shrink-0 snap-center flex-col transition-all duration-600 ease-out-expo",
        active ? "scale-100 opacity-100" : "scale-[0.94] opacity-60",
      )}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-xl border border-b-0 border-line bg-asphalt-700">
        {showImage ? (
          <Image src={feedback.imageSrc!} alt="" fill sizes="288px" className="object-cover" onError={() => setImgFailed(true)} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-asphalt-600 to-asphalt-800">
            <Quote className="absolute -right-3 -top-3 h-24 w-24 text-white/[0.04]" aria-hidden />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-asphalt-900 font-display text-2xl tracking-widest text-foreground">
              {initials(feedback.author)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
      </div>

      <div className="relative -mt-1 rounded-b-xl border border-t-0 border-line bg-asphalt-800 p-5">
        <div className="mb-2 flex gap-0.5" aria-label="5 de 5 estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
          ))}
        </div>
        <p className="text-sm font-bold uppercase leading-snug text-foreground">“{feedback.quote}”</p>
        <p className="mt-3 text-[11px] uppercase tracking-wider text-muted">
          {feedback.author} <span className="text-subtle">· {feedback.location}</span>
        </p>
      </div>
    </article>
  );
}
