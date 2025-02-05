/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["poppins", "sans-serif"],
    },
    extend: {
      transitionDelay: {
        5000: "5000ms",
      },
      animation: {
        "intro-bounce": "bounce 2s 2",
        "intro-slide": "slide_up 3s 1",
        "intro-unhide": "unhide 4.5s 1",
        text: "text 5s ease infinite",
        pop: "pop 0.5s 1"
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "300% 300%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "300% 300%",
            "background-position": "right center",
          },
        },
        slide_up: {
          "0%": { transform: "translateY(250%)" },
          "100%": { transform: "translateY(0%)" },
        },
        unhide: {
          "0%, 75%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pop: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0%)" },
        }
      },
      colors: {
        shark: {
          50: "#f6f7f9",
          100: "#eceff2",
          200: "#d4dbe3",
          300: "#aebccb",
          400: "#8297ae",
          500: "#637b94",
          600: "#4e637b",
          700: "#405064",
          800: "#384454",
          900: "#323c48",
          950: "#222831",
        },
        kimberly: {
          50: "#f3f7fa",
          100: "#eaeef5",
          200: "#d9e1ec",
          300: "#c1cde0",
          400: "#a7b4d2",
          500: "#919dc3",
          600: "#7982b2",
          700: "#7077a1",
          800: "#555c7e",
          900: "#494e66",
          950: "#2a2c3c",
        },
        tacao: {
          50: "#fef6ee",
          100: "#fdead7",
          200: "#fad2ae",
          300: "#f6b17a",
          400: "#f18746",
          500: "#ee6721",
          600: "#df4f17",
          700: "#b93a15",
          800: "#932f19",
          900: "#772a17",
          950: "#40120a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
