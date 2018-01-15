'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.resources('wifi', '/api/wifis', controller.wifi);
  router.resources('user', '/api/users', controller.user);

  router.get('/api/wifis/bssid/:bssid', controller.wifi.findByBSSID);
};
