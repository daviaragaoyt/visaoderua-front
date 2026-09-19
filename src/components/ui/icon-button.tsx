import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "surface" | "blood";
}

const sizes = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };
const variants = {
  ghost: "text-foreground/75 hover:bg-white/5 hover:text-foreground",
  surface: "border border-line bg-asphalt-700 text-foreground/80 hover:border-line-strong hover:text-foreground",
  blood: "bg-blood text-white hover:bg-blood-600",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, size = "md", variant = "ghost", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-200 ease-out-expo active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});
