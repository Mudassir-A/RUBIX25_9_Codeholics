import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dsv from '@rollup/plugin-dsv';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  dsv()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
