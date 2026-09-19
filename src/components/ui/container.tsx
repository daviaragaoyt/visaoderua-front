import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";
const sizes: Record<Size, string> = { sm: "max-w-2xl", md: "max-w-4xl", lg: "max-w-6xl", xl: "max-w-7xl" };

export function Container({
  as: Tag = "div",
  size = "xl",
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType; size?: Size }) {
  return <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12", sizes[size], className)} {...props} />;
}
