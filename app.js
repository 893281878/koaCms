//引入组件
const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const serve = require('koa-static');
const mongoDB = require('./module/db');
// const swaggerUi = require("swagger-decorator");

const docs = require('koa-docs');
const convert = require('koa-convert');

//实例化
const app = new Koa();
const router = new Router();
 // render = new Render()
 // 配置静态文件static组件

app.use(serve(__dirname + '/static/'));


//初始化art-template
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

// //配置swaggerUi中间件
// wrappingKoaRouter(router, "localhost:8080", "/api", {
// 	title: "Node Server Boilerplate",
// 	version: "0.0.1",
// 	description: "Koa2, koa-router,Webpack"
// });




// Koa.use('/',function()) 应用级中间件 在匹配路由之前执行
/**
 * 可执行路由匹配 ，登陆验证，权限验证等各种操作
 * next 前需要添加await next为异步方法
 */
app.use(async (ctx,next) => {
	if(ctx.status === 404){
		await ctx.render('comm/404')
	}
	await next();
	console.log(ctx.url,ctx.status);
});


router.get('/admin', async (ctx)=>{
	await ctx.render('index')
});
//配置层级路由
var admin = require('./routers/admin');
var index = require('./routers/default');
var detail = require('./routers/detail');
var api = require('./routers/Api/index');
router.use('/admin',admin.routes());
router.use('/default',index.routes());
router.use('/detail',detail.routes());
router.use('/api',api.routes());

app.use(convert(docs.get('/api', {
	title: 'API数据接口',
	version: '1.0.0',
	theme: 'Paper',
	// routeHandlers: 'disabled',
	groups: [
		{ groupName: '基本配置信息', routes: []},
	]
})));
//启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
