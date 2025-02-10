import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separate vendor libraries
          }
        },
      },
    },
    chunkSizeWarningLimit:10000,
  },
  plugins: [react()],
  server: { port: 5173 }
});
