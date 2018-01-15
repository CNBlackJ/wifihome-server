'use strict';
const timestamps = require('mongoose-timestamp');

module.exports = app => {
  const mongoose = app.mongoose;
  const WifiSchema = new mongoose.Schema({
    originPwd: String,
    easyPwd: String,
    SSID: String, // wifi的名字
    BSSID: {
      type: String,
      // unique: true,
    },
    secure: Boolean,
    signalStrength: Number,
    isDeleted: { type: Boolean, default: false },
  });

  WifiSchema.plugin(timestamps);

  return mongoose.model('Wifi', WifiSchema);
};
