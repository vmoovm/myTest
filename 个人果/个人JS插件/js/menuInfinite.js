// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：无限级菜单
		 * 参数介绍：
		 * zlist:".zme_list",//必填项，具有子菜单单位
		 * zof:'zme_on',//选填 ，状态1箭头
		 * zseconf:'.zme_second',//选填 ，加减号， 状态2二级及二级以下等多级菜单样式名
		 * zspeed:160//选填，动画速度
		 * 
		 * 注
		 * jquery版本：1.9.0     无版本需求
		 *---------------------------------------
		 * Great：2015.5.20
		 * Update: 2015.12.11
		 */
		'menuInfinite':function(options){
				p_this=$(this);
				//设置默认值 $.extend合并新参数
				var conf=$.extend({
					zlist:"",
					zof:'',
					zseconf:'',
					zspeed:160
				},options);
				p_this.on('click',conf.zlist,function(){
					if($(this).hasClass(conf.zof)){
						$(this).next().slideUp();
						$(this).nextAll().find(conf.zseconf).slideUp(conf.zspeed);
						$(this).removeClass(conf.zof);
						$(this).nextAll().find(conf.zlist).removeClass(conf.zof);
						$(this).nextAll().find(conf.zlist).find('em').text('+');
						$(this).find('em').text('+');
					}else{
						$(this).next(':not(:animated)').slideDown(conf.zspeed);
						$(this).addClass(conf.zof);
						$(this).find('em').text('-');
					}
					
				});
				return this;	//返回this  使方法可链
		}
	});
})(jQuery);
