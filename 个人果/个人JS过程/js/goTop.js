// JavaScript Document
$(function(){
	var p_self=$('#zgoTop');
	var toTop={
		stval:200, //选填项scrollTopValue滚动条隐藏值
		top:'.zgo_arrow',//选填项 返回顶部
		rcode:'.zgo_rcode',//选填项 二维码
		its:'.zits',//选填项 客服
		site:'.zgo_box',//选填项
		minW:1400,//选填项 内容宽度，注，加滚动条宽和document宽  
		r0:'zgo_right0'//选填项，屏幕小于总宽时贴屏幕右侧
	}
	
	function sTV(vtop){
		var int = $(window).scrollTop();
		if(int<vtop){
			p_self.find(toTop.top).fadeOut();
		}else{
			p_self.find(toTop.top).fadeIn();
		}
	}
	sTV(toTop.stval);
	$(window).scroll(function() {
		cclear&&clearTimeout(cclear);
		var cclear=setTimeout(function(){
			sTV(toTop.stval);
		},500);
	});
	
	p_self.find(toTop.top).click(function(){
		$("body").animate({scrollTop: "0px",scrollLeft:"0px"}, 550,function(){});
	});
	
	
	$(window).width()<=toTop.minW?p_self.find(toTop.site).addClass(toTop.r0):p_self.find(toTop.site).removeClass(toTop.r0);
	
	//屏宽小于文档宽防止隐藏
	$(window).resize(function(){
		$(window).width()<=toTop.minW?p_self.find(toTop.site).addClass(toTop.r0):p_self.find(toTop.site).removeClass(toTop.r0);
	});
	
});

























