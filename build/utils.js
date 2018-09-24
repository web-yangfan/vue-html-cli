const path = require('path')
const fg = require('fast-glob')
const packageConfig = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}


/*
* 遍历 src目录
* 遍历目录是 src/js下子目录的所有js文件，返回一个数组，数组里是遍历的js文件绝对路径
* 最后返回下面格式的数据
  {
    entry:{ about: './src/js/about/about.js', index: './src/js/index/index.js' },
    htmlWebpack: { about: './src/about.html', index: './src/index.html' }
  }
* */
exports.getFileList = () => {
  let result = {
    entry: {},
    htmlWebpack: {}
  }
  
  // 定义正则，过滤路径，让其符合entry 配置规则
  let rootPath = path.join(__dirname, '..')
  let jsReg = new RegExp(`^${rootPath}`,'gi')
  
  fg.sync([exports.resolve('src/js/*/*.js')]).map((val) => {
    let filePath = val.replace(jsReg, '.')
    let newArr = val.split('/')
    let jsName = newArr[newArr.length - 1].replace(/.js$/gi, '')
    result.entry[jsName] = filePath
    result.htmlWebpack[jsName] = `./src/${jsName}.html`
  })
  return result
}

/*
* 循环HtmlWebpackPlugin，返回数组
* */
exports.getHtmlWebpackPluginArray = (list) => {
  let arr = []
  for (let page in list) {
    let conf = {
      filename: `${page}.html`,
      template: list[page], // 模板路径
      inject: true,
      /*
      * excludeChunks 允许跳过某些chunks, 而chunks告诉插件要跳过entry里面的哪几个入口
      * filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
      * 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己入口js，下面例子
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
      excludeChunks: Object.keys(list).filter(item => {
        return (item != page)
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  }
  return arr
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
