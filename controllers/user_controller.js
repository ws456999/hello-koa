var ApiError = require('../error/ApiError')
var ApiErrorNames = require('../error/ApiErrorNames')

exports.getUser = async (ctx, next) => {
  if(ctx.query.id != 1){
    throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
  }
  ctx.body = {
    username: 'wr',
    age: 20
  }
}

exports.registerUser = async (ctx ,next) => {
  console.log('registerUser', ctx.request.body)
  ctx.body = ctx.request.body
}
