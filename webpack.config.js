// @nrwl/react + SVG
function getCustomWebpackConfig(webpackConfig) {
  const getWebpackConfig = require('@nrwl/react/plugins/webpack');
  const config = getWebpackConfig(webpackConfig);

  // SVG fix to enable loading of SVGs
  delete config.module.rules.find(rule => rule.test.test('.svg')).issuer;
  return config;
}

module.exports = getCustomWebpackConfig;
