module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],

      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react+(|-native)'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/no-useless-path-segments': 2,
  },
};
