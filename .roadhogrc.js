const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs : svgSpriteDirs,
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}`,
  theme: './theme.config.js',
  /**
   * 接口代理示例
   * "proxy": {
   *    "/api/v1": {
   *        "target": "http://api1.mzwine.cc",
   *        "changeOrigin": true,
   *        "pathRewrite": {"^/api/v1" : "/v1"}
   *    },
   *    "/api/v2": {
   *        "target": "http://api2.mzwine.cc",
   *        "changeOrigin": true,
   *        "pathRewrite": {"^/api/v2": "/v2"}
   *    }
   * }
   */
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ['babel-runtime'],
    include: ['dva/router', 'dva/saga', 'dva/fetch']
  }
}
