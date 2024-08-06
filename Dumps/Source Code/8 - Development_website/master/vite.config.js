import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resources/js/tinymce.js',
                'resources/css/armory.css',
            ],
            refresh: true,
        }),
    ],
    resolve : {
        alias : {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            '$': 'jQuery'
        }
    },
    build: {
        chunkSizeWarningLimit: 1600,
    }
});
