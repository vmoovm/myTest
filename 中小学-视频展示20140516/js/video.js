// JavaScript Document
$(function(){
	//显示隐藏评论
	$('.fullScreen').showLeftRight({
		rw:310,
		mw:36,
		zout:'zre_t_out',
		zin:'zre_t_in'
	});
	
	
	//回复
	$('.zre_c_right8').click(function(event){
		$(this).parent().next().slideToggle();
		event.stopPropagation();
	});
	$('.zre_c_r_ok').click(function(){
		$(this).parents('p').slideUp();
		$(this).parents('p').nextAll().slideUp();
	});
	
	 $(document).bind("click",function(e){
	  var target  = $(e.target);
	  if(target.closest(".zre_c_r_re").length == 0){
		   $(".zre_c_r_re").slideUp();
	  }
	   console.log(11);
	 });
	
});






























