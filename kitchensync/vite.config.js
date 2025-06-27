import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    css: {
        devSourcemap: false,
    },
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    store: ['zustand'],
                    http: ['axios'],
                }
            }
        }
    },
    server: {
        fs: {
            strict: false
        }
    }
})