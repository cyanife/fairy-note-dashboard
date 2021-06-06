const path = require('path');
const webpack = require('webpack');
const globalVars = require('./src/css/var.js');

module.exports = {
  css: {
    loaderOptions: {
      less: {
        globalVars
      }
    }
  },
  configureWebpack: {
    // resolve: {
    //   alias: {
    // models: path.resolve(__dirname, 'src/models/'),
    // js: path.resolve(__dirname, 'src/js/'),
    // components: path.resolve(__dirname, 'src/components/')
    //   }
    // },
    plugins: [
      new webpack.ProvidePlugin({
        // Utils: [path.resolve(__dirname, 'src/js/common/utils'), 'default'],
        Utils: 'hey-utils',
        // Manba: 'manba',
        HeyUI: 'heyui',
        Model: 'js-model',
        G: 'hey-global',
        log: 'hey-log',
        R: [path.resolve(__dirname, 'src/common/request'), 'default']
      })
    ],
    devtool: 'source-map'
  },
  devServer: {
    // proxy: {
    // 此处应该配置为开发服务器的后台地址
    // 配置文档： https://cli.vuejs.org/zh/config/#devserver-proxy
    // '/api': {
    //   target: 'http://xxx.xx.xx'
    // }
    // }
  }
};
