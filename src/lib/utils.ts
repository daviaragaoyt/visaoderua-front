import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge precisa conhecer os tokens customizados para não confundir
 * `text-display-md` (tamanho) com uma cor e descartá-lo ao mesclar.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-sm", "display-md", "display-lg", "display-xl", "display-2xl"] }],
      "text-color": [{ text: ["foreground", "muted", "subtle"] }],
      "tracking": [{ tracking: ["widest2"] }],
      "z": [{ z: ["header", "sheet", "modal", "toast"] }],
    },
  },
});

/** Junta classes Tailwind resolvendo conflitos (última vence). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Limita um valor a um intervalo. */
export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Espera N ms (útil para feedbacks visuais mínimos). */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
