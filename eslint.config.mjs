import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import grafanaConfig from '@grafana/eslint-config/flat.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/**
 * Config
 */
export default defineConfig(
  ...grafanaConfig,
  prettierConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['strictCamelCase', 'StrictPascalCase'],
          leadingUnderscore: 'allow',
          filter: {
            regex: '^__html$',
            match: false,
          },
        },
        {
          selector: 'variable',
          modifiers: ['global'],
          format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['StrictPascalCase'],
        },
        {
          selector: 'typeParameter',
          format: ['StrictPascalCase'],
          prefix: ['T', 'K'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
        {
          selector: ['classProperty', 'objectLiteralProperty'],
          format: null,
          modifiers: ['requiresQuotes'],
        },
      ],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'no-console': ['error', {}],
      'no-debugger': 'error',
    },
  },
  globalIgnores([
    '.config/*',
    '.prettierrc.js',
    'coverage/*',
    'dist/*',
    'eslint.config.mjs',
    'jest*.js',
    'playwright.config.ts',
    'server-json/*',
    'server-delay/*',
    'server-mysql/*',
    'server-pg/*',
    'src/__mocks__/**',
    'src/**/*.test.ts*',
    'test/*',
    'playwright-report/**',
    'webpack.config.ts',
  ])
);
