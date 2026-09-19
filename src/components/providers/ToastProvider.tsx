"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { useMounted } from "@/hooks";

type Variant = "success" | "error" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: Variant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface Toast extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<Variant, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-whatsapp" aria-hidden />,
  error: <XCircle className="h-5 w-5 text-blood-400" aria-hidden />,
  info: <Info className="h-5 w-5 text-foreground/70" aria-hidden />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Map<number, number>());
  const mounted = useMounted();

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = ++counter.current;
      setToasts((list) => [...list.slice(-3), { id, variant: "info", ...options }]);
      const timer = window.setTimeout(() => dismiss(id), options.duration ?? 4000);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 bottom-0 z-toast flex flex-col items-center gap-2 px-4 pb-4 pb-safe sm:items-end sm:px-6 sm:pb-6"
          >
            <AnimatePresence initial={false}>
              {toasts.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.18 } }}
                  transition={spring}
                  role="status"
                  className={cn(
                    "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border bg-asphalt-800/95 p-4 shadow-modal backdrop-blur-md",
                    t.variant === "success" && "border-whatsapp/30",
                    t.variant === "error" && "border-blood/40",
                    t.variant === "info" && "border-line-strong",
                  )}
                >
                  <span className="mt-0.5 shrink-0">{icons[t.variant ?? "info"]}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{t.title}</p>
                    {t.description && <p className="mt-0.5 text-xs leading-relaxed text-muted">{t.description}</p>}
                    {t.action && (
                      <button
                        type="button"
                        onClick={() => {
                          t.action?.onClick();
                          dismiss(t.id);
                        }}
                        className="mt-2 font-display text-base tracking-widest text-blood-400 transition-colors hover:text-blood-300"
                      >
                        {t.action.label}
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(t.id)}
                    aria-label="Fechar aviso"
                    className="-m-1 rounded p-1 text-subtle transition-colors hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return ctx;
}
