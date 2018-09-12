var createTable = {
	initData:{}
}
// var fieldsArray = require('../../module/config/fields');
layui.use(['form','layedit'], function(){
	var form = layui.form;
	// createTable.addCloum();

	form.render();

	//但是，如果你的HTML是动态生成的，自动渲染就会失效
	//因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();

});
$(function () {
	createTable.initFieldCloum()
	createTable.getFieldsEditType()
})
// console.log(fields);
var fieldDom =$.parseHTML('<li class="field_item"></li>');
var layuiFormItem = $.parseHTML('<div class="layui-form-item"></div>');
var layuiFormItemInline = $.parseHTML(' <div class="layui-input-inline"></div>');
var layuiInline = $.parseHTML('<div class="layui-inline"></div>');

createTable.initFieldCloum = function () {
	let fieldsArray = [['field_cn_name','后台字段名称'],['field_en_name','数据库字段名称'],['field_type','搜索'],['field_editType','编辑标签'],['canEdit','后台可编辑'],['createIndex','创建索引'],['noRepeat','唯一、不重复']];
	for(let i=0;i<fieldsArray.length;i++){
		let inputDom = '';
		switch (fieldsArray[i][0]){
			case 'field_cn_name':
				inputDom = '<input type="text" name="'+fieldsArray[i][0]+'" lay-verify="required" autocomplete="off" placeholder="'+fieldsArray[i][1]+'" autocomplete="off" class="layui-input">'
				break;
			case 'field_en_name':
				inputDom = '<input type="text" name="'+fieldsArray[i][0]+'" lay-verify="required" autocomplete="off" onkeyup="value=value.replace(/[^\\w\\.\\/]/ig,\'\')" placeholder="'+fieldsArray[i][1]+'" autocomplete="off" class="layui-input">'
				break;
			case 'field_type':

				break;
		}
	}
};
createTable.getFieldsEditType = function () {
	let fieldsEditType = []
	$.ajax({
		url:'/default/fieldsEditType',
		dataType:'json',
		type:'get',
		success:function (res) {
			fieldsEditType = res;
			console.log('success:',res);
		},
		error:function (error) {
			console.log('error:',error);
		}
	})
	return fieldsEditType;
}
createTable.addCloum = function () {
	console.log('it is working');
	// console.log($.parseHTML(fieldDom));
};


// module.exports = createTable