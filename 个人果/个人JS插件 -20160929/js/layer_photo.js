// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：弹层式相册（特点：小屏层弹不跟随屏幕滑动，大屏可跟随屏幕滑动）
		 * 参数介绍：
		 * items: 		点击的对象，默认为 空，必填项， 如： .zcont_item
		 * max_w: 		预览大图最大宽度，默认为980 ，选填项
		 * max_h: 		预览大图最大高度，默认为 650，选填项
		 * 
		 * 注：
		 * jquery版本：1.9.0     on  的应用
		 *---------------------------------------
		 * Update: 2015.3.12 
		 */
		'layer_photo':function(options){
			p_this=$(this);
			options=$.extend({
				items:'',
				max_w:980,
				max_h:650
			},options);	
			var notConf={
				layer:'.zlayer',	//窗口透明背景
				content:'.zview',	//窗口
				viewSize:'.zvi_content',	//获取窗口边距
				imgbox:'.zvi_img',	//图片box
				imgTitle:'.zvi_t_h2',	//窗口标题
				closebtn:'.zvi_t_close',	//关闭窗口按钮
				img:'#zimg',	//大图ID
				animation_open:'zlayer_open',	//打开动画样式
				animation_close:'zlayer_close',	//关闭动画样式
				loading:{	//加载过程gif动画图片
					url:'image/layer_photo/loading.gif',
					w:32,
					h:32
				},
				prev:'.zvi_prev',	//上一页
				next:'.zvi_next',	//下一页
				prev_on:'zvi_prev_on',
				next_on:'zvi_next_on',
				f:false,	//是否打开窗口标志 默认为false,标签关闭状态
				count:1,	//图片张数，默认为1，且至少1张
				cur_num:0,	//当前图片,默认第一张为当前预览
				cur_img:new Image(),
				cur_w:0,	//预览大图最大宽度和记录原始图片尺寸
				cur_h:0,	//预览大图最大高度和记录原始图片尺寸
				clear:null,	//获取尺寸时定义的定时器变量
				cur_txt:''	//可变的动态标题
			}
			notConf=$.extend(options,notConf);
			notConf.count=p_this.find(notConf.items).length;
			
			//根据配置计算样式 （计算可视窗口）
			function viewSize(aw,bh){
				var pl=parseInt($(notConf.viewSize).css('paddingLeft'));
				var pr=parseInt($(notConf.viewSize).css('paddingRight'));
				var pt=parseInt($(notConf.viewSize).css('paddingTop'));
				var pb=parseInt($(notConf.viewSize).css('paddingBottom'));
				var ml=parseInt($(notConf.viewSize).css('marginLeft'));
				var mr=parseInt($(notConf.viewSize).css('marginRight'));
				var mt=parseInt($(notConf.viewSize).css('marginTop'));
				var mb=parseInt($(notConf.viewSize).css('marginBottom'));
				if(aw) notConf.max_w=aw;
				if(bh) notConf.max_h=bh;
				$(notConf.content).width(notConf.max_w+pl+pr+ml+mr);
				$(notConf.content).height(notConf.max_h+pt+pb+mt+mb+$(notConf.imgTitle).height());
				$(notConf.prev).height(notConf.max_h-$(notConf.imgTitle).height());
				$(notConf.next).height(notConf.max_h-$(notConf.imgTitle).height());
				$(notConf.viewSize).height(notConf.max_h-$(notConf.imgTitle).height());
				$(notConf.imgbox).height(notConf.max_h-$(notConf.imgTitle).height());
			}
			
			//更新当前图片对象
			function updateSrc(){
				notConf.cur_img.src=$(notConf.items+':eq('+notConf.cur_num+')').find('img[largeUrl]').attr('largeUrl');
				notConf.cur_txt=$(notConf.items+':eq('+notConf.cur_num+')').find('a').text();
				if(notConf.clear) clearInterval(notConf.clear);
				notConf.clear=setInterval(getSize,100);
				
			}
			
			//获取尺寸
			function getSize(){
				notConf.cur_w=notConf.cur_img.width;
				notConf.cur_h=notConf.cur_img.height;
				
				if(notConf.cur_w>0&&(notConf.cur_img.complete||notConf.cur_img.onload)){
					if(notConf.clear) clearInterval(notConf.clear);
					setSize();
					setValue();
				}
			}
			
			//设置当前图片尺寸
			function setSize(){
				if(notConf.cur_w>=notConf.max_w){
					notConf.cur_w=notConf.max_w;
					notConf.cur_h=notConf.cur_h*(notConf.cur_w/notConf.cur_img.width);
				}
				if(notConf.cur_h>=notConf.max_h){
					notConf.cur_h=notConf.max_h;
					notConf.cur_w=notConf.cur_w*(notConf.cur_h/notConf.cur_img.height);
				}
			}
			
			//大图赋值尺寸
			function setValue(){
				$(notConf.layer).show();
				$(notConf.img).attr('src','');
				$(notConf.img).attr({'src':notConf.cur_img.src,'width':notConf.cur_w,'height':notConf.cur_h});
				$(notConf.img).css({'opacity':'0'});
				$(notConf.img).animate({'opacity':'1'},200);
				$(notConf.imgTitle).text(notConf.cur_txt);
			}
			
			//按钮状态
			function btnStatus(){
				notConf.cur_num==(notConf.count-1) ? $(notConf.next).removeClass(notConf.next_on) : $(notConf.next).addClass(notConf.next_on);
				notConf.cur_num==0 ? $(notConf.prev).removeClass(notConf.prev_on) : $(notConf.prev).addClass(notConf.prev_on);
			}
			
			//向右   上一张
			$(notConf.prev).click(function(){
				if(notConf.cur_num>0){
					notConf.cur_num--;
					$(notConf.img).attr({'src':notConf.loading.url,'width':notConf.loading.w,'height':notConf.loading.h});
					btnStatus();
					updateSrc();
				}
			});
			
			//向左  下一张
			$(notConf.next).click(function(){
				if(notConf.cur_num<(notConf.count-1)){
					notConf.cur_num++;
					$(notConf.img).attr({'src':notConf.loading.url,'width':notConf.loading.w,'height':notConf.loading.h});
					btnStatus();
					updateSrc();
				}
			});
	
			
			//根据浏览器大小给透明背景赋值
			function resetWindow(){
				if($(window).height()<(notConf.max_h+50)){
					var ztop=$(document).scrollTop();
					$(notConf.layer).css('position','absolute');
					$(notConf.content).css('marginTop',ztop+'px');
				}else{
					$(notConf.layer).css('position','fixed');
					$(notConf.content).css('marginTop','30px');
				}
				$(notConf.layer).height($(document).height());
			}
			resetWindow();
			
			//开启相册
			$(notConf.items).click(function(){
				notConf.cur_num=$(this).index();
				$(notConf.img).attr({'src':notConf.loading.url,'width':notConf.loading.w,'height':notConf.loading.h});
				notConf.f=true;
				resetWindow();
				$(notConf.layer).show();
				//添加开启相册动画
				var _self=$(this);
				$(notConf.content).addClass(notConf.animation_open);
				setTimeout(function(){
					openClass(_self);
				},500);
				btnStatus();
				updateSrc();
				viewSize($(window).width()*0.7,$(window).height()*0.7);
			});
			
			//移除开启相册动画
			function openClass(self){
				self.parents(notConf.content).removeClass(notConf.animation_open)
			}
			
			//添加关闭动画
			$(notConf.closebtn).click(function(){
				notConf.f=false;
				var _self=$(this);
				$(notConf.content).addClass(notConf.animation_close);
				setTimeout(function(){
					rmClass(_self);
				},500);
			});
			
			//移除关闭动画
			function rmClass(self){
				self.parents(notConf.content).removeClass(notConf.animation_close)
				$(notConf.layer).hide();
			}
			//监视浏览器大小
			$(window).resize(function(){
				var w=$(window).width()*0.7;
				var h=$(window).height()*0.7;
				if(notConf.f){
					viewSize($(window).width()*0.7,$(window).height()*0.7);
					getSize();
					resetWindow();
				}
			});
				
				return this;	//返回this  使方法可链
		}
	});
})(jQuery);
