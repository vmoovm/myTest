// JavaScript Document
$(function(){
	//下拉框
	$('#zc_select1').imiSelect({
		selected:0
	});
	$('#zc_select2').imiSelect({
		selected:0
	});
	$('#zc_select3').imiSelect({
		selected:0
	});
	$('#zc_select4').imiSelect({
		selected:0
	});
	
	function d(ed){
		var w=$(window).width();
		var h=$(window).height();
		var ow=ed.offset().right-ed.width()/2;
		if(ow>ed.width()){
			return true;
		}else{
			return false;
		}
		
	}
	
	
	$('.zc_i_img').mouseover(function(){
		var f=d($(this));
		if(f){
			$(this).find('#c').prev().hide();
			$(this).find('#c').next().show();
		}else{
			$(this).find('#c').prev().show();
			$(this).find('#c').next().hide();
		}
		
	});
});






























