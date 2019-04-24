const path = require('path');
const nodeExternals = require('webpack-node-externals');

const mode = 'production';
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = [
  // Client configuration
  {
    mode,
    entry: path.join(src, 'client'),
    output: {
      path: dist,
      filename: 'client.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [src],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { modules: false }],
                  '@babel/preset-react'
                ],
              },
            },
          ],
        },
      ],
    },
  },
  // Server configuration
  {
    mode,
    target: 'node',
    entry: src,
    output: {
      path: dist,
      filename: 'server.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [src],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { node: 'current' }}],
                  '@babel/preset-react'
                ],
              },
            },
          ],
        },
      ],
    },
    externals: [
      nodeExternals(),
    ],
  },
];
