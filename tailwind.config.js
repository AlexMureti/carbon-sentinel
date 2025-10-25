/** @type {import('tailwindcss').Config} */  // JSDoc comment—tells editor "this is Tailwind config."
export default {  // Export object—Tailwind reads this.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],  // Scan paths: Look in HTML and all src files for classes like "p-4".
  theme: { extend: {} },  // Theme: Extend defaults (empty for now—no custom colors/fonts yet).
  plugins: [],  // Plugins: Empty array—no extras like forms yet.
}
