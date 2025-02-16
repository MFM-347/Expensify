import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

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
          'Expense Tracker is an open-source tool to help you manage personal finances, track spending, and achieve financial goals. Modern UI, dark mode, mobile optimized.',
        theme_color: '#155dfc',
        background_color: '#f4f4f5',
        screenshots: [
          {
            src: '/screenshot.webp',
            sizes: '1920x1440',
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
  ],
  base: '/Expense-Tracker/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
