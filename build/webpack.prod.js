const path = require('path')
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const webpackBase = require('./webpack.base')


let webpackProdConfig = merge(webpackBase, {
  mode: 'production',
  optimization: {
    minimizer: [
      // 压缩css
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // 编译前清除 dist目录
    new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '..')})
  ]
})
module.exports = webpackProdConfig
