// JavaScript Document
$(function(){
	/*窗口大小标志位*/

	$('.zl_close').live('click',function(){
		$(this).parents('div.zlayer').hide();
	});
	$('.zl_no').live('click',function(){
		$(this).parents('div.zlayer').hide();
	});
	$('.zlayer').height($(window).height());
	
});






























