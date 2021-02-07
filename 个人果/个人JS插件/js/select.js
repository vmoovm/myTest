﻿// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：imitate Select 模拟下拉框
		 * 参数介绍：
		 * sub_ul:'ul',  默认下拉框父标签为‘ul’,可修改为其他标签
		 * sub_li:'li',  默认下拉框子标签为‘li’，可修改为其他标签
		 * myevent:'click',	 默认事件为‘click’，可修改
		 * selected:1,  此项不可传值，若传值只是在没有在html中没做选择时有效，改变默认选中项
		 * speed:100,
		 * clickIsHide	默认为true，点击后下拉框是否消失
		 * 
		 * 注
		 * jquery版本：1.9.0     有on的应用需要1.9以上版本
		 *---------------------------------------
		 * Greate：2015.1.5 
		 * Update: 2020.9.28
		 */
		'imiSelect':function(options){
			var p_self=$(this);
			var ele={}
			options=$.extend({
				sub_ul:'ul',
				sub_li:'li',
				myevent:'click',
				selected:0,
				speed:100,
				clickIsHide:true,
				callfn: function (ol){},
				callshow: function (ol) {},
				callhide: function (ol) {},
				parent_css:'.zselect',
				box:'.zse_ul',
				Tselect:'.zselect_e'
			},options);
			var isshow = 1
			p_self.find(options.Tselect).children().each(function(){
				if($(this).attr('selected')){
					options.selected=$(this).index();
				}
			});
			//显示和隐藏下拉框
			p_self.on(options.myevent,function(){
				$(options.parent_css).css('zIndex','1');
				$(this).css('zIndex','22');
				if(!$(this).find(options.sub_ul+':eq(0)').is(':animated')){
					$(this).find(options.sub_ul+':eq(0)').slideToggle(options.speed?'fast':options.speed);
					if ($(this).attr('show') == 1) {
						$(this).attr('show', 0)
						if (options.callhide) options.callhide($(this))
					} else {
						$(this).attr('show', 1)
						if (options.callshow) options.callshow($(this))
					}
				}
			});
			
			//默认选中第N项
			ele.ul=p_self.find(options.sub_ul+':eq(0)');
			ele.li=p_self.find(options.sub_ul+':eq(0)').find(options.sub_li);
			
			if(options.selected >= 0){
				if(options.selected<ele.li.length){
					p_self.find(':eq(0)').html(ele.li.eq(options.selected).find('a').html());
					p_self.find(options.Tselect).children().eq(options.selected).attr("selected",true);
					if (options.callfn) options.callfn(ele.li.eq(options.selected).find('a').html())
				}else{
					alert('id='+p_self.attr('id')+'  的下拉框默认选中项输入有误');
				}
			}
			//手动选中第N项
			p_self.find(options.sub_ul+':eq(0)').on('click',options.sub_li,function(e){
				var li_html=$(this).find('a').html();
				$(this).parent().prev().html(li_html);
				p_self.find(options.Tselect).children().attr("selected",false);
				p_self.find(options.Tselect).children().eq($(this).index()).attr("selected",true);
				options.selected = $(this).index()
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;
				}
				if (options.callfn) options.callfn($(this))
				return false;
			});
			//点击后下拉框是否消失
			if(options.clickIsHide){
				//选中子项下拉框消失
				p_self.find(options.sub_li).on('click',function(){
					p_self.children(options.sub_ul+':eq(0)').slideUp(options.speed?'fast':options.speed);
					$(options.parent_css).css('zIndex','1');
					if (p_self.attr('show') == 1) {
						p_self.attr('show', 0)
						if (options.callhide) options.callhide(p_self)
					}
				});
			}
			//鼠标离开下拉框消失
			p_self.on('mouseleave',function(){
				$(this).find(options.sub_ul+':eq(0)').slideUp(options.speed?'fast':options.speed);
				if ($(this).attr('show') == 1) {
					$(this).attr('show', 0)
					if (options.callhide) options.callhide($(this))
				}
			});
			
			return this;
		}
	});
})(jQuery);
