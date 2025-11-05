import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const processEnv = typeof process !== 'undefined' ? process.env : { NODE_ENV: 'development' };

export default [
  // Fichiers à ignorer globalement
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'api/dist/**',
      'build/**',
      '.github/**',
      '*.md',
      '*.sql',
      '**/*.d.ts',
      'package-lock.json',
      '.idea/**',
      '.husky/**',
    ],
  },

  // Config commune JS/TS à tout le repo
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': processEnv.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': processEnv.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-undef': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // Frontend (navigateur)
  {
    files: ['mobile/**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        fetch: 'readonly',
      },
    },
    rules: {
      'no-alert': 'warn',
    },
  },

  // JS à la racine (ex: config)
  {
    files: ['*.{js,ts,tsx}'],
    languageOptions: {
      globals: {
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },

  // TypeScript strict, sélectionne le tsconfig selon le sous-dossier
  {
    files: ['mobile/**/*.ts', 'mobile/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./mobile/tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // Intégration de Prettier à la fin (toujours après tout le reste !)
  prettierConfig,
];
