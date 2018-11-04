const path = require('path')
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin')
const webpackBase = require('./webpack.base.conf')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const config = require('./config')


let webpackProdConfig = merge(webpackBase, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      // 压缩css
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    // 生成manifest.json
    new ManifestPlugin()
  ]
})


module.exports = webpackProdConfig
