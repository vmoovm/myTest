// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：窗口拖动
		 * 参数介绍：
		 * dragE: 	默认为空 ，选填项，接收可拖动目标对象 例：“.drag”样式名加点
		 * 
		 * 注
		 * jquery版本：1.9.0     有on的应用需要1.9以上版本
		 *---------------------------------------
		 * Great：2014.10.16
		 * Update: 2015.12.11
		 */
		'zdrag':function(options){
				var p_this=$(this);
				//设置默认值 $.extend合并新参数
				options=$.extend({
					dragE:''
				},options);
				var this_p=null;	//中转当前元素
				var notConf={
					dragE:$(options.dragE),//拖动区域
					drag:null,	//判断可拖动目标预定义
					disX:null,	//鼠标按下与窗口位置横向间距预定义
					disY:null,	//鼠标按下与窗口位置纵向间距预定义
					layerX:null,	//获取当前窗口横坐标预定义
					layerY:null,	//获取当前窗口纵坐标预定义
					gog:null,	//解绑拖动程序中转对象预定
					mkey:false	//鼠标左键被按下标志位
				}
				notConf.drag=notConf.dragE.length>0?notConf.dragE:p_this;
				
				//移动窗口程序
				function testa(e2,cur){
					//在拖动窗口中，消毁未消毁或多余我窗口移动事件，作用不大，起安全作用，删除本判断不会出错
					if(notConf.gog){
						$(document).mouseup(function(){
							$(document).unbind('mousemove',notConf.gog);
						});
					}
					//是否设置了可移动目标
					if(notConf.dragE.length>0){
						this_p=$(cur).parents('.'+p_this.attr('class'));
						//在移动的过程中，可移动目标被浏览器挡住，切换可移动目标为整个窗口
						if(p_this.offset().top<-(notConf.dragE.height())){
							this_p=$(cur);
						}else{
							this_p.unbind('mousedown');
						}
					}else{
						this_p=$(cur);
					}
					//获取当前窗口位置
					notConf.layerX=this_p.offset().left,
					notConf.layerY=this_p.offset().top-parseInt(this_p.css('marginTop'));
					notConf.disX=e2.pageX-notConf.layerX,notConf.disY=e2.pageY-notConf.layerY;
					//根据鼠标坐标实现窗口拖动
					$(document).bind('mousemove',notConf.gog=function(e){
						if(notConf.mkey){
							var siteX=e.pageX-notConf.disX,siteY=e.pageY-notConf.disY;
							siteY=siteY<0?0:siteY;
							this_p.css({'position':'absolute','left':siteX+'px','top':siteY+'px'});
						}
						
					});
				}
				//鼠标按下，启动移动窗口程序
				notConf.drag.bind('mousedown',function(e){
					notConf.mkey=true;
					var _this=this;
					testa(e,_this)
				});
				notConf.drag.blur(function(){
					$(document).unbind('mousemove',notConf.gog);
				});
				//鼠标抬起，停止拖动
				$(document).on('mouseup',function(e){
					notConf.mkey=false;
					$(document).unbind('mousemove',notConf.gog);
					if(e.buuton){
						notConf.mkey=false;
						$(document).unbind('mousemove',notConf.gog);
					}
				});
				
				return this;	//返回this  使方法可链
		}
	});
})(jQuery);
