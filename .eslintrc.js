module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  globals: {
    HeyUI: true,
    Utils: true,
    // "Manba": true,
    // "Vue": true,
    R: true,
    G: true,
    log: true,
    Model: true
    // "BMap": true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
