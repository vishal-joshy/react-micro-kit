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
    // Example config for remote app
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteApp': './src/App',
      },
      shared: {
        react: { version: '^18.2.0' },
        'react-dom': { version: '^18.2.0' },
        // 'shared/components': {
        //   packagePath: './src/shared/components',
        //   import: false,
        //   generate: false
        // },
        // ...
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
