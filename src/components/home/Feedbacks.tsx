"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Feedback } from "@/types";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";
import { feedbacks } from "@/data/feedbacks";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";

export function Feedbacks() {

  return (
    <section className="relative border-t border-line bg-asphalt-950 py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Quem usa, aprova" title="Feedback dos visionários" className="mb-12" />

        <Reveal className="relative">
          <Marquee duration={60} pauseOnHover className="py-6">
            <div className="flex gap-5 pr-5">
              {feedbacks.map((fb) => (
                <FeedbackCard key={fb.id} feedback={fb} active={true} />
              ))}
            </div>
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-asphalt-950 to-transparent md:block" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-asphalt-950 to-transparent md:block" aria-hidden />
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
