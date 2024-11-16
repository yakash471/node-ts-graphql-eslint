// eslint.config.js
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
});
