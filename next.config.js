module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        'spotify-web-api-node': require.resolve('spotify-web-api-node'),
      };
      return config;
    },
  };
  