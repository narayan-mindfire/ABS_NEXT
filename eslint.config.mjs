import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
      "react/jsx-no-undef": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external"], "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      "jsx-a11y/alt-text": "warn",
      "consistent-return": "error",
    },
  },
];

export default eslintConfig;
