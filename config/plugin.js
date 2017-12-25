'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.validator = {
  enable: true,
  package: 'egg-joi-validate',
};
