// JavaScript Document
;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：单张多张图片左右无缝滑动
		 * 参数介绍：
		 * pointOff:'btn_off',		默认为空，选填项，点按钮默认状态样式
		 * pointOn:'btn_on',		默认为空，选填项，点按钮当前状态样式
		 * pointHtml:'',			默认为li标签，选填项，点按钮标签名
		 * btn_l_h:'left_h',		默认为空，选填项，左鼠标滑过样式名
		 * btn_r_h:'right_h',		默认为空，选填项，右鼠标滑过样式名
		 * isBtn:false,				默认为flase，选填项，是否显示左右滑动按钮
		 * showBtn:true,			默认为true，选填项，是否开启鼠标滑动效果hover
		 * isPoint:false,			默认为false，选填项，是否显示底部圆点按钮
		 * isAuto:true,				默认为true，选填项，是否开启自动滑动
		 * speed:3000,				默认为3000，选填项，图片滑动速度
		 * LorR:1,					默认滑动方向为右。选填项，1：左；0:右,必须传数字0和1
		 * num:1					默认为1，选填项，一次滑动数量
		 * 
		 * 注
		 * jquery版本：1.7.2     无版本需求
		 *---------------------------------------
		 * Great：2014.5.12 
		 * Update: 2015.12.11
		 */
		'switchPic':function(options){
				var p_this=$(this);
				//设置默认值 $.extend合并新参数
				options=$.extend({
					pointOff:'',
					pointOn:'',
					pointHtml:'',
					btn_l_h:'',
					btn_r_h:'',
					isBtn:false,
					showBtn:true,
					isPoint:false,
					isAuto:true,
					speed:3000,
					LorR:1,	
					num:1
				},options);
												
				//根据配置生成不可配置参数
				var notConf={
					point:p_this.find("[role='btn']"),//点按钮父级标签
					btn_l:p_this.find("[role='left']"),//左单击按钮
					btn_r:p_this.find("[role='right']"),//右单击按钮
					middle:p_this.find("[role='middle']"),//被克隆移动目标
					mid:p_this.find("[role='mid']"),//克隆移动目标
					tmp:null,		//点按钮标签
					isbottom:0,		//是否点击过底部按钮
					viewW:p_this.find("[role='viewW']").width(),	//可视宽度
					count:0,		//第几屏，记录当前屏标号，默认第一屏
					width:245,		//默认一个单位的宽度，不用理会此值，系统会自动获取
					height:p_this.find("[role='middle']").children(':eq(0)').height(),		//一个单位的高度
					isanimate:true			//动画是否完成
				}
				var one=notConf.middle.children(':eq(0)');
				notConf.width=one.width()+parseInt(one.css('paddingLeft'))+parseInt(one.css('paddingRight'));
				
				var m={
					step:options.num*notConf.width,		//一次滚动长度
					len:(notConf.middle.children().length*notConf.width>notConf.viewW)		//是否内容宽度小于可视宽度
				}
				
				if(notConf.width<notConf.viewW*3/4){
					options.isPoint=false;
				}
				
				if(m.len){
					if(notConf.middle.children().length<2*options.num){
						notConf.middle.append(notConf.middle.html());
					}
				}else{
					options.isAuto=false;
				}
				
				//追加按钮
				notConf.tmp=options.pointHtml?options.pointHtml:"li";
				for(i=0;i<Math.ceil(notConf.middle.children().length/options.num)-1;i++){
					$(notConf.point).children(":eq(0)").append('<'+notConf.tmp+' class="'+options.pointOff+'"></'+notConf.tmp+'>');
				};
				$(notConf.point).find(notConf.tmp).each(function(index){
					$(this).on('click',function(){
						move_right(index);
						$(this).attr('class',options.pointOn).siblings().attr('class',options.pointOff);
						notConf.count=index;
					});							   
				});
				
				//添加当前按钮样式
				function cur_btn(){
					$(notConf.point).find(notConf.tmp).eq(notConf.count).attr('class',options.pointOn).siblings().attr('class',options.pointOff);
				}
				
				if(options.isPoint){
					$(notConf.point).show();
				}
				
				//根据窗口改变重新初始化
				function setwindow(){
					notConf.mid.html(notConf.middle.html());
					notConf.middle.width(notConf.middle.children().length*notConf.width);
					notConf.mid.width(notConf.middle.children().length*notConf.width);
				}
				
				if(m.len){
					setwindow();
				}
				
				//校对轨道
				function check(f){
					//f值为1:校对向左滑动轨道,f值为0或空:校对向右滑动轨道
					if(f){
						var site=(notConf.mid.position().left<=0?notConf.mid.position().left*-1:notConf.mid.position().left*1)/notConf.width;
						notConf.middle.css('left',(notConf.middle.children().length-site)*notConf.width+'px');
					}else{
						var site=(notConf.mid.position().left<=0?notConf.mid.position().left*-1:notConf.mid.position().left*1)/notConf.width;
						notConf.middle.css('left',(notConf.middle.children().length+site)*notConf.width*-1+'px');
					}
				}
				
				//一次性初始化
				function setone(){
					notConf.middle.css('left',notConf.middle.children().length*notConf.width*-1+'px');
					notConf.mid.css('left',0+'px');
					notConf.count=0;
					cur_btn();
				}
				if(m.len){
					setone();
				}
				
				//左滑动
				function move_left(){
					if(notConf.isbottom){
						notConf.isbottom=0;
						check(1);
					}
					
					if(notConf.middle.position().left<=(-notConf.middle.children().length*notConf.width)){
						notConf.middle.css('left',notConf.mid.position().left+notConf.middle.children().length*notConf.width+'px');
					}
					if(notConf.mid.position().left<=(-notConf.middle.children().length*notConf.width)){
						notConf.mid.css('left',notConf.middle.position().left+notConf.middle.children().length*notConf.width+'px');
					}
					notConf.middle.not(':animated').animate({left:"-="+m.step},500,function(){notConf.isanimate=true;});
					notConf.mid.not(':animated').animate({left:"-="+m.step},500,function(){notConf.isanimate=true;});
					//记录当前图片
					if(notConf.isanimate){
						notConf.isanimate=false;
						if(notConf.count<Math.ceil(notConf.middle.children().length/options.num)-1){
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
						notConf.middle.not(':animated').animate({left:-m.step*index},500);
						notConf.mid.not(':animated').animate({left:-m.step*index},500);
					}else{
						if(notConf.isbottom){
							notConf.isbottom=0;
							check();
						}
						if(notConf.middle.position().left>notConf.viewW){
							notConf.middle.css('left',notConf.mid.position().left-notConf.middle.children().length*notConf.width+'px');
						}
						
						if(notConf.mid.position().left>=notConf.viewW){
							notConf.mid.css('left',notConf.middle.position().left-notConf.middle.children().length*notConf.width+'px');
						}
						notConf.middle.not(':animated').animate({left:"+="+m.step},500,function(){notConf.isanimate=true;});
						notConf.mid.not(':animated').animate({left:"+="+m.step},500,function(){notConf.isanimate=true;});
					}
					//记录当前图片
					if(notConf.isanimate){
						notConf.isanimate=false;
						if(notConf.count){
							notConf.count--;
						}else{
							notConf.count=Math.ceil(notConf.middle.children().length/options.num)-1;
						}
						cur_btn();
					}
				}
				
				//obo判断移动方向  传参数1：left或0：right
				function move(obo){
					if((typeof obo=='number'&&obo<=1&&obo>=0)||obo=='undefined'||obo==null){
						if(obo){
							move_right();
						}else{
							move_left();
						}
					}
				}
				
				//左右按钮效果
				function btn_effect(){
					p_this.mouseenter(function(){
						notConf.btn_l.fadeIn();
						notConf.btn_r.fadeIn();
					}).mouseleave(function(){
						notConf.btn_l.fadeOut();
						notConf.btn_r.fadeOut();
					});
					//左按钮滑过效果
					notConf.btn_l.mouseover(function(){
						$(this).parents('.left').addClass(options.btn_l_h);	  
					}).mouseout(function(){
						$(this).parents('.left').removeClass(options.btn_l_h);
					});
					
					//右按钮滑过效果
					notConf.btn_r.mouseover(function(){
						$(this).parents('.right').addClass(options.btn_r_h);		  
					}).mouseout(function(){
						$(this).parents('.right').removeClass(options.btn_r_h);
					});
				}
				
				if(options.isBtn){
					btn_effect();
				}else{
					notConf.btn_l.hide();
					notConf.btn_r.hide();
				}
				if(m.len){
					notConf.btn_l.bind("click",function(){move(1)});
					notConf.btn_r.bind("click",function(){move()});
				}
					
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
				return this;	//返回this  使方法可链
		}
	});
})(jQuery);
