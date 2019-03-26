;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：评星级，鼠标滑过操作
		 * 参数介绍：
		 * id: 父级ID 如#ex1、nub
		 * sub:子标签名称 如dd li
		 * css_off：默认样式1（必传项）如.css_off
		 * css_on:当前样式2（必传项）如.css_on
		 * 
		 * 注
		 * jquery版本：1.9.0     无版本需求
		 *---------------------------------------
		 * Great：2014.5.13
		 * Update: 2015.12.11
		 */
		'star':function(options){
			var p_this=$(this);
			//alert(p_this.attr('class'));
			options=$.extend({
				css_off:'',
				css_on:'',
				subElement:'dd'
			},options);
			p_this.children(options.subElement).click(function(){
				p_this.children(options.subElement).unbind('mouseover');
			});
			p_this.children(options.subElement).bind('mouseover',pingxing);
			function pingxing(){
					$(this).attr('class',options.css_on);
					$(this).prevAll().attr('class',options.css_on);
					$(this).nextAll(':not(:last)').attr('class',options.css_off);
				}
			return this;
		}
	});
})(jQuery);
