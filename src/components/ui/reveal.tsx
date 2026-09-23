"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
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
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/** Anima o conteúdo quando entra na viewport. Respeita prefers-reduced-motion. */
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
  if (reduce) return <div className={props.className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: ease.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
