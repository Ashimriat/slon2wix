module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        debug: true,
        useBuiltIns: 'usage',
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-runtime',
  ]
};
