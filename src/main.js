import { ViteSSG } from 'vite-ssg/single-page'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

export const createApp = ViteSSG(App, ({ app }) => {
  app.use(createPinia())
})
