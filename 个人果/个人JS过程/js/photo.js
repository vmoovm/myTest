// JavaScript Document

/*程序运行顺序：
	初始化；
	定当前；
	分配身份；
	重新注册jquery对象;
	获取尺寸；
	限制过大尺寸；
	计算机位置；
	定位赋值；
	
以当前图片做为指标，********

*/

//大图切换效果
$(document).ready(function() {
	var p_this=$('#imageScreen');
	var test=$('#test');
	var conf={
		speed:400,
		status:{
			l_n:'l_n',	//左隐藏 none的简写
			l_s:'l_s',	//左最小 small的简写
			l_b:'l_b',	//左较小 big的简写
			cur:'cur',	//当前 current的简写
			r_b:'r_b',	//右较小 big的简写
			r_s:'r_s',	//右最小 small的简写
			r_n:'r_n'	//右 none的简写
		},
		prev:$('.img_prev'),	//上一页
		next:$('.img_next'),	//下一页
		list:p_this.find('[role="list"]'),	//获取相册列表的父标签
		count:1,	//图片张数，默认为1，且至少1张
		cur:1,	//当前图片,默认第一张为当前预览
		s:{//声明图片对象,可移动元素路径 src属性
			l_n:new Image(),
			l_s:new Image(),
			l_b:new Image(),
			cur:new Image(),
			r_b:new Image(),
			r_s:new Image(),
			r_n:new Image()
		},	
		m:{},	//可移动元素	move缩写
		w:{},	//可移动元素宽度
		h:{},	//可移动元素高度
		l:{},	//可移动元素left值
		t:{},	//可移动元素top值
		b:{w:1000,h:600},	//浏览器大小，默认1000*600
		j:{sw:50,sh:50,bw:100,bh:100,curw:0.8,curh:0.8},	//小图和较小图尺寸
		display_cur:p_this.find('[role="currentNum"]'),
		display_conut:p_this.find('[role="totalNums"]'),
		display_name:p_this.find('[role="im_h_name"]'),
		html:''
	}
	//分配身份
	function identity(){test.html(test.html()+'identity分配身份 --<br/>');
		conf.list.find('img').parent().attr('class','im_none');
		var c=conf.cur-1;
		var r_a=conf.cur;
		var r_b=conf.cur+1;
		if(conf.cur>=1){
			conf.list.find('img:eq('+c+')').parent().prevAll().attr('status',conf.status.l_n);
			conf.list.find('img:eq('+c+')').parent().attr('status',conf.status.cur);
			if(conf.cur>=2){
				var l_a=conf.cur-2;
				conf.list.find('img:eq('+l_a+')').parent().attr('status',conf.status.l_b);
				conf.list.find('img:eq('+l_a+')').parent().attr('class','im_big');
				if(conf.cur>=3){
					var l_b=conf.cur-3;
					conf.list.find('img:eq('+l_b+')').parent().attr('status',conf.status.l_s);
					conf.list.find('img:eq('+l_b+')').parent().attr('class','im_small');
				}
				
			}
			
			
			conf.list.find('img:eq('+c+')').parent().nextAll().attr('status',conf.status.r_n);
			conf.list.find('img:eq('+r_a+')').parent().attr('status',conf.status.r_b);
			conf.list.find('img:eq('+r_b+')').parent().attr('status',conf.status.r_s);
			conf.list.find('img:eq('+c+')').parent().attr('class','im_cur');
			conf.list.find('img:eq('+r_a+')').parent().attr('class','im_big');
			conf.list.find('img:eq('+r_b+')').parent().attr('class','im_small');
		}
		moveElement();
	}
	
	
	//可移动目标
	function moveElement(){test.html(test.html()+'moveElement可移动目标 --<br/>');
		test.html('<br/>l_n'+conf.m.l_n+'<br/>l_s:'+conf.m.l_s+'<br/>l_b:'+conf.m.l_b+'cur:'+conf.m.cur+'r_s:'+conf.m.r_s+'r_n:'+conf.m.r_n);
		conf.m={
			l_n:p_this.find("[status='"+conf.status.l_n+"']:end"),	//左隐藏 none的简写
			l_s:p_this.find("[status='"+conf.status.l_s+"']"),	//左最小 small的简写
			l_b:p_this.find("[status='"+conf.status.l_b+"']"),	//左较小 big的简写
			cur:p_this.find("[status='"+conf.status.cur+"']"),	//当前 current的简写
			r_b:p_this.find("[status='"+conf.status.r_b+"']"),	//右较小 big的简写
			r_s:p_this.find("[status='"+conf.status.r_s+"']"),	//右最小 small的简写
			r_n:p_this.find("[status='"+conf.status.r_n+"']:first")	//右 none的简写
		}
		//alert('m:'+conf.m.cur.find('img').attr('src')+'cur:'+conf.list.find('img:eq('+(conf.cur-1)+')').attr('src'));
	}
 	moveElement();
	
	//显示当前图片名称
	function display(){
		conf.display_cur.text(conf.cur);
		conf.display_conut.text(conf.count);
		var src_name=conf.list.find('img:eq('+(conf.cur-1)+')').attr('src').split('/');
		src_name=src_name[src_name.length-1]
		conf.display_name.text(src_name);
		
	}
	
	//初始化
	function start(){test.html(test.html()+'start初始化 --<br/>');
		conf.b.w=$(window).width(),
		conf.b.h=$(window).height();
		p_this.width(conf.b.w);
		p_this.height(conf.b.h);
		conf.prev.find('a').css('top',conf.b.h/2-20);
		conf.next.find('a').css('top',conf.b.h/2-20);
		conf.count=conf.list.find('img').length;
		display();
	}
	//更新可移动图片地址
	function updateSrc(){test.html(test.html()+'updateSrc更新可移动图片地址 --<br/>');
		
		conf.s.l_n.src=conf.m.l_n.length? conf.m.l_n.find('img').attr('src'):'';
		conf.s.l_s.src=conf.m.l_s.length? conf.m.l_s.find('img').attr('src'):'';
		conf.s.l_b.src=conf.m.l_b.length? conf.m.l_s.find('img').attr('src'):'';
		conf.s.cur.src=conf.m.cur.length? conf.m.cur.find('img').attr('src'):'';
		conf.s.r_b.src=conf.m.r_b.length? conf.m.r_b.find('img').attr('src'):'';
		conf.s.r_s.src=conf.m.r_s.length? conf.m.r_s.find('img').attr('src'):'';
		conf.s.r_n.src=conf.m.r_n.length? conf.m.r_n.find('img').attr('src'):'';
		//alert('s:'+conf.s.cur.src+' <br/> '+'m:'+conf.m.cur.find('img').attr('src'));
		alert('m:'+conf.m.cur.find('img').attr('src')+'cur:'+conf.list.find('img:eq('+(conf.cur-1)+')').attr('src'));
	}
	updateSrc();
	
	
	//获取图片尺寸
	function getSize(){test.html(test.html()+'getSize获取图片尺寸 --<br/>');
		//var objstr='/[\w]*[:]?[\/]{0,2}([\w]*[\.]*)*(\W)*(\/[\w -\*\?\%\&]?)+/';
		//var str='zzldfklsdaaazlzzzl';
		var objstr =new RegExp( /undefined/);
		 //alert(conf.s.l_n.src);
		//原始宽
		conf.w.l_n=objstr.test(conf.s.l_n.src)? conf.j.sw:conf.s.l_n.width;
		conf.w.l_s=objstr.test(conf.s.l_s.src)? conf.j.sw:conf.s.l_s.width;
		conf.w.l_b=objstr.test(conf.s.l_b.src)? conf.j.bw:conf.s.l_b.width;
		conf.w.cur=objstr.test(conf.s.cur.src)? 0:conf.s.cur.width;
		conf.w.r_b=objstr.test(conf.s.r_b.src)? conf.j.bw:conf.s.r_b.width;
		conf.w.r_s=objstr.test(conf.s.r_s.src)? conf.j.sw:conf.s.r_s.width;
		conf.w.r_n=objstr.test(conf.s.r_n.src)? conf.j.sw:conf.s.r_n.width;
		//原始高
		conf.h.l_n=objstr.test(conf.s.l_n.src)? conf.j.sh:conf.s.l_n.height;
		conf.h.l_s=objstr.test(conf.s.l_s.src)? conf.j.sh:conf.s.l_s.height;
		conf.h.l_b=objstr.test(conf.s.l_b.src)? conf.j.bh:conf.s.l_b.height;
		conf.h.cur=objstr.test(conf.s.cur.src)? 0:conf.s.cur.height;
		conf.h.r_b=objstr.test(conf.s.r_b.src)? conf.j.bh:conf.s.r_b.height;
		conf.h.r_s=objstr.test(conf.s.r_s.src)? conf.j.sh:conf.s.r_s.height;
		conf.h.r_n=objstr.test(conf.s.r_n.src)? conf.j.sh:conf.s.r_n.height;
	}

	
	//限制图片尺寸
	function setSize(){test.html(test.html()+'setSize限制图片尺寸 --<br/>');
		$('#test2').html(($('#test2').html()=='空' ? $('#test2').html(''):$('#test2').html()+'<br/>')+'第'+conf.cur+'张'+'路径：'+conf.s.cur.src+'路径m：'+conf.m.cur.find('img').attr('src'));
		//l_n
		if(conf.w.l_n>conf.j.sw){
			if(conf.w.l_n>conf.h.l_n){
				conf.w.l_n=conf.j.sw;
				conf.h.l_n=conf.h.l_n*(conf.j.sw/conf.w.l_n);
			}
		}
		if(conf.h.l_n>conf.j.sh){
			if(conf.h.l_n>conf.w.l_n){
				conf.h.l_n=conf.j.sh;
				conf.w.l_n=conf.w.l_n*(conf.j.sh/conf.h.l_n);
			}
		}
		//l_s
		if(conf.w.l_s>conf.j.sw){
			if(conf.w.l_s>conf.h.l_s){
				conf.w.l_s=conf.j.sw;
				conf.h.l_s=conf.h.l_s*(conf.j.sw/conf.w.l_s);
			}
		}
		if(conf.h.l_s>conf.j.sh){
			if(conf.h.l_s>conf.w.l_s){
				conf.h.l_s=conf.j.sh;
				conf.w.l_s=conf.w.l_s*(conf.j.sh/conf.h.l_s);
			}
		}
		//l_b
		if(conf.w.l_b>conf.j.bw){
			if(conf.w.l_b>conf.h.l_b){
				conf.w.l_b=conf.j.bw;
				conf.h.l_b=conf.h.l_b*(conf.j.bw/conf.w.l_b);
			}
		}
		if(conf.h.l_b>conf.j.bh){
			if(conf.h.l_b>conf.w.l_n){
				conf.h.l_b=conf.j.bh;
				conf.w.l_b=conf.w.l_n*(conf.j.bh/conf.h.l_b);
			}
		}
		//cur
		//已找到突然变大尺寸原因，计算方法没有错，错在分配身份
		if(conf.w.cur>conf.b.w){
			if(conf.w.cur>conf.h.cur){
				conf.w.cur=conf.b.w;
				conf.h.cur=conf.h.cur*(conf.b.w/conf.w.cur);
			}
		}
		
		if(conf.h.cur>conf.b.h){
			if(conf.h.cur>conf.w.cur){
				conf.h.cur=conf.b.h;
				conf.w.cur=conf.w.cur*(conf.b.h/conf.h.cur);
			}
		}
		//r_n
		if(conf.w.r_n>conf.j.sw){
			if(conf.w.r_n>conf.h.r_n){
				conf.w.r_n=conf.j.sw;
				conf.h.r_n=conf.h.r_n*(conf.j.sw/conf.w.r_n);
			}
		}
		if(conf.h.r_n>conf.j.sh){
			if(conf.h.r_n>conf.w.l_n){
				conf.h.r_n=conf.j.sh;
				conf.w.r_n=conf.w.r_n*(conf.j.sh/conf.h.r_n);
			}
		}
		//r_s
		if(conf.w.r_s>conf.j.sw){
			if(conf.w.r_s>conf.h.r_s){
				conf.w.r_s=conf.j.sw;
				conf.h.r_s=conf.h.r_s*(conf.j.sw/conf.w.r_s);
			}
		}
		if(conf.h.r_s>conf.j.sh){
			if(conf.h.r_s>conf.w.r_s){
				conf.h.r_s=conf.j.sh;
				conf.w.r_s=conf.w.r_s*(conf.j.sh/conf.h.r_s);
			}
		}
		//r_b
		if(conf.w.r_b>conf.j.bw){
			if(conf.w.r_b>conf.h.l_b){
				conf.w.r_b=conf.j.bw;
				conf.h.r_b=conf.h.r_b*(conf.j.bw/conf.w.r_b);
			}
		}
		if(conf.h.r_b>conf.j.bh){
			if(conf.h.r_b>conf.w.r_n){
				conf.h.r_b=conf.j.bh;
				conf.w.r_b=conf.w.r_n*(conf.j.bh/conf.h.r_b);
			}
		}

		
		
		//$("#img_box_bg,#img_box").height($(window).height()).width($(window).width());
	}
	
	//计算位置
	function setSite(){test.html(test.html()+'setSite计算位置 --<br/>');
		//left值
		if(conf.m.l_n!=null) conf.l.l_n=conf.j.sw;
		if(conf.m.l_s!=null) conf.l.l_s=conf.j.sw;
		if(conf.m.l_b!=null) conf.l.l_b=conf.j.bw+conf.j.sw*0.5;
		if(conf.m.cur!=null) conf.l.cur=(conf.b.w-conf.w.cur)*0.5;
		if(conf.m.r_b!=null) conf.l.r_b=conf.b.w-conf.j.bw-conf.j.sw*2.5;
		if(conf.m.r_s!=null) conf.l.r_s=conf.b.w-conf.j.sw*2;
		if(conf.m.r_n!=null) conf.l.r_n=conf.b.w-conf.j.sw*2;
		//top值
		if(conf.m.l_n!=null) conf.t.l_n=(conf.b.h-conf.j.sh)/2;
		if(conf.m.l_s!=null) conf.t.l_s=(conf.b.h-conf.j.sh)/2;
		if(conf.m.l_b!=null) conf.t.l_b=(conf.b.h-conf.j.bh)/2;
		if(conf.m.cur!=null) conf.t.cur=(conf.b.h-conf.h.cur)/2;
		if(conf.m.r_b!=null) conf.t.r_b=(conf.b.h-conf.j.bh)/2;
		if(conf.m.r_s!=null) conf.t.r_s=(conf.b.h-conf.j.sh)/2;
		if(conf.m.r_n!=null) conf.t.r_n=(conf.b.h-conf.j.sh)/2;
		
	}
	

	
	
	//赋值
	function setValue(){test.html(test.html()+'setValue赋值 --<br/>');
		if(conf.m.l_n!=null) conf.m.l_n.css({top:conf.t.l_n+'px',left:conf.l.l_n,width:conf.w.l_n+'px',height:conf.h.l_n+'px'});
		if(conf.m.l_s!=null) conf.m.l_s.css({top:conf.t.l_s+'px',left:conf.l.l_s,width:conf.w.l_s+'px',height:conf.h.l_s+'px'});
		if(conf.m.l_b!=null) conf.m.l_b.css({top:conf.t.l_b+'px',left:conf.l.l_b,width:conf.w.l_b+'px',height:conf.h.l_b+'px'});
		if(conf.m.cur!=null) conf.m.cur.css({top:conf.t.cur+'px',left:conf.l.cur,width:conf.w.cur+'px',height:conf.h.cur+'px'});
		if(conf.m.r_b!=null) conf.m.r_b.css({top:conf.t.r_b+'px',left:conf.l.r_b,width:conf.w.r_b+'px',height:conf.h.r_b+'px'});
		if(conf.m.r_s!=null) conf.m.r_s.css({top:conf.t.r_s+'px',left:conf.l.r_s,width:conf.w.r_s+'px',height:conf.h.r_s+'px'});
		if(conf.m.r_n!=null) conf.m.r_n.css({top:conf.t.r_n+'px',left:conf.l.r_n,width:conf.w.r_n+'px',height:conf.h.r_n+'px'});

	}
	
	//右按钮向左翻页
	function move_left(){test.html(test.html()+'move_left右按钮向左翻页 --<br/>');
		
		//conf.m.l_n.animate({left:conf.l.l_n+'px',top:conf.t.l_n+'px',width:conf.w.l_n+'px',height:conf.h.l_n+'px'},conf.speed,function(){$(this).prev().attr({'status':'l_n','class':'im_none'})});
		if(conf.m.l_s!=null) conf.m.l_s.animate({left:conf.l.l_n+'px',top:conf.t.l_n+'px',width:conf.w.l_n+'px',height:conf.h.l_n+'px'},conf.speed,function(){});
		if(conf.m.l_b!=null) conf.m.l_b.animate({left:conf.l.l_s+'px',top:conf.t.l_s+'px',width:conf.w.l_s+'px',height:conf.h.l_s+'px'},conf.speed,function(){});
		if(conf.m.cur!=null) conf.m.cur.animate({left:conf.l.l_b+'px',top:conf.t.l_b+'px',width:conf.w.r_b+'px',height:conf.h.r_b+'px'},conf.speed,function(){});
		if(conf.m.r_b!=null) conf.m.r_b.animate({left:conf.l.cur+'px',top:conf.t.cur+'px',width:conf.w.cur+'px',height:conf.h.cur+'px'},conf.speed,function(){});
		if(conf.m.r_s!=null) conf.m.r_s.animate({left:conf.l.r_b+'px',top:conf.t.r_b+'px',width:conf.w.r_b+'px',height:conf.h.r_b+'px'},conf.speed,function(){});
		if(conf.m.r_n!=null) conf.m.r_n.animate({left:conf.l.r_s+'px',top:conf.t.r_s+'px',width:conf.w.r_s+'px',height:conf.h.r_s+'px'},conf.speed,function(){});
		identity();
	}
	//左按钮向右翻页
	function move_right(){test.html(test.html()+'move_right左按钮向右翻页 --<br/>');

		if(conf.m.l_n!=null) conf.m.l_n.animate({left:conf.l.l_s+'px',top:conf.t.l_s+'px',width:conf.w.l_s+'px',height:conf.h.l_s+'px'},conf.speed,function(){});
		if(conf.m.l_s!=null) conf.m.l_s.animate({left:conf.l.l_b+'px',top:conf.t.l_b+'px',width:conf.w.l_b+'px',height:conf.h.l_b+'px'},conf.speed,function(){});
		if(conf.m.l_b!=null) conf.m.l_b.animate({left:conf.l.cur+'px',top:conf.t.cur+'px',width:conf.w.cur+'px',height:conf.h.cur+'px'},conf.speed,function(){});
		if(conf.m.cur!=null) conf.m.cur.animate({left:conf.l.r_b+'px',top:conf.t.r_b+'px',width:conf.w.r_b+'px',height:conf.h.r_b+'px'},conf.speed,function(){});
		if(conf.m.r_b!=null) conf.m.r_b.animate({left:conf.l.r_s+'px',top:conf.t.r_s+'px',width:conf.w.r_s+'px',height:conf.h.r_s+'px'},conf.speed,function(){});
		if(conf.m.r_s!=null) conf.m.r_s.animate({left:conf.l.r_n+'px',top:conf.t.r_n+'px',width:conf.w.r_n+'px',height:conf.h.r_n+'px'},conf.speed,function(){});
		//conf.m.r_n.animate({left:conf.l.r_n+'px',top:conf.t.r_n+'px',width:conf.w.r_n+'px',height:conf.h.r_n+'px'},conf.speed,function(){$(this).next().attr({'status':'r_n','class':'im_none'}); moveElement()});
		identity();
	}
	
	//监视窗口尺寸
	$(window).resize(function(){
		//$('#test').html(' l_n:'+conf.w.l_n+'<br/> l_s:'+conf.w.l_s+'<br/> l_b:'+conf.w.l_b+'<br/> cur:'+conf.w.cur);
		updateSrc();
		test.html('reSet判断已获取图片尺寸 --<br/>');
		
		if(cinter) clearInterval(cinter);
		var cinter=setInterval(reSet,100);
	});
	if(cinter) clearInterval(cinter);
	var cinter=setInterval(reSet,100);
	//判断已获取图片尺寸
	function reSet(){test.html(test.html()+'----------------------<br/>');
		test.html(test.html()+'reSet判断已获取图片尺寸 --<br/>');
		start();
		if(conf.w.cur>0){
			if(cinter) clearInterval(cinter);
			
			
			identity();
			getSize();
			setSize();
			setSite();
			setValue();
		}else{
			getSize();
		}
	}
	
	//向右   上一张
	$(conf.prev).click(function(){
		if(conf.cur>1){
			if(!conf.m.cur.is(':animated')){
			conf.cur--;
			start();
			identity();
			getSize();
			setSize();
			setSite();
			setValue();
			
			updateSrc();
			move_right();
			}
		}
		
		
	});
	
	//向左  下一张
	$(conf.next).click(function(){
		
		if(conf.cur<conf.count){
			if(!conf.m.cur.is(':animated')){
			conf.cur++;
			start();
			identity();
			getSize();
			setSize();
			setSite();
			setValue();
			
			updateSrc();
			move_left();
			//identity();
			}
		}
	});
	//显示按钮
	
	//打开和关闭窗口
	function openWindow_img(){
		
	}
	
});









