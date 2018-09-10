const router = require('koa-router')();

router.get('/',async (ctx)=>{
	await ctx.render('detail')
});


module.exports = router;