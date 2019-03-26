// JavaScript Document

;(function(){
	/**
	 * 功能介绍：返回顶部
	 * 参数介绍：
	 * stval:200, //选填项scrollTopValue滚动条隐藏值
	 * top:'.zgo_arrow',//选填项 返回顶部
	 * site:'.zgo_box',//选填项
	 * minW:1400,//选填项 内容宽度，注，加滚动条宽和document宽  
	 * r0:'zgo_right0'//选填项，屏幕小于总宽时贴屏幕右侧
	 * 
	 * 注
	 * jquery版本：1.9.0     无版本需求
	 *---------------------------------------
	 * Great：2015.12.18
	 * Update: 2015.12.21
	 */
	$.fn.extend({
		'zgoTop':function(options){
			var p_this=$(this);
			options=$.extend({
				stval:200,
				top:'.zgo_arrow',
				site:'.zgo_box',
				minW:1153,  
				r0:'zgo_right0'
			},options);
			
			function sTV(vtop){
				var int = $(window).scrollTop();
				if(int<vtop){
					p_this.find(options.top).fadeOut();
				}else{
					p_this.find(options.top).fadeIn();
				}
			}
			sTV(options.stval);
			$(window).scroll(function() {
				cclear&&clearTimeout(cclear);
				var cclear=setTimeout(function(){
					sTV(options.stval);
				},500);
			});
			
			p_this.find(options.top).click(function(){
				$("html,body").animate({scrollTop: "0px",scrollLeft:"0px"}, 550,function(){});
			});
			
			$(window).width()<=options.minW?p_this.find(options.site).addClass(options.r0):p_this.find(options.site).removeClass(options.r0);
			//屏宽小于文档宽防止隐藏
			$(window).resize(function(){
				$(window).width()<=options.minW?p_this.find(options.site).addClass(options.r0):p_this.find(options.site).removeClass(options.r0);
			});
			return this;
		}
	})
})(jQuery);


























