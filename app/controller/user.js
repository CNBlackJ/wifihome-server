'use strict';

const Controller = require('egg').Controller;
const Joi = require('joi');

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.validator({
      query: Joi.object().keys({
        limit: Joi.number().min(0),
        skip: Joi.number().min(0),
        sort: Joi.string(),
      }),
    });
    const res = await service.user.list(ctx.query);
    ctx.apiSuccess(res, 200);
  }

  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body;
    ctx.validator({
      body: Joi.object().keys({
        name: Joi.string().required(),
        role: Joi.string().required(),
      }),
    });
    const res = await service.user.create(payload);
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
    const res = await service.user.findById(id);
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
        role: Joi.string().required(),
      }),
    });
    const { id } = ctx.params;
    const { body } = ctx.request;
    const res = await service.user.update(id, body);
    ctx.apiSuccess(res, 201);
  }
}

module.exports = UserController;
