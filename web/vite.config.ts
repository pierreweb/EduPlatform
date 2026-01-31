import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    // Load env file from the root directory
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react()],
        define: {
            API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL || 'http://localhost:3000')
        },
        server: {
            host: '0.0.0.0',
            port: 5173,
            watch: {
                usePolling: true
            }
        }
    }
})
