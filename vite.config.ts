import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vehicles-queue',
  plugins: [react()],
  resolve: {
    alias: { src: '/src' },
  },
  server: { port: 3001 },
});
