// JavaScript Document

$(function(){
	/*var clickone_tid = [];
	var clicktwo_tid = [];
	var p_this=$("#slideDown").find('[role="slide"]');
	//alert(p_this.tagName);
	
	p_this.click(function(){
		clearTimeout(clickone_tid[0]);
		self_=this;
		clickone_tid[0]=setTimeout(function(){
			$('#test').append('<p>jjjjjkkkkklll</p>');
			$(self_).children('ul:eq(0)').slideToggle(200);
		},200);
	});
	$('#select ul li').click(function(e){
		
		
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	});
	$('#select').mouseleave(function(){
		$(this).children('ul:eq(0)').slideUp(200);
	});*/
	
	$(".zevent").mouseenter(function(){
		$(this).find('.zlayer_re').slideDown(500);
	}).mouseleave(function(){
		$(this).find('.zlayer_re').slideUp(5000);
	});
})





























