const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config= require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let fileList = utils.getFileList()

///path.resolve(config.paths.src, 'js')
let baseConfg = {
  entry: fileList.entry,
  output: {
    filename: 'js/[name].js',
    path: config.paths.build,
    publicPath: config.paths.root
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(config.paths.src, 'js'),
        use: {
          loader: 'babel-loader',
          options: {
            // 创建缓存
            cacheDirectory: path.resolve(config.paths.build, 'tmp')
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test:/\.css$/,
        use:[
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test:/\.scss$/,
        use:[
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ],
  },
  performance: {
    // 关闭资源超过 250kb警告
    hints: false,
  },
  resolve: {
    // 字段补全的后缀名
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // 单独打包css
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
  ]
}

// 合并配置plugins
baseConfg.plugins = [
  ...baseConfg.plugins,
  ...utils.getHtmlWebpackPluginArray(fileList.htmlWebpack)
]


module.exports = baseConfg
