$(function(){
	//导航
	$("#zn_menu").on('mouseenter','dd',function(){
		var navId=$(this).attr('role');
		if(navId){
			$(navId).show();
			$("#zn_bg").show();
		}
	}).on('mouseleave','dd',function(){
		var navId=$(this).attr('role');
		if(navId){
			$(navId).hide();
			$("#zn_bg").hide();
		}
	})
	
});

























