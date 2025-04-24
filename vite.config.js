import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //added to support react app on mobile
  /* server: {
    host: '0.0.0.0', // This allows other devices on the same network to access your app
    port: 3000, // Optional, but you can specify a custom port
  } */
})
