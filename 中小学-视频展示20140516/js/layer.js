// JavaScript Document

$(function(){
	$('.zlayer').width($(window).width());
	$('.zlayer').height($(window).height()-100);
	$('.zlayer').show();
	$('.zla_close').click(function(){
		$('.zlayer').hide();
	});
	//下拉框
	$('#zc_select1').imiSelect({
		selected:0
	});
	$('#zc_select2').imiSelect({
		selected:0
	});
});





























