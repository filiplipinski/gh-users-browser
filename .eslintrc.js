module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
};
