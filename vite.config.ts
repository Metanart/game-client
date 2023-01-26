import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        eslint(),
        tsconfigPaths({
            // eslint-disable-next-line no-undef
            projects: [path.resolve(__dirname, './tsconfig.json')],
        }),
    ],
});
