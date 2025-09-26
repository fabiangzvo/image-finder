// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";

export default withNuxt({
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsParser,
    },
  },
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "default"],
      },
    ],
  },
});
