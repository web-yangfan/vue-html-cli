const path = require('path')

const config = {
  paths: {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../dist'),
  },
  dev: {
    port: 8000,
    // 配置webpack proxy
    proxy: {},
    host: 'localhost'
  },
  prod: {
  
  }
}

module.exports = config
