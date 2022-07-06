module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'import', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '(react|next)/**',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
  },
};
