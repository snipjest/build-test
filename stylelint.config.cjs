module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended', 'stylelint-config-tailwindcss'],
  plugins: [],
  rules: {
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    'no-descending-specificity': [null, { severity: 'warning' }],
    'block-no-empty': process.env.NODE_ENV === 'production' ? true : null,
    'color-hex-length': 'long',
    'selector-class-pattern': [
      // Позволяет использовать BEM: block__element--modifier
      '^[a-z0-9]+(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$',
      {
        message: 'Expected class selector to be BEM (block__element--modifier) and in kebab-case'
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      customSyntax: 'postcss-html'
    }
  ]
}
