module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["react", "import", "react-hooks", "jsx-a11y"],
  rules: {
    "linebreak-style": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "warn",
    "react/prop-types": "off",
    "react/button-has-style": "warn",
    "react/self-closing-comp": [
      "warn",
      {
        component: true,
        html: false,
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        shorthandFirst: true,
        callbacksLast: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        multiline: "last",
      },
    ],
    "import/default": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent", "index"],
          "type",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "{react*,react*/**}",
            group: "external",
            position: "before",
          },
          {
            pattern: "{./**/*.modules.css,./**/*.css}",
            group: "unknown",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "unknown"],
        "newlines-between": "always-and-inside-groups",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "jsx-a11y/anchor-has-content": [
      "warn",
      {
        component: ["Link"],
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        components: ["Link"],
      },
    ],
  },
};
