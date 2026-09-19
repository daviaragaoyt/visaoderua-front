import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";

const items = [
  { text: "Exclusivo", highlight: `${site.city} · ${site.state}` },
  { text: "Entrega em até", highlight: `${site.deliveryDaysDF} dias` },
  { text: "Envio para", highlight: "todo o Brasil" },
];

/** Faixa informativa abaixo do header com os diferenciais da loja. */
export function Ticker() {
  return (
    <div className="border-b border-line bg-asphalt-800">
      <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 py-2.5">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
            {i > 0 && <span className="mr-6 hidden h-3 w-px bg-line-strong sm:block" aria-hidden />}
            {item.text} <span className="text-blood">{item.highlight}</span>
          </span>
        ))}
      </Container>
    </div>
  );
}
