import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwind(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: 'Expense Tracker',
        short_name: 'ExpenseTrack',
        description:
          'Track your expenses effortlessly with this modern, high-performance PWA. Enjoy a user-friendly UI, dark mode, offline support, local storage, smooth transitions, and privacy-focused expense management. Import/export data as JSON—zero backend required.',
        theme_color: '#155dfc',
        background_color: '#f4f4f5',
        screenshots: [
          {
            src: '/screenshot.webp',
            sizes: '2400x1260',
            type: 'image/webp',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,webp,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
    Sitemap({
      hostname: 'https://mfm-347.github.io/Expense-Tracker/',
      changefreq: 'weekly',
      generateRobotsTxt: true,
    }),
  ],
  base: '/Expense-Tracker/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
