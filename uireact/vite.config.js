//import { defineConfig } from 'vite';
//import plugin from '@vitejs/plugin-react';

//// https://vitejs.dev/config/
//export default defineConfig({
//    plugins: [plugin()],
//    server: {
//        port: 52608,
//    }
//})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/variables.scss";`,
            },
        },
    },
});