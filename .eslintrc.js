module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        commonjs: true,
        es2021: true,
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parser: '@babel/eslint-parser',
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': ['error', { allow: ['error', 'info'] }],
    'max-len': ["error", { "ignoreUrls": true, "code": 100 }],
    "global-require": 0,
    "import/no-extraneous-dependencies": "off",
  },
};
