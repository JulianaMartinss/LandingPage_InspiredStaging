import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/LandingPage_InspiredStaging/', // ⚠ Coloque exatamente o nome da sua repo
  plugins: [react()],
})
