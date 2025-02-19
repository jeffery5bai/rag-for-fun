import globals from "globals";
import pluginJs from "@eslint/js";
import { default as tseslint } from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";
import pluginReactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect"
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    plugins: {
      react: pluginReact,
      "jsx-a11y": pluginJsxA11y,
      "import": pluginImport,
      "react-hooks": pluginReactHooks
    },
    rules: {
      // Airbnb style rules
      "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React import
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never"
        }
      ],
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  pluginReact.configs.recommended,
  pluginJsxA11y.configs.recommended
];