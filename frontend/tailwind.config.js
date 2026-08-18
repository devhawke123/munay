/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "30rem",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
      "3xl": "120rem",
    },
    extend: {
      screens: {
        short: { raw: "(max-height: 750px)" },
        medium: { raw: "(min-height: 751px) and (max-height: 899px)" },
        tall: { raw: "(min-height: 900px)" },
      },
      colors: {
        brand: "#8B5A2B",
        "brand-dark": "#6b4a2a",
        "brand-accent": "#c9973a",
        "brand-panel": "#FBF7F0",
        "brand-bg": "#fbf9f6",
        "brand-border": "#E8E6E1",
        "brand-soft": "#f2e2cf",
        "text-primary": "#1a0d05",
        "text-muted": "#907868",
        "text-soft": "#919593",
        success: "#059669",
        warning: "#d97706",
        danger: "#DC2626",
        info: "#2563EB",
        "accent-purple": "#7C3AED",
        ink: "#22252e",
        "ink-soft": "#464646",
        charcoal: "#1A1A1A",
        "surface-muted": "#fbf7f5",
        "surface-tan": "#eae0d2",
        "tint-brand": "#f4ece0",
        "tint-success": "#ecffd6",
        "tint-danger": "#ffd0d0",
        "button-brand": "#936531",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem",
        panel: "0.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 13, 5, 0.06)",
      },
      maxWidth: {
        dashboard: "120rem",
      },
    },
  },
};
