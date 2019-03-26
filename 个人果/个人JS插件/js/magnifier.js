﻿// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：图片放大镜
		 * 参数介绍：
		 * id: 			默认为 ，选填项， 如#ex1、nub
		 * sub: 		默认为 ，选填项， 如dd li
		 * 
		 * 注
		 * jquery版本：1.9.0     无版本要求
		 *---------------------------------------
		 * Great：2015.3.13
		 * Update: 2015.12.11
		 */
		'magnifier':function(options){
				p_this=$(this);
				//设置默认值 $.extend合并新参数
				options=$.extend({
					site:'#large_img',	//大图
					site_w:200,	//放大镜的宽
					site_h:200,	//放大镜的高
					site_radius:30,	//放大镜边缘弧度半径
					largeImgSuffix:'_large',	//大图后缀
					site_f:false	//放大镜是否跟随鼠标
				},options);

				var notConf={
					img:new Image(),	//大图缓存对象
					i_w:null,
					i_h:null,	//大图原始尺寸
					clearSize:null		//获取大图尺寸计时器
				}
				notConf=$.extend(options,notConf);
				
				function getLargeUrl(){
					var largeUrl=p_this.attr('src');
					var largeUrl_a=largeUrl.substring(0,largeUrl.lastIndexOf('.'));
					var largeUrl_b=largeUrl.substring(largeUrl.lastIndexOf('.'));
					notConf.img.src=largeUrl_a+notConf.largeImgSuffix+largeUrl_b;
					notConf.clearSize=setInterval(getImgSize,40);
					return largeUrl;
				}
				
				getLargeUrl();
				
				//获得大图尺寸
				function getImgSize(){
					notConf.i_w=notConf.img.width;
					notConf.i_h=notConf.img.height;	
					if((notConf.i_w>0&&notConf.i_h)&&(notConf.img.complete||notConf.img.onload)){
						if(notConf.clearSize) clearInterval(notConf.clearSize);
					}
				}
				getImgSize();
				
				//定位
				p_this.mousemove(function(e){
					$(notConf.site).show();
					//小图放大倍数
					var xw=notConf.i_w/$(this).width();
					var yh=notConf.i_h/$(this).height();
					//获取小图在屏幕中的位置
					var m_x=$(this).position().left;
					var m_y=$(this).position().top;
					//计算展示大图区域
					var s_x=(e.pageX-m_x)*xw-notConf.site_w/2;
					var s_y=(e.pageY-m_y)*yh-notConf.site_h/2;
					
					
					//放大镜是否跟随鼠标
					if(notConf.site_f){
						//计算放大镜跟随位置 其中5像素是防抖
						var site_l=e.pageX-notConf.site_w-5, site_t=e.pageY-notConf.site_h-5;
						$(notConf.site).css({'left':site_l+'px','top':site_t+'px','width':notConf.site_w+'px','height':notConf.site_h+'px','backgroundPosition':'-'+s_x+'px '+'-'+s_y+'px','borderRadius':notConf.site_radius+'px','cursor':'default'});
					}else{
						$(notConf.site).css({'width':notConf.site_w+'px','height':notConf.site_h+'px','backgroundPosition':'-'+s_x+'px '+'-'+s_y+'px','borderRadius':notConf.site_radius<0?0:notConf.site_radius+'px'+'px'});
					}
					
				}).mouseout(function(){
					$(notConf.site).hide();
				});
				
				return this;	//返回this  使方法可链
		}
	});
})(jQuery);
