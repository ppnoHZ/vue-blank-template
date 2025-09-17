export default {
  extends: ['@qes/stylelint-config'],
  // Enable Less-specific parsing & overrides
  root: true,
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      rules: {
        // Allow // comments used in Less code
        'no-invalid-double-slash-comments': null,
        // Treat Less mixins used as functions (.vw(), .vh()) as known
        'function-no-unknown': [
          true,
          { ignoreFunctions: ['vw', 'vh', '.vw', '.vh'] }
        ],
        // Disable strict value parsing for custom helpers
        'declaration-property-value-no-unknown': null,
        // Ignore false positives from Less variable-like at-rules (@menu-min-width:)
        'scss/at-rule-no-unknown': null,
        'at-rule-no-unknown': null,
        // Allow legacy / unconventional class naming (uppercase, underscores, etc.)
        'selector-class-pattern': null,
        // Ignore property name '//' artifacts created by parser when encountering inline comments
        'property-no-unknown': null
      }
    },
    {
      // Ensure <style lang="less"> inside Vue SFCs also bypass these rules
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'function-no-unknown': null,
        'declaration-property-value-no-unknown': null,
        'no-invalid-double-slash-comments': null,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': null,
        'selector-class-pattern': null,
        'property-no-unknown': null
      }
    }
  ],
  rules: {
    // Global disables / relaxations matching project conventions
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    'no-invalid-double-slash-comments': null,
    'declaration-property-value-no-unknown': null,
    'property-no-unknown': null,
    'selector-class-pattern': null,
    // Ignore Vue scoped deep combinators
    'selector-pseudo-class-no-unknown': [
      true,
      {
        // stylelint expects names WITHOUT the leading ':'
        ignorePseudoClasses: ['deep']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    // Allow custom less helper/mixin calls used as values (e.g. padding: .vw(14px);)
    // Completely disable since Less mixins consistently trigger false positives
    'function-no-unknown': null
  }
}
