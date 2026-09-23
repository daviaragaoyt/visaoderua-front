"use client";

import type { ReactNode, HTMLAttributes } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  delay?: number;
  duration?: number;
  direction?: any;
  distance?: number;
  once?: boolean;
  amount?: any;
}

export function Reveal({
  children,
  className,
  delay: _delay,
  duration: _duration,
  direction: _direction,
  distance: _distance,
  once: _once,
  amount: _amount,
  ...props
}: RevealProps) {
  // Retorna diretamente uma div sem animação pra evitar o bug de tela preta
  return <div className={className} {...props}>{children}</div>;
}
