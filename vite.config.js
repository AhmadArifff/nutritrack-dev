import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.svg', 'icons/icon-512.svg', 'screenshots/dashboard-desktop.svg'],
      manifestFilename: 'manifest.webmanifest',
      manifest: {
        name: 'NutriTrack',
        short_name: 'NutriTrack',
        description: 'React PWA untuk tracking kalori, meal plan, progress berat badan, dan analisis nutrisi.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8f9ff',
        theme_color: '#007a35',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icons/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/dashboard-desktop.svg',
            sizes: '1280x720',
            type: 'image/svg+xml',
            form_factor: 'wide'
          }
        ],
        shortcuts: [
          {
            name: 'Log Makan Sekarang',
            short_name: 'Log Makan',
            description: 'Catat makanan sekarang',
            url: '/app/log-food'
          },
          {
            name: 'Catat Berat Badan',
            short_name: 'Catat BB',
            description: 'Input berat badan hari ini',
            url: '/app/progress'
          }
        ]
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}']
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173
  }
})
