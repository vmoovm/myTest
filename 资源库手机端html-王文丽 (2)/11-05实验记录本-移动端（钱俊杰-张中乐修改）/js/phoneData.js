// JavaScript Document
$(function(){
	$("#draft_tabel").on("swiperight",".w_item",function(){
		$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(0,0px)'});
	});
	
	$("#draft_tabel").on("swipeleft",".w_item",function(){
		$("#draft_tabel .w_item").css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(0,0px)'});
		 var aBtnNum = $(this).find(".manage").find("a").length;
		 if(aBtnNum == 1){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-1rem,0px)'});
		 }else if(aBtnNum == 2){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-2.6rem,0px)'});
		 }else if(aBtnNum == 3){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-3rem,0px)'});
	     }else if(aBtnNum == 4){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-4rem,0px)'});
	     }
		//$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-150px,0px)'});
	});
	
	$("#draft_tabel").on("swiperight",".zfields-row",function(){
		$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(0,0px)'});
	});
	
	$("#draft_tabel").on("swipeleft",".zfields-row",function(){
		$("#draft_tabel .zfields-row").css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(0,0px)'});
		 var aBtnNum = $(this).find(".manage").find("a").length;
		 if(aBtnNum == 1){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-1rem,0px)'});
		 }else if(aBtnNum == 2){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-2.6rem,0px)'});
		 }else if(aBtnNum == 3){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-3rem,0px)'});
	     }else if(aBtnNum == 4){
			$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-4rem,0px)'});
	     }
		//$(this).css({'-webkit-transition':'0.2s all ease','-webkit-transform': 'translate(-150px,0px)'});
	});
})