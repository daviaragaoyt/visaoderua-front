"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** true após a primeira renderização no cliente (evita mismatch de hidratação). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** true quando a página rolou além de `threshold` px. */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Trava o scroll do documento enquanto `locked` for true (modais, sheets, menus). */
export function useLockBodyScroll(locked: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (!locked) return;
    const { documentElement: html, body } = document;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prevPadding = body.style.paddingRight;
    html.classList.add("scroll-locked");
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      html.classList.remove("scroll-locked");
      body.style.paddingRight = prevPadding;
    };
  }, [locked]);
}

/** Executa `handler` quando a tecla `key` é pressionada. */
export function useKeyDown(key: string, handler: (e: KeyboardEvent) => void, enabled = true) {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === key) ref.current(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, enabled]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Mantém o foco dentro do container e devolve ao elemento anterior ao fechar. */
export function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const previous = document.activeElement as HTMLElement | null;

    const focusables = () => Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusables()[0];
    (first ?? node).focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => {
      node.removeEventListener("keydown", onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [ref, active]);
}

/** Contagem regressiva em segundos. */
export function useCountdown(initialSeconds: number, running: boolean) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const reset = useCallback(() => setSeconds(initialSeconds), [initialSeconds]);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  return { seconds, expired: seconds === 0, reset };
}

/** Copia texto e devolve `copied` por 2s para feedback. */
export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), timeout);
        return true;
      } catch {
        return false;
      }
    },
    [timeout],
  );
  return { copied, copy };
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Id da seção atualmente visível (para destacar o link ativo no menu). */
export function useActiveSection(ids: readonly string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin },
    );
    elements.forEach((el) => observer.observe(el));

    // No fim da página a última seção (geralmente o rodapé) é a ativa,
    // mesmo que seja curta demais para cruzar a faixa central da viewport.
    const onScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (bottom) setActive(elements[elements.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, rootMargin]);
  return active;
}

/** Valor anterior de uma prop/estado. */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
