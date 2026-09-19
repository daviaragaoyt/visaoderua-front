import { isValidCEP, isValidCPF, isValidEmail, isValidPhone, onlyDigits } from "@/lib/format";
import type { CardForm, CheckoutForm, FormErrors } from "@/components/checkout/types";

export function validateAddress(form: CheckoutForm): FormErrors {
  const errors: FormErrors = {};
  if (form.nome.trim().split(/\s+/).length < 2) errors.nome = "Informe nome e sobrenome.";
  if (!isValidCPF(form.cpf)) errors.cpf = "CPF inválido.";
  if (!isValidEmail(form.email)) errors.email = "E-mail inválido.";
  if (!isValidPhone(form.telefone)) errors.telefone = "Telefone inválido.";
  if (!isValidCEP(form.cep)) errors.cep = "CEP inválido.";
  if (!form.logradouro.trim()) errors.logradouro = "Informe o endereço.";
  if (!form.numero.trim()) errors.numero = "Informe o número.";
  if (!form.cidade.trim()) errors.cidade = "Informe a cidade.";
  if (!form.uf.trim()) errors.uf = "UF";
  if (form.uf === "DF") {
    if (!form.ra) errors.ra = "Selecione a Região Administrativa.";
  } else if (!form.bairro.trim()) {
    errors.bairro = "Informe o bairro.";
  }
  return errors;
}

export function validateCard(card: CardForm): Partial<Record<keyof CardForm, string>> {
  const errors: Partial<Record<keyof CardForm, string>> = {};
  if (onlyDigits(card.number).length < 13) errors.number = "Número do cartão inválido.";
  const [mm, yy] = card.expiry.split("/");
  const month = Number(mm);
  const year = Number(`20${yy}`);
  const now = new Date();
  if (!mm || !yy || month < 1 || month > 12 || yy.length !== 2 || year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
    errors.expiry = "Validade inválida.";
  }
  if (onlyDigits(card.cvv).length < 3) errors.cvv = "CVV inválido.";
  if (card.holder.trim().length < 3) errors.holder = "Nome como está no cartão.";
  return errors;
}
