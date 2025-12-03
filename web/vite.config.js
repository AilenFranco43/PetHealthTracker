import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Force restart for react-icons


export default defineConfig({
  plugins: [react()],
})
