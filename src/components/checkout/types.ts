import type { PaymentMethod } from "@/types";

export type CheckoutStep = "address" | "payment" | "pix";

export interface CheckoutForm {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  ra: string;
}

export type FormErrors = Partial<Record<keyof CheckoutForm, string>>;

export const emptyForm: CheckoutForm = {
  nome: "",
  cpf: "",
  email: "",
  telefone: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  ra: "",
};

export const RA_OPTIONS = [
  { value: "ceilandia", label: "Ceilândia" },
  { value: "taguatinga", label: "Taguatinga" },
  { value: "samambaia", label: "Samambaia" },
  { value: "plano", label: "Plano Piloto" },
  { value: "guara", label: "Guará" },
  { value: "aguasclaras", label: "Águas Claras" },
  { value: "gama", label: "Gama" },
  { value: "sobradinho", label: "Sobradinho" },
  { value: "planaltina", label: "Planaltina" },
  { value: "recanto", label: "Recanto das Emas" },
  { value: "santamaria", label: "Santa Maria" },
  { value: "saosebastiao", label: "São Sebastião" },
  { value: "riachofundo", label: "Riacho Fundo" },
  { value: "sudoeste", label: "Sudoeste / Octogonal" },
  { value: "lagosul", label: "Lago Sul" },
  { value: "lagonorte", label: "Lago Norte" },
  { value: "outra", label: "Outra RA no DF" },
];

export interface CardForm {
  number: string;
  expiry: string;
  cvv: string;
  holder: string;
}

export const emptyCard: CardForm = { number: "", expiry: "", cvv: "", holder: "" };

export const STEPS: { key: CheckoutStep; label: string; title: string }[] = [
  { key: "address", label: "Entrega", title: "Endereço de entrega" },
  { key: "payment", label: "Pagamento", title: "Forma de pagamento" },
  { key: "pix", label: "Confirmação", title: "Pagamento PIX" },
];

export type { PaymentMethod };
