import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga todas las variables de entorno, incluyendo la API_KEY
  const env = loadEnv(mode, process.cwd(), '');
  
  // Buscar la API Key en varias variables posibles para asegurar compatibilidad
  const apiKey = env.API_KEY || env.VITE_API_KEY || process.env.API_KEY;

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
    // Define process.env.API_KEY globalmente con la clave encontrada
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});
