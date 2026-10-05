import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],

  base: '/ai-coach-app/',

  build: {
    outDir: process.env.YOGAVERSE_SITE_DIR
      ? path.resolve(process.env.YOGAVERSE_SITE_DIR, 'ai-coach-app')
      : 'dist',

    emptyOutDir: true,
  },
})

