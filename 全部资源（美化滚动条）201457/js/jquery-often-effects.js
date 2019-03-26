/**
 * Author: 张中乐
 * Email: sjz20072-304@163.com
 * Update: 2014.5.13 
 */
;(function($){
	//私人插件  start
	$.fn.extend({
		
		/**
		 * 功能介绍：垂直多级菜单
		 * 参数介绍：
		 * m_first:'.m_first',一级菜样式默认.m_first，可修改
		 * m_second:'.m_second',二级样式默认.m_second，可修改
		 * m_third:'.m_third',三级样式名默认.m_third，可修改
		 * m_more:'.m_more'四级以上样式名默认.m_more，可修改
		 *---------------------------------------
		 * Update: 2014.4.23 
		 */
		'menuVer':function(options){
			var p_this=$(this);
			var click_tid = [];
			var last=null;
			
			options=$.extend({
				m_first:'.m_first',
				m_second:'.m_second',
				m_third:'.m_third',
				m_more:'.m_more',
				arrow_gray:'arrow_gray',
				arrow_color:'arrow_color',
				empty:'arrow_empty'
			},options);
			
			function active(this_ele,level,index){
				//给有无下一级菜单项添加标志
				if(this_ele.nextAll().length){
					this_ele.addClass(options.arrow_gray);
				}else{
					this_ele.addClass(options.empty);
				}
				
				this_ele.click(function(){
					this_ele.not('.'+options.empty).parent().children(':eq(0)').removeClass(options.arrow_color);
					$(this).parent().find('.'+options.arrow_color).removeClass(options.arrow_color);
					$(this).parent().siblings().find('.'+options.arrow_color).removeClass(options.arrow_color);
					$(this).not('.'+options.empty).parent().children(':eq(0)').addClass(options.arrow_color);
					clearTimeout(click_tid[index]);
					var self_=this;
					click_tid[index] = setTimeout(function() { 
						if(last!=level+$(self_).parent('li').index()){
							last=level+$(self_).parent('li').index();
							p_this.find(level).parent('li').find('ul').slideUp();
							$(self_).parent('li').children('ul').slideDown(200);
						}
						
					}, 300);
					
				});
			}
			
			if(options.m_first){
				p_this.find(options.m_first).each(function(index){
					active($(this),options.m_first,index);
				});
			}
			if(options.m_second){
				p_this.find(options.m_second).each(function(index){
					active($(this),options.m_second,index);
				});
			}
			if(options.m_third){
				p_this.find(options.m_third).each(function(index){
					active($(this),options.m_third,index);
				});
			}
			if(options.m_more){
				p_this.find(options.m_more).each(function(index){
					active($(this),options.m_more,index);
				});
			}
			
			return this;
		}
		
			
			
		
	});
	//私人插件  end
	
	
	
})(jQuery);






























