// JavaScript Document

$(function(){
	var click_off_id = [];
	var click_on_id = [];
	var arrow_gray='arrow_gray';
	var arrow_color='arrow_color';
	var menuTop='menuTop';
	var empty='arrow_empty';
	function active(this_ele,level,cur){
		//给有无下一级菜单项添加标志
		if(this_ele.nextAll().length){
			this_ele.addClass(arrow_gray);
		}else{
			this_ele.addClass(empty);
		}
		
		this_ele.click(function(){
			this_ele.not('.'+empty).parent().children(':eq(0)').removeClass(arrow_color);
			$(this).parent().find('.'+arrow_color).removeClass(arrow_color);
			$(this).parent().siblings().find('.'+arrow_color).removeClass(arrow_color);
			$(this).not('.'+empty).parent().children(':eq(0)').addClass(arrow_color);
			$(level).parent('li').find('ul').slideUp();
			$(this).parent('li').children('ul').slideDown(200);
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble = true;
			}
		});
	}

	$('.m_first').each(function(index){
		active($(this),'.m_first',index);
	});
	
	$('.m_second').each(function(index){
		active($(this),'.m_second',index);
	});
	
	$('.m_third').each(function(index){
		active($(this),'.m_third',index);
	});
	
	$('.m_more').each(function(index){
		active($(this),'.m_more',index);
	});

	
});



