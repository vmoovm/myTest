// JavaScript Document

$(function(){
	//控制导航子菜单对齐方式
	$(".zt_item:gt(4)").find('.zt_sub').css({left:'auto',right:'0'});
	$(".zt_item:gt(4)").find('dd').css('float',"right");
	//导航子菜单滑过效果
	$(".zt_nav").on("mouseenter",".zt_item",function(){
		if($(this).index()>4){
			$(this).find('.zt_sub').css('right',$(this).width()*-1+'px');
		}
		$(this).find("p").addClass("zt_hover");
		$(this).find(".zt_sub").show();
	}).on("mouseleave",".zt_item",function(){
		$(this).find("p:first").removeClass("zt_hover");
		$(this).find(".zt_sub").hide();
	})
	
})





























