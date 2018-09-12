const router = require('koa-router')();
const mongoDB = require('../module/db');
let fields = require('../module/config/fields');

 // router.prefix('/default')
router.get('/',async (ctx)=>{

	let fieldsTypeList = await mongoDB.find('fields_type',{});
	let fieldsEditType = await mongoDB.find('fields_editType',{});
	await ctx.render('admin/index',{fieldsTypeList,fieldsEditType,fields});//default

});

module.exports = router;