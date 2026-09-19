/**
 * Configuração central da loja. Tudo que é texto institucional, contato ou
 * regra de negócio simples mora aqui para não ficar espalhado nos componentes.
 */
export const site = {
  name: "Visão de Rua",
  shortName: "VDR",
  slogan: "A rua inspira, você usa.",
  description:
    "Lupas exclusivas com o autêntico estilo Mandrake. Especialistas em Juliet, Romeo e Monster Dog, pronta entrega em Brasília (DF) e envio para todo o Brasil.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://visaoderua.vercel.app",
  city: "Brasília",
  state: "DF",
  deliveryDaysDF: 4,
  pixDiscount: 0.05,
  pixExpirationMinutes: 30,
  cnpj: "00.000.000/0001-00",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5561999999999",
    display: "(61) 99999-9999",
  },
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    youtube: "https://youtube.com/",
    facebook: "https://facebook.com/",
  },
  nav: [
    { label: "Home", href: "/#top", section: "top" },
    { label: "Catálogo", href: "/#catalogo", section: "catalogo" },
    { label: "O Movimento", href: "/#sobre", section: "sobre" },
    { label: "Contato", href: "/#contato", section: "contato" },
  ],
  announcements: [
    "Enviamos para todo o Brasil",
    "Em Brasília (DF) os pedidos são acumulados para entrega conjunta",
    "PIX com 5% de desconto",
    "Entrega no DF em até 4 dias",
  ],
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
