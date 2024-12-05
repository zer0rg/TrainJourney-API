const eslintPlugin = require("@typescript-eslint/eslint-plugin");
const eslintParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: eslintParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPlugin,
    },
    rules: {
      quotes: ["error", "single"],
      semi: ["error", "never"],
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
