import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga variables desde archivos .env si existen
  const env = loadEnv(mode, process.cwd(), '');
  
  // Intenta obtener la API KEY de todas las fuentes posibles
  // Prioridad: Variable de sistema > Variable en .env > Variable VITE_ en .env
  const apiKey = process.env.API_KEY || env.API_KEY || env.VITE_API_KEY || '';

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
      emptyOutDir: true,
    },
    server: {
      host: true
    },
    base: '/',
    // Define process.env.API_KEY globalmente reemplazándolo por el valor string
    // Esto hace que en el código del navegador process.env.API_KEY sea igual a "tu_clave"
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});
