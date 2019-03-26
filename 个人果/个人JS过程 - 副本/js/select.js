// JavaScript Document

$(function(){
	var clickone_tid = [];
	var clicktwo_tid = [];
	$('#select').click(function(){
		clearTimeout(clickone_tid[0]);
		self_=this;
		clickone_tid[0]=setTimeout(function(){
			$('#test').append('<p>jjjjjkkkkklll</p>');
			$(self_).children('ul:eq(0)').slideToggle(200);
		},200);
	});
	$('#select ul li').click(function(e){
		var li_html=$(this).html();
		$(this).parent().prev().html(li_html);
		
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	});
	$('#select').mouseleave(function(){
		$(this).children('ul:eq(0)').slideUp(200);
	});
})





























