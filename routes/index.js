const router = require('koa-router')()
const path = require('path')
const { uploadFile } = require('../utils/upload')

router.get('/', async (ctx, next) => {
  ctx.request.header = 'application/json, text/html , */*'
  console.log(ctx.request.header)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


router.get('/upload', async (ctx, next) => {
  ctx.body = `
      <h1>koa2 upload demo</h1>
      <form method="POST" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
})

router.post('/upload', async (ctx, next) => {
  // console.log(444)
  // 上传文件请求处理
  try {
    let result = { success: false }
    let serverFilePath = path.join( __dirname, '../', 'upload-files' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })
  } catch (error) {
    console.log(error)
  }

  ctx.body = 123
})

module.exports = router
