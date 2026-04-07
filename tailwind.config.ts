import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        whatsapp: {
          DEFAULT: "hsl(var(--whatsapp))",
          hover: "hsl(var(--whatsapp-hover))",
        },
        cta: {
          DEFAULT: "hsl(var(--cta-orange))",
          hover: "hsl(var(--cta-orange-hover))",
        },
        trust: {
          DEFAULT: "hsl(var(--trust-green))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "15%": { transform: "translateY(-6px)" },
          "30%": { transform: "translateY(0)" },
          "45%": { transform: "translateY(-3px)" },
          "60%": { transform: "translateY(0)" },
        },
        "wa-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-8px)" },
          "40%": { transform: "translateY(0)" },
          "55%": { transform: "translateY(-4px)" },
          "70%": { transform: "translateY(0)" },
        },
        "wa-pulse": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 4px 20px hsl(142 70% 40% / 0.3)" },
          "50%": { transform: "scale(1.08)", boxShadow: "0 6px 30px hsl(142 70% 40% / 0.55)" },
        },
        "wa-wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(-5deg)" },
          "30%": { transform: "rotate(5deg)" },
          "45%": { transform: "rotate(-3deg)" },
          "60%": { transform: "rotate(2deg)" },
          "75%": { transform: "rotate(0deg)" },
        },
        "wa-ring": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "10%": { transform: "scale(1.05) rotate(-8deg)" },
          "20%": { transform: "scale(1.05) rotate(8deg)" },
          "30%": { transform: "scale(1.05) rotate(-5deg)" },
          "40%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in var(--anim-medium, 300ms) var(--anim-ease-out, ease-out)",
        "fade-out": "fade-out var(--anim-medium, 300ms) var(--anim-ease-out, ease-out)",
        "scale-in": "scale-in var(--anim-fast, 150ms) var(--anim-ease-out, ease-out)",
        "scale-out": "scale-out var(--anim-fast, 150ms) var(--anim-ease-out, ease-out)",
        "slide-in-right": "slide-in-right var(--anim-medium, 300ms) var(--anim-ease-out, ease-out)",
        "slide-out-right": "slide-out-right var(--anim-medium, 300ms) var(--anim-ease-out, ease-out)",
        "enter": "fade-in var(--anim-medium, 300ms) ease-out, scale-in var(--anim-fast, 150ms) ease-out",
        "exit": "fade-out var(--anim-medium, 300ms) ease-out, scale-out var(--anim-fast, 150ms) ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 3s ease-in-out infinite",
        "wa-bounce": "wa-bounce 2.5s ease-in-out infinite",
        "wa-pulse": "wa-pulse 2s ease-in-out infinite",
        "wa-wiggle": "wa-wiggle 3s ease-in-out infinite",
        "wa-ring": "wa-ring 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
