const Router = require('koa-router')();
let config = require('./config');
Router.use('/config',config.routes());

Router.get('/',async (ctx)=>{
	ctx.body = 'API list'
})
module.exports = Router;
