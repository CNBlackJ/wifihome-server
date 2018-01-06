'use strict';
const timestamps = require('mongoose-timestamp');

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    name: String,
    sex: Number,
    avatar: String,
    city: String,
    role: String, // admin|user
    isDeleted: { type: Boolean, default: false },
  });

  UserSchema.plugin(timestamps);

  return mongoose.model('User', UserSchema);
};
