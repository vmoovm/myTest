// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：带透明背景弹层
		 * 参数介绍：
		 * layer:'',		//必填项 被弹层的id 或样式名
		 * btn_close:''		//选填项 关闭按钮id 或样式名
		 * 
		 * 注
		 * jquery版本：1.9.0     无版本需求
		 *---------------------------------------
		 * Great：2014.7.23
		 * Update: 2015.12.11
		 */
		'layer':function(options){
				var p_this=$(this);
				options=$.extend({
					layer:'',
					btn_close:''
				},options);

				//获取浏览器尺寸并给屏蔽层赋值;
				function zlayer(){
					$(options.layer).width($(window).width());
					$(options.layer).height($(window).height());
				}
				//点击按钮弹层
				p_this.click(function(){
					zlayer();
					$(options.layer).show();
				});
				//关闭按钮是否存在
				if(options.btn_close){
					$(options.btn_close).click(function(){
						$(options.layer).hide();
					});
				}
				//改变浏览器大小监控
				$(window).resize(function(){
					zlayer();
				});
				return this;
		}
	});
})(jQuery);
