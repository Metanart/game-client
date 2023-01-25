module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    browser: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {}, {
      usePrettierrc: true
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [['^react'], ['^vite'], ['^three'], ['uuid'], ['^@'], ['^classes'], ['^components'], ['^scenes'], ['^control'], ['^enums'], ['^types'], ['^tokens'], ['^constants'], ['^utils'], ['^assets'], ['^scss'], ['^../'], ['^./']]
    }],
    'simple-import-sort/exports': 'error',
    'no-unused-vars': [0, {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_'
    }]
  }
};