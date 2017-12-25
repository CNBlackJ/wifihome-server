'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1514192058664_9205';

  // add your config here
  config.middleware = [
    'apioutput',
  ];

  config.apioutput = {
    config: {
      enable: false,
    },
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/test',
    options: {},
  };

  config.security = {
    csrf: false,
  };

  return config;
};
