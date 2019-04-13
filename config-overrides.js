var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function override (config, env) {
  // config.plugins.splice(3, 1)
  // config.plugins.push(new UglifyJsPlugin({
  //   parallel: true,
  //   sourceMap: false,
  //   uglifyOptions: {
  //     output: {
  //       comments: false,
  //       beautify: false
  //     }
  //   }
  // }))
  return config
}
