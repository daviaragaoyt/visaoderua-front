"use client";

import { useSyncExternalStore } from "react";
import type { ProductLine } from "@/types";

/**
 * Estado de filtro do catálogo compartilhado entre o Header (busca) e a
 * seção de produtos, sem precisar de Context nem prop drilling.
 */
export interface CatalogState {
  query: string;
  line: ProductLine | "all";
}

const initialState: CatalogState = { query: "", line: "all" };
let state: CatalogState = initialState;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const catalogStore = {
  get: () => state,
  set(partial: Partial<CatalogState>) {
    state = { ...state, ...partial };
    emit();
  },
  reset() {
    state = initialState;
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useCatalogStore<T>(selector: (s: CatalogState) => T): T {
  return useSyncExternalStore(
    catalogStore.subscribe,
    () => selector(state),
    () => selector(initialState),
  );
}
