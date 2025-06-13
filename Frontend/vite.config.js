import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],test: {
    environment: 'jsdom',  // Para simular navegador
    globals: true,         // Permite usar expect, test, describe sin importarlos
    setupFiles: './src/setupTests.js',  // Archivo para configuraciones globales
    coverage: {
      reporter: ['text', 'json', 'html'],  // Reportes de cobertura
    }
  }
})
