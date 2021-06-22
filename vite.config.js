const path = require('path')
console.log(path.resolve(__dirname, './src'))
module.exports = {
  proxy: {
    // with options
    '/Sev': {
      target: 'dizhi',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/Sev/, '')
    }
  },
  //引入第三方配置
  optimizeDeps: {
    include: ['axios', 'qs']
  },
  alias: {
    '/@/': path.resolve(__dirname, './src'),
    '/@less/': path.resolve(__dirname, './src/assets/less'),
    '/@img/': path.resolve(__dirname, './src/assets/images'),
    '/@component/': path.resolve(__dirname, './src/components'),
    '/@js/': path.resolve(__dirname, './src/assets/js'),
  },
  // module: {
  //   rules: [{
  //     test: /\.less$/,
  //     use: ['style-loader', 'css-loader', 'less-loader', {
  //       loader: 'style-resources-loader',
  //       options: {
  //         patterns: path.resolve(__dirname, './src/assets/less/common.less'),
  //         injector: 'append'
  //       }
  //     }]
  //   }]
  // },
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [
  //       // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
  //       path.resolve(__dirname, './src/assets/less/*.less')
  //     ]
  //   }
  // },
  cssPreprocessOptions: {
    less: {
      // additionalData: `@import ./src/assets/less/common.less`
      modifyVars: {
        '@main_color': 'red',
        // 'hack': `true;@import ${path.join(__dirname, './src/assets/less/common.less')};`
      }
    }
  }
}