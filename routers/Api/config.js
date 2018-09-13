const router = require('koa-router')();
const mongoDB = require('../../module/db')

/**
 * 获取数据库字段可设置的类型
 * @param method: 'get'
 * @param path: '/setFieldType'
 * @param meta: ''
 */
router.get('/setFieldType',async (ctx)=>{
	// ctx.status = 200
	let result = await mongoDB.find('fields_type',{});
	ctx.response.body = {
		code: ctx.status,
		message: ctx.message,
		data: result
	};

})
/**
 * 获取字段显示类型/方式
 */
router.get('/fieldsEditType', async (ctx)=>{
	ctx.status = 200;
	ctx.response.body = {
		code: ctx.status,
		message:ctx.message,
		data: fields
	};
})

module.exports = router;