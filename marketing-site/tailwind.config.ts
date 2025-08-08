import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0EA5E9",
          foreground: "#0B93D3",
        },
      },
      backgroundImage: {
        "subtle-radial":
          "radial-gradient(1200px 600px at 100% -20%, rgba(59,130,246,0.08), transparent 70%), radial-gradient(1000px 500px at 10% -10%, rgba(16,185,129,0.08), transparent 70%), radial-gradient(800px 400px at 50% 120%, rgba(168,85,247,0.08), transparent 70%)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2rem",
          "2xl": "2.5rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;