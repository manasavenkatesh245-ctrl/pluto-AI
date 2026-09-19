import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pluto runs fully in-browser. There is no backend, no routing, no database.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5199,
    strictPort: false,
    host: true,
  },
  preview: {
    port: 5199,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
  },
});
