layui.use(['element','layer'], function(){

	var element = layui.element,//导航的hover效果、二级菜单等功能，需要依赖element模块
		layer = layui.layer,
		$ = layui.jquery;
	//触发事件
	var active = {
		tabAdd: function(elem){
			//新增一个Tab项
			if (elem.attr('data-type') == 'tabChange'){
				active.tabChange(elem)
			}else{
				element.tabAdd('admin', {
					title: elem.text()//用于演示
					,content: '<iframe src="'+elem.attr('data-page')+'" frameborder="0"></iframe>'
					,id: elem.attr('lay-id') //实际使用一般是规定好的id，这里以时间戳模拟下
				})
				elem.attr('data-type','tabChange')
			}
		}
		,tabDelete: function(elem){
			//删除指定Tab项
			element.tabDelete('admin',elem.attr('lay-id')); //删除：某个“Table”
			elem.addClass('layui-btn-disabled');
		}
		,tabChange: function(elem){
			//切换到指定Tab项
			element.tabChange('admin', elem.attr('lay-id')); //切换到：某个Table
		}
	};

	$('.layui-nav-child > dd > a').on('click', function(){
		var othis = $(this), type = othis.data('type');
		active[type] ? active[type].call(this, othis) : '';
	});
	//Hash地址的定位
	var layid = location.hash.replace(/^#admin=/, '');
	element.tabChange('admin', layid);
	element.on('tab(admin)', function(elem){
		location.hash = 'admin='+ $(this).attr('lay-id');
	});
});