// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：文字若图片单向上下滑动
		 * 参数介绍：
		 * ns:			默认为 3000,间隔播放时间，选填项
		 * auto:		默认为 true，是否自动播放，选填项 
		 * s: 			默认为 380，滑动速度，选填项
		 *---------------------------------------
		 * Update: 2015.8.19 
		 */
		'upAndDown':function(options){
				p_this=$(this);
				options=$.extend({
					ns:3000,
					auto:true,
					s:380
				},options);
				var notConf=$.extend({
					l:p_this.find("[role='left']"),		//左按钮
					r:p_this.find("[role='right']"),	//右按钮
					v:p_this.find("[role='view']"),		//可视区域
					m:p_this.find("[role='move']")		//可移动目标
				},options);
				
				var h=notConf.m.children().height(),
					len=notConf.m.children().length;
					
					notConf.m.height(h*len);
				
				var cl=null,cr=null;
				var t=notConf.m.position().top;
				
				notConf.r.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().top;
						if(t<0){
							notConf.m.animate({top:'+='+h+'px'},notConf.s);
						}
					}
				});
				
				notConf.l.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().top;
						if(h-h*len<t){
							notConf.m.animate({top:'-='+h+'px'},notConf.s);
						}
					}
				});
				
				function auto_move(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().top;
						if(h-h*len<t){
							notConf.m.animate({top:'-='+h+'px'},notConf.s);
						}else{
							notConf.m.css("top","0");
						}
					}
				}
				
				if(notConf.auto){
					var cl=setInterval(function(){auto_move();},notConf.ns);
				}
				p_this.hover(function(){clearInterval(cl)},function(){cl=setInterval(function(){auto_move();},notConf.ns);});
				
		}
	});
})(jQuery);
