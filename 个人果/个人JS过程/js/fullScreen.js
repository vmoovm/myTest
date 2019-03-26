// JavaScript Document

$(function(){
	p_this=$("#postion");
	var conf={//可配置项
		point:p_this.find('[role=point]'),			//点按钮ID
		//pointOff:'btn_off',		//点按钮默认状态样式
		//pointOn:'btn_on',		//点按钮当前状态样式
		//pointHtml:'',			//点按钮标签名，默认为li标签
		btn_l:p_this.find('[role=left]'),		//左单击按钮
		//btn_l_h:'left_h',		//左鼠标滑过样式名
		btn_r:p_this.find('[role=right]'),		//右单击按钮
		//btn_r_h:'right_h',		//右鼠标滑过样式名
		content:p_this.find('[role=middle]').children(),		//一屏容器
		middle:p_this.find('[role=middle]'),		//可视区域或移动目标
		mid:p_this.find('[role=mid]'),
		bg:$('#bg'),		//大背景
		//minW:1024		//内容最小宽度

	}
	
	conf.pointOff='btn_off';
	conf.pointOn='btn_on';
	conf.pointHtml='';
	conf.btn_l_h='left_h';
	conf.btn_r_h='right_h';
	conf.isBtn=true;		//是否显示左右滑动按钮
	conf.showBtn=true;		//是否开启鼠标滑动效果hover
	conf.isPoint=true;		//是否显示底部圆点按钮
	conf.isAuto=true;		//是否开启自动滑动
	conf.speed=3000;		//图片滑动速度
	conf.minW=1024;		//限定最小宽度，开启浏览器自适应有效
	conf.LorR=0;		//默认滑动方向，默认向右滑动。不为空和false且大于0的值向左滑动
	
	var ali={//不可配置项
		tmp:null,
		isbottom:0,		//是否点击过底部按钮
		flag:0,		//浏览器改变标志位
		count:0,		//第几屏，记录当前屏标号，默认第一屏
		lastW:$(window).width(),		//上次屏宽
		lastH:$(window).width(),		//上次屏高
		width:$(window).width(),		//当前屏宽
		height:$(window).height()		//当前屏高
	}
	
	//追加按钮
	ali.tmp=conf.pointHtml?conf.pointHtml:"li";
	for(i=0;i<conf.content.length-1;i++){
		$(conf.point).append('<'+ali.tmp+' class="'+conf.pointOff+'"></'+ali.tmp+'>');
	};
	$(conf.point).children().each(function(index){
		var i=index
		$(this).on('click',function(){
			if(ali.count!=index){
				move_right(index);
			}
			$(this).attr('class',conf.pointOn).siblings().attr('class',conf.pointOff);
			ali.count=index;
		});							   
	});
	
	//添加当前按钮样式
	function cur_btn(){
		$(conf.point).children().eq(ali.count).attr('class',conf.pointOn).siblings().attr('class',conf.pointOff);
	}
	
	if(conf.isPoint){
		conf.point.hide();
	}
	
	//根据窗口改变重新初始化
	function setwindow(){
		ali.width=$(window).width();
		ali.height=$(window).height();
		if(ali.width<=conf.minW){
			ali.width=conf.minW;
		}
		conf.bg.height(ali.height+'px');
		conf.content.width(ali.width);
		conf.mid.html(conf.middle.html());
		conf.middle.width(conf.content.length*ali.width);
		conf.mid.width(conf.content.length*ali.width);
		if(ali.flag){
			//保留注释，待更新在浏览器大小改变时，不改变当前图片
			//conf.mid.css('left',-ali.width*ali.count+'px');
			//conf.middle.css('left',ali.width*(conf.content.length-ali.count)+'px');
			setone();
			ali.lastW=ali.width;
			ali.lastH=ali.height;
			ali.flag=0;
		}
	}
	setwindow();
	
	//校对轨道
	function check(f){
		//f值为1:校对向左滑动轨道,f值为0或空:校对向右滑动轨道
		if(f){
			var site=(conf.mid.position().left<=0?conf.mid.position().left*-1:conf.mid.position().left*1)/ali.width;
			conf.middle.css('left',(conf.content.length-site)*ali.width+'px');
		}else{
			var site=(conf.mid.position().left<=0?conf.mid.position().left*-1:conf.mid.position().left*1)/ali.width;
			conf.middle.css('left',(conf.content.length+site)*ali.width*-1+'px');
		}
	}
	
	//一次性初始化
	function setone(){
		conf.middle.css('left',conf.content.length*ali.width*-1+'px');
		conf.mid.css('left',0+'px');
		ali.count=0;
		cur_btn();
	}
	setone();
	
	//左滑动
	function move_left(){
		if(ali.isbottom){
			ali.isbottom=0;
			check(1);
		}
		if(conf.middle.position().left<=(-(conf.content.length)*ali.width)){
			conf.middle.css('left',conf.content.length*ali.width+'px');
		}
		conf.middle.not(':animated').animate({left:"-="+ali.width},500);
		if(conf.mid.position().left<=(-(conf.content.length)*ali.width)){
			conf.mid.css('left',conf.content.length*ali.width+'px');
		}
		conf.mid.not(':animated').animate({left:"-="+ali.width},500);
		//记录当前图片
		if(ali.count<conf.content.length-1){
			ali.count++
		}else{
			ali.count=0;
		}
		cur_btn();
	}
	
	//右滑动
	function move_right(index){
		//是否点击过底部按钮
		if(typeof index=='number'){
			ali.isbottom=1;
			conf.middle.not(':animated').animate({left:-ali.width*index},500);
			conf.mid.not(':animated').animate({left:-ali.width*index},500);
		}else{
			if(ali.isbottom){
				ali.isbottom=0;
				check();
			}
			conf.middle.not(':animated').animate({left:"+="+ali.width},500,function(){
				if(conf.middle.position().left>=conf.content.length*ali.width){
					conf.middle.css('left',-conf.content.length*ali.width+'px');
				}
			});
			conf.mid.not(':animated').animate({left:"+="+ali.width},500,function(){
				if(conf.mid.position().left>=conf.content.length*ali.width){
					conf.mid.css('left',-conf.content.length*ali.width+'px');
				}
			});
		}
		//记录当前图片
		if(ali.count){
			ali.count--;
		}else{
			ali.count=conf.content.length-1;
		}
		cur_btn();
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
	if(conf.isBtn){
		p_this.mouseenter(function(){
			conf.btn_l.fadeIn();
			conf.btn_r.fadeIn();
		}).mouseleave(function(){
			conf.btn_l.fadeOut();
			conf.btn_r.fadeOut();
		});
	}else{
		conf.btn_l.hide();
		conf.btn_r.hide();
	}
	
	//是否有鼠标滑过效果hover
	if(conf.showBtn){
		//左按钮滑过效果
		conf.btn_l.mouseover(function(){
			$(this).addClass(conf.btn_l_h);	  
		}).mouseout(function(){
			$(this).removeClass(conf.btn_l_h);
		});
		
		//右按钮滑过效果
		conf.btn_r.mouseover(function(){
			$(this).addClass(conf.btn_r_h);		  
		}).mouseout(function(){
			$(this).removeClass(conf.btn_r_h);
		});
	}
	
	//浏览器窗口大小监测
	$(window).resize(function(){
		ali.flag=1;
		setwindow();
		//是否自动滑动
		if(conf.isAuto){
			clearInterval(c);
			c=setInterval(function(){move();},conf.speed);
		}
	});
	
	//是否自动滑动
	if(conf.isAuto){
		var c=setInterval(function(){move();},conf.speed);
		p_this.mouseleave(function(){
			clearInterval(c);
			c=setInterval(function(){conf.LorR?move():move(1);},conf.speed);
		}).mouseenter(function(){
			clearInterval(c);
		});
	}
	

	conf.btn_l.bind("click",function(){move(1)});
	conf.btn_r.bind("click",function(){move()});
	
});





























