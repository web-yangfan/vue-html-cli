const path = require('path')
const fg = require('fast-glob')
const config = require('./config')
const packageConfig = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

exports.resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}



exports.getCssLoader = (env) => {
  return {
    test: /\.css$/,
    use: [
      env == 'dev' ? 'css-hot-loader' : '',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: config[env].sourceMap
        }
      }
    ]
  }
}

exports.getScssLoader = (env) => {
  return {
    test: /\.scss$/,
    use: [
      env == 'dev' ? 'css-hot-loader' : '',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: config[env].sourceMap
        }
      },
      {
        // css添加前缀
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins:() => [
            require('autoprefixer')( {"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]} )
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: config[env].sourceMap
        }
      }
    ]
  }
}

exports.getJsLoader = (env) => {
  return {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    include: [path.resolve(config.paths.src, 'js')],
    use: {
      loader: 'babel-loader',
      options: {
        // 创建缓存
        cacheDirectory: path.resolve(config.paths.build, 'tmp')
      }
    }
  }
}

exports.getVueLoader = (env) => {
  return {
    test: /\.vue$/,
    use: ['vue-loader']
  }
}

exports.getImageLoader = (env) => {
 return {
   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
   loader: 'url-loader',
   options: {
     limit: 10000,
     name: env == 'dev' ? 'static/img/[name].[ext]' : 'static/img/[name]-[hash:7].[ext]'
   }
 }
}

exports.getMediaLoader = (env) => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: env == 'dev' ? 'static/media/[name].[ext]' :  'static/media/[name]-[hash:7].[ext]'
    }
  }
}

exports.getFontsLoader = (env) => {
  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: env == 'dev' ? 'static/fonts/[name].[ext]' : 'static/fonts/[name].[chunkhash].[ext]'
    }
  }
}






/*
* 遍历 src目录
* 遍历目录是 src/js下子目录的所有js文件，返回一个数组，数组里是遍历的js文件绝对路径
* 文件命名：只返回 字母开头，不包含：字母、数字、_、-、"以外"符号文件
* 最后返回下面格式的数据
  {
    about: './src/js/about/about.js',
    index: './src/js/index/index.js'
  }
* */
exports.getEntries = (dirSrc, extensions) => {
  let result = {}
  let validExt = extensions || ['.js']
  
  fg.sync([dirSrc + '/**/*' + validExt]).map((filePath) => {
    
    const extension = path.extname(filePath)  // 获取文件类型后缀
    const basename = path.basename(filePath, validExt) // 获取基本名称，不带文件类型后缀
  
    // 判断后缀名是否匹配
    if (extension != validExt) return false
    
    // 以下划线开头的不匹配
    if (basename[0] == '_') return false
    
    // 文件名必须: 字母开头，不能包含：字母、数字、_、-、"以外"的符号
    if (!basename.match(/^[A-Za-z_0-9-]+$/)) return false
    result[basename] = filePath
  })
  return result
}

exports.getHtmlPluginConfig = (fileList, entrys) => {
  let htmlPlugin = []
  let noHtml = [] // 保存在entry建立入口文件（js），但是没有建立对应的html文件的文件名
  for(let page in entrys) {
    // 如果不存在，就跳过本次循环
    if (!fileList[page]) {
      noHtml.push(page)
      continue
    }
    let conf = {
      filename: `${page}.html`,
      // 模板路径
      template: fileList[page].replace(/.js$/gi, '.html'),
      inject: true,
      /*
        * excludeChunks 排除出自己外的所有模块
        * 举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己入口js，下面例子
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html',
          inject: true,
          excludeChunks: ['about']
        }),
        new HtmlWebpackPlugin({
          filename: 'about.html',
          template: './src/about.html',
          inject: true,
          excludeChunks: ['index']
        })
        * */
      excludeChunks: Object.keys(fileList).filter(item => {
        return (item != page)
      })
    }
    conf.excludeChunks = [...conf.excludeChunks, ...noHtml]
    htmlPlugin.push(new HtmlWebpackPlugin(conf))
  }
  return htmlPlugin
}

exports.createNotifierCallback = () => {
  // node 提示插件，出现错误会在右上角提示
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return
    
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    
    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

