import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other paths that contain Tailwind classes
  ],
  darkMode: 'class', // or 'media' based on your preference
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          light: '#f3f4f6', // bg-gray-100
          dark: '#111827',  // bg-gray-900
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          light: '#111827', // gray-900
          dark: '#f3f4f6', // gray-100
        },
      },
    },
  },
  plugins: [],
};

export default config;