// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：单张图片全屏左右滑动
		 * 参数介绍：
		 * pointOff:'',				默认为空，必填项，点按钮默认状态样式
		 * pointOn:'',				默认为空，必填项，点按钮当前状态样式
		 * pointHtml:'',			默认为li标签，选填项，点按钮标签名，
		 * btn_l_h:'',				默认为空，选填项，左鼠标滑过样式名
		 * btn_r_h:'',				默认为空，选填项，右鼠标滑过样式名
		 * isBtn:true,				默认为true，选填项，是否显示左右滑动按钮
		 * showBtn:true,			默认为true，选填项，是否开启鼠标滑动效果hover
		 * isPoint:true,			默认为true，选填项，是否显示底部圆点按钮
		 * isAuto:true,				默认为true，选填项，是否开启自动滑动
		 * speed:3000,				默认为3000，选填项，图片滑动速度
		 * minW:1024,				默认为1024，选填项，限定最小宽度，开启浏览器自适应有效
		 * LorR:0					默认滑动方向：右滑动。选填项，不为空和false且大于0的值向左滑动
		 * 
		 * 注
		 * jquery版本：1.7.2     建议在1.6或者1.7.2以上
		 *---------------------------------------
		 * Great：2014.5.13
		 * Update: 2015.12.11
		 */
		'fullScreenSwitch':function(options){
				var p_this=$(this);
				var c=null;
				options=$.extend({
					pointOff:'',
					pointOn:'',
					pointHtml:'',
					btn_l_h:'',
					btn_r_h:'',
					isBtn:true,
					showBtn:true,
					isPoint:true,
					isAuto:true,
					isfull:true,
					speed:3000,
					minW:1024,
					LorR:0
				},options);

				var notConf={//不可配置项
					point:p_this.find('[role=point]'),		//点按钮ID
					btn_l:p_this.find('[role=left]'),		//左单击按钮
					btn_r:p_this.find('[role=right]'),		//右单击按钮
					content:p_this.find('[role=middle]').children(),		//一屏容器
					middle:p_this.find('[role=middle]'),		//可视区域或移动目标
					mid:p_this.find('[role=mid]'),
					tmp:null,
					isbottom:0,		//是否点击过底部按钮
					flag:0,			//浏览器改变标志位
					count:0,		//第几屏，记录当前屏标号，默认第一屏
					lastW:$(window).width(),		//上次屏宽
					//lastH:$(window).height(),		//上次屏高
					width:$(window).width(),		//当前屏宽
					//height:$(window).height()		//当前屏高
					isanimate:true					//动画是否完成
				}
				
				//追加按钮
				notConf.tmp=options.pointHtml?options.pointHtml:"li";
				for(i=0;i<notConf.content.length-1;i++){
					$(notConf.point).children().append('<'+notConf.tmp+' class="'+options.pointOff+'"></'+notConf.tmp+'>');
				};
				$(notConf.point).find(notConf.tmp).each(function(index){
					$(this).on('click',function(){
						if(notConf.count!=index){
							move_right(index);
						}
						$(this).attr('class',options.pointOn).siblings().attr('class',options.pointOff);
						notConf.count=index;
					});							   
				});
				
				//添加当前按钮样式
				function cur_btn(){
					$(notConf.point).find(notConf.tmp).eq(notConf.count).attr('class',options.pointOn).siblings().attr('class',options.pointOff);
				}
				
				if(options.isPoint){
					notConf.point.show();
				}
				
				//根据窗口改变重新初始化
				function setwindow(){
					notConf.width=$(window).width();
					//notConf.height=$(window).height();
					if(notConf.width<=options.minW){
						notConf.width=options.minW;
					}
					if(!options.isfull){
						notConf.width=options.minW;
					}
					//options.bg.height(notConf.height+'px');
					notConf.content.width(notConf.width);
					notConf.mid.html(notConf.middle.html());
					notConf.middle.width(notConf.content.length*notConf.width);
					notConf.mid.width(notConf.content.length*notConf.width);
					if(notConf.flag){
						//保留注释，待更新在浏览器大小改变时，不改变当前图片
						//notConf.mid.css('left',-notConf.width*notConf.count+'px');
						//notConf.middle.css('left',notConf.width*(notConf.content.length-notConf.count)+'px');
						setone();
						notConf.lastW=notConf.width;
						//notConf.lastH=notConf.height;
						notConf.flag=0;
					}
				}
				setwindow();
				
				//校对轨道
				function check(f){
					//f值为1:校对向左滑动轨道,f值为0或空:校对向右滑动轨道
					if(f){
						var site=(notConf.mid.position().left<=0?notConf.mid.position().left*-1:notConf.mid.position().left*1)/notConf.width;
						notConf.middle.css('left',(notConf.content.length-site)*notConf.width+'px');
					}else{
						var site=(notConf.mid.position().left<=0?notConf.mid.position().left*-1:notConf.mid.position().left*1)/notConf.width;
						notConf.middle.css('left',(notConf.content.length+site)*notConf.width*-1+'px');
					}
				}
				
				//初始化被克隆和克隆内容的位置，以满足左右按钮条件使点击左右滑动
				function setone(){
					notConf.middle.css('left',notConf.content.length*notConf.width*-1+'px');
					notConf.mid.css('left',0+'px');
					notConf.count=0;
					cur_btn();
				}
				setone();
				
				//左滑动
				function move_left(){
					if(notConf.isbottom){
						notConf.isbottom=0;
						check(1);
					}
					if(notConf.middle.position().left<=(-(notConf.content.length)*notConf.width)){
						notConf.middle.css('left',notConf.content.length*notConf.width+'px');
					}
					notConf.middle.not(':animated').animate({left:"-="+notConf.width},500,function(){notConf.isanimate=true;});
					if(notConf.mid.position().left<=(-(notConf.content.length)*notConf.width)){
						notConf.mid.css('left',notConf.content.length*notConf.width+'px');
					}
					notConf.mid.not(':animated').animate({left:"-="+notConf.width},500,function(){notConf.isanimate=true;});
					//记录当前图片
					if(notConf.isanimate){
						notConf.isanimate=false;
						if(notConf.count<notConf.content.length-1){
							notConf.count++
						}else{
							notConf.count=0;
						}
						cur_btn();
					}
				}
				
				//右滑动
				function move_right(index){
					//是否点击过底部按钮
					if(typeof index=='number'){
						notConf.isbottom=1;
						notConf.middle.not(':animated').animate({left:-notConf.width*index},500);
						notConf.mid.not(':animated').animate({left:-notConf.width*index},500);
					}else{
						if(notConf.isbottom){
							notConf.isbottom=0;
							check();
						}
						notConf.middle.not(':animated').animate({left:"+="+notConf.width},500,function(){
							if(notConf.middle.position().left>=notConf.content.length*notConf.width){
								notConf.middle.css('left',-notConf.content.length*notConf.width+'px');
							}
							notConf.isanimate=true;
						});
						notConf.mid.not(':animated').animate({left:"+="+notConf.width},500,function(){
							if(notConf.mid.position().left>=notConf.content.length*notConf.width){
								notConf.mid.css('left',-notConf.content.length*notConf.width+'px');
							}
							notConf.isanimate=true;
						});
						//记录当前图片
						if(notConf.isanimate){
							notConf.isanimate=false;
							if(notConf.count){
								notConf.count--;
							}else{
								notConf.count=notConf.content.length-1;
							}
							cur_btn();
						}
					}
					
				}
				
				//obo判断移动方向  传参数1：left或0：right
				function move(obo){
					if(obo){
						move_left();
					}else{
						move_right();
					}
				}
				
				//是否显示左右滑动按钮
				if(options.isBtn){
					p_this.mouseenter(function(){
						notConf.btn_l.fadeIn();
						notConf.btn_r.fadeIn();
					}).mouseleave(function(){
						notConf.btn_l.fadeOut();
						notConf.btn_r.fadeOut();
					});
				}else{
					notConf.btn_l.hide();
					notConf.btn_r.hide();
				}
				
				//是否有鼠标滑过效果hover
				if(options.showBtn){
					//左按钮滑过效果
					notConf.btn_l.mouseover(function(){
						$(this).addClass(options.btn_l_h);	  
					}).mouseout(function(){
						$(this).removeClass(options.btn_l_h);
					});
					
					//右按钮滑过效果
					notConf.btn_r.mouseover(function(){
						$(this).addClass(options.btn_r_h);		  
					}).mouseout(function(){
						$(this).removeClass(options.btn_r_h);
					});
				}
				
				//浏览器窗口大小监测
				$(window).resize(function(){
					notConf.flag=1;
					setwindow();
					//是否自动滑动
					if(options.isAuto){
						if(c) clearInterval(c);
						c=setInterval(function(){move();},options.speed);
					}
				});
				
				//是否自动
				if(options.isAuto){
					var cl=setInterval(function(){move(options.LorR);},options.speed);
					p_this.mouseleave(function(){
						clearInterval(cl);
						cl=setInterval(function(){move(options.LorR);},options.speed);							  
					}).mouseenter(function(){
						clearInterval(cl);
					});
				}
				
			
				notConf.btn_l.bind("click",function(){move()});
				notConf.btn_r.bind("click",function(){move(1)});
				
				return this;	//返回this  使方法可链
		}
	});
})(jQuery);
