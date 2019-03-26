/**
 * Author: 张中乐
 * Email: sjz20072-304@163.com
 * Update: 2014.5.13 
 */
;(function($){
	//私人插件  start
	$.fn.extend({
		/**
		 * 功能介绍：标签切换tab
		 * 参数介绍：
		 * myevent:'click',  默认为单击click事件，可修改 
		 * contentId:'',  可切换内容父级标签ID，必填项
		 * contentCss:''  可切换内容标签样式，必填项
		 * titleOff:'',  提示标题常状态样式，可选项
		 * titleOn:'',  提示标题当前选中状态样式，可选项
		 * btn:'li'  默认为li标签做为点击按钮，可修改
		 *---------------------------------------
		 * Update: 2014.4.30 
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
				btn:'li'
			},options);
			
			p_self.children(options.btn).on(options.myevent,function(){
				if(last==$(this).index()) return false;
				p_self.children(options.btn).attr('class',options.titleOff)
				$(this).attr('class',options.titleOn);
				
				if(options.contentId){
					$(options.contentId+' '+options.contentCss).eq($(this).index()).show().siblings().hide();
				}else{
					$(options.contentCss).hide();
					$(options.contentCss).eq($(this).index()).show();
					//alert(c);
				}
				last=$(this).index();
			});

			return this;
		},
		/**
		 * 功能介绍：imitate Select 模拟下拉框
		 * 参数介绍：
		 * sub_ul:'ul',  默认下拉框父标签为‘ul’,可修改为其他标签
		 * sub_li:'li',  默认下拉框子标签为‘li’，可修改为其他标签
		 * myevent:'click',	 默认事件为‘click’，可修改
		 * selected:1,  默认选中下拉菜单第一项，可修改为1,2,3... ;若为last,选中最后一项
		 * speed:100
		 *---------------------------------------
		 * Update: 2014.4.30 
		 */
		'imiSelect':function(options){
			var clickone_tid = [];
			var p_self=$(this);
			var ele={}
			options=$.extend({
				sub_ul:'ul',
				sub_li:'li',
				myevent:'click',
				selected:1,
				speed:100
			},options);
			
			//显示和隐藏下拉框
			p_self.on(options.myevent,function(){
				clearTimeout(clickone_tid[0]);
				self_=this;
				clickone_tid[0]=setTimeout(function(){
					$(self_).children(options.sub_ul+':eq(0)').slideToggle(options.speed?'fast':options.speed);
				},200);
			});
			
			//默认选中第N项
			ele.ul=p_self.children(options.sub_ul+':eq(0)');
			ele.li=p_self.children(options.sub_ul+':eq(0)').children(options.sub_li);
			if(options.selected){
				if(options.selected<ele.li.length){
					p_self.children(':eq(0)').html(ele.li.eq(options.selected-1).children('a').html());
				}else if(options.selected=='last'){
					p_self.children(':eq(0)').html(ele.li.last().children('a').html());
				}else{
					alert('id='+p_self.attr('id')+'  的下拉框默认选中项输入有误');
				}
				
			}
			//手动选中第N项
			p_self.children(options.sub_ul+':eq(0)').children(options.sub_li).click(function(e){
				var li_html=$(this).children('a').html();
				$(this).parent().prev().html(li_html);
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;
				}
				return false;
			});
			//选中子项下拉框消失
			p_self.find(options.sub_li).click(function(){
				p_self.children(options.sub_ul+':eq(0)').slideUp(options.speed?'fast':options.speed);
			});
			//鼠标离开下拉框消失
			p_self.mouseleave(function(){
				$(this).children(options.sub_ul+':eq(0)').slideUp(options.speed?'fast':options.speed);
			});
			
			
			
			return this;
		},
		/**
		 * 功能介绍：
		 * 参数介绍：
		 * color: 得到焦点时颜色
		 * gray: 失去焦点和为空时颜色
		 * text: 为空时替换文本，如：请输入搜索关键字
		 *---------------------------------------
		 * Update: 2014.5.20 
		 */
		'defaultInput':function(options){
				p_this=$(this);
				options=$.extend({
					color:'#333',
					gray:'#999',
					text:'请输入搜索关键字'
				},options);
				
				p_this.find('input[type=text]').each(function(index){
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
		},
		/**
		 * 功能介绍：全屏视频右侧显示或隐藏
		 * 参数介绍：
		 * rw: 右侧显示隐藏总宽度（包括左右边距）
		 * mw: 右侧显示隐藏的间距（左边距）
		 * zout: 滑出后显示时的按钮样式
		 * zin: 滑入后隐藏时的按钮样式
		 *---------------------------------------
		 * Update: 2014.5.20 
		 */
		'showLeftRight':function(options){
				p_this=$(this);
				options=$.extend({
					rw:240,
					mw:36,
					zout:'zre_t_out',
					zin:'zre_t_in'
				},options);
				
				var notConf=$.extend({
					f:1,
					zconW:p_this.find('[role="zconW"]'),
					zconV:p_this.find('[role="zconV"]'),
					zconB:p_this.find('[role="btn"]'),
					lw:$(window).width()-options.rw,
					lw2:$(window).width()-options.mw
				},options);
				
				function resizeW(){
					notConf.lw=$(window).width()-notConf.rw;
					notConf.lw2=$(window).width()-notConf.mw;
					p_this.width($(window).width());
					p_this.height($(window).height());
					$(notConf.zconW).width(notConf.lw);
				}
				resizeW();
				
				$(window).resize(function(){
					resizeW();
				});
				
				$(notConf.zconB).click(function(){
					if(notConf.f){
						notConf.f=0;
						$(this).attr('class',notConf.zin);
						$(notConf.zconW).animate({width:notConf.lw2},500);
						$(notConf.zconV).animate({right:-(notConf.rw-options.mw)},500);
					}else{
						notConf.f=1;
						$(this).attr('class',notConf.zout);
						$(notConf.zconW).animate({width:notConf.lw},500);
						$(notConf.zconV).animate({right:0},500);
					}
					
				});
				return this;
		}
	});
	
})(jQuery);






























