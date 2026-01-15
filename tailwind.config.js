/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenPrimary: "#1C7C54",
        greenMint: "#A3E4B8",
        greenLight: "#E8F8ED",
        greenDark: "#0D2F1F",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0px 4px 12px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
