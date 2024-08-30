import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:3001'
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
  };

  if (command === 'serve' && mode === 'development') {
    config.build.rollupOptions.input['tool'] = resolve(__dirname, 'tool.html');
  }

  return config;
});