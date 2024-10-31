import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/leaflet-draw/dist/images/*',
          dest: 'public/assets/images/leaflet-draw'
        }
      ]
    })
  ],
  base: '/',
  resolve: {
    alias: {
      'leaflet-draw': 'leaflet-draw/dist/leaflet.draw.js',
    }
  }
})
