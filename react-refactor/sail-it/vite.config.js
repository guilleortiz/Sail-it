import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-service-worker',
      writeBundle() {
        // Copia el service-worker.js de public/ a dist/
        try {
          copyFileSync(
            resolve(__dirname, 'public/service-worker.js'),
            resolve(__dirname, 'dist/service-worker.js')
          )
          console.log('✅ Service Worker copiado a dist/')
        } catch (error) {
          console.error('❌ Error copiando Service Worker:', error.message)
        }
      }
    }
  ]
})