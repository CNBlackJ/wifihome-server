'use strict';

module.exports = options => {
  const { config } = options;
  return async function apioutputMiddleware(ctx, next) {
    ctx.apiSuccess = (data, statusCode = 200, exData = {}) => {
      ctx.status = statusCode;
      ctx.body = !config.enable ? data : Object.assign({
        status: 'OK',
        code: statusCode,
        data,
        serverTime: Date.now(),
      }, exData);
    };

    ctx.apiError = (err, statusCode = 422, exMsg = {}) => {
      ctx.status = statusCode;
      ctx.body = !config.enable ? err : Object.assign({
        status: 'Error',
        error_code: statusCode || 500,
        error_msg: err.error_msg || err.toString(),
        error_extra: err.error_extra || '',
        server_time: Date.now(),
      }, exMsg);
    };
    await next();
  };
};
