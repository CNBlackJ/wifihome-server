'use strict';

const Service = require('egg').Service;

class WifiService extends Service {
  async create(wifi) {
    const res = await this.ctx.model.Wifi.create(wifi);
    return res;
  }

  async list(query) {
    const { sort, limit, skip } = query;
    const res = await this.ctx.model.Wifi.find({ isDeleted: false }).sort(sort || '').skip(Number(skip) || 0)
      .limit(Number(limit) || 10);
    return res;
  }

  async findById(_id) {
    const res = await this.ctx.model.Wifi.findOne({ _id, isDeleted: false });
    return res;
  }

  async findByWifiId(wifiId) {
    const res = await this.ctx.model.Wifi.findOne({ wifiId, isDeleted: false });
    return res;
  }

  async update(_id, wifi) {
    const res = await this.ctx.model.Wifi.findOneAndUpdate({ _id, isDeleted: false }, { $set: wifi }, { new: true });
    return res;
  }

  async destroy(_id) {
    const res = await this.ctx.model.Wifi.findOneAndUpdate({ _id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
    return `${res ? 'Success' : 'Fail'} to deleted.`;
  }
}

module.exports = WifiService;
