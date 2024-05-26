import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jsPrimary100: "#B89010",
        jsPrimary200: "#C8A008",
        jsBlue: "#082838",
        jsBlack: "#646c70",
      },
    },
  },
  plugins: [],
};
export default config;
