/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "0.5rem",  // var(--radius)
        md: "0.375rem", // calc(var(--radius) - 2px)
        sm: "0.25rem",  // calc(var(--radius) - 4px)
      },
      colors: {
        background: "#0f0f0f",
        foreground: "#fafafa",
        card: {
          DEFAULT: "#1a1a1a",
          foreground: "#fafafa",
        },
        popover: {
          DEFAULT: "#1a1a1a",
          foreground: "#fafafa",
        },
        primary: {
          DEFAULT: "#ffea00",
          foreground: "#0f0f0f",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a3a3a3",
        },
        accent: {
          DEFAULT: "#ffea00",
          foreground: "#0f0f0f",
        },
        destructive: {
          DEFAULT: "#f87171",
          foreground: "#fafafa",
        },
        border: "#292929",
        input: "#292929",
        ring: "#ffea00",
        chart: {
          "1": "#ffea00", // You might want to specify actual chart colors
          "2": "#f87171",
          "3": "#16a34a",
          "4": "#60a5fa",
          "5": "#a855f7",
        },
        sidebar: {
          DEFAULT: "#1a1a1a",       // --sidebar-background
          foreground: "#fafafa",    // --sidebar-foreground
          primary: "#ffea00",       // --sidebar-primary
          "primary-foreground": "#0f0f0f", // --sidebar-primary-foreground
          accent: "#ffea00",        // --sidebar-accent
          "accent-foreground": "#0f0f0f", // --sidebar-accent-foreground
          border: "#292929",        // --sidebar-border
          ring: "#ffea00",          // --sidebar-ring
        },
        // Adding the trading colors from previous conversion
        trading: {
          primary: "#0f0f0f",
          secondary: "#1a1a1a",
          tertiary: "#292929",
          accent: "#ffea00",
          accentDark: "#d4b017",
          success: "#16a34a",
          error: "#f87171"
        }
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "animate": {
          '0%': { transform: 'rotateX(-30deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(-30deg) rotateY(360deg)' },
        },
        "animate-progress": {
          '0%': { width: '0%' },
          'to': { width: '100%' },
        },
        'blob': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'animae': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
    },
    animation: {
      'blob': 'blob 7s infinite ease-in-out',
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      'cube-spin': 'animate 4s linear infinite',
      'progress': 'animate-progress 4s linear',
      'anime': 'animae 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
    },
  },
  plugins: [],
}