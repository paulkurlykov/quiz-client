/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {

    borderRadius: {
      // перестанут работать стандартные классы tailwind border-xl
      primary: "3rem",
      secondary: "2rem",
      mini: "1rem",
      middle: "2rem",
      full: "100rem"
    },
    fontSize: {
            // перестанут работать стандартные классы tailwind типа text-xl
      primary: "2rem",
      secondary: "1.8rem",
      tertiary: "1.6rem",
      quaternary: "1.4rem",
      little: "1.2rem"
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      primary: "Raleway",
      secondary: "Inter",
      tertiary: "Manrope",
      interTight: "Inter Tight",

    },
    extend: {
      boxShadow: {
        white: "0px 0px 20px -5px #000000",
        dark: "0px 5px 20px -9px #1d1c1c"
      },
      colors: {
        backgroundPrimary: "var(--background-primary)",
        backgroundTertiary: "var(--background-tertiary)",
        backgroundSecondary: "var(--background-secondary)",
        backgroundQuaternary: "var(--background-quaternary)",

        inputBackgroundPrimary: "var(--input-background-primary)",

        textLightAccent: "var(--textLightAccent)",
        textLightGrey: "var(--textLightGrey)",
        textSecondary: "var(--text-secondary)",

        textDark: "var(--textDark)",
        textDarkAccent: "#121A19",
        textPrimary: "var(--text-primary)",
        textLight: "var(--textLight)",

        borderPrimary: "var(--border-primary)",

        accent: "var(--accent-primary)",
        accentHover: "var(--accent-hover)",
        accentBright: "var(--accentBright)",
        accentBrightHover: "var(--accentBrightHover)",
        accentLight: "var(--accentLight)",
        accentDark: "var(--accentDark)",
        accentDarkHover: "var(--accentDarkHover)",

        darkAccent: "#163332",
        darkGrey: "#161617",
        middleGrey: "#232324",
        lightGrey: "#BABABA",
        radioInput: "#121A19",

        error: "#cc0a0a",
        errorHover: "#d8a3a3",
        rightAnswer: "#00e673",
        wrongAnswer: "#ff6633",
        edisma: "#ff3633",
        colorPick: "#0F1115",
        darkTest: "#ff0454",

        inputBackgroundSearchBar: "var(--input-search-bar)",

        shadowDarkColor: "var(--shadowDarkColor)",

      },
    },
  },
  plugins: [],
};
