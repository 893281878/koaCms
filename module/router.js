const Koa = require('koa')
const router = require('koa-router')()
var app = new Koa()

router.get('/', async (ctx)=>{
	ctx.body='首页'
})
router.get('/news', async (ctx)=>{
	ctx.body='新闻页面'
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3001)
