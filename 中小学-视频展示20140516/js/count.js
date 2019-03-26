// JavaScript Document

$(function(){
	//tab切换
	$('#zco_title').tab({
		contentId:'',
		contentCss:'.zco_content',
		titleOff:'zco_t_tab',
		titleOn:'zco_t_tab zco_t_cur'
	});
	
	$('.zco_c_video a').click(function(){
		$('.zco_layer').width($(window).width());
		$('.zco_layer').height($(window).height()-100);
		$('.zco_layer').show();
	});
	$('.zco_l_close').click(function(){
		$('.zco_layer').hide();
	});
	
	//下拉框
	$('#zc_select1').imiSelect({
		selected:0
	});
	$('#zc_select2').imiSelect({
		selected:0
	});
});





























