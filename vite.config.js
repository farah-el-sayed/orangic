import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves this project from /orangic; Vercel serves it at the domain root.
  base: command === 'build' && !process.env.VERCEL ? '/orangic/' : '/',
}))

