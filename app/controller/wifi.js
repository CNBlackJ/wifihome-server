'use strict';

const Controller = require('egg').Controller;
const Joi = require('joi');

class WifiController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.joi({
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
    ctx.joi({
      body: Joi.object().keys({
        originPwd: Joi.string().required(),
        easyPwd: Joi.string().required(),
        SSID: Joi.string().required(),
        BSSID: Joi.string().required(),
        secure: Joi.boolean().required(),
        signalStrength: Joi.number().required(),
      }),
    });
    const res = await service.wifi.create(payload);
    ctx.apiSuccess(res, 201);
  }

  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    ctx.joi({
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
    ctx.joi({
      params: Joi.object().keys({
        bssid: Joi.string(),
      }),
    });
    const res = await service.wifi.findByBSSID(bssid);
    ctx.apiSuccess(res, 200);
  }

  async update() {
    const { ctx, service } = this;
    ctx.joi({
      params: Joi.object().keys({
        id: Joi.string(),
      }),
      body: Joi.object().keys({
        originPwd: Joi.string().required(),
        easyPwd: Joi.string().required(),
        SSID: Joi.string().required(),
        BSSID: Joi.string().required(),
        secure: Joi.boolean().required(),
        signalStrength: Joi.number().required(),
      }),
    });
    const { id } = ctx.params;
    const { body } = ctx.request;
    const res = await service.wifi.update(id, body);
    ctx.apiSuccess(res, 201);
  }
}

module.exports = WifiController;
