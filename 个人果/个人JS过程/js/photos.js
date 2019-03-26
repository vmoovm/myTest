// JavaScript Document
//大图切换效果
$(document).ready(function() {
	var conf_photo={
		imgsource:'#bigImg_box',
		browser_w:$(window).width()*0.65,
		browser_h:$(window).height()*0.85,
		MinW:100,
		MinH:100,
		imgObj:new Image(),
		imgsrc:new Array(),
		BigImgFix:'',
		lastW:0,
		lastH:0,
		keyLength:0,
		keyNum:0,
		html:'<div id="img_box_bg" class="img_box_bg"></div><div id="img_box" class="img_box"><div id="img_box_con" class="img_box_con"><div id="img_box_center" class="img_box_center"><img id="img_src" src="" /></div><p class="img_next_left"><span id="img_pre_bt" class="img_pre_bt"></span></p><p class="img_next_right"><span id="img_next_bt" class="img_next_bt"></span></p><p id="img_close_bt" class="img_close_bt"></p></div></div>'
	}
	$("body").append(conf_photo.html);
	
	function reSet(){
		conf_photo.browser_w=$(window).width()*0.65,
		conf_photo.browser_h=$(window).height()*0.85,
		conf_photo.keyLength=$(conf_photo.imgsource+" img").length;
	    $("#img_box_bg,#img_box").height($(window).height()).width($(window).width());
	}
	  
	reSet();
	$(window).resize(function(){
		reSet();
	});
	
	$(conf_photo.imgsource+" img").each(function(index){
		conf_photo.imgsrc[index]=$(this).attr("src");
	});

	function imgLoad(this_img){
		conf_photo.imgObj.src=conf_photo.BigImgFix+this_img.attr('src');
		this_img_size(this_img,conf_photo.imgObj.width);
	}
	
	//改变尺寸
	function this_img_size(this_img,completed){
		if(completed){
		  var img_w=conf_photo.imgObj.width;
		  var img_h=conf_photo.imgObj.height; 
		}else{
			imgLoad(this_img);
		}
		
		if(img_w<=conf_photo.MinW) img_w=conf_photo.MinW;
		if(img_h<=conf_photo.MinH) img_h=conf_photo.MinH;
		
		if(img_w>conf_photo.browser_w){
			if(img_w>img_h){
				img_h=img_h*(conf_photo.browser_w/img_w);
				img_w=conf_photo.browser_w;
			}
		}
		if(img_h>conf_photo.browser_h){
			if(img_w<img_h){
				img_w=img_w*(conf_photo.browser_h/img_h);
				img_h=conf_photo.browser_h;
			}
		}
		$("#img_src").attr("width",img_w);
		$("#img_src").attr("height",img_h);
		var img_box_top=($(window).height()-(img_h+10))/2;
		
		if(conf_photo.lastW!=img_w){
		  $("#img_box_con").animate({width:img_w+10,marginTop:img_box_top},200);
		  $("#img_box_center").animate({width:img_w},200);
		  conf_photo.lastW=img_w;
		}
		if(conf_photo.lastH!=img_h){
		  $("#img_box_con").animate({height:img_h+10,marginTop:img_box_top},200);
		  $("#img_box_center").animate({height:img_h},200);
		  conf_photo.lastH=img_h;
		}
		
		$("#img_box_bg,#img_box").height($(window).height()).width($(window).width());
	}
	
	//向右   上一张
	$("#img_next_bt").click(function(){
		conf_photo.keyLength+=1;
		conf_photo.keyNum=conf_photo.keyLength;
		$(conf_photo.imgsource+" img").each(function(index){
			var current_img_src=$(this).attr("src")==$("#img_box_center img").attr("src");
			if(current_img_src){
				conf_photo.keyLength=index+1;
				conf_photo.keyNum=conf_photo.keyLength;
			}
			if(conf_photo.keyNum==conf_photo.imgsrc.length+1||conf_photo.keyNum==conf_photo.imgsrc.length)conf_photo.keyNum=0;
			if(conf_photo.keyNum==index){
				imgLoad($(this));
			}
		});
		if(conf_photo.keyLength<conf_photo.imgsrc.length){
			$("#img_src").attr("src",conf_photo.imgsrc[conf_photo.keyLength]);
		}else{
			conf_photo.keyLength=0;
			$("#img_src").attr("src",conf_photo.imgsrc[conf_photo.keyLength]);
		}
	});
	
	//向左  下一张
	$("#img_pre_bt").click(function(){
		conf_photo.keyLength-=1;
		conf_photo.keyNum=conf_photo.keyLength;
		$(conf_photo.imgsource+" img").each(function(index){
			if(conf_photo.keyNum==-1) conf_photo.keyNum=conf_photo.imgsrc.length-1;
			if(conf_photo.keyNum==index){
				imgLoad($(this));
			}
		});
		
		if(conf_photo.keyLength<1&&!conf_photo.keyLength==0){
			conf_photo.keyLength=conf_photo.imgsrc.length-1;
			$("#img_src").attr("src",conf_photo.imgsrc[conf_photo.keyLength]);
		}else{
			$("#img_src").attr("src",conf_photo.imgsrc[conf_photo.keyLength]);
		}
	});
	//显示按钮
	$(".img_next_left").mouseover(function(){
		$("#img_pre_bt").css("display","block");
	}).mouseout(function(){
		$("#img_pre_bt").css("display","none");
	});
	$(".img_next_right").mouseover(function(){
		$("#img_next_bt").css("display","block");
	}).mouseout(function(){
		$("#img_next_bt").css("display","none");
	});
	//打开和关闭窗口
	function openWindow_img(v_v,current_img){
		//var c_img=$(".img_array").eq(current_element).children("img");
		if(v_v){
			$("#img_box").css("display","block");
			$("#img_box_bg").css("display","block");
			imgLoad(current_img);
			$("#img_src").attr("src",current_img.attr("src"));
		}else{
			$("#img_box").css("display","none");
			$("#img_box_bg").css("display","none");
		}
	}
	$("#img_close_bt").click(function(){
		openWindow_img(false)
	});
	$(conf_photo.imgsource+" img").click(function(){
		openWindow_img(true,$(this))
	});
});






























