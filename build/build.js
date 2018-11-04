const ora = require('ora') // 终端loading效果
const rm = require('rimraf') // 删除文件
const chalk = require('chalk') // 终端字体样式
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')
const config = require('./config')
const spinner = ora(chalk.greenBright('building for production...'))


// 显示loading
spinner.start()

rm(path.join(config.paths.build), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    
  })
})
