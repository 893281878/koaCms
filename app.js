//引入组件
const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')
const serve = require('koa-static')
// const router = render('module/router')
//实例化
const app = new Koa()
const router = new Router()
 // render = new Render()
 // 配置静态文件static组件
app.use(serve(__dirname + '/static/'));
//初始化art-template
render(app, {
  root: path.join(__dirname, 'template'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

//添加一个router
router.get('/index', async (ctx)=>{
  ctx.body = ' 这是一个首页模板'
})
router.get('/', async (ctx)=>{
  ctx.body= '这是首页'
  // 通过art-template 将数据渲染到指定的模板页面 render
   await ctx.render('index.html',{})
})
router.get('/detail',async (ctx)=>{
  ctx.body='详情页面'
})
router.get('/default', async (ctx)=>{
  ctx.body="后台主页内容"
})
// response
app.use(async (ctx,next) => {
    // ctx.body = 'Hello Koa this is our first meet';
    // console.log(ctx.url);
    next()
  })
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);
