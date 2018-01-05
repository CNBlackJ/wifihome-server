'use strict';
const timestamps = require('mongoose-timestamp');

module.exports = app => {
  const mongoose = app.mongoose;
  const WifiSchema = new mongoose.Schema({
    name: String,
    password: String,
    isDeleted: { type: Boolean, default: false },
  });

  WifiSchema.plugin(timestamps);

  return mongoose.model('Wifi', WifiSchema);
};
