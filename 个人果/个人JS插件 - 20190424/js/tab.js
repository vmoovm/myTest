// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：标签切换tab
		 * 参数介绍：
		 * myevent:'click',  默认为单击click事件，可修改 
		 * contentId:'',  默认为空，可切换内容父级标签ID，选填项
		 * contentCss:''  默认为空，可切换内容标签样式，必填项
		 * titleOff:'',  默认为空，提示标题常状态样式，选填项
		 * titleOn:'',  默认为空，提示标题当前选中状态样式，选填项
		 * 默认为空，最后一项添加不同样式起作用，可选项
		 * btn:'li'  默认为li标签做为点击按钮，可修改
		 * 
		 * 注
		 * jquery版本：1.9.0     有on的应用需要1.9以上版本
		 *---------------------------------------
		 * Great：2014.4.30
		 * Update: 2015.12.11
		 */
		'tab':function(options){
			var p_self=$(this);
			var last=null;
			options=$.extend({
				myevent:'click',
				contentId:'',
				contentCss:'',
				titleOff:'',
				titleOn:'',
				titleEnd:'',
				btn:'li'
			},options);
			
			p_self.children(options.btn).on(options.myevent,function(){
				if(last==$(this).index()) return false;
				p_self.children(options.btn).attr('class',options.titleOff)
				$(this).attr('class',options.titleOn);
				
				if(options.titleEnd!=''){
					p_self.children(options.btn+':last').addClass(options.titleEnd);
				}
				
				if(options.contentId){
					$(options.contentId+' '+options.contentCss).eq($(this).index()).show().siblings().hide();
				}else{
					$(options.contentCss).hide();
					$(options.contentCss).eq($(this).index()).show();
				}
				last=$(this).index();
			});

			return this;
		}
	});
})(jQuery);
