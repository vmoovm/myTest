// JavaScript Document
$(function(){
	var conf={
		max_w:1000,	//预览大图最大宽度
		max_h:700,	//预览大图最大高度
		items:'.zcont_item',	//点击的对象
		
		layer:'.zlayer',	//窗口透明背景
		content:'.zview',	//窗口
		viewSize:'.zvi_content',	//获取窗口边距
		imgbox:'.zvi_img',	//图片box
		imgTitle:'.zvi_t_h2',	//窗口标题
		//zvi_item
		//zvi_middle
		closebtn:'.zvi_t_close',	//关闭窗口按钮
		img:'#zimg',	//大图ID
		data:$('[role="image-data"]'),	//数据
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
	conf.count=conf.data.find(conf.items).length;
	
	//根据配置计算样式 （计算可视窗口）
	function viewSize(aw,bh){
		var pl=parseInt($(conf.viewSize).css('paddingLeft'));
		var pr=parseInt($(conf.viewSize).css('paddingRight'));
		var pt=parseInt($(conf.viewSize).css('paddingTop'));
		var pb=parseInt($(conf.viewSize).css('paddingBottom'));
		var ml=parseInt($(conf.viewSize).css('marginLeft'));
		var mr=parseInt($(conf.viewSize).css('marginRight'));
		var mt=parseInt($(conf.viewSize).css('marginTop'));
		var mb=parseInt($(conf.viewSize).css('marginBottom'));
		if(aw) conf.max_w=aw;
		if(bh) conf.max_h=bh;
		$(conf.content).width(conf.max_w+pl+pr+ml+mr);
		$(conf.content).height(conf.max_h+pt+pb+mt+mb+$(conf.imgTitle).height());
		$(conf.prev).height(conf.max_h-$(conf.imgTitle).height());
		$(conf.next).height(conf.max_h)-$(conf.imgTitle).height();
		$(conf.viewSize).height(conf.max_h-$(conf.imgTitle).height());
		$(conf.imgbox).height(conf.max_h-$(conf.imgTitle).height());
	}
	viewSize();
	
	//设置弹层尺寸
	function setLayer(){
		
	}
	
	//更新当前图片对象
	function updateSrc(){
		conf.cur_img.src=$(conf.items+':eq('+conf.cur_num+')').find('img[largeUrl]').attr('largeUrl');
		conf.cur_txt=$(conf.items+':eq('+conf.cur_num+')').find('a').text();
		if(conf.clear) clearInterval(conf.clear);
		conf.clear=setInterval(getSize,100);
		
	}
	
	//获取尺寸
	function getSize(){
		conf.cur_w=conf.cur_img.width;
		conf.cur_h=conf.cur_img.height;
		
		if(conf.cur_w>0&&(conf.cur_img.complete||conf.cur_img.onload)){
			if(conf.clear) clearInterval(conf.clear);
			setSize();
			setValue();
		}
	}
	
	//设置当前图片尺寸
	function setSize(){
		if(conf.cur_w>=conf.max_w){
			conf.cur_w=conf.max_w;
			conf.cur_h=conf.cur_h*(conf.cur_w/conf.cur_img.width);
		}
		if(conf.cur_h>=conf.max_h){
			conf.cur_h=conf.max_h;
			conf.cur_w=conf.cur_w*(conf.cur_h/conf.cur_img.height);
		}
	}
	
	//大图赋值尺寸
	function setValue(){
		$(conf.layer).show();
		$(conf.img).attr('src','');
		$(conf.img).attr({'src':conf.cur_img.src,'width':conf.cur_w,'height':conf.cur_h});
		$(conf.img).css({'opacity':'0'});
		$(conf.img).animate({'opacity':'1'},200);
		$(conf.imgTitle).text(conf.cur_txt);
	}
	
	//按钮状态
	function btnStatus(){
		conf.cur_num==(conf.count-1) ? $(conf.next).removeClass(conf.next_on) : $(conf.next).addClass(conf.next_on);
		conf.cur_num==0 ? $(conf.prev).removeClass(conf.prev_on) : $(conf.prev).addClass(conf.prev_on);
	}
	
	//向右   上一张
	$(conf.prev).click(function(){
		if(conf.cur_num>0){
			conf.cur_num--;
			$(conf.img).attr({'src':conf.loading.url,'width':conf.loading.w,'height':conf.loading.h});
			btnStatus();
			updateSrc();
		}
	});
	
	//向左  下一张
	$(conf.next).click(function(){
		if(conf.cur_num<(conf.count-1)){
			conf.cur_num++;
			$(conf.img).attr({'src':conf.loading.url,'width':conf.loading.w,'height':conf.loading.h});
			btnStatus();
			updateSrc();
		}
	});
	
	//根据浏览器大小给透明背景赋值
	function resetWindow(){
		if($(window).height()<(conf.max_h+50)){
			var ztop=$(document).scrollTop();
			$(conf.layer).css('position','absolute');
			$(conf.content).css('marginTop',ztop+'px');
		}else{
			$(conf.layer).css('position','fixed');
			$(conf.content).css('marginTop','30px');
		}
		$(conf.layer).height($(document).height());
	}
	resetWindow();
	
	//开启相册
	$(conf.items).click(function(){
		conf.cur_num=$(this).index();
		$(conf.img).attr({'src':conf.loading.url,'width':conf.loading.w,'height':conf.loading.h});
		conf.f=true;
		resetWindow();
		$(conf.layer).show();
		//添加开启相册动画
		var _self=$(this);
		$(conf.content).addClass(conf.animation_open);
		setTimeout(function(){
			openClass(_self);
		},500);
		btnStatus();
		updateSrc();
		viewSize($(window).width()*0.7,$(window).height()*0.7);
	});
	
	//移除开启相册动画
	function openClass(self){
		self.parents(conf.content).removeClass(conf.animation_open)
	}
	
	//添加关闭动画
	$(conf.closebtn).click(function(){
		conf.f=false;
		var _self=$(this);
		$(conf.content).addClass(conf.animation_close);
		setTimeout(function(){
			rmClass(_self);
		},500);
	});
	
	//移除关闭动画
	function rmClass(self){
		self.parents(conf.content).removeClass(conf.animation_close)
		$(conf.layer).hide();
	}
	var test=$('#test');
	//监视浏览器大小
	$(window).resize(function(){
		test.html(test.html()+conf.f+'<br>');
		if(conf.f){
			viewSize($(window).width()*0.7,$(window).height()*0.7);
			getSize();
			resetWindow();
		}
	});
});