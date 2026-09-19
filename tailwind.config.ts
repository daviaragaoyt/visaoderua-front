import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Design tokens do Visão de Rua.
 *
 * Paleta: asfalto (neutros frios, quase pretos), "blood" (vermelho neon da marca)
 * e "gold" (respingo amarelo do logo, uso pontual). Tudo o que é cor, sombra,
 * tipografia e movimento passa por aqui — nenhum componente deve usar hex solto.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem", xl: "3rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: "rgb(var(--bg) / <alpha-value>)",
        foreground: "rgb(var(--fg) / <alpha-value>)",
        asphalt: {
          950: "#050505",
          900: "#08080a",
          800: "#0f0f12",
          700: "#16161a",
          600: "#1f1f25",
          500: "#2a2a32",
          400: "#3a3a44",
          300: "#55555f",
        },
        blood: {
          DEFAULT: "#ff0000",
          50: "#fff1f1",
          100: "#ffd6d6",
          300: "#ff6b6b",
          400: "#ff3b3b",
          500: "#ff0000",
          600: "#d40000",
          700: "#a80000",
          800: "#7a0000",
          900: "#4a0000",
          hover: "#d40000",
        },
        gold: { DEFAULT: "#ffb800", 400: "#ffc733", 600: "#d99c00" },
        whatsapp: { DEFAULT: "#25d366", hover: "#1ebd5a" },
        line: {
          DEFAULT: "rgb(255 255 255 / 0.08)",
          strong: "rgb(255 255 255 / 0.16)",
          blood: "rgb(255 0 0 / 0.35)",
        },
        muted: "rgb(var(--fg) / 0.55)",
        subtle: "rgb(var(--fg) / 0.35)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "0.95", letterSpacing: "0.04em" }],
        "display-md": ["3rem", { lineHeight: "0.95", letterSpacing: "0.04em" }],
        "display-lg": ["4rem", { lineHeight: "0.9", letterSpacing: "0.04em" }],
        "display-xl": ["5.5rem", { lineHeight: "0.88", letterSpacing: "0.03em" }],
        "display-2xl": ["7.5rem", { lineHeight: "0.85", letterSpacing: "0.02em" }],
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      borderRadius: {
        xs: "0.25rem",
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.875rem",
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 20px 40px -20px rgb(0 0 0 / 0.8)",
        "card-hover": "0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 30px 60px -20px rgb(0 0 0 / 0.9)",
        // Sombras coloridas discretas (uso pontual; a marca não é neon).
        glow: "0 10px 30px -12px rgb(255 0 0 / 0.45)",
        "glow-sm": "0 6px 18px -10px rgb(255 0 0 / 0.4)",
        "glow-whatsapp": "0 10px 30px -12px rgb(37 211 102 / 0.4)",
        sheet: "-24px 0 64px -16px rgb(0 0 0 / 0.9)",
        modal: "0 40px 120px -20px rgb(0 0 0 / 0.95)",
      },
      backgroundImage: {
        "asphalt-texture": "url('/images/bg-street.png')",
        "grid-faint":
          "linear-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
        "radial-blood": "radial-gradient(ellipse at center, rgb(255 0 0 / 0.22), transparent 60%)",
        "radial-white": "radial-gradient(ellipse at center, rgb(255 255 255 / 0.06), transparent 65%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
        snap: "cubic-bezier(0.2, 0.9, 0.3, 1.2)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        400: "400ms",
        600: "600ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "ken-burns": "ken-burns 24s ease-out forwards",
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
      zIndex: {
        header: "40",
        sheet: "50",
        modal: "60",
        toast: "70",
      },
    },
  },
  plugins: [],
};

export default config;
