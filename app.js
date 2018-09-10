//引入组件
const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')
const serve = require('koa-static')
const mongoClient = require('./module/db')


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


// Koa.use('/',function()) 应用级中间件 在匹配路由之前执行
/**
 * 可执行路由匹配 ，登陆验证，权限验证等各种操作
 */
app.use(async (ctx,next) => {

  if(ctx.status == 404){
	  ctx.status = 404
    ctx.body = '404 找不到这个页面，可能跑火星去了！'
  }
	console.log(ctx.url);
	next()
})


// //添加一个router
// router.get('/index', async (ctx)=>{
//   ctx.body = ' 这是一个首页模板'
// 	await ctx.render('index');
// })
router.get('/', async (ctx)=>{
  // 通过art-template 将数据渲染到指定的模板页面 render
	//异步获取数据并渲染 问题待处理
  //  var result = await mongoClient.find('numbers',{})
	var list = [{filed1: '123',filed2: '1234',filed3: 1245645},
		{filed1: '123',filed2: '1234',filed3: 1245645},];
	await ctx.render('index',{'projects':list});
})
router.get('/detail',async (ctx)=>{
  ctx.body='详情页面'
})
router.get('/default', async (ctx)=>{
  ctx.body="后台主页内容"
})


//启动路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);
