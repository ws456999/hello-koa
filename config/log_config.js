var path = require('path')

// 日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

// 错误日志输出完整路径
var errorLogPath = path.resolve(__dirname, '../logs/error/error')

// 响应日志输出完整路径
var responseLogPath = path.resolve(__dirname, '../logs/response/response')

// 错误日志目录
var errorPath = '/error'
// 错误日志温江明
var errorFileName = 'error'
// 错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + '/' + errorFileName

//响应日志目录
var responsePath = "/response"
//响应日志文件名
var responseFileName = "response"
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName

module.exports = {
  'appenders': {
    // 错误日志
    error: {
      'category': 'errorLogger', // logger名称
      'type': 'dateFile', // 日志类型
      'filename': errorLogPath, // 日志输出位置
      'alwaysIncludePattern': true, // 是否总是有后缀名
      'pattern': '-yyyy-MM-dd-hh.log', // 后缀，每小时创建一个新的日志文件
      'path': errorPath  // 这个字段好像没什么用，logs文件夹如果不存在的话，也会自动创建一个的
    },
    // 响应日志
    response: {
      'category': 'resLogger',
      'type': 'dateFile',
      'filename': responseLogPath,
      'alwaysIncludePattern': true,
      'pattern': '-yyyy-MM-dd-hh.log',
      'path': responsePath
    }
  },
  categories: {
    default: { appenders: [ 'error', 'response' ], level: 'debug' }
  }
}
