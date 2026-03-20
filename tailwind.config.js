export default {

  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },

    extend: {

      /* ========================
         COLORS (Design Tokens)
      ======================== */

      colors: {

        /* base */

        background: "hsl(var(--background) / <alpha-value>)",

        surface: "hsl(var(--surface) / <alpha-value>)",

        surfaceSoft: "hsl(var(--surface-soft) / <alpha-value>)",

        surfaceElevated: "hsl(var(--surface-elevated) / <alpha-value>)",


        /* text */

        text: "hsl(var(--text) / <alpha-value>)",

        muted: "hsl(var(--text-muted) / <alpha-value>)",

        subtle: "hsl(var(--text-subtle) / <alpha-value>)",


        /* borders */

        border: "hsl(var(--border) / <alpha-value>)",

        borderSoft: "hsl(var(--border-soft) / <alpha-value>)",


        /* accent system */

        accent: "hsl(var(--accent) / <alpha-value>)",

        accentSoft: "hsl(var(--accent-soft) / <alpha-value>)",

        accentHover: "hsl(var(--accent-hover) / <alpha-value>)",

        accentStrong: "hsl(var(--accent-strong) / <alpha-value>)",


        /* metallic gold system */

        gold: {

          100: "hsl(var(--color-gold-100) / <alpha-value>)",
          200: "hsl(var(--color-gold-200) / <alpha-value>)",
          300: "hsl(var(--color-gold-300) / <alpha-value>)",
          400: "hsl(var(--color-gold-400) / <alpha-value>)",
          500: "hsl(var(--color-gold-500) / <alpha-value>)",
          600: "hsl(var(--color-gold-600) / <alpha-value>)",
          700: "hsl(var(--color-gold-700) / <alpha-value>)",

        },

        /* hero glow helpers */

        metallic: "hsl(var(--metallic-primary) / <alpha-value>)",

        rim: "hsl(var(--rim-glow) / <alpha-value>)",

        focus: "hsl(var(--focus-ring) / <alpha-value>)",

      },



      /* ========================
         BORDER RADIUS
      ======================== */

      borderRadius: {

        xs: "var(--radius-xs)",

        sm: "var(--radius-sm)",

        md: "var(--radius-md)",

        lg: "var(--radius-lg)",

        xl: "var(--radius-xl)",

      },



      /* ========================
         SHADOW SYSTEM
      ======================== */

      boxShadow: {

        sm: "var(--shadow-sm)",

        md: "var(--shadow-md)",

        lg: "var(--shadow-lg)",

        xl: "var(--shadow-xl)",

        glow: "var(--shadow-glow)",

        goldGlow: "var(--shadow-gold-glow)",

      },



      /* ========================
         TYPOGRAPHY
      ======================== */

      fontFamily: {

        sans: ["Inter", "system-ui", "sans-serif"],

        serif: ["Playfair Display", "serif"],

      },



      /* ========================
         MOTION TOKENS
      ======================== */

      transitionTimingFunction: {

        premium: "var(--ease-premium)",

      },

      transitionDuration: {

        fast: "var(--duration-fast)",

        normal: "var(--duration-normal)",

        slow: "var(--duration-slow)",

      },



      /* ========================
         GRADIENT HELPERS
      ======================== */

      backgroundImage: {

        gold: "linear-gradient(135deg, hsl(var(--gold-grad-a)), hsl(var(--gold-grad-b)))",

        goldSoft: "linear-gradient(180deg, hsl(var(--gold-grad-a) / 0.6), hsl(var(--gold-grad-c)))",

        spotlight: "radial-gradient(circle at center, hsl(var(--rim-glow) / 0.25), transparent 60%)",

      },

    },

  },

  plugins: [],

}