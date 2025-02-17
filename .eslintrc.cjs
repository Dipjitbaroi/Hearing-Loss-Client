const commonConfig = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        "airbnb",
        "airbnb-typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // tsconfigRootDir: __dirname,
        // project: ["./tsconfig.json", "./tsconfig.node.json"],
    },
    plugins: ["react", "@typescript-eslint", "react-refresh", "prettier"],
    rules: {
        "prettier/prettier": [
            "warn",
            {
                endOfLine: "auto",
            },
        ],
        "no-console": "off",
        "linebreak-style": "off",
        "no-nested-ternary": "off",
        radix: "off",
        "no-underscore-dangle": "off",
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "react/jsx-no-constructed-context-values": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
        "react/prop-types": "off",
        "react/jsx-no-useless-fragment": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/naming-convention": "off",
        "global-require": ["warn"],
        "import/no-extraneous-dependencies": ["warn"],
        "import/extensions": ["off"],
        "import/order": "off",
        "import/prefer-default-export": "off",
        "react-refresh/only-export-components": ["off", { allowConstantExport: true }],
    },
}

module.exports = {
    // extends: "@kpz/lint/src/eslint.react.cjs",
    ...commonConfig,
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["tsconfig.json"], // this will defined on project label
    },
    ignorePatterns: ["node_modules", "dist"],
    rules: {
        ...commonConfig.rules,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
}
