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
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          accent: "#0d9488",  // teal
          accentLight: "#14b8a6",
        },
        fenn: {
          orange: "#fb923c",
          cream: "#fef3c7",
          teal: "#0d9488",
          tealLight: "#5eead4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
