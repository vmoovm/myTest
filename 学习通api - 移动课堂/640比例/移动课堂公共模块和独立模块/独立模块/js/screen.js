//投屏
function throwScreen(){
	var url =window.location.href;
	var data = {"ver":"1.0","cmd":"openurl","url":url};
	jsBridge.postNotification('COURSE_START_PROJECTOR',data);
}
//结束投屏
function endThrowScreen(){
	var data = {"ver":"1.0","cmd":"closeurl"};
	jsBridge.postNotification('COURSE_STOP_PROJECTOR',data);
}
function zplusColse(){
	$("#zm_box").show();
	$("#zm_box").removeClass("fadeInUp");
	$("#zm_box").addClass("fadeInDown");
	setTimeout(function(){
		$("#zm_box").hide();
	},600);
}
function zplus(){
	$("#zm_box").show();
	$("#zm_box").removeClass("fadeInDown");
	$("#zm_box").addClass("fadeInUp");
	setTimeout(function(){
		$("#zm_box").show();
	},600);
}