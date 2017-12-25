'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const WifiSchema = new mongoose.Schema({
    name: String,
    password: String,
    isDeleted: { type: Boolean, default: false },
  });

  return mongoose.model('Wifi', WifiSchema);
};
