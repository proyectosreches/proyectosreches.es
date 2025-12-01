import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga todas las variables de entorno, incluyendo la API_KEY
  const env = loadEnv(mode, process.cwd(), '');

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
    // Define process.env.API_KEY globalmente para que el navegador pueda leerla
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
