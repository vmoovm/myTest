// JavaScript Document
$(function(){

	
	var p_this=$('.wrapicons');
	var notConf={
		l:p_this.find("[role='left']"),
		r:p_this.find("[role='right']"),
		v:p_this.find("[role='view']"),
		m:p_this.find("[role='move']"),
		n:4,
		s:400
	}

	var w=notConf.m.children().width(),
		len=notConf.m.children().length;
	if(len>notConf.n){
		notConf.m.width(w*len);
	}else{
		notConf.l.hide();
		notConf.r.hide();
	}
	
	var t=notConf.m.position().left;
	var cl=null,cr=null;
	notConf.r.click(function(){
		clearTimeout(cr);
		cr=setTimeout(function(){
			t=notConf.m.position().left;
			if(w*notConf.n-w*len<t){
				notConf.m.animate({left:'-='+w+'px'},notConf.s);
			}
		},300);
		
	});
	
	notConf.l.click(function(){
		clearTimeout(cl);
		cl=setTimeout(function(){
			t=notConf.m.position().left;
			if(t<0){
				notConf.m.animate({left:'+='+w+'px'},notConf.s);
			}
		},300);
	});
});































