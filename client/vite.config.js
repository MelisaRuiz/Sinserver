import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/leaflet-draw/dist/images/*',
          dest: 'assets/images/leaflet-draw'
        },
        {
          src: 'node_modules/leaflet-draw/dist/leaflet.draw.css',
          dest: 'assets/css'
        }
      ]
    })
  ],
  base: '/',  // Asegúrate de que esta ruta coincida con el nombre de tu repositorio
  resolve: {
    alias: {
      'leaflet-draw': 'leaflet-draw/dist/leaflet.draw.js',
    }
  }
})
