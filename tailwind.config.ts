import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080a",
        foreground: "#f4f4f5",
        graphite: "#1a1a1f",
        "graphite-light": "#27272f",
        blood: "#ff0000",
        "blood-hover": "#cc0000",
      },
      fontFamily: {
        stencil: ["var(--font-stencil)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        bebas: ["'Bebas Neue'", "sans-serif"],
      },
      backgroundImage: {
        "asphalt-texture": "url('/images/bg-street.png')",
      },
      boxShadow: {
        'neon-red': '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
        'neon-red-sm': '0 0 5px #ff0000, 0 0 10px #ff0000',
      },
      textShadow: {
        'neon-red': '0 0 10px #ff0000',
      }
    },
  },
  plugins: [],
};
export default config;
