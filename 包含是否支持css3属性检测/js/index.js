// JavaScript Document
canScroll = true;



var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];


//是否支持css的某个属性
	function isSuportCss(property){
		var body = $("body")[0];
		for(var i=0; i<property.length;i++){
			if(property[i] in body.style){
				return true;
			}
		}
		return false;
	}


//重写鼠标滑动事件
	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if(canScroll){
			if (delta < 0) {
				alert(isSuportCss(transition));
			}else {
				isSuportCss(transition);
			}
		}
		return false;
	}




















