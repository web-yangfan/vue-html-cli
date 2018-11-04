const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


let entrysPath = path.join(config.paths.src, 'js')
let htmlPath = path.join(config.paths.src, 'html')


let entrys = utils.getEntries(entrysPath, '.js')
let htmlPluginConfig = utils.getHtmlPluginConfig(utils.getEntries(htmlPath, '.html'), entrys)




// 设置环境变量
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

let cssLoader = utils.getCssLoader(env)
let scssLoader = utils.getScssLoader(env)
 let jsLoader = utils.getJsLoader(env)
let vueLoader = utils.getVueLoader(env)
let imageLoader = utils.getImageLoader(env)
let mediaLoader = utils.getMediaLoader(env)
let fontsLoader = utils.getFontsLoader(env)


let baseConfg = {
  mode: 'development',
  entry: entrys,
  output: {
    filename: env == 'dev' ? 'js/[name].js' : 'js/[name]-[chunkhash].js',
    path: config[env].assetsRoot,
    // publicPath: config[env].assetsPublicPath
    publicPath: '/'
  },
  module: {
    rules: [cssLoader, scssLoader, jsLoader, vueLoader, imageLoader, mediaLoader, fontsLoader]
  },
  resolve: {
    // 字段补全的后缀名
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    // 关闭webpack警告
    hints:false
  },
  optimization: {
    splitChunks: {
      // 缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
      cacheGroups: {
        // 其次: 打包业务中公共代码
        // 缓存组信息，名称可以自己定义
        common: {
          test: /[\\/]src\/js[\\/]/,
          // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          chunks: "all",
          // 要生成的块的最小大小（以字节为单位）默认是3000,
          // 两个模块提取公共文件大小满足条件，就会生成 common~pageA~pageB.js
          minSize: 3000,
          // 表示被引用次数
          minChunks: 3,
        },
        // 首先: 打包第三方node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new VueLoaderPlugin(),
    // 单独打包css
    new MiniCssExtractPlugin({
      filename: env == 'dev' ? 'css/[name].css' :  'css/[name]-[chunkhash].css'
    }),
    new webpack.ProvidePlugin({
      $: "jquery", // 全局使用jquery
    })
  ]
}

// 合并配置plugins
baseConfg.plugins = [
  ...baseConfg.plugins,
  ...htmlPluginConfig
]


module.exports = baseConfg
