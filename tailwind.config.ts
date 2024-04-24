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
      colors:{
        jsPrimary100: "#ffdc73",
        jsPrimary200: "#ffcf40",
        jsPrimary300: "#ffbf00",
        jsPrimary400: "#bf9b30",
        jsPrimary500: "#a67c00",
      }
    },
  },
  plugins: [],
};
export default config;
