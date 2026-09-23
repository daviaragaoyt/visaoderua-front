"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ease, duration as durations } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    default: return {};
  }
};

/** Anima o conteúdo quando entra na viewport usando useInView para máxima compatibilidade no Next.js. */
export function Reveal({
  delay = 0,
  duration = durations.reveal,
  direction = "up",
  distance = 24,
  once = true,
  amount = "some",
  children,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  // O margin compensa um pouco antes de entrar na tela pra garantir q dispare.
  const isInView = useInView(ref, { 
    once, 
    amount: amount === "some" ? 0.1 : amount === "all" ? 1 : amount,
    margin: "0px 0px -50px 0px"
  });

  if (reduce) return <div className={props.className}>{children}</div>;

  const initial = { opacity: 0, ...offset(direction, distance) };
  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration, delay, ease: ease.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
