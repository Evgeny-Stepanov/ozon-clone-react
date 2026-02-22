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
    // Global ignores (instead of globalIgnores)
    ignores: ['dist', 'node_modules', 'generators/*', '**/*.config.js'],
  },
  // Basic recommendations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // Fixing compatibility issues with Flat Config for older plugins
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
      // It is important for import rules that TS understands the paths
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
      // Recommendations for React hooks
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // --- IMPORT ORDER (from Bulletproof) ---
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // react, fs...
            'external', // libraries from node_modules
            'internal', // your aliases @/components...
            'parent', // ../
            'sibling', // ./
            'index', // ./index
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-cycle': 'error', // Banning cycles

      // --- ACCESSIBILITY (A11y) ---
      ...jsxA11y.flatConfigs.recommended.rules,

      // --- FILE STYLE (kebab-case) ---
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'KEBAB_CASE' },
      ],

      // --- ADDITIONAL STRICKNESS ---
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/prop-types': 'off', // In TS, props are type-checked.
    },
  },
  eslintConfigPrettier,
);
