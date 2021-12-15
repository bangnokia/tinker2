import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'build',
        chunkSizeWarningLimit: 5000
    },
    plugins: [react()]
})
