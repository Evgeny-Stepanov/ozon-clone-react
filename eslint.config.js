import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import checkFile from 'eslint-plugin-check-file';
import { fixupPluginRules } from '@eslint/compat';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      'dist',
      'node_modules',
      'generators/*',
      '**/*.config.js',
      'fetch-data.mjs',
      'public/mockServiceWorker.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: fixupPluginRules(importPlugin),
      'jsx-a11y': jsxA11y,
      'check-file': checkFile,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // --- RULE 1: RESTRICTED ROUTES (ZONES) ---
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/features/products',
              from: './src/features',
              except: ['./products'],
            },
            {
              target: './src/features',
              from: './src/app',
            },
            {
              target: [
                './src/components',
                './src/hooks',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
            },
          ],
        },
      ],

      // --- RULE 2: ORDER OF IMPORTS ---
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'import/no-cycle': 'error',

      // --- ACCESSIBILITY (A11y) ---
      ...jsxA11y.flatConfigs.recommended.rules,

      // ---FILE STYLE (kebab-case) ---
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'KEBAB_CASE' },
      ],

      // --- STRICKNESS ---
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/prop-types': 'off',
    },
  },
  eslintConfigPrettier,
);
