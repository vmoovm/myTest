// JavaScript Document

$(function(){
	/*弹窗*/
	function zlayer(){
		$('.zco_layer').width($(window).width());
		$('.zco_layer').height($(window).height());
		
	}
	$('.zco_c_video').click(function(){
		zlayer();
		$('.zco_layer').show();
	});
	
	$(window).resize(function(){
		zlayer();
	});
	
	/*如果不用按钮关闭窗口，那就删掉注释
	
	
	$('.zco_l_close').click(function(){
		$('.zco_layer').hide();
	});
*/
});





























