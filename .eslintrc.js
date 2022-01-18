module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "always"],
    indent: ["error", 3],
    "no-multi-spaces": ["error"],
    "@typescript-eslint/explicit-function-return-type": "on"
  },
};
