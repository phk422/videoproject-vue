module.exports = {
  // https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-eslint/README.md
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 为项目文件夹配置别名
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  devServer: {
    port: 8000, // 修改端口
    overlay: {
      warnings: false,
      errors: true
    },
    // 跨域代理配置
    proxy: {
      '/api': {
        target: 'http://loclahost:8080', // 这里是接口地址
        ws: true, // 是否代理websockets
        changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 添加chainWebpack支持swf
  chainWebpack: config => {
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000
      })
  },
  publicPath: ''
}
