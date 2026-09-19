"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, MapPin, User } from "lucide-react";
import { lookupCep } from "@/lib/api";
import { maskCEP, maskCPF, maskPhone, onlyDigits } from "@/lib/format";
import { Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { RA_OPTIONS, type CheckoutForm, type FormErrors } from "@/components/checkout/types";
import { validateAddress } from "@/components/checkout/validation";

interface AddressStepProps {
  form: CheckoutForm;
  onChange: (patch: Partial<CheckoutForm>) => void;
  onNext: () => void;
}

const UFS = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

export function AddressStep({ form, onChange, onNext }: AddressStepProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "found" | "notfound">("idle");
  const numeroRef = useRef<HTMLInputElement>(null);
  const isDF = form.uf === "DF";

  // Consulta o ViaCEP quando o CEP fica completo e preenche o endereço.
  useEffect(() => {
    const digits = onlyDigits(form.cep);
    if (digits.length !== 8) {
      setCepStatus("idle");
      return;
    }
    const controller = new AbortController();
    setCepStatus("loading");
    lookupCep(digits, controller.signal).then((data) => {
      if (controller.signal.aborted) return;
      if (!data) {
        setCepStatus("notfound");
        return;
      }
      setCepStatus("found");
      const raMatch = RA_OPTIONS.find((r) => data.bairro.toLowerCase().includes(r.label.toLowerCase()));
      onChange({
        logradouro: data.logradouro || form.logradouro,
        bairro: data.bairro || form.bairro,
        cidade: data.localidade,
        uf: data.uf,
        ra: data.uf === "DF" ? (raMatch?.value ?? form.ra) : "",
      });
      setErrors((e) => ({ ...e, cep: undefined, logradouro: undefined, cidade: undefined, uf: undefined }));
      numeroRef.current?.focus();
    });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.cep]);

  const set =
    (field: keyof CheckoutForm, mask?: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ [field]: mask ? mask(e.target.value) : e.target.value });
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateAddress(form);
    setErrors(result);
    if (Object.keys(result).length > 0) {
      const first = Object.keys(result)[0];
      (document.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    onNext();
  };

  return (
    <motion.form
      key="address"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={submit}
      noValidate
      className="flex flex-col gap-8"
    >
      <fieldset className="surface flex flex-col gap-5 p-5 sm:p-6">
        <legend className="sr-only">Dados pessoais</legend>
        <FieldsetTitle icon={<User className="h-4 w-4" />} title="Dados pessoais" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nome completo" name="nome" autoComplete="name" value={form.nome} onChange={set("nome")} error={errors.nome} required />
          <Input label="CPF" name="cpf" inputMode="numeric" placeholder="000.000.000-00" value={form.cpf} onChange={set("cpf", maskCPF)} error={errors.cpf} hint="Para emissão do PIX / nota." required />
          <Input label="E-mail" name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} required />
          <Input label="Telefone / WhatsApp" name="telefone" inputMode="tel" autoComplete="tel" placeholder="(61) 90000-0000" value={form.telefone} onChange={set("telefone", maskPhone)} error={errors.telefone} required />
        </div>
      </fieldset>

      <fieldset className="surface flex flex-col gap-5 p-5 sm:p-6">
        <legend className="sr-only">Endereço</legend>
        <FieldsetTitle icon={<MapPin className="h-4 w-4" />} title="Endereço de entrega" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <Input
            className="sm:col-span-2"
            label="CEP"
            name="cep"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="70000-000"
            value={form.cep}
            onChange={set("cep", maskCEP)}
            error={errors.cep ?? (cepStatus === "notfound" ? "CEP não encontrado. Preencha manualmente." : undefined)}
            hint={cepStatus === "found" ? "Endereço preenchido automaticamente." : undefined}
            rightSlot={cepStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin text-blood" aria-label="Buscando CEP" /> : undefined}
            required
          />
          <Input className="sm:col-span-4" label="Logradouro / Quadra" name="logradouro" autoComplete="address-line1" placeholder="Ex.: QNN 32, SQN 205" value={form.logradouro} onChange={set("logradouro")} error={errors.logradouro} required />
          <Input ref={numeroRef} className="sm:col-span-2" label="Número" name="numero" value={form.numero} onChange={set("numero")} error={errors.numero} required />
          <Input className="sm:col-span-4" label="Complemento" name="complemento" autoComplete="address-line2" placeholder="Bloco, apto, referência" value={form.complemento} onChange={set("complemento")} />

          <AnimatePresence mode="wait" initial={false}>
            {isDF ? (
              <motion.div key="ra" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2 }} className="sm:col-span-3">
                <Select label="Região Administrativa (RA)" name="ra" value={form.ra} onChange={set("ra")} error={errors.ra} placeholder="Selecione…" options={RA_OPTIONS} required />
              </motion.div>
            ) : (
              <motion.div key="bairro" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2 }} className="sm:col-span-3">
                <Input label="Bairro" name="bairro" autoComplete="address-level3" value={form.bairro} onChange={set("bairro")} error={errors.bairro} required />
              </motion.div>
            )}
          </AnimatePresence>

          <Input className="sm:col-span-2" label="Cidade" name="cidade" autoComplete="address-level2" value={form.cidade} onChange={set("cidade")} error={errors.cidade} required />
          <Select className="sm:col-span-1" label="UF" name="uf" value={form.uf} onChange={set("uf")} error={errors.uf} placeholder="UF" options={UFS.map((u) => ({ value: u, label: u }))} required />
        </div>
      </fieldset>

      <Button type="submit" size="xl" fullWidth rightIcon={<ArrowRight className="h-5 w-5" />}>
        Ir para pagamento
      </Button>
    </motion.form>
  );
}

export function FieldsetTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line pb-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blood/40 bg-blood/10 text-blood">{icon}</span>
      <h2 className="font-display text-2xl tracking-widest text-foreground">{title}</h2>
    </div>
  );
}
