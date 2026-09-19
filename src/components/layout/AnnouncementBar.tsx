import { site } from "@/lib/site";

/** Faixa vermelha no topo com o aviso de envio. */
export function AnnouncementBar() {
  const [first, second] = site.announcements;
  return (
    <div className="relative z-header flex h-[var(--announcement-height)] items-center justify-center bg-blood-600 px-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
      <p className="truncate">
        {first}
        <span className="hidden md:inline"> · {second}</span>
      </p>
    </div>
  );
}
