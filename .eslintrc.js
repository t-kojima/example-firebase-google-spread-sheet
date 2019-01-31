module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'react-app'],
  plugins: ['import', 'react'],
  rules: {
    'max-len': 0,
    // 値を返すreturnと返さないreturnが混在しないこと
    'consistent-return': 1,
    'import/prefer-default-export': 0,
    'jsx-a11y/href-no-hash': 0,
    'react/prop-types': 0,
    'react/jsx-no-bind': 1,
    // JSXの変数は1行1個にすること
    'react/jsx-one-expression-per-line': 0,
    'react/sort-comp': 0,
    // map等でindexをキーにしないこと
    'react/no-array-index-key': 1,
    // 分割代入すること
    'react/destructuring-assignment': 1,
    // メンバの間に1行あけること
    'lines-between-class-members': 0,
    'object-curly-newline': 1,
    'implicit-arrow-linebreak': 1,
    'class-methods-use-this': 1,
    'arrow-parens': 1,
    'arrow-body-style': 1,
    'no-shadow': 1,
  },
};
