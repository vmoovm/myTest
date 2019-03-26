// JavaScript Document

$(function(){
	var mouseover_tid = [];
	var mouseout_tid = [];
	function active(this_ele,index){
		this_ele.hover(
			function(){
				var _self = this;
				clearTimeout(mouseout_tid[index]);
				mouseover_tid[index] = setTimeout(function() { 
					 $(_self).children('ul:eq(0)').slideDown(200); 
				}, 200);
			},function(){
				var _self = this;
				clearTimeout(mouseover_tid[index]);
				mouseout_tid[index] = setTimeout(function() { 
				   $(_self).children('ul:eq(0)').slideUp(200); 
				}, 200);
			}
		);
	}
	 
	$('.m_first').each(function(index){
		active($(this),index);
	});
	
	$(".m_second>li").each(function(index){
		active($(this),index);
	});
	
	$(".m_third>li").each(function(index){
		active($(this),index);
	});
	
	$(".m_more>li").each(function(index){
		active($(this),index);
	});

	
});






























