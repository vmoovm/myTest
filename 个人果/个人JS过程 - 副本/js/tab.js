// JavaScript Document

$(function(){

	var conf={//可配置项
		
		'btn_l':$("#left"),		//左单击按钮
		'btn_l_h':'left_h',		//左鼠标滑过样式名
		'btn_r':$("#right"),		//右单击按钮
		'btn_r_h':'right_h',		//右鼠标滑过样式名
		'content':$('.content'),		//一屏容器
		'middle':$("#middle"),		//可视区域或移动目标
		'bg':$('#bg'),		//大背景
		'minW':1024		//内容最小宽度

	}
	
	var ali={//不可配置项
		'flag':0,		//浏览器改变标志位
		'count':0,		//第几屏，记录当前屏标号，默认第一屏
		'lastW':$(window).width(),		//上次屏宽
		'lastH':$(window).width(),		//上次屏高
		'width':$(window).width(),		//当前屏宽
		'height':$(window).height()		//当前屏高
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
		conf.middle.width(conf.content.length*ali.width);
		
		if(ali.flag){
			conf.middle.css('left',-ali.width*ali.count+'px');
			ali.lastW=ali.width;
			ali.lastH=ali.height;
			ali.flag=0;
		}
	}
	setwindow();
	
	function move_left(){
		var left_site=conf.middle.css("left");
		if(!(conf.middle.position().left==(-(conf.content.length-1)*ali.width))){
			conf.middle.not(':animated').animate({left:"-="+ali.width},500);
			ali.count++;
		}
	}
	
	function move_right(){
		var left_site=conf.middle.css("left");
		if(!(conf.middle.position().left==0)){
			conf.middle.not(':animated').animate({left:"+="+ali.width},500);
			ali.count--;
		}
	}
	
	//obo判断移动方向  传参数1：left或0：right
	function move(obo){
		setwindow();
		if(obo){
			move_left();
		}else{
			move_right();
		}
	}
	
	//左按钮滑过效果
	conf.btn_l.mouseover(function(){
		$(this).parents('.left').addClass(conf.btn_l_h);	  
	}).mouseout(function(){
		$(this).parents('.left').removeClass(conf.btn_l_h);
	});
	
	//右按钮滑过效果
	conf.btn_r.mouseover(function(){
		$(this).parents('.right').addClass(conf.btn_r_h);		  
	}).mouseout(function(){
		$(this).parents('.right').removeClass(conf.btn_r_h);
	});
	

	//浏览器窗口大小监测
	$(window).resize(function(){
		ali.flag=1;
		setwindow();				  
	});

	conf.btn_l.bind("click",function(){move(1)});
	conf.btn_r.bind("click",function(){move()});
	
});





























