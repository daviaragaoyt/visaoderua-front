"use client";

import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { modalMotion, overlayMotion, sheetMotion } from "@/lib/motion";
import { useFocusTrap, useKeyDown, useLockBodyScroll, useMounted } from "@/hooks";
import { IconButton } from "@/components/ui/icon-button";

interface BaseProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** id do elemento que dá título ao diálogo (aria-labelledby). */
  labelledBy?: string;
  className?: string;
}

function useDialogBehavior(open: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);
  useKeyDown("Escape", onClose, open);
  useFocusTrap(panelRef, open);
  return panelRef;
}

function Portal({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  return mounted ? createPortal(children, document.body) : null;
}

export function CloseButton({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <IconButton label="Fechar" variant="surface" onClick={onClick} className={cn("hover:border-white/30 hover:text-foreground", className)}>
      <X className="h-5 w-5" />
    </IconButton>
  );
}

/** Modal centralizado (detalhe de produto, confirmações). */
export function Modal({ open, onClose, children, labelledBy, className }: BaseProps) {
  const panelRef = useDialogBehavior(open, onClose);
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-modal flex items-end justify-center sm:items-center sm:p-4">
            <motion.div {...overlayMotion} className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} aria-hidden />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              tabIndex={-1}
              {...modalMotion}
              className={cn(
                "relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-blood/25 bg-asphalt-900 shadow-modal outline-none sm:max-w-4xl sm:rounded-xl",
                className,
              )}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

/** Painel lateral (carrinho, menu). */
export function Sheet({ open, onClose, children, labelledBy, className }: BaseProps) {
  const panelRef = useDialogBehavior(open, onClose);
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-sheet">
            <motion.div {...overlayMotion} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              tabIndex={-1}
              {...sheetMotion}
              className={cn(
                "absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-blood/20 bg-asphalt-900 shadow-sheet outline-none",
                className,
              )}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
