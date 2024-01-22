// webpack.config.js

const path = require('path');

module.exports = {
  // ... other configurations

  output: {
    filename: '[name].[contenthash:8].js',
    // other output configurations...
  },

  module: {
    rules: [
      // ... other rules
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // ... other babel options
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'file-loader'],
      },
    ],
  },
};
