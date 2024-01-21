module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/require-await': 'warn',
        'array-callback-return': 'warn',
        'comma-dangle': ["warn", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "only-multiline"
        }],
        'dot-notation': 'warn',
        'eol-last': ['warn', 'always'],
        'max-len': ['warn', { 'code': 140 }],
        'no-multiple-empty-lines': ["warn", { "max": 2 }],
        'no-debugger': 'warn',
        'no-return-await': 'warn',
        'no-shadow': 'off',
        'no-trailing-spaces': 'warn',
        'no-unneeded-ternary': 'warn',
        'no-unused-expressions': 'warn',
        'quotes': ['warn', 'single'],
        'require-await': 'off',
        'semi': ['warn', 'always'],
        "spaced-comment": ["warn", "always"],
        'yoda': 'warn',
    },
};