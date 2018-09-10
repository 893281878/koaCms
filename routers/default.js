const router = require('koa-router')();
const mongoDB = require('../module/db');

// router.prefix('/')
router.get('/',async (ctx)=>{

	let fieldsTypeList = await mongoDB.find('fields_type',{});
	await ctx.render('admin/index',{fieldsTypeList});//default

});
module.exports = router;