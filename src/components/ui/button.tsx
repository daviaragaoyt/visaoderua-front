import React, { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded font-display uppercase tracking-widest transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-blood text-white hover:bg-blood-600",
  secondary: "border border-line-strong bg-asphalt-600 text-foreground hover:border-white/25 hover:bg-asphalt-500",
  outline: "border border-blood/70 text-foreground hover:border-blood hover:bg-blood hover:text-white",
  ghost: "text-foreground/80 hover:bg-white/5 hover:text-foreground",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover",
  link: "h-auto rounded-none px-0 text-blood-400 underline-offset-4 hover:text-blood-300 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-base",
  md: "h-11 px-6 text-lg",
  lg: "h-12 px-8 text-xl",
  xl: "h-14 px-10 text-2xl",
};

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function buttonVariants({ variant = "primary", size = "md", fullWidth, className }: ButtonStyleProps & { className?: string }) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], fullWidth && "w-full", className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, fullWidth, loading, leftIcon, rightIcon, className, children, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonVariants({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className="h-5 w-5" />
        </span>
      )}
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </button>
  );
});

type ButtonLinkProps = ButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Pick<LinkProps, "href" | "scroll" | "prefetch"> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

/** Mesmo visual do Button, mas navega (next/link ou âncora externa). */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant, size, fullWidth, leftIcon, rightIcon, className, children, href, ...props },
  ref,
) {
  const cls = buttonVariants({ variant, size, fullWidth, className });
  const isExternal = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a ref={ref} href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={cls} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  );
});
