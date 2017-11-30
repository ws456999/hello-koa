import 'babel-polyfill'

import Koa from 'koa'
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('koa-router')();
const cors = require('koa2-cors');

const index = require('./routes/index')
const users = require('./routes/users.js')
const logUtil = require('./utils/log_util')

const api = require('./routes/api')

const response_formatter = require('./middlewares/response_formatter')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// logger
app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date()
  // 响应间隔时间
  var ms = new Date() - start

  try {
    // 开始进入到下一个中间件
    await next()

    // 记录响应日志
    logUtil.logResponse(ctx, ms)

  } catch (error) {
    // 记录异常日志
    logUtil.logError(ctx, error, ms)
  }
})

app.use(cors())

const restc = require('restc');
// use restc middleware
app.use(restc.koa());

// 添加 api 地址
app.use(response_formatter('^/api'))

router.use('/api', api.routes(), api.allowedMethods())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(router.routes(), router.allowedMethods())

module.exports = app
