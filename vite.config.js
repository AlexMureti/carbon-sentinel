import { defineConfig } from 'vite'  // Import Vite's config function—like pulling a toolbox.
import react from '@vitejs/plugin-react'  // Import React plugin—tells Vite "this is a React app, handle JSX magic."

export default defineConfig({  // Export the config object—Vite reads this on start.
  plugins: [react()],  // Array of plugins: Run React plugin to compile your .jsx files.
  server: { port: 5173 },  // Dev server on port 5173 (default is 5173, but explicit to avoid conflicts).
  css: {  // CSS section.
    postcss: './postcss.config.js',  // Point to PostCSS file (next one)—tells Vite "use this for CSS processing."
  },
})
