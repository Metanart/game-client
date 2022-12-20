module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    env: {
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended', // Make sure this is always the last element in the array.
    ],
    plugins: ['simple-import-sort', 'prettier'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^react'],
                    ['^@react'],

                    ['^vite'],
                    ['^@vite'],

                    ['^utils'],
                    ['^./'],
                    ['^assets'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'no-unused-vars': 0,
    },
};