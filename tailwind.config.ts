import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        brich: {
          blue: {
            50: "hsl(var(--brich-blue-50))",
            100: "hsl(var(--brich-blue-100))",
            500: "hsl(var(--brich-blue-500))",
            600: "hsl(var(--brich-blue-600))",
            900: "hsl(var(--brich-blue-900))",
          },
          amber: {
            50: "hsl(var(--brich-amber-50))",
            100: "hsl(var(--brich-amber-100))",
            500: "hsl(var(--brich-amber-500))",
            600: "hsl(var(--brich-amber-600))",
            900: "hsl(var(--brich-amber-900))",
          },
          red: {
            50: "hsl(var(--brich-red-50))",
            100: "hsl(var(--brich-red-100))",
            500: "hsl(var(--brich-red-500))",
            600: "hsl(var(--brich-red-600))",
            900: "hsl(var(--brich-red-900))",
          },
          dark: "hsl(var(--brich-dark))",
          light: "hsl(var(--brich-light))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'brich-blue-gradient': 'linear-gradient(135deg, hsl(var(--brich-blue-500)), hsl(var(--brich-blue-600)))',
        'brich-amber-gradient': 'linear-gradient(135deg, hsl(var(--brich-amber-500)), hsl(var(--brich-amber-600)))',
        'brich-red-gradient': 'linear-gradient(135deg, hsl(var(--brich-red-500)), hsl(var(--brich-red-600)))',
        'brich-hero-gradient': 'linear-gradient(135deg, hsl(var(--brich-blue-900)), hsl(var(--brich-red-900)), hsl(var(--brich-amber-900)))',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
