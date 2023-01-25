import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths({
            // eslint-disable-next-line no-undef
            projects: [path.resolve(__dirname, './tsconfig.json')],
        }),
    ],
});
