import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' must be set to './' (relative) or your repo name '/repo-name/' 
  // so assets load correctly on GitHub Pages (which is a subdirectory).
  base: './',
})