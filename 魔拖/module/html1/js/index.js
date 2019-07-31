// JavaScript Document


$(function(){
	$(".znav-sub").width($(window).width());
	// 导航
	$("#znavList li").hover(function(){
		$(this).addClass('znav-hover');
	}, function(){
		$(this).removeClass('znav-hover');
	});

	// 标题详情显示
	$(".tabList-js").on('mouseenter', '.zimgInTxt-item', function(){
		$(this).addClass('zimgInTxt-hover');
	}).on('mouseleave', '.zimgInTxt-item', function(){
		$(this).removeClass('zimgInTxt-hover');
	});
	
	// tab切换
	$(".ztab").on('mouseenter', 'dd', function(){
		$(this).siblings().removeClass('ztab_cur');
		$(this).addClass('ztab_cur')
		$(this).parent().next(".tabList-js").children(".zimgInTxt").addClass('zimgInTxt-hide');
		$(this).parent().next(".tabList-js").children(".zimgInTxt").eq($(this).index()).removeClass('zimgInTxt-hide');
	});


});


















