import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This 'base' path is mandatory for GitHub Pages to find your files
  base: '/portfolio/', 
})