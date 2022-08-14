module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'next',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
  ],
  'settings': {
    'react': {
      'createClass': 'createReactClass',

      'pragma': 'React',
      'fragment': 'Fragment',
      'version': 'detect',


      'flowVersion': '0.53'
    },
    'propWrapperFunctions': [

      'forbidExtraProps',
      { 'property': 'freeze', 'object': 'Object' },
      { 'property': 'myFavoriteWrapper' },

      { 'property': 'forbidExtraProps', 'exact': true }
    ],
    'componentWrapperFunctions': [

      'observer',
      { 'property': 'styled' },
      { 'property': 'observer', 'object': 'Mobx' },
      { 'property': 'observer', 'object': '<pragma>' }
    ],
    'formComponents': [

      'CustomForm',
      { 'name': 'Form', 'formAttribute': 'endpoint' }
    ],
    'linkComponents': [

      'Hyperlink',
      { 'name': 'Link', 'linkAttribute': 'to' }
    ]
  },
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': ['error', { 'maximum': { 'single': 1, 'multi': 1 } }],
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-indent': [2, 2],
    'react/jsx-no-useless-fragment': ['error', 'always'],
    'react/jsx-one-expression-per-line': ['error', { 'allow': 'single-child' }],
    'react/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
    'react/jsx-curly-brace-presence': ['error', { props: 'always', children: 'never' }],
    'react/jsx-tag-spacing': ['error', { 'beforeClosing': 'proportional-always', 'beforeSelfClosing': 'proportional-always' }],
    'react/self-closing-comp': ['error', {
      'component': true,
      'html': true
    }],
    'react/destructuring-assignment': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { 'vars': 'all' }],
    'no-alert': 'warn',
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'no-console': [
      'error',
      {
        allow: [
          'warn',
          'error'
        ]
      }
    ],
  }
};
