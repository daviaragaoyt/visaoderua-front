"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldContext {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const control =
  "h-12 w-full rounded border bg-asphalt-900 px-4 text-base text-foreground placeholder:text-subtle transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blood/40 disabled:opacity-50";

function Wrapper({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldContext & { id: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {label}
          {required && <span className="ml-1 text-blood">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-blood-300 animate-fade-in">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldContext {
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, className, leftIcon, rightSlot, id: idProp, ...props },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <div className="relative">
        {leftIcon && <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-subtle">{leftIcon}</span>}
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            control,
            leftIcon && "pl-11",
            rightSlot && "pr-12",
            error ? "border-blood/70 focus:border-blood" : "border-line-strong hover:border-white/25 focus:border-blood",
          )}
          {...props}
        />
        {rightSlot && <span className="absolute inset-y-0 right-3 flex items-center">{rightSlot}</span>}
      </div>
    </Wrapper>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldContext {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, required, className, options, placeholder, id: idProp, ...props },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          aria-invalid={!!error || undefined}
          className={cn(
            control,
            "appearance-none pr-10",
            error ? "border-blood/70 focus:border-blood" : "border-line-strong hover:border-white/25 focus:border-blood",
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
      </div>
    </Wrapper>
  );
});
