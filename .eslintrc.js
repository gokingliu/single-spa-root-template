module.exports = {
  root: true,
  env: { node: true },
  parser: 'vue-eslint-parser',
  extends: ['prettier', 'plugin:vue/vue3-essential', '@gokingliu/eslint-config', '@vue/typescript/recommended'],
  plugins: ['vue'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
