import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern:
        /(from|via|to)-(gold|deep-green|burnt-orange|brown|cream|ink|charcoal)(-light|-dark)?/,
    },
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B8933F",
          light: "#D4B268",
          dark: "#8F701F",
        },
        "deep-green": {
          DEFAULT: "#0B6E4F",
          light: "#12946B",
          dark: "#074A35",
        },
        "burnt-orange": {
          DEFAULT: "#C1502E",
          light: "#DB7A52",
          dark: "#93381F",
        },
        brown: {
          DEFAULT: "#5A3A29",
          light: "#7A5240",
          dark: "#3E271A",
        },
        cream: {
          DEFAULT: "#F8F4EC",
          dark: "#EDE4D3",
        },
        ivory: {
          DEFAULT: "#FBF8F1",
        },
        "gold-wash": {
          DEFAULT: "#F6EEDD",
        },
        bronze: {
          DEFAULT: "#8C6239",
          light: "#A67C4E",
          dark: "#6B4A28",
        },
        marigold: {
          DEFAULT: "#F5A623",
          light: "#FBC552",
          dark: "#C97F0D",
        },
        ink: "#241C15",
        charcoal: {
          DEFAULT: "#211C17",
          light: "#3A322B",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        fancy: ["var(--font-fancy)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
