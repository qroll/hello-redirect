const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const PATH = {
  BUILD: path.resolve(__dirname, 'build/'),
  ENTRY: path.resolve(__dirname, 'index.js'),
  BUNDLE_NAME: 'bundle.js'
};

var nodeModules = {};
fs
  .readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const server = {
  entry: [PATH.ENTRY],
  output: {
    filename: PATH.BUNDLE_NAME,
    path: PATH.BUILD
  },
  externals: nodeModules,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  }
};

module.exports = [server];
