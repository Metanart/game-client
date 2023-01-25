import path from 'path';
import { StorybookViteConfig } from '@storybook/builder-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';

const config: StorybookViteConfig = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-vite',
    },
    features: {
        storyStoreV7: true,
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    async viteFinal(config) {
        // Merge custom configuration into the default config
        return mergeConfig(config, {
            // Use the same "resolve" configuration as your app
            // @ts-ignore
            resolve: (await import('../vite.config.ts')).default.resolve,
            // Add dependencies to pre-optimization
            optimizeDeps: {
                include: ['storybook-dark-mode'],
            },
            plugins: [
                tsconfigPaths({
                    // eslint-disable-next-line no-undef
                    projects: [path.resolve(__dirname, '../tsconfig.json')],
                }),
            ],
        });
    },
};

export default config;
