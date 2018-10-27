const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

module.export = {
  plugins: [
    new WebpackDeepScopeAnalysisPlugin()
  ]
}
