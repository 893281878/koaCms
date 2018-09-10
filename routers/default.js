const router = require('koa-router')();

// router.prefix('/')
router.get('/',async (ctx)=>{
	await ctx.render('default')
});
module.exports = router;