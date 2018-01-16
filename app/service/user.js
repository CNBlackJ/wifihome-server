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

  async findByOpenId(openId) {
    const res = await this.ctx.model.User.findOne({ openId, isDeleted: false });
    return res;
  }

  async getOpenId(code) {
    const appId = 'wxfba9aecca51d619c';
    const secret = '9cb6c8325378cd0ab0f285d299724a87';
    const grantType = 'authorization_code';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=${grantType}`;
    const res = await this.ctx.curl(url, { method: 'GET', dataType: 'json' });
    return res ? res.data.openid : '';
  }
}

module.exports = UserService;
