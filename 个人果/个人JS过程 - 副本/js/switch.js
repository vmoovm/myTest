// JavaScript Document

$(function(){
	var p_this=$("#move");
	
	var conf={//默认配置
		point:p_this.find("[role='btn']"),			//点按钮ID
		pointOff:'btn_off',		//点按钮默认状态样式
		pointOn:'btn_on',		//点按钮当前状态样式
		pointHtml:'',			//点按钮标签名，默认为li标签
		btn_l:p_this.find("[role='left']"),		//左单击按钮
		btn_l_h:'left_h',		//左鼠标滑过样式名
		btn_r:p_this.find("[role='right']"),		//右单击按钮
		btn_r_h:'right_h',		//右鼠标滑过样式名
		middle:p_this.find("[role='middle']"),		//可视区域或移动目标
		mid:p_this.find("[role='mid']"),
		isBtn:false,		//是否显示左右滑动按钮
		showBtn:true,		//是否开启鼠标滑动效果hover
		isPoint:false,		//是否显示底部圆点按钮
		isAuto:true,		//是否开启自动滑动
		speed:3000,		//图片滑动速度
		LorR:1,		//默认滑动方向为右。1：左；0:右,必须传数字0和1
		num:1		//一次滑动数量
	}
	
	//必传配置项
	conf.pointOff='btn_off';
	conf.pointOn='btn_on';
	conf.btn_l_h='left_h';
	conf.btn_r_h='right_h';
	//可选配置项
	conf.num=4;
	conf.isBtn=true;		//是否显示左右滑动按钮
	conf.showBtn=true;		//是否开启鼠标滑动效果hover
	conf.isPoint=true;		//是否显示底部圆点按钮
	conf.isAuto=true;		//是否开启自动滑动
	conf.speed=3000;		//图片滑动速度
	conf.LorR=1;		//默认滑动方向为右。1：左；0:右,亦可不传值
	pointHtml='';
	
	//根据配置生成参数和不可配置参数
	var notConf={
		tmp:null,		//点按钮标签
		isbottom:0,		//是否点击过底部按钮
		flag:0,		//浏览器改变标志位
		viewW:p_this.find("[role='viewW']").width(),	//可视宽度
		count:0,		//第几屏，记录当前屏标号，默认第一屏
		width:245,		//默认一个单位的宽度，不用理会此值，系统会自动获取
		height:conf.middle.children(':eq(0)').height()		//一个单位的高度
	}
	
	var one=conf.middle.children(':eq(0)');
	notConf.width=one.width()+parseInt(one.css('paddingLeft'))+parseInt(one.css('paddingRight'));
	
	var m={
		step:conf.num*notConf.width,		//一次滚动长度
		len:(conf.middle.children().length*notConf.width>notConf.viewW)		//是否内容宽度小于可视宽度
	}
	
	if(notConf.width<notConf.viewW*3/4){
		conf.isPoint=false;
	}
	
	if(m.len){
		if(conf.middle.children().length<2*conf.num){
			conf.middle.append(conf.middle.html());
		}
	}else{
		conf.isAuto=false;
	}
	
	//追加按钮
	notConf.tmp=conf.pointHtml?conf.pointHtml:"li";
	for(i=0;i<Math.ceil(conf.middle.children().length/conf.num)-1;i++){
		$(conf.point).children(":eq(0)").append('<'+notConf.tmp+' class="'+conf.pointOff+'"></'+notConf.tmp+'>');
	};
	$(conf.point).find(notConf.tmp).each(function(index){
		$(this).on('click',function(){
			move_right(index);
			$(this).attr('class',conf.pointOn).siblings().attr('class',conf.pointOff);
			notConf.count=index;
		});							   
	});
	
	//添加当前按钮样式
	function cur_btn(){
		$(conf.point).find(notConf.tmp).eq(notConf.count).attr('class',conf.pointOn).siblings().attr('class',conf.pointOff);
	}
	
	if(conf.isPoint){
		$(conf.point).show();
	}
	
	//根据窗口改变重新初始化
	function setwindow(){
		conf.mid.html(conf.middle.html());
		conf.middle.width(conf.middle.children().length*notConf.width);
		conf.mid.width(conf.middle.children().length*notConf.width);
	}
	
	if(m.len){
		setwindow();
	}
	
	//校对轨道
	function check(f){
		//f值为1:校对向左滑动轨道,f值为0或空:校对向右滑动轨道
		if(f){
			var site=(conf.mid.position().left<=0?conf.mid.position().left*-1:conf.mid.position().left*1)/notConf.width;
			conf.middle.css('left',(conf.middle.children().length-site)*notConf.width+'px');
		}else{
			var site=(conf.mid.position().left<=0?conf.mid.position().left*-1:conf.mid.position().left*1)/notConf.width;
			conf.middle.css('left',(conf.middle.children().length+site)*notConf.width*-1+'px');
		}
	}
	
	//一次性初始化
	function setone(){
		conf.middle.css('left',conf.middle.children().length*notConf.width*-1+'px');
		conf.mid.css('left',0+'px');
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
		
		if(conf.middle.position().left<=(-conf.middle.children().length*notConf.width)){
			conf.middle.css('left',conf.mid.position().left+conf.middle.children().length*notConf.width+'px');
		}
		if(conf.mid.position().left<=(-conf.middle.children().length*notConf.width)){
			conf.mid.css('left',conf.middle.position().left+conf.middle.children().length*notConf.width+'px');
		}
		conf.middle.not(':animated').animate({left:"-="+m.step},500);
		conf.mid.not(':animated').animate({left:"-="+m.step},500);
		//记录当前图片
		if(notConf.count<Math.ceil(conf.middle.children().length/conf.num)-1){
			notConf.count++
		}else{
			notConf.count=0;
		}
		cur_btn();
	}
	
	//右滑动
	function move_right(index){
		//是否点击过底部按钮
		if(typeof index=='number'){
			notConf.isbottom=1;
			conf.middle.not(':animated').animate({left:-m.step*index},500);
			conf.mid.not(':animated').animate({left:-m.step*index},500);
		}else{
			if(notConf.isbottom){
				notConf.isbottom=0;
				check();
			}
			if(conf.middle.position().left>notConf.viewW){
				conf.middle.css('left',conf.mid.position().left-conf.middle.children().length*notConf.width+'px');
			}
			
			if(conf.mid.position().left>=notConf.viewW){
				conf.mid.css('left',conf.middle.position().left-conf.middle.children().length*notConf.width+'px');
			}
			conf.middle.not(':animated').animate({left:"+="+m.step},500);
			conf.mid.not(':animated').animate({left:"+="+m.step},500);
		}
		//记录当前图片
		if(notConf.count){
			notConf.count--;
		}else{
			notConf.count=Math.ceil(conf.middle.children().length/conf.num)-1;
		}
		cur_btn();
	}
	
	//obo判断移动方向  传参数1：left或0：right
	function move(obo){
		if((typeof obo=='number'&&obo<=1&&obo>=0)||obo=='undefined'||obo==null){
			if(obo){
				move_left();
			}else{
				move_right();
			}
		}
		
	}
	
	//左右按钮效果
	function btn_effect(){
		p_this.mouseenter(function(){
			conf.btn_l.fadeIn();
			conf.btn_r.fadeIn();
		}).mouseleave(function(){
			conf.btn_l.fadeOut();
			conf.btn_r.fadeOut();
		});
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
	}
	
	if(conf.isBtn){
		btn_effect();
	}else{
		conf.btn_l.hide();
		conf.btn_r.hide();
	}
	if(m.len){
		conf.btn_l.bind("click",function(){move(1)});
		conf.btn_r.bind("click",function(){move()});
	}
		
	//是否自动
	if(conf.isAuto){
		var cl=setInterval(function(){move(conf.LorR);},conf.speed);
		p_this.mouseleave(function(){
			clearInterval(cl);
			cl=setInterval(function(){move(conf.LorR);},conf.speed);							  
		}).mouseenter(function(){
			clearInterval(cl);
		});
	}
	
	
});













