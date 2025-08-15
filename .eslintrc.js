// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Парсер для TypeScript
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'tailwindcss'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // React
    'react/react-in-jsx-scope': 'off', // Не нужно для CRA 17+
    'react/prop-types': 'off',

    // Импорты
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Tailwind
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',

    // Общие
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      // путь к твоему tailwind.config.js
      config: './tailwind.config.js',
      // optional: сканировать jsx/tsx файлы для классов
      applyComplexClasses: true,
    },
  },
};
