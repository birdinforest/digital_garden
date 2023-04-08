/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: [path.resolve(__dirname, '..', 'lib')],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel', '@babel/preset-typescript'],
          },
        },
      ],
    });

    return config;
  },
};
