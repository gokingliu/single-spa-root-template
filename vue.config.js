const CompressionWebpackPlugin = require('compression-webpack-plugin');
const GzipExtensions = ['js', 'html', 'css', 'svg', 'png'];
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境开启 gzip 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip', // 压缩协议
          test: new RegExp(`\\.(${GzipExtensions.join('|')})$`), // 匹配文件后缀
          threshold: 10240, // 对超过 10k 的数据进行压缩
          minRatio: 0.8, // 压缩率
          deleteOriginalAssets: false, // 是否删除原文件
        }),
      );
    }
  },
  chainWebpack: (config) => {
    // 清空生产环境控制台日志 (保留 console.error)
    if (!isDev) {
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_debugger = true;
        args[0].terserOptions.compress.pure_funcs = ['console.log', 'console.warn', 'console.info'];
        args[0].terserOptions.output = { comments: false };
        return args;
      });
    }
  },
};
