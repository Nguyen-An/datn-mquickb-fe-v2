import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        blue: {
          primary: "#4169E1",
          primaryActive: "#3454B4",
          buttonPrimary: "#4CA2FA",
          backgroundHover: "rgba(150, 206, 251, 0.2)",
        },
        gray: {
          backgroundButton: "#CFCFCF",
          backgroundMenuChat: "#f5f5f5",
          backgroundBlur: "#EEF0FE",
          backgroundHover: "rgba(0, 0, 0, 0.06)",
          borderColor: "#D0D0D0"
        },
        text: {
          primary: "#292828",
          titleInput: "#666666",
          placeholderInput: "#C6C6C6",
          title: "#1A1D1F",
          textHeader: "rgba(102, 102, 102, 0.8)"
        },
        red: {
          primary: '#E52323',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        "landing-page": 'url(/image/background-landing.jpg)',
      },
      fontFamily: {
        kablammo: ['Kablammo', 'serif'],
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
