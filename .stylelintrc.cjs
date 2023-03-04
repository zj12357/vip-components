module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-config-prettier',
    ],
    plugins: ['stylelint-order'],
    rules: {
        indentation: 4,
        'selector-pseudo-class-no-unknown': null,
        'no-descending-specificity': null,
        'at-rule-no-unknown': null,
        'font-family-no-missing-generic-family-keyword': null,
        'selector-type-no-unknown': null,
        'no-empty-source': null,
        'font-family-no-duplicate-names': null,
        'function-comma-space-after': null,
        'number-leading-zero': null,
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep'],
            },
        ],
    },
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
    overrides: [
        {
            files: ['*.less', '**/*.less'],
            customSyntax: 'postcss-less',
            extends: ['stylelint-config-standard'],
        },
        {
            files: ['*.scss', '**/*.scss'],
            customSyntax: 'postcss-scss',
            extends: ['stylelint-config-standard'],
        },
    ],
};
