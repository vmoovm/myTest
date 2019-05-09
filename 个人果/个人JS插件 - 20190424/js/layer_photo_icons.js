// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：弹层式相册（特点：小屏层弹不跟随屏幕滑动，大屏可跟随屏幕滑动）
		 * 参数介绍：
		 * items: 		点击的对象，默认为 空，必填项， 如： .zcont_item
		 * max_w: 		预览大图最大宽度，默认为980 ，选填项
		 * max_h: 		预览大图最大高度，默认为 650，选填项
		 * cur:			区分多个相册时会使用到
		 * scale.min	最小缩放比例
		 * scale.max	最大缩放比例
		 * scale.step	缩放增减量
		 * scale.cur	当前比例
		 * 注：
		 * jquery版本：1.9.0     on  的应用
		 *---------------------------------------
		 * Update: 2019.4.24 
		 */
		'layer_photo':function(options){
			var p_this=$(this);
			var options=$.extend({
				items:'',
				max_w:980,
				max_h:650,
				scale:{min:0.4,max:2,step:0.1,cur:1},
				openEvent: function () {
					console.log(1231)
				},
				closeEvent: function () {
					console.log(31)
				},
				cur: 0
			},options);
			
			var notConf={
				layer:'#zlayer',	//窗口透明背景
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
				scaleUp:'#zvi_scaleUp',
				scaleDown:'#zvi_scaleDown',
				downLoad:'#zvi_download',
				rotateLeft:'#zvi_rotateLeft',
				rotateRight:'#zvi_rotateRight',
				f:false,	//是否打开窗口标志 默认为false,标签关闭状态
				count:1,	//图片张数，默认为1，且至少1张
				cur_num:0,	//当前图片,默认第一张为当前预览
				cur_img:new Image(),
				cur_w:0,	//预览大图最大宽度和记录原始图片尺寸
				cur_h:0,	//预览大图最大高度和记录原始图片尺寸
				clear:null,	//获取尺寸时定义的定时器变量
				cur_txt:'',	//可变的动态标题
				startSite:{x:null,y:null},//开始位置
				endSite:{x:null,y:null},// 移动有效位置
				len:{x:null,y:null}, // 鼠标在元素的位置与移动距离差值
				last:{x:null,y:null}, // 记录移动后位置
				rotate:{deg:90,num:0} // 旋转参数
			}
			notConf=$.extend(options,notConf);
			//多个相册分别做标记
            $(".zvi_btn").append('<div class="zvi_prev"'+' prev'+notConf.cur+'="id'+notConf.cur+'">上一张</div>');
            $(".zvi_btn").append('<div class="zvi_next"'+' next'+notConf.cur+'="id'+notConf.cur+'">下一张</div>');
            $(".zvi_prev").hide();
            $(".zvi_next").hide();
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
				if(bh) notConf.max_h=bh-40;
				$(notConf.content).width(notConf.max_w+pl+pr+ml+mr);
				$(notConf.content).height(notConf.max_h+pt+pb+mt+mb+$(notConf.imgTitle).height());
				$(notConf.prev).height(notConf.max_h-$(notConf.imgTitle).height());
				$(notConf.next).height(notConf.max_h-$(notConf.imgTitle).height());
				$(notConf.viewSize).height(notConf.max_h-$(notConf.imgTitle).height());
				$(notConf.imgbox).height(notConf.max_h-$(notConf.imgTitle).height());
			}
			
			//更新当前图片对象
			function updateSrc(){
				notConf.cur_img.src=p_this.find(notConf.items+':eq('+notConf.cur_num+')').find('img[largeUrl]').attr('largeUrl');
				$(notConf.downLoad).attr('largeUrl',notConf.cur_img.src);
				// notConf.cur_txt=p_this.find(notConf.items+':eq('+notConf.cur_num+')').find('a').text();
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
				if(notConf.cur_w/notConf.cur_h>notConf.max_w/notConf.max_h){
					notConf.cur_w=notConf.max_w;
					notConf.cur_h=notConf.cur_h*(notConf.cur_w/notConf.cur_img.width);
				}else{
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
			
			//图片放大
			var scaleImg = function (){
				if (notConf.cur_w == 0 || notConf.cur_h == 0) return
				//ie9以下浏览器使用方法
				if(notConf.cur_w/notConf.cur_h>=1){
					$(notConf.img).removeAttr('height');
					$(notConf.img).attr({'width':notConf.cur_w*notConf.scale.cur});
				}else{
					$(notConf.img).removeAttr('width');
					$(notConf.img).attr({'height':notConf.cur_h*notConf.scale.cur});
				}
				// ie9以上浏览器使用方法
				//$(notConf.img).css({'-webkit-transform':'scale('+notConf.scale.cur+','+notConf.scale.cur+')'});
			}
			// 按下时
			function moveStart(e) {
				$(notConf.img).removeClass("zduration");
				$(notConf.img).bind('mousemove',movIng);
				$(notConf.img).bind('mouseup',moveEnd);
				notConf.startSite.x=e.pageX,notConf.startSite.y=e.pageY;
				notConf.len.x=e.pageX-$(this).offset().left,notConf.len.y=e.pageY-$(this).offset().top;
			}
			// 弹起时
			function moveEnd(e) {
				$(notConf.img).unbind('mousemove',movIng);
				$(notConf.img).unbind('mouseup',moveEnd);
				notConf.last.x=notConf.endSite.x,notConf.last.y=notConf.endSite.y
			}
			
			//图片位移
			function movIng(e){
				e.preventDefault();
				
				notConf.endSite.x=e.pageX-notConf.startSite.x,notConf.endSite.y=e.pageY-notConf.startSite.y;
				if(notConf.last.x){
					notConf.endSite.x=notConf.endSite.x+notConf.last.x,notConf.endSite.y=notConf.endSite.y+notConf.last.y;
				}
				var str = $(notConf.img).attr('style')
				var site = str.indexOf('rotate')
				if (site >= 0) {
					var strSub = str.substring(site, str.length - 1) 
					$(notConf.img).css({'-webkit-transform':'translate('+notConf.endSite.x+'px,'+notConf.endSite.y+'px) ' + strSub});
				} else {
					$(notConf.img).css({'-webkit-transform':'translate('+notConf.endSite.x+'px,'+notConf.endSite.y+'px)'});
				}
			}
			
			// 清除事件
			$(notConf.img).bind('mouseout',function(){
				$(notConf.img).unbind('mousemove',movIng);
				$(notConf.img).unbind('mouseup',moveEnd);
			});
			
			//切换不同图片时初始化缩放\移动\旋转状态
			function clearState(){
				$(notConf.img).removeAttr('style');
				notConf.startSite={x:null,y:null},
				notConf.endSite={x:null,y:null},
				notConf.len={x:null,y:null},
				notConf.last={x:null,y:null};
				notConf.rotate.num=0;
				$(notConf.img).removeClass("zduration");
			}
			
			$(notConf.img).bind('mousedown',moveStart);
			
			// 按角度旋转
			function rotateDeg(){
				$(notConf.img).addClass("zduration");
				if(notConf.last.x){
					$(notConf.img).css({'-webkit-transform':'translate('+notConf.last.x+'px,'+notConf.last.y+'px) rotate('+(notConf.rotate.deg*notConf.rotate.num)+'deg)'})
				}else{
					$(notConf.img).css({'-webkit-transform':'rotate('+(notConf.rotate.deg*notConf.rotate.num)+'deg)'})
				}
			}
			
			// 向右旋转
			function rotateR(){
				notConf.rotate.num++;
				rotateDeg();
			}
			// 向左旋转
			function rotateL(){
				notConf.rotate.num--;
				rotateDeg();
			}
			// 绑定右旋转
			$(notConf.rotateRight).bind('click',function(){
				rotateR();
			});
			// 绑定左旋转
			$(notConf.rotateLeft).bind('click',function(){
				rotateL();
			});
			
			//绑定放大按钮
			$(notConf.scaleUp).bind('click',function(){
				if(notConf.scale.cur<=notConf.scale.max){
					notConf.scale.cur+=notConf.scale.step;
					scaleImg();
				}else{
					return false;
				}
			});
			
			//绑定缩小按钮
			$(notConf.scaleDown).bind('click',function(){
				if(notConf.scale.cur>=notConf.scale.min){
					notConf.scale.cur-=notConf.scale.step;
					scaleImg();
				}else{
					return false;
				}
				
			});
			
			//向右   上一张
			$(notConf.prev+'[prev'+notConf.cur+'=id'+notConf.cur+']').click(function(){
				if(notConf.cur_num>0){
					clearState();
					notConf.scale.cur=1;
					notConf.cur_num--;
					$(notConf.img).removeAttr('height');
					$(notConf.img).removeAttr('width');
					$(notConf.img).attr({'src':notConf.loading.url,'width':notConf.loading.w});
					
					btnStatus();
					updateSrc();
				}
			});
			
			//向左  下一张
			$(notConf.next+'[next'+notConf.cur+'=id'+notConf.cur+']').click(function(){
				if(notConf.cur_num<(p_this.find(notConf.items).length-1)){
					clearState();
					notConf.scale.cur=1;
					notConf.cur_num++;
					$(notConf.img).removeAttr('height');
					$(notConf.img).attr({'src':notConf.loading.url,'width':notConf.loading.w});
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
			$(p_this.find(notConf.items)).click(function(){
				$(".zvi_prev").hide();
                $(".zvi_next").hide();
                $(notConf.prev+'[prev'+notConf.cur+'='+p_this.attr("id")+']').show();
                $(notConf.next+'[next'+notConf.cur+'='+p_this.attr("id")+']').show();
                notConf.openEvent()
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
				clearState();
				btnStatus();
				updateSrc();
				viewSize($(window).width()*0.9,$(window).height()*0.8);
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
					notConf.closeEvent()
				},500);
			});
			
			//移除关闭动画
			function rmClass(self){
				self.parents(notConf.content).removeClass(notConf.animation_close)
				$(notConf.layer).hide();
			}
			//监视浏览器大小
			$(window).resize(function(){
				var w=$(window).width()*0.9;
				var h=$(window).height()*0.8;
				if(notConf.f){
					viewSize($(window).width()*0.9,$(window).height()*0.8);
					getSize();
					resetWindow();
				}
			});
				
				return this;	//返回this  使方法可链
		}
	});
})(jQuery);
