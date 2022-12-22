import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths({
            projects: ['tsconfig.json'],
        }),
    ],
    resolve: {
        alias: [
            {
                find: 'phaser/types/SpinePlugin',
                replacement: path.resolve('node_modules/phaser/types/SpinePlugin.d.ts'),
            },
        ],
    },
});
