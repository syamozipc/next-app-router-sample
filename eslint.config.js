import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**', '**/public/**', 'next-env.d.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
      sourceType: 'module',
    },
  },
  js.configs.recommended,
  prettierConfig,
  {
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
      'no-relative-import-paths': noRelativeImportPaths,
      react: reactPlugin,
      'react-hooks': reactHooks,
      unicorn,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-undef': 'off',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/google-font-display': 'warn',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],

      'comma-dangle': ['error', 'always-multiline'],
      curly: ['error', 'multi-line'],
      eqeqeq: 'error',
      'import/no-unused-modules': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'unknown'],
          'newlines-between': 'never',
        },
      ],

      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-irregular-whitespace': 'off',
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: false, prefix: '@', rootDir: 'src' },
      ],
      'no-unused-vars': 'off',
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      semi: ['error'],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
  },
];
