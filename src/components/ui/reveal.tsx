"use client";

import type { ReactNode, HTMLAttributes } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  delay?: number;
  duration?: number;
  direction?: unknown;
  distance?: number;
  once?: boolean;
  amount?: unknown;
}

export function Reveal({
  children,
  className,
  ...props
}: RevealProps) {
  const safeProps = { ...props };
  delete safeProps.delay;
  delete safeProps.duration;
  delete safeProps.direction;
  delete safeProps.distance;
  delete safeProps.once;
  delete safeProps.amount;

  return (
    <div className={className} {...safeProps}>
      {children}
    </div>
  );
}
