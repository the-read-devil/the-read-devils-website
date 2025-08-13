import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    open: false,
    host: true,
    port: 5173,
    strictPort: true,
  },
});

