// JavaScript Document

$(function(){
	var p_this=$('.zupDown');
	var clickone;
	var conf={
		move:p_this.find('[role="move"]'),
		prev:p_this.find('[role="prev"]'),
		next:p_this.find('[role="next"]'),
		h:p_this.find('[role="move"]').find('li:eq(0)').height(),
		len:p_this.find('[role="move"]').find('li').length,
		n:11,
		speed:200
	}
	
	function s_up(){
		if(conf.move.position().top>-(conf.move.height()-conf.n*conf.h)){
				conf.move.animate({top:'-='+conf.h+'px'},conf.speed);
			}
		/*clearTimeout(clickone);
		clickone=setTimeout(function(){
			if(conf.move.position().top>-(conf.move.height()-conf.n*conf.h)){
				conf.move.animate({top:'-='+conf.h+'px'},conf.speed);
			}
		},conf.speed);*/
	}
	
	function s_down(){
		clearTimeout(clickone);
		clickone=setTimeout(function(){
			if(conf.move.position().top<0){
				conf.move.animate({top:'+='+conf.h+'px'},conf.speed);
			}
		},conf.speed);
	}
	
	function auto_ud(f){
		if(f){s_up();
			var ac=setInterval(200,function(){s_up()});
			
		}else{
			s_down();
		}
	}
	
	if(!(conf.len<=conf.n)){
		conf.move.height(conf.h*conf.len);
		conf.prev.bind("mouseover",function(){auto_ud(1)});
		conf.next.bind("mouseover",function(){auto_ud(0)});
	}else{
		conf.prev.hide();
		conf.next.hide();
	}
	
});






























