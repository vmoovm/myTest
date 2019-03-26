	//用法实例
	// $("#zobject_show").click(function() {
		// scoreList("#zobject_site","#zobject_opacity");
	// });
	// $("#zobject_closebtn").click(function() {
		// closelayer("#zobject_site","#zobject_opacity");
	// });
	
	function closelayer(zlayer,zbg){
		var zlayer=zlayer,zbg=zbg;
		$(zlayer).show();
		$(zlayer).removeClass("fadeInUp");
		$(zlayer).addClass("fadeInDown");
		setTimeout(function() {
			$(zlayer).hide();
			if(zbg){
				$(zbg).hide();
			}
		}, 400);
	}
	
	function scoreList(zlayer,zbg) {
		var zlayer=zlayer,zbg=zbg;
		$(zlayer).show();
		if(zbg){
			$(zbg).show();
		}
		$(zlayer).removeClass("fadeInDown");
		$(zlayer).addClass("fadeInUp");
		setTimeout(function() {
			$(zlayer).show();
			if(zbg){
				$(zbg).show();
			}
		}, 500);
	}
	

