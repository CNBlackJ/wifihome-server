'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(user) {
    const res = await this.ctx.model.User.create(user);
    return res;
  }

  async list(query) {
    const { sort, limit, skip } = query;
    const res = await this.ctx.model.User.find({ isDeleted: false }).sort(sort || '').skip(Number(skip) || 0)
      .limit(Number(limit) || 10);
    return res;
  }

  async findById(_id) {
    const res = await this.ctx.model.User.findOne({ _id, isDeleted: false });
    return res;
  }

  async findByUserId(userId) {
    const res = await this.ctx.model.User.findOne({ userId, isDeleted: false });
    return res;
  }

  async update(_id, user) {
    const res = await this.ctx.model.User.findOneAndUpdate({ _id, isDeleted: false }, { $set: user }, { new: true });
    return res;
  }

  async destroy(_id) {
    const res = await this.ctx.model.User.findOneAndUpdate({ _id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
    return `${res ? 'Success' : 'Fail'} to deleted.`;
  }
}

module.exports = UserService;
