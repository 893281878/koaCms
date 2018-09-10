const router = require('koa-router')();

// router.prefix('/admin');
// router.get('/', async (ctx)=>{
// 	await ctx.render('index')
// })

router.get('/', async (ctx)=>{
	await ctx.render('default')
});
router.get('/detail', async (ctx)=>{
	await ctx.render('detail')
});
module.exports = router;