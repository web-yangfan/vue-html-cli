const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const devConfig = require('./devConfig')

let webpackDevConfig = merge(webpackBase, {
  mode: 'development',
  devServer: {
    port: devConfig.port,
    // 配置webpack proxy
    proxy: devConfig.proxy,
    contentBase: './dist',
    hot: true,
    host: 'localhost',
    overlay: true, // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
    clientLogLevel: 'none',  // 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息
    //  webpack 的错误或警告在控制台不可见
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = webpackDevConfig
