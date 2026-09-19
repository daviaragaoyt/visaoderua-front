import type { Feedback } from "@/types";

/**
 * Depoimentos exibidos na home. Substitua pelos feedbacks reais dos clientes
 * (texto + foto opcional em /public/images/feedbacks/).
 */
export const feedbacks: Feedback[] = [
  { id: "f1", quote: "Brabo demais! Chegou rápido e a lupa é original.", author: "Visionário", location: "Ceilândia · DF" },
  { id: "f2", quote: "Atendimento de responsa, entrega no prazo.", author: "Visionário", location: "Taguatinga · DF" },
  { id: "f3", quote: "Double X Carbon veio impecável. Recomendo.", author: "Visionário", location: "Samambaia · DF" },
  { id: "f4", quote: "Strignação! Qualidade absurda.", author: "Visionário", location: "Plano Piloto · DF" },
  { id: "f5", quote: "Segunda compra e mais uma vez de primeira.", author: "Visionário", location: "Guará · DF" },
];
