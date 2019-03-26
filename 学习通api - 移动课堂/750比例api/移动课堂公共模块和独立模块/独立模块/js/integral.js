;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：单选和多选美化
		 * 参数介绍：
		 * inputType：默认为空（必传项）表单类型 只能传 checkbox 或 radio
		 * defaultT: 默认为空 （选填项），附加项，可传自定义内容
		 * 
		 * contentBox: 例："#zin_site", 默认为空（必传项） 界面ID
		 * opacityBg: 例："#zin_opacity", 默认为空（必传项） 背景
		 * visibleCur: 例："zin_visible", 默认为 zin_visible（选填项） 当前标志
		 * itemIdClass:	例："#adsf .zin_row", 默认为空（必传项）需要设置项 
		 * setIdClass:	例："#fdsa .zin_set", 默认为空（必传项）选值项
		 * closeID:	"", 例："#zin_closebtn", 默认为空（必传项）
		 * 
		 * 注
		 * jquery版本：1.9.0     1.9.0以上
		 *---------------------------------------
		 * Great：2016.5.24
		 * Update: 2016.5.24
		 */
		zscore:function(options){
			var p_this=$(this);
			options=$.extend({
				contentBox: "",
				opacityBg: 	"",
				visibleCur: "zin_visible",
				itemIdClass:	"",
				setIdClass:	"",
				closeID:	""
			}, options);
			var lastClickSelf = '';
			//设置值
			$(options.setIdClass).click(function() {
				$(this).addClass(options.visibleCur).siblings().removeClass(options.visibleCur);
				lastClickSelf.find('dd').find("span").text($(options.contentBox+' .'+options.visibleCur).find('dt').text());
				$("#credit_id").val($(options.contentBox+" .zin_visible").find('dt').text());
				closeElement(options.contentBox,options.opacityBg);
			});
			//需要设置的选项
			$(options.itemIdClass).click(function() {
				lastClickSelf = $(this);
				var score = $.trim($(this).find('dd').text());
				$(options.setIdClass).each(function(index) {
					if ($(this).find('dt').text() == score) {
						$(this).addClass(options.visibleCur).siblings().removeClass(options.visibleCur);
					}
				});
				openElement(options.contentBox,options.opacityBg);
			});
			//取消选值
			$(options.closeID).click(function() {
				closeElement(options.contentBox,options.opacityBg);
			});
			//关闭窗口
			function closeElement(zlayer,zbg){
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
			//打开窗口
			function openElement(zlayer,zbg) {
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
		}
	});
})(jQuery);



$(function(){
	//积分设置  原方法
	// var lastClickSelf = '';
	// $(".zin_set").click(function() {
		// $(this).addClass("zin_visible").siblings().removeClass("zin_visible");
		// lastClickSelf.find('dd').find("span").text($(".zin_visible").find('dt').text());
		// closelayer();
	// });
	// $(".zin_row").click(function() {
		// lastClickSelf = $(this);
		// var score = $(this).find('dd').text();
		// $(".zin_set").each(function(index) {
			// if ($(this).find('dt').text() == score) {
				// $(this).addClass("zin_visible").siblings().removeClass("zin_visible");
			// }
		// });
		// scoreList();
	// });
	// $("#zin_closebtn").click(function() {
		// closelayer();
	// });
	// 
	// function closelayer(){
		// $("#zin_site").show();
		// $("#zin_site").removeClass("fadeInUp");
		// $("#zin_site").addClass("fadeInDown");
		// setTimeout(function() {
			// $("#zin_site").hide();
			// $("#zin_opacity").hide();
		// }, 400);
	// }
	// 
	// function scoreList() {
		// $("#zin_site").show();
		// $("#zin_opacity").show();
		// $("#zin_site").removeClass("fadeInDown");
		// $("#zin_site").addClass("fadeInUp");
		// setTimeout(function() {
			// $("#zin_site").show();
			// $("#zin_opacity").show();
		// }, 500);
	// }
});