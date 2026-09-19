import type { CheckoutPayload, CheckoutResponse, Product } from "@/types";
import { normalizeProduct, type ApiProduct } from "@/lib/products";
import { mockProducts } from "@/data/mock-products";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new ApiError(`Falha na requisição (${res.status})`, res.status);
  return (await res.json()) as T;
}

const isAbort = (error: unknown) => error instanceof DOMException && error.name === "AbortError";

/**
 * Busca o catálogo. Em desenvolvimento, se a API não responder, cai no mock
 * para que a UI possa ser trabalhada sem backend. Em produção o erro sobe.
 */
export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    const data = await request<ApiProduct[] | { products: ApiProduct[] }>("/api/products", { signal });
    const list = Array.isArray(data) ? data : (data.products ?? []);
    return list.map(normalizeProduct);
  } catch (error) {
    if (process.env.NODE_ENV === "development" && !isAbort(error)) {
      console.warn("[catalog] API indisponível, usando mock de desenvolvimento.");
      return mockProducts;
    }
    throw error;
  }
}

export function createCheckout(payload: CheckoutPayload) {
  return request<CheckoutResponse>("/api/orders/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchOrderStatus(orderId: string, signal?: AbortSignal) {
  return request<{ status: string }>(`/api/orders/${orderId}/status`, { signal });
}

export interface ViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function lookupCep(cep: string, signal?: AbortSignal): Promise<ViaCep | null> {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal });
    if (!res.ok) return null;
    const data = (await res.json()) as ViaCep;
    return data.erro ? null : data;
  } catch {
    return null;
  }
}
