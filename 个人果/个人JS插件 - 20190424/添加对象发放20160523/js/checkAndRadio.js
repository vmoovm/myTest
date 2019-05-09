;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：单选和多选美化
		 * 参数介绍：
		 * inputType：默认为空（必传项）表单类型 只能传 checkbox 或 radio
		 * checked：默认为'zchecked'（选填项）选中状态样式名，可修改，若修改，样式表也必须对应修改
		 * checkB：默认为'zcheckB'（选填项）为区分多选样式名，可修改，若修改，样式表也必须对应修改
		 * checkR：默认为'zcheckR'（选填项）为区分多选样式名，可修改，若修改，样式表也必须对应修改
		 * 
		 * 注
		 * jquery版本：1.9.0     1.9.0以上
		 * 注册事件时，建议用className；  
		 * id 也可，但radio选中和取消中需要修改  
		 * var curS=p_this.attr('class') 为var curS=p_this.attr('id');
		 * $(this).parents('.'+curS).find('em').attr('class','zcheck') 为 $(this).parents('#'+curS).find('em').attr('class','zcheck');
		 *---------------------------------------
		 * Great：2016.5.24
		 * Update: 2016.5.24
		 */
		'checkAndRadio':function(options){
			var p_this=$(this);
			options=$.extend({
				inputType:'',
				checked:'zchecked',
				checkB:'zcheckB',
				checkR:'zcheckR',
			},options);
			
			//多选
			if(options.inputType=='checkbox'){
				//初始化默认选中项
				p_this.find(".zcheckB").each(function(){
					if($(this).find("input[type=checkbox]").is(':checked')) { $(this).find('em').addClass(options.checked);}
				});
				//选中和取消
				p_this.on('click','.zcheckB label',function(){
					$(this).find('em').toggleClass(options.checked);
				});
			}
			//单选
			if(options.inputType=='radio'){
				//初始化默认选中项
				p_this.find(".zcheckR").each(function(){
					if($(this).find("input[type=radio]").is(':checked')) { $(this).find('em').addClass(options.checked);}
				});
				
				//选中和取消
				p_this.on('click','.zcheckR label',function(){
					var curS=p_this.attr('class');
					$(this).parents('.'+curS).find('em').attr('class','zcheck');
					$(this).find('em').addClass(options.checked);
				});
			}
			return this;
		}
	});
})(jQuery);
