// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：不重复单向左右滑动
		 * 参数介绍：
		 * n: 			默认为 4，选填项
		 * s: 			默认为 380，选填项， 注最好s>300
		 * 
		 * 注
		 * jquery版本：1.9.0     无版本需求
		 *---------------------------------------
		 * Great: 2014.7.30
		 * Update: 2015.12.11
		 */
		'singleslide':function(options){
				p_this=$(this);
				//设置默认值 $.extend合并新参数
				options=$.extend({
					n:4,
					s:380
				},options);
				var notConf=$.extend({
					l:p_this.find("[role='left']"),		//左按钮
					r:p_this.find("[role='right']"),	//右按钮
					v:p_this.find("[role='view']"),		//可视区域
					m:p_this.find("[role='move']")		//可移动目标
				},options);
				
				var w=notConf.m.children().width()+parseInt(notConf.m.children().css('marginLeft'))+parseInt(notConf.m.children().css('marginRight'))+parseInt(notConf.m.children().css('borderLeft'))+parseInt(notConf.m.children().css('borderRight')),
					len=notConf.m.children().length;
					
				if(len>notConf.n){
					notConf.m.width(w*len);
				}else{
					notConf.l.hide();
					notConf.r.hide();
				}
				
				var cl=null,cr=null;
				var t=notConf.m.position().left;
				notConf.r.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().left;
						if(w*notConf.n-w*len<t){
							notConf.m.animate({left:'-='+w*4+'px'},notConf.s);
						} else{
							//是否去掉右箭头
							notConf.r.hide()
							notConf.l.show()
						}
					}
				});
				
				notConf.l.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().left;
						if(t<0){
							notConf.m.animate({left:'+='+w*4+'px'},notConf.s);
						} else {
							//是否去掉右箭头
							notConf.l.hide()
							notConf.r.show()
						}
					}
					
				});
				
				return this;
		}
	});
})(jQuery);
