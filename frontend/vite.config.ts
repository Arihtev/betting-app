import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['test/**/*.spec.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
});
