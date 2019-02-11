$(document).ready(function(){
	/* 此代码在DOM完全加载后执行 */
	
	var totWidth=0;
	var positions = new Array();
	
	$('#slides .slide').each(function(i){
		
		/* 循环遍历所有幻灯片并将其累积宽度存储在totWidth中 */
		
		positions[i]= totWidth;
		totWidth += $(this).width();
		
		/* 位置数组包含每个幻灯片与容器左侧部分的交换偏移量 */
		
		if(!$(this).width())
		{
			alert("请填写所有图片的宽度和高度！");
			return false;
		}
		
	});
	
	$('#slides').width(totWidth);

	/* 将cotnainer div的宽度更改为所有幻灯片组合的精确宽度 */

	$('#menu ul li a').click(function(e,keepScroll){

			/* 在缩略图上单击 */

			$('li.menuItem').removeClass('act').addClass('inact');
			$(this).parent().addClass('act');
			
			var pos = $(this).parent().prevAll('.menuItem').length;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* 开始滑动动画 */
			
			e.preventDefault();
			/* 防止链接的默认操作 */
			
			
			// 如果单击了图标, 则停止自动前进:
			if(!keepScroll) clearInterval(itvl);
	});
	
	$('#menu ul li.menuItem:first').addClass('act').siblings().addClass('inact');
	/* 在页面加载时, 将第一个缩略图标记为活动 */
	
	
	
	/*****
	 *
	 * 启用自动前进.
	 *
	 ****/
	 
	var current=1;
	function autoAdvance()
	{
		if(current==-1) return false;
		
		$('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click',[true]);	// [true] will be passed as the keepScroll parameter of the click function on line 28
		current++;
	}

	// 滑块会自动前进的秒数:
	
	var changeEvery = 10;

	var itvl = setInterval(function(){autoAdvance()},changeEvery*1000);

	/* 自定义项的结束 */
});