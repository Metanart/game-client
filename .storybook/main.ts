import path from 'path';
import { mergeConfig, loadConfigFromFile } from 'vite';

const config = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    core: {
        builder: '@storybook/builder-vite',
    },
    features: {
        storyStoreV7: true,
    },
    typescript: {
        check: true,
        skipBabel: true,
    },
    async viteFinal(config, { configType }) {
        // @ts-ignore
        const { config: userConfig } = await loadConfigFromFile(
            // @ts-ignore
            path.resolve(__dirname, '../vite.config.ts'),
        );

        return mergeConfig(config, {
            ...userConfig,
        });
    },
    docs: {
        autodocs: true,
    },
};
export default config;
