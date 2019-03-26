
/**
 * Author: 张中乐
 * Email: sjz20072-304@163.com
 * Update: 2014.5.13 
 */
;(function($){
	//个人插件  start
	$.fn.extend({
		
		
		
		/**
		 * 功能介绍：标签切换tab
		 * 参数介绍：
		 * myevent:'click',  默认为单击click事件，可修改 
		 * contentId:'',  默认为空，可切换内容父级标签ID，选填项
		 * contentCss:''  默认为空，可切换内容标签样式，必填项
		 * titleOff:'',  默认为空，提示标题常状态样式，选填项
		 * titleOn:'',  默认为空，提示标题当前选中状态样式，选填项
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
				animteCss:'fadeInRight',
				active:false,
				btn:'li'
			},options);
			
			p_self.children(options.btn).on(options.myevent,function(){
				if(last==$(this).index()) return false;
				if(options.active){
					p_self.children(options.btn).removeClass(options.titleOn)
					$(this).addClass(options.titleOn);
				}else{
					p_self.children(options.btn).attr('class',options.titleOff)
					$(this).attr('class',options.titleOn);
				}
				if(options.contentId){
					$(options.contentId+' '+options.contentCss).eq($(this).index()).show().siblings().hide();
				}else{
					$(options.contentCss).hide();
					$(options.contentCss).eq($(this).index()).show();
					if(options.animteCss){
						$(options.contentCss).removeClass(options.animteCss);
						$(options.contentCss).eq($(this).index()).addClass(options.animteCss);
					}
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
		 * speed:100,
		 * clickIsHide	默认为true，点击后下拉框是否消失
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
				speed:100,
				clickIsHide:true,
				parent_css:'.zselect',
				box:'.zse_ul'
			},options);
			
			//显示和隐藏下拉框
			p_self.on(options.myevent,function(){
				$(options.box).slideUp();
				$(this).addClass("zfl_white");
				$(options.parent_css).css('zIndex','1');
				$(this).css('zIndex','22');
				clearTimeout(clickone_tid[0]);
				self_=this;
				clickone_tid[0]=setTimeout(function(){
					$(self_).find(options.sub_ul+':eq(0)').slideToggle(options.speed?'fast':options.speed);
				},200);
			});
			
			//默认选中第N项
			ele.ul=p_self.find(options.sub_ul+':eq(0)');
			ele.li=p_self.find(options.sub_ul+':eq(0)').find(options.sub_li);
			
			if(options.selected){
				if(options.selected<ele.li.length){
					p_self.find(':eq(0)').html(ele.li.eq(options.selected-1).find('a').html());
				}else if(options.selected=='last'){
					p_self.find(':eq(0)').val(ele.li.last().find('a').html());
				}else{
					alert('id='+p_self.attr('id')+'  的下拉框默认选中项输入有误');
				}
				
			}
			//手动选中第N项
			p_self.find(options.sub_ul+':eq(0)').on('click',options.sub_li,function(e){
				var li_html=$(this).find('a').html();
				$(this).parent().prev().html(li_html);
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;
				}
				return false;
			});
			//点击后下拉框是否消失
			if(options.clickIsHide){
				//选中子项下拉框消失
				p_self.find(options.sub_li).on('click',function(){
					p_self.children(options.sub_ul+':eq(0)').slideUp(options.speed?'fast':options.speed);
					$(options.parent_css).css('zIndex','1');
					$(this).removeClass("zfl_white");
					$(this).find(options.sub_ul+':eq(0)').prev().removeClass("zfl_white");
				});
			}
			//鼠标经过时添加样式
			p_self.on('mouseenter',function(){
				$(this).addClass("zfl_hover");
			});
			//鼠标离开下拉框消失
			p_self.on('mouseleave',function(){
				$(this).find(options.sub_ul+':eq(0)').slideUp(options.speed?'fast':options.speed);
				$(this).removeClass("zfl_hover");
				$(this).removeClass("zfl_white");
				$(this).find(options.sub_ul+':eq(0)').prev().removeClass("zfl_white");
			});
			
			return this;
		},
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
		 *---------------------------------------
		 * Update: 2014.5.13 
		 */
		'fullScreenSwitch':function(options){
				var p_this=$(this);
				var c=null;
				options=$.extend({
					isNum:false,
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
				for(i=1;i<notConf.content.length;i++){
					if(options.isNum){
						$(notConf.point).append('<'+notConf.tmp+' class="'+options.pointOff+'">'+parseInt(i+1)+'</'+notConf.tmp+'>');
					}else{
						$(notConf.point).append('<'+notConf.tmp+' class="'+options.pointOff+'"></'+notConf.tmp+'>');
					}
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
					
				}else{
					notConf.btn_l.hide();
					notConf.btn_r.hide();
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
		},
		/**
		 * 功能介绍：输入框 失去焦点 与 得到焦点 颜色切换
		 * 参数介绍：
		 * color: 默认为#333，选填项，得到焦点时颜色
		 * gray: 默认为#999，选填项，失去焦点和为空时颜色
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
				
				(p_this.find('input[type=text]').length?p_this.find('input[type=text]'):p_this).each(function(index){
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
		}
	});
	//个人插件  end
	
	//集成他人插件  start
	$.fn.carousel = function(args) {
		var $this = $(this),
			$viewport = $this.find("[role=viewport]"),
			$content = $this.find("[role=content]"),
			$leftBtn = null,
			$rightBtn = null,
			$btnNum	= 0,
			$btnHtml = '<a href="javascript:;"></a>',
			
			defaults = $.extend({
				self: $this,
				content: $content,
				points: null,			// 底部按钮组
				isPagination: false,	// 是否有底部按钮
				isButton: false,		// 是否有左右按钮组
				isLoop: true,			// 是否循环
				isHideBtn: true,		// 是否 hover button
				isSlow: false,			// 是否缓慢移动
				direction: true,		// 正方向为向上滚动，向左滚动
				directionXY: true,		// 默认滚动X轴
				interval: 3000,			// 间隔时间
				speed: 700,				// 如果为缓慢滚动此为滚动 1px 间歇时间 否则为滚动一屏的时间
				curClass: "cur",		// 底部按钮默认选中的class
				isMove: true
			}, args),
			
			timer = null;
			
		//添加底部按钮
		$btnNum=defaults.content.children().length;
		for(N=0;N<$btnNum-1;N++){
			$this.find("[role=points]").append($btnHtml);
		};
		// 计算高度或者宽度值
		defaults.contentXY = defaults.directionXY ? $content.children().eq(0).width() * $content.children().length : $content.height();
		defaults.distance = defaults.directionXY ? $viewport.width() : $viewport.height();
		
		$content.html($content.html() + $content.html() + $content.html());
		$content.css((defaults.directionXY ? "width" : "height"), defaults.contentXY * 3);
		$content.css((defaults.directionXY ? "left" : "top"), defaults.contentXY * -1);
		
		if (defaults.isButton && !defaults.isSlow) {
			$leftBtn = $this.find("[role=left]");
			$rightBtn = $this.find("[role=right]");
			
			$this.on({
				click: function() {
					if ($(this).attr("role") == "right") {
						move(true, defaults);
					} else {
						move(false, defaults);
					}
				}
			}, "[role=left], [role=right]");
			
			if (defaults.isHideBtn) {
				$this.on({
					mouseenter: function() {
						$leftBtn.css("display", "block");
						$rightBtn.css("display", "block");
					},
					mouseleave: function() {
						$leftBtn.css("display", "none");
						$rightBtn.css("display", "none");
					}
				});
			}
		}
		
		$this.on({
			mouseenter: function() {
				clearInterval(timer);
			},
			mouseleave: function() {
				timer = setInterval(function() {
					move(defaults.direction, defaults);
				}, defaults.isSlow ? defaults.speed : defaults.interval);
			}
		});
		
		if (defaults.isPagination && !defaults.isSlow) {
			defaults.points = $this.find("[role=points]").children();
			
			defaults.points.each(function(i) {
				$(this).on("click", function() {
					move(true, defaults, i);
				});
			});
		}
		
		timer = setInterval(function() {
			move(defaults.direction, defaults);
		}, defaults.isSlow ? defaults.speed : defaults.interval);
	};
	
	function move(mark, args, index) {
		if (!args.isSlow) {
			if (args.isMove) {
				args.isMove = false;
			} else {
				return false;
			}
		}
		var $this = args.self,
			$content = args.content,
			subDis = args.isSlow ? 1 : args.distance,
			directionXY = args.directionXY ? "left" : "top",
			curPos = parseInt($content.css(directionXY)),
			destination = mark ? curPos - subDis : curPos + subDis;
		
		if (!args.isLoop) {
			if (destination > args.contentXY * -1) {
				destination = args.contentXY * -2 + subDis;
			}else if (destination < args.contentXY * -2 + subDis) {
				destination = args.contentXY * -1;
			}
		}
		
		if (!args.isSlow && args.isPagination) {
			args.points.removeClass(args.curClass);
			
			if (typeof index == "number") {
				destination = args.contentXY * -1 - index * subDis;
			} else {
				index = Math.abs((destination + args.contentXY)/subDis);
			}
			if (index >= args.points.length) index = 0;
			args.points.eq(index).addClass(args.curClass);
		}
		
		if (args.isSlow) {
			$content.css(directionXY, destination);
			moveComplete();
		} else {
			if (args.directionXY) {
				$content.animate({left: destination}, args.speed, function() {
					moveComplete();
				});
			} else {
				console.log(destination);
				$content.animate({top: destination}, args.speed, function() {
					moveComplete();
				});
			}
		}
		
		function moveComplete() {
			curPos = parseInt($content.css(directionXY));
			
			if ((curPos <= args.contentXY * -2 || curPos >= 0) && args.isLoop) {
				args.content.css(directionXY, args.contentXY * -1);
			}
			
			args.isMove = true;
		}
	}
	//集成他人插件  end
	
})(jQuery);






























