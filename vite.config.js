import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, {transformAssetUrls} from "vite-plugin-vuetify";
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls
            }
        }),
        vuetify({
            autoImport: true
        }),
    ],
    server: {
        port: 8080
    }
})
