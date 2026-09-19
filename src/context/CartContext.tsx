"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { CartItem } from "@/types";

const STORAGE_KEY = "vdr:cart:v1";

type State = { items: CartItem[]; isOpen: boolean; hydrated: boolean };

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: Omit<CartItem, "quantity">; quantity: number }
  | { type: "remove"; id: string }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "clear" }
  | { type: "setOpen"; open: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { ...state, items: action.items, hydrated: true };
    case "add": {
      const existing = state.items.find((i) => i.id === action.item.id);
      const items = existing
        ? state.items.map((i) => (i.id === action.item.id ? { ...i, quantity: i.quantity + action.quantity } : i))
        : [...state.items, { ...action.item, quantity: action.quantity }];
      return { ...state, items };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "setQuantity": {
      if (action.quantity <= 0) return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: Math.min(action.quantity, 99) } : i)),
      };
    }
    case "clear":
      return { ...state, items: [] };
    case "setOpen":
      return { ...state, isOpen: action.open };
    default:
      return state;
  }
}

export interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, options?: { quantity?: number; open?: boolean }) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        typeof i === "object" && i !== null && typeof (i as CartItem).id === "string" && typeof (i as CartItem).price === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false, hydrated: false });

  useEffect(() => {
    dispatch({ type: "hydrate", items: readStorage() });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage indisponível (modo privado, etc.) */
    }
  }, [state.items, state.hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((item, options) => {
    dispatch({ type: "add", item, quantity: options?.quantity ?? 1 });
    if (options?.open ?? true) dispatch({ type: "setOpen", open: true });
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const find = (id: string) => state.items.find((i) => i.id === id);
    return {
      items: state.items,
      hydrated: state.hydrated,
      isOpen: state.isOpen,
      totalItems,
      subtotal,
      addItem,
      removeItem: (id) => dispatch({ type: "remove", id }),
      setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
      increment: (id) => dispatch({ type: "setQuantity", id, quantity: (find(id)?.quantity ?? 0) + 1 }),
      decrement: (id) => dispatch({ type: "setQuantity", id, quantity: (find(id)?.quantity ?? 0) - 1 }),
      clear: () => dispatch({ type: "clear" }),
      open: () => dispatch({ type: "setOpen", open: true }),
      close: () => dispatch({ type: "setOpen", open: false }),
      toggle: () => dispatch({ type: "setOpen", open: !state.isOpen }),
    };
  }, [state, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
