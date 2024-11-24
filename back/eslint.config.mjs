import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.strict
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {},
    plugins: {},
    rules: {
      "no-console": "warn",
    },
  },
)
