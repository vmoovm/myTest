// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：输入框 失去焦点 与 得到焦点 颜色切换
		 * 参数介绍：
		 * color: 默认为#333，选填项，得到焦点时颜色
		 * gray: 默认为#999，选填项，失去焦点和为空时颜色
		 * text: 为空时替换文本，如：请输入搜索关键字
		 * 
		 * 注
		 * jquery版本：1.7.2     无版本需求
		 *---------------------------------------
		 * Great：2014.5.20
		 * Update: 2015.12.11
		 */
		'defaultInput':function(options){
				p_this=$(this);
				options=$.extend({
					color:'#333',
					gray:'#999',
					text:'请输入搜索关键字'
				},options);
				
				(p_this.find('input[type=text]').length?p_this.find('input[type=text]'):p_this).each(function(index){
					$(this).focus(function(){
						var val=$(this).val();
						$(this).css('color',options.color);
						if(val==options.text){
							$(this).val('');
						}else{
							return false;
						}
					}).blur(function(){
						var val=$(this).val();
						if(val==''){
							$(this).val(options.text);
							$(this).css('color',options.gray);
						}else{
							$(this).css('color',options.color);
						}
					});										   
				});
				return this;
		}
	});
})(jQuery);
