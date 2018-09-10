layui.use(['element','layer'], function(){

	var element = layui.element,//导航的hover效果、二级菜单等功能，需要依赖element模块
		$ = layui.jquery;
	//触发事件
	var active = {
		tabAdd: function(elem){
			//新增一个Tab项
			if (elem.attr('data-type') == 'tabChange'){
				active.tabChange(elem)
			}else{
				element.tabAdd('admin', {
					title: elem.text()
					,content: '<iframe lay-id="'+elem.attr("lay-id")+'" src="'+elem.attr('data-page')+'" frameborder="0"></iframe>'
					,id: elem.attr('lay-id')
				});
				active.tabChange(elem);
				elem.attr('data-type','tabChange')
			}
		}
		,tabDelete: function(elem){
			//删除指定Tab项
			// console.log(elem);
			element.tabDelete('admin',elem.attr('lay-id')); //删除：某个“Table”
			elem.attr('data-type','tabAdd');
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
	var layid = location.hash.replace(/^#page=/, '');
	element.tabChange('admin', layid);
	element.on('tab(admin)', function(elem){
		location.hash = 'page='+ $(this).attr('lay-id');
	});
	/**
	 * 监听Tab 关闭事件
	 */
	element.on('tabDelete(admin)', function(data){
		var getNowItem = $(".layui-tab-content > .layui-show").find("iframe").attr('lay-id'); //当前显示的tab lay-id
		let closeItemId = $(this).parents("li").attr('lay-id'); //关闭的tab lay-id
		$('.layui-nav-child > dd >a').each(function () {
			//改变tab nav data-type
			if($(this).attr('lay-id') == closeItemId){
				$(this).attr('data-type','tabAdd').parents("dd").removeClass("layui-this")
			}
			if($(this).attr('lay-id') == getNowItem){
				$(this).parents("dd").addClass("layui-this")
			}
		})
	});

});