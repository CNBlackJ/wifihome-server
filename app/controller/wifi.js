'use strict';

const Controller = require('egg').Controller;
const Joi = require('joi');

class WifiController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.validator({
      query: Joi.object().keys({
        limit: Joi.number().min(0),
        skip: Joi.number().min(0),
        sort: Joi.string(),
      }),
    });
    const res = await service.wifi.list(ctx.query);
    ctx.apiSuccess(res, 200);
  }

  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body;
    ctx.validator({
      body: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
      }),
    });
    const res = await service.wifi.create(payload);
    ctx.apiSuccess(res, 201);
  }

  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    ctx.validator({
      params: Joi.object().keys({
        id: Joi.string(),
      }),
    });
    const res = await service.wifi.findById(id);
    ctx.apiSuccess(res, 200);
  }

  async findByBSSID() {
    const { ctx, service } = this;
    const { bssid } = ctx.params;
    ctx.validator({
      params: Joi.object().keys({
        bssid: Joi.string(),
      }),
    });
    const res = await service.wifi.findByBSSID(bssid);
    ctx.apiSuccess(res, 200);
  }

  async update() {
    const { ctx, service } = this;
    ctx.validator({
      params: Joi.object().keys({
        id: Joi.string(),
      }),
      body: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
      }),
    });
    const { id } = ctx.params;
    const { body } = ctx.request;
    const res = await service.wifi.update(id, body);
    ctx.apiSuccess(res, 201);
  }
}

module.exports = WifiController;
