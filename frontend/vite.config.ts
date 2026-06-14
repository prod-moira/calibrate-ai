import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // cast to any to avoid cross-package vite type mismatch in workspaces
  plugins: [react() as any],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, '../shared/types'),
    },
  },
  server: {
    host: true,  // ← add this
    port: 5173,
    proxy: {
      '/exposure': 'http://localhost:3001',
    },
  },
});
