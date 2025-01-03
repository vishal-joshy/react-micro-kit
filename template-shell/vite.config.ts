import path from 'path';

import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    federation({
      name: 'host-app',
      remotes: {
        RemoteApp1: {
          external: `Promise.resolve(window.remote_host1)`,
          externalType: 'promise',
          from: 'vite',
        },
        RemoteApp2: {
          external: `Promise.resolve(window.remote_host2)`,
          externalType: 'promise',
          from: 'vite',
        },
      },
      shared: {
        react: { requiredVersion: '^18.2.0' },
        'react-dom': { requiredVersion: '^18.2.0' },
        'chista-state-manager': { version: '1.0.4' },
        'shared/components': {
          packagePath: './src/shared/components',
        },
        'shared/config': {
          packagePath: './src/shared/config',
        },
      },
    }),
  ],
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: 'build',
    target: 'esnext',
  },
});
