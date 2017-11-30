/*
* 在 app.user(router) 之前调用
*/
var ApiError = require('../error/ApiError')

var response_formatter = async (ctx) => {
  // 如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      code: 200,
      message: 'success',
      data: ctx.body
    }
  } else {
    ctx.body = {
      code: 400,
      message: 'fail'
    }
  }
}

var url_filter = (pattern) => {
  return async (ctx, next) => {
    var reg = new RegExp(pattern)

    try {
      // 先去执行路由
      await next()
    } catch (error) {
      if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
        ctx.status = 200
        ctx.body = {
          code: error.code,
          message: error.message
        }
        //继续抛，让外层中间件处理日志
        throw error;
      }
    }

    if (reg.test(ctx.originalUrl)) {
      response_formatter(ctx)
    }
  }
}

module.exports = url_filter
