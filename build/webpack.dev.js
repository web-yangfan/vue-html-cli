const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const devConfig = require('./devConfig')
const utils = require('./utils')
// portfinder 检查端口是否被占用,如果被占用会重新设置一个
const portfinder = require('portfinder')
// webpack错误并清理、聚合和优先化
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

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

// module.exports = webpackDevConfig

module.exports = new Promise((resolve, reject) => {
  
  portfinder.basePort = devConfig.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      webpackDevConfig.devServer.port = port
      // 添加插件
      webpackDevConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackDevConfig.devServer.host}:${port}`],
        },
        onErrors: true ? utils.createNotifierCallback() : undefined
      }))
      resolve(webpackDevConfig)
    }
  })
})

