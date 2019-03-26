/**
 * 个人插件集成导航
1		star			评星级
2		menu			横向多级菜单
3		menuVer			垂直多级菜单
4		tab				标签切换tab
5		imiSelect		imitate Select 模拟下拉框
6		switchPic		单张多张图片左右无缝滑动
7		fullScreenSwitch单张图片全屏左右滑动
8		defaultInput	输入框 失去焦点 与 得到焦点 颜色切换
9		layer			带透明背景弹层
10		singleslide		不重复单向左右滑动
11		zdrag			窗口拖动
12		layer_photo		弹层式相册（特点：小屏层弹不跟随屏幕滑动，大屏可跟随屏幕滑动）
13		magnifier		图片放大镜
14		menuInfinite	无限级菜单
15		imgEffects		图片切换集（不支持全屏，只限固定且已知尺寸使用）
16		upAndDown		图片或文字向上滑动
17
18
19
20
21
22
23
**/
/**
 * Author: 张中乐
 * Email: sjz20072-304@163.com
 * Update: 2015.1.15 
 */
;(function($){
	//个人插件  start
	$.fn.extend({
		/**
		 * 功能介绍：评星级，鼠标滑过操作
		 * 参数介绍：
		 * id: 父级ID 如#ex1、nub
		 * sub:子标签名称 如dd li
		 * css_off：默认样式1（必传项）如.css_off
		 * css_on:当前样式2（必传项）如.css_on
		 *---------------------------------------
		 * Update: 2014.5.13
		 */
		'star':function(options){
			var p_this=$(this);
			//alert(p_this.attr('class'));
			options=$.extend({
				css_off:'',
				css_on:'',
				subElement:'dd'
			},options);
			p_this.children(options.subElement).click(function(){
				p_this.children(options.subElement).unbind('mouseover');
			});
			p_this.children(options.subElement).bind('mouseover',pingxing);
			function pingxing(){
					$(this).attr('class',options.css_on);
					$(this).prevAll().attr('class',options.css_on);
					$(this).nextAll(':not(:last)').attr('class',options.css_off);
				}
			return this;
		},
		/**
		 * 功能介绍：垂直多级菜单
		 * 参数介绍：
		 * m_first:'.m_first',一级菜样式默认.m_first，可修改
		 * m_second:'.m_second',二级样式默认.m_second，可修改
		 * m_third:'.m_third',三级样式名默认.m_third，可修改
		 * m_more:'.m_more'四级以上样式名默认.m_more，可修改
		 *---------------------------------------
		 * Update: 2015.1.6 
		 */
		'menuVer':function(options){
			var p_this=$(this);
			var last=null;
			
			options=$.extend({
				m_first:'.m_first',
				m_second:'.m_second',
				m_third:'.m_third',
				m_more:'.m_more',
				arrow_gray:'arrow_gray',
				arrow_color:'arrow_color',
				empty:'arrow_empty'
			},options);
			
			function active(this_ele,level,index){
				//给有无下一级菜单项添加标志
				if(this_ele.nextAll().length){
					this_ele.addClass(options.arrow_gray);
				}else{
					this_ele.addClass(options.empty);
				}
				
				this_ele.click(function(){
					this_ele.not('.'+options.empty).parent().children(':eq(0)').removeClass(options.arrow_color);
					$(this).parent().find('.'+options.arrow_color).removeClass(options.arrow_color);
					$(this).parent().siblings().find('.'+options.arrow_color).removeClass(options.arrow_color);
					$(this).not('.'+options.empty).parent().children(':eq(0)').addClass(options.arrow_color);
					if(!p_this.find().is(':animated')){
						if(last!=level+$(this).parent('li').index()){
							last=level+$(this).parent('li').index();
							p_this.find(level).parent('li').find('ul').slideUp();
							$(this).parent('li').children('ul').slideDown(200);
						}
					}
				});
			}
			
			if(options.m_first){
				p_this.find(options.m_first).each(function(index){
					active($(this),options.m_first,index);
				});
			}
			if(options.m_second){
				p_this.find(options.m_second).each(function(index){
					active($(this),options.m_second,index);
				});
			}
			if(options.m_third){
				p_this.find(options.m_third).each(function(index){
					active($(this),options.m_third,index);
				});
			}
			if(options.m_more){
				p_this.find(options.m_more).each(function(index){
					active($(this),options.m_more,index);
				});
			}
			
			return this;
		},
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
		},
		/**
		 * 功能介绍：imitate Select 模拟下拉框
		 * 参数介绍：
		 * sub_ul:'ul',  默认下拉框父标签为‘ul’,可修改为其他标签
		 * sub_li:'li',  默认下拉框子标签为‘li’，可修改为其他标签
		 * myevent:'click',	 默认事件为‘click’，可修改
		 * selected:1,  此项不可传值，若传值只是在没有在html中没做选择时有效，改变默认选中项
		 * speed:100,
		 * clickIsHide	默认为true，点击后下拉框是否消失
		 * 
		 * 注
		 * jquery版本：1.9.0     有on的应用需要1.9以上版本
		 *---------------------------------------
		 * Great：2015.1.5 
		 * Update: 2015.12.17
		 */
		'imiSelect':function(options){
			var p_self=$(this);
			var ele={}
			options=$.extend({
				sub_ul:'ul',
				sub_li:'li',
				myevent:'click',
				selected:0,
				speed:100,
				clickIsHide:true,
				parent_css:'.zselect',
				box:'.zse_ul',
				Tselect:'.zselect_e'
			},options);
			p_self.find(options.Tselect).children().each(function(){
				if($(this).attr('selected')){
					options.selected=$(this).index();
				}
			});
			//显示和隐藏下拉框
			p_self.on(options.myevent,function(){
				$(options.parent_css).css('zIndex','1');
				$(this).css('zIndex','22');
				if(!$(this).find(options.sub_ul+':eq(0)').is(':animated')){
					$(this).find(options.sub_ul+':eq(0)').slideToggle(options.speed?'fast':options.speed);
				}
			});
			
			//默认选中第N项
			ele.ul=p_self.find(options.sub_ul+':eq(0)');
			ele.li=p_self.find(options.sub_ul+':eq(0)').find(options.sub_li);
			
			if(options.selected){
				if(options.selected<ele.li.length){
					p_self.find(':eq(0)').html(ele.li.eq(options.selected).find('a').html());
					p_self.find(options.Tselect).children().eq(options.selected).attr("selected",true);
				}else{
					alert('id='+p_self.attr('id')+'  的下拉框默认选中项输入有误');
				}
			}
			//手动选中第N项
			p_self.find(options.sub_ul+':eq(0)').on('click',options.sub_li,function(e){
				var li_html=$(this).find('a').html();
				$(this).parent().prev().html(li_html);
				p_self.find(options.Tselect).children().eq($(this).index()).attr("selected",true);
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
				});
			}
			//鼠标离开下拉框消失
			p_self.on('mouseleave',function(){
				$(this).find(options.sub_ul+':eq(0)').slideUp(options.speed?'fast':options.speed);
			});
			
			return this;
		},
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
		 *---------------------------------------
		 * Update: 2014.5.12 
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
		},
		/**
		 * 功能介绍：带透明背景弹层
		 * 参数介绍：
		 * layer:'',		//必填项 被弹层的id 或样式名
		 * btn_close:''		//选填项 关闭按钮id 或样式名
		 *---------------------------------------
		 * Update: 2014.7.23 
		 */
		'layer':function(options){
				var p_this=$(this);
				options=$.extend({
					layer:'',
					btn_close:''
				},options);

				//获取浏览器尺寸并给屏蔽层赋值;
				function zlayer(){
					$(options.layer).width($(window).width());
					$(options.layer).height($(window).height());
				}
				//点击按钮弹层
				p_this.click(function(){
					zlayer();
					$(options.layer).show();
				});
				//关闭按钮是否存在
				if(options.btn_close){
					$(options.btn_close).click(function(){
						$(options.layer).hide();
					});
				}
				//改变浏览器大小监控
				$(window).resize(function(){
					zlayer();
				});
				return this;
		},
		/**
		 * 功能介绍：不重复单向左右滑动
		 * 参数介绍：
		 * n: 			默认为 4，选填项
		 * s: 			默认为 380，选填项， 注最好s>300
		 *---------------------------------------
		 * Update: 2014.7.30 
		 */
		'singleslide':function(options){
				p_this=$(this);
				//设置默认值 $.extend合并新参数
				options=$.extend({
					n:4,
					s:380
				},options);
				var notConf=$.extend({
					l:p_this.find("[role='left']"),		//左按钮
					r:p_this.find("[role='right']"),	//右按钮
					v:p_this.find("[role='view']"),		//可视区域
					m:p_this.find("[role='move']")		//可移动目标
				},options);
				
				var w=notConf.m.children().width()+parseInt(notConf.m.children().css('marginLeft'))+parseInt(notConf.m.children().css('marginRight'))+parseInt(notConf.m.children().css('borderLeft'))+parseInt(notConf.m.children().css('borderRight')),
					len=notConf.m.children().length;
					
				if(len>notConf.n){
					notConf.m.width(w*len);
				}else{
					notConf.l.hide();
					notConf.r.hide();
				}
				
				var cl=null,cr=null;
				var t=notConf.m.position().left;
				
				notConf.r.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().left;
						if(t<0){
							notConf.m.animate({left:'+='+w+'px'},notConf.s);
						}
					}
				});
				
				notConf.l.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().left;
						if(w*notConf.n-w*len<t){
							notConf.m.animate({left:'-='+w+'px'},notConf.s);
						}
					}
				});
				
				return this;
		},
		/**
		 * 功能介绍：窗口拖动
		 * 参数介绍：
		 * dragE: 	默认为空 ，选填项，接收可拖动目标对象 例：“.drag”样式名加点
		 * 
		 *---------------------------------------
		 * Update: 2014.10.16 
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
		},
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
		},
		/**
		 * 功能介绍：图片放大镜
		 * 参数介绍：
		 * id: 			默认为 ，选填项， 如#ex1、nub
		 * sub: 		默认为 ，选填项， 如dd li
		 * 
		 * 
		 * 
		 * 
		 * jquery版本：1.9.0     无版本要求
		 *---------------------------------------
		 * Update: 2015.3.13 
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
						var site_l=e.pageX-site_w-5, site_t=e.pageY-site_h-5;
						$(notConf.site).css({'left':site_l+'px','top':site_t+'px','width':notConf.site_w+'px','height':notConf.site_h+'px','backgroundPosition':'-'+s_x+'px '+'-'+s_y+'px','borderRadius':notConf.site_radius+'px','cursor':'default'});
					}else{
						$(notConf.site).css({'width':notConf.site_w+'px','height':notConf.site_h+'px','backgroundPosition':'-'+s_x+'px '+'-'+s_y+'px','borderRadius':notConf.site_radius<0?0:notConf.site_radius+'px'+'px'});
					}
					
				}).mouseout(function(){
					$(notConf.site).hide();
				});
				
				return this;	//返回this  使方法可链
		},
		/**
		 * 功能介绍：无限级菜单
		 * 参数介绍：
		 * zlist:".zme_list",//必填项，具有子菜单单位
		 * zof:'zme_on',//选填 ，状态1箭头
		 * zseconf:'.zme_second',//选填 ，加减号， 状态2二级及二级以下等多级菜单样式名
		 * zspeed:160//选填，动画速度
		 * 
		 * jquery版本：1.9.0     无版本要求
		 *---------------------------------------
		 * Update: 2015.5.20 
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
		},
		/**
		 * 功能介绍：图片切换特效集
		 * 参数介绍：
		 * imgW:990		必填项，图片宽
		 * imgH:350		必填项，图片高
		 * imgSpeed:3000	选填项，图片切换间隔 ，默认为3秒
		 * effectSpeed:500	选填项，效果过渡速度，默认为500毫秒
		 * zidingyi:[],	可选项，自定义动画，默认为空数组，必须填写0以上正整数
		 * sort:true	选填项，顺序,分为按顺序切换效果和随机切换效果，默认为true为 顺序，false为随机
		 * sortN:-1,	选填项，顺序起效时，记录效果坐标，计数器作用，与sort一同使用，true起作用，默认为-1，改值会影响第一个切换效果
		 * cur:1		选填项，当前图片， 默认为第一张
		 * ele:'<li class="btn_off"></li>'	选填项,默认追加按钮为li
		 * 
		 * 注：只供已知尺寸下应用，不支持全屏
		 * 	    若不想要左右按钮，请在html内不添加role=btnl\role=btnl属性或者不写左右按钮标签即可(删除此类标签)
		 *   若不想要点号按钮，请在html内不添加role=btn 属性或不写点号按钮即可(删除此类标签)
		 * 
		 * jquery版本：1.9.0     无版本要求
		 *---------------------------------------
		 * Update: 2015.5.27 
		 */
		'imgEffects':function(options){
				p_this=$(this);
				options=$.extend({
					imgW:990,
					imgH:350,
					imgSpeed:3000,
					effectSpeed:500,
					zidingyi:[],
					sort:true,
					sortN:-1,
					cur:1,
					ele:'<li class="btn_off"></li>'
				},options);
				var conf=$.extend({
					last:1,//不可修改,记录上一张图片
					imgBox:p_this.find("[role='imgBox']"),//选填项,定义获得图片父标签
					imgEffects:p_this.find("[role='imgEffects']"),//选填项,定义获得显示效果父标签
					btn:p_this.find("[role='btn']"),//选填项,定义获得右侧按钮属性
					btnl:p_this.find("[role='left']"),//选填项,定义获得右侧按钮属性
					btnr:p_this.find("[role='right']")//选填项,定义获得右侧按钮属性
				},options);
				//初始化
				function oneStart(){
					$('.content:eq('+parseInt(conf.cur-1)+')').show();
					for(n=0;n<conf.imgBox.children().length-1;n++){
						conf.btn.append(conf.ele);
					}
				}
				oneStart();
				//减少占用内存固定格子个数
				var lattice=conf.imgW/10
				//正序或倒序翻页
				function img_move(lorr){
					if(lorr){
						var last=1;
						conf.cur++ ;
						if(conf.cur>$(conf.imgBox).children().length){
							conf.cur=1;
						}
					}else{
						conf.cur-- ;
						if(conf.cur<1){
							conf.cur=$(conf.imgBox).children().length;
						}
					}
					displayImg();
					//是否显示点按钮
					if(conf.btn.length){
						point_cur();
					}else{
						conf.btn.hide();
					}
				}
				//圆点按钮及当前状态
				function point_cur(){
					conf.btn.children().attr('class','btn_off');
					conf.btn.children(':eq('+(conf.cur-1)+')').attr('class','btn_on');
				}
				//是否显示点按钮
				if(conf.btn.length){
					conf.btn.children().bind('click',function(){
						if(conf.cur!=$(this).index()+1){
							conf.cur=$(this).index()+2;
							img_move(false);
						}
					});
				}else{
					conf.btn.hide();
				}
				//右翻页
				if(conf.btnl.length){
					conf.btnr.bind('click',function(){
						img_move(false);
					});
				}else{
					conf.btnr.hide();		
				}
				//左翻页
				if(conf.btnl.length){
					
					conf.btnl.bind('click',function(){
						img_move(true);
					});
				}else{
					conf.btnl.hide();		
				}
				//自动翻页
				var clearN='null';
				clearN=setInterval(function(){img_move(true)},conf.imgSpeed);
				
				p_this.mouseenter(function(){
					clearInterval(clearN);
				}).mouseleave(function(){
					if(clearN) clearInterval(clearN);
					clearN=setInterval(function(){img_move(true)},conf.imgSpeed);
				});
				conf.imgEffects.mouseenter(function(){
					$(this).hide();
				}).mouseleave(function(){
					$(this).show();
				});
				//显示结果
				function displayImg(){
					conf.imgBox.children().hide();
					conf.imgBox.children(':eq('+parseInt(conf.cur-1)+')').show();
					if(conf.sort){
						effect[sortASC()]();
					}else{
						effect[img_random()]();
						
					}
				}
				//创建效果集
				var effect=new Array;
				//随时数
				function img_random(){
					return Math.floor(Math.random() * effect.length);
				}
				
				//正常顺序
				function sortASC(){
					if(conf.sortN>=effect.length-1){
						conf.sortN=0;
					}else{
						conf.sortN++;
					}
					return conf.sortN;
				}
				//建立效果标签
				function xiaoguo(img_w,img_h){
					var scr=conf.imgBox.children(':eq('+parseInt(conf.last-1)+')').find('img').attr('src');
					var html='';
					conf.imgEffects.html('');
					for(tr=0;tr<conf.imgH/img_h;tr++){
						for(td=0;td<conf.imgW/img_w;td++){
							html+='<li class="gezi animated" style="width:'+img_w+'px; height:'+img_h+'px;'+'left:'+td*img_w+'px;'+'top:'+tr*img_h+'px;'+'background:url('+scr+') no-repeat;'+'background-position:'+'-'+td*img_w+'px'+' '+'-'+tr*img_h+'px'+'"></li>';
						}
					}
					conf.imgEffects.append(html);
				}
				//水平百叶窗0
				function baiyechuang1(){
					xiaoguo(conf.imgW,lattice);
					$(".gezi").animate({'width':conf.imgW,'height':0,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(baiyechuang1);
				//垂直百叶窗1
				function baiyechuang2(){
					xiaoguo(lattice,conf.imgH);
					$(".gezi").animate({'width':0,'height':conf.imgH,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(baiyechuang2);
				//溶解3
				function rongjie(){
					xiaoguo(lattice,lattice);
					$(".gezi").animate({'width':0,'height':0,'borderRadius':'50%','opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(rongjie);
				//左移4
				function zuoyi(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'left':-conf.imgW*3,'top':0,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zuoyi);
				//右移5
				function youyi(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'left':conf.imgW*3,'top':0,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(youyi);
				//上移6
				function shangyi(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'left':0,'top':-conf.imgH*3},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(shangyi);
				//下移7
				function xiayi(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'left':0,'top':conf.imgH*3},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(xiayi);
				//左右分散8
				function zuoyoufensan(){
					xiaoguo(conf.imgW/2,conf.imgH);
					$(".gezi:even").animate({'left':-conf.imgW*2,'top':0},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:odd").animate({'left':conf.imgW*2,'top':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zuoyoufensan);
				//上下分散9
				function shangxiafensan(){
					xiaoguo(conf.imgW,conf.imgH/2);
					$(".gezi:even").animate({'left':0,'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:odd").animate({'left':0,'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(shangxiafensan);
				//上翻10
				function shangfan(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'height':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(shangfan);
				//左翻11
				function zuofan(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'width':0,'left':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zuofan);
				//小方块中间消失12
				function xiaofangkuai(){
					xiaoguo(conf.imgW/2,conf.imgH/2);
					$(".gezi:eq(0)").animate({'width':0,'height':0,'left':conf.imgW*0.25,'top':conf.imgH*0.25,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:eq(1)").animate({'width':0,'height':0,'left':conf.imgW*0.75,'top':conf.imgH*0.25,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:eq(2)").animate({'width':0,'height':0,'left':conf.imgW*0.25,'top':conf.imgH*0.75,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:eq(3)").animate({'width':0,'height':0,'left':conf.imgW*0.75,'top':conf.imgH*0.75,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(xiaofangkuai);
				//大方块中间消失13
				function dafangkuai(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'width':5,'height':5,'left':conf.imgW*0.5-2,'top':conf.imgH*0.5-2,'opacity':0.8},conf.effectSpeed,function(){
						$(this).hide();
					});
					conf.last=conf.cur;
				}
				effect.push(dafangkuai);
				//左右中间消失14
				function zhongjianxiaoshi1(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'left':conf.imgW/2,'width':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zhongjianxiaoshi1);
				//上下中间消失15
				function zhongjianxiaoshi2(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'top':conf.imgH/2,'height':0},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zhongjianxiaoshi2);
				//右下角消失16
				function youxiajiao1(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'top':conf.imgH*3,'left':conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(youxiajiao1);
				//左下角消失17
				function zuoxiajiao2(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'top':conf.imgH*3,'left':-conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zuoxiajiao2);
				//左上角消失18
				function zuoshangjiao3(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'top':-conf.imgH*3,'left':-conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zuoshangjiao3);
				//右上角消失19
				function youshangjiao4(){
					xiaoguo(conf.imgW,conf.imgH);
					$(".gezi").animate({'top':-conf.imgH*3,'left':conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(youshangjiao4);
				//多格变化20
				function duogezi1(){
					xiaoguo(lattice,lattice);
					$(".gezi:odd").animate({'left':conf.imgH*2,'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:even").animate({'left':-conf.imgH*2,'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(duogezi1);
				//多格变化21
				function duogezi2(){
					xiaoguo(lattice,conf.imgH);
					$(".gezi:odd").animate({'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:even").animate({'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(duogezi2);
				//多格变化21
				function duogezi3(){
					xiaoguo(conf.imgW,lattice);
					$(".gezi:odd").animate({'left':conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:even").animate({'left':-conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(duogezi3);
				//上下格左右消失21
				function zuoyouxiaoshi(){
					xiaoguo(conf.imgW,conf.imgH/2);
					$(".gezi:odd").animate({'left':conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:even").animate({'left':-conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(zuoyouxiaoshi);
				//左右格下上消失22
				function shangxiaxiaoshi(){
					xiaoguo(conf.imgW/2,conf.imgH);
					$(".gezi:odd").animate({'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					$(".gezi:even").animate({'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
					conf.last=conf.cur;
				}
				effect.push(shangxiaxiaoshi);
				//自之定义16
			//	function zidingyi(){
			//		
			//	}
			//  effect.push(zidingyi);
				//根据自定义动画重组动画集
				if(conf.zidingyi.length){
					var zdy=new Array;
					conf.zidingyi.map(function(item,key){
						if(0<=item && item<effect.length){
							zdy.push(effect[item]);
						}else{
							alert("数字："+item+"太大或太小会被忽略，请输入小于"+parseInt(effect.length-1)+"的数字");
						}
					});
					//保证至少有一个动画
					if(zdy.length>0){
						effect=zdy;
					}
				}
				return this;	//返回this  使方法可链
		},
		/**
		 * 功能介绍：
		 * 参数介绍：
		 * id: 			默认为 ，选填项， 如#ex1、nub
		 * sub: 		默认为 ，选填项， 如dd li
		 * 
		 * 
		 * jquery版本：1.9.0     无版本要求
		 *---------------------------------------
		 * Update: 2014.4.23 
		 */
		'aa':function(options){
				p_this=$(this);
				//设置默认值 $.extend合并新参数
				options=$.extend({
					odd:'odd',
					even:'even',
					selected:'selected'
				},options);
				
				$('div p',this).click(function(){
					alert(true);							   
				});
				
				return this;	//返回this  使方法可链
		}
			
			
		
	});
	//个人插件  end
	//集成他人插件  start
	$.fn.extend({
		
		/**
		 * 功能介绍：单选框复选框美化
		 * 参数介绍：无须传参
		 * 注：每个单选框复选框必须设置id， 且id与lable 的for 属性一致相等
		 * 
		 *---------------------------------------
		 * Update: 2015.1.6 
		 */
		'tzCheckbox':function(options){
			options = $.extend({
				labels : ['ON','OFF']
			},options);
			
			return this.each(function(){
				var originalCheckBox = $(this),
					labels = [];
	
				// Checking for the data-on / data-off HTML5 data attributes:
				if(originalCheckBox.data('on')){
					labels[0] = originalCheckBox.data('on');
					labels[1] = originalCheckBox.data('off');
				}
				else labels = options.labels;
	
				// Creating the new checkbox markup:
				var checkBox = $('<span>',{
					className	: 'tzCheckBox '+(this.checked?'checked':''),
					html:	'<span class="tzCBContent">'+labels[this.checked?0:1]+
							'</span><span class="tzCBPart"></span>'
				});
	
				// Inserting the new checkbox, and hiding the original:
				checkBox.insertAfter(originalCheckBox.hide());
	
				checkBox.click(function(){
					checkBox.toggleClass('checked');
					var isChecked = checkBox.hasClass('checked');
					// Synchronizing the original checkbox:
					originalCheckBox.attr('checked',isChecked);
					checkBox.find('.tzCBContent').html(labels[isChecked?0:1]);
				});
				
				// Listening for changes on the original and affecting the new one:
				originalCheckBox.bind('change',function(){
					checkBox.click();
				});
			});
		},
		/**
		 * 功能介绍：文字若图片单向上下滑动
		 * 参数介绍：
		 * ns:			默认为 3000,间隔播放时间，选填项
		 * auto:		默认为 true，是否自动播放，选填项 
		 * s: 			默认为 380，滑动速度，选填项
		 *---------------------------------------
		 * Update: 2015.8.19 
		 */
		'upAndDown':function(options){
				p_this=$(this);
				options=$.extend({
					ns:3000,
					auto:true,
					s:380
				},options);
				var notConf=$.extend({
					l:p_this.find("[role='left']"),		//左按钮
					r:p_this.find("[role='right']"),	//右按钮
					v:p_this.find("[role='view']"),		//可视区域
					m:p_this.find("[role='move']")		//可移动目标
				},options);
				
				var h=notConf.m.children().height(),
					len=notConf.m.children().length;
					
					notConf.m.height(h*len);
				
				var cl=null,cr=null;
				var t=notConf.m.position().top;
				
				notConf.r.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().top;
						if(t<0){
							notConf.m.animate({top:'+='+h+'px'},notConf.s);
						}
					}
				});
				
				notConf.l.click(function(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().top;
						if(h-h*len<t){
							notConf.m.animate({top:'-='+h+'px'},notConf.s);
						}
					}
				});
				
				function auto_move(){
					if(!notConf.m.is(':animated')){
						t=notConf.m.position().top;
						if(h-h*len<t){
							notConf.m.animate({top:'-='+h+'px'},notConf.s);
						}else{
							notConf.m.css("top","0");
						}
					}
				}
				
				if(notConf.auto){
					var cl=setInterval(function(){auto_move();},notConf.ns);
				}
				p_this.hover(function(){clearInterval(cl)},function(){cl=setInterval(function(){auto_move();},notConf.ns);});
				
		},
		/**
		 * 功能介绍：返回顶部
		 * 参数介绍：
		 * stval:200, //选填项scrollTopValue滚动条隐藏值
		 * top:'.zgo_arrow',//选填项 返回顶部
		 * site:'.zgo_box',//选填项
		 * minW:1400,//选填项 内容宽度，注，加滚动条宽和document宽  
		 * r0:'zgo_right0'//选填项，屏幕小于总宽时贴屏幕右侧
		 * 
		 * 注
		 * jquery版本：1.9.0     无版本需求
		 *---------------------------------------
		 * Great：2015.12.18
		 * Update: 2015.12.21
		 */
		'zgoTop':function(options){
			var p_this=$(this);
			options=$.extend({
				stval:200,
				top:'.zgo_arrow',
				site:'.zgo_box',
				minW:1153,  
				r0:'zgo_right0'
			},options);
			
			function sTV(vtop){
				var int = $(window).scrollTop();
				if(int<vtop){
					p_this.find(options.top).fadeOut();
				}else{
					p_this.find(options.top).fadeIn();
				}
			}
			sTV(options.stval);
			$(window).scroll(function() {
				cclear&&clearTimeout(cclear);
				var cclear=setTimeout(function(){
					sTV(options.stval);
				},500);
			});
			
			p_this.find(options.top).click(function(){
				$("body").animate({scrollTop: "0px",scrollLeft:"0px"}, 550,function(){});
			});
			
			$(window).width()<=options.minW?p_this.find(options.site).addClass(options.r0):p_this.find(options.site).removeClass(options.r0);
			//屏宽小于文档宽防止隐藏
			$(window).resize(function(){
				$(window).width()<=options.minW?p_this.find(options.site).addClass(options.r0):p_this.find(options.site).removeClass(options.r0);
			});
			return this;
		},
		/**
		 * 功能介绍：
		 * 参数介绍：
		 * id: 			默认为 ，选填项， 如#ex1、nub
		 * sub: 		默认为 ，选填项， 如dd li
		 * 
		 * 
		 * jquery版本：1.9.0     无版本要求
		 *---------------------------------------
		 * Update: 2014.4.23 
		 */
		'bb':function(options){
				p_this=$(this);
				//设置默认值 $.extend合并新参数
				options=$.extend({
					odd:'odd',
					even:'even',
					selected:'selected'
				},options);
				
				$('div p',this).click(function(){
					alert(true);							   
				});
				
				return this;	//返回this  使方法可链
		}
	});
	//集成他人插件  end
	
	
	//集成他人插件2  start
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
	//集成他人插件2  end
	
})(jQuery);

/**
 * 集成他人插件导航
1		tzCheckbox			单选框复选框美化
2		carousel			首页焦点图切换（垂直、水平）
3		
4		
5		
6		
**/