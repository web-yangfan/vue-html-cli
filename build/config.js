const path = require('path')
let buildPath = '../dist'

const config = {
  paths: {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, buildPath),
  },
  dev: {
    port: 8000,
    // 配置webpack proxy
    proxy: {},
    host: 'localhost',
    env: {
      NODE_ENV: '"development"'
    },
    assetsPublicPath: '/static/',
    sourceMap: false
  },
  prod: {
    env: {
      NODE_ENV: '"production"'
    },
    assetsPublicPath: '/static/',
    sourceMap: false
  }
}

module.exports = config
