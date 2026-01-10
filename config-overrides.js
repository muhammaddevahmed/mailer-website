module.exports = function override(config, env) {
  config.node = {
    ...config.node,
    process: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  };
  return config;
};
