// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     global: 'window',
//   },
//   server: {
//     allowedHosts: ['wizard.rdsoft.in.net'],
//   },
//   base:'/',
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
    allowedHosts: ['wizard.rdsoft.in.net'],
  },
});