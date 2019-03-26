;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：单选和多选美化
		 * 参数介绍：
		 * inputType：默认为空（必传项）表单类型 只能传 checkbox 或 radio
		 * checked：默认为'zchecked'（选填项）选中状态样式名，可修改，若修改，样式表也必须对应修改
		 * checkB：默认为'zcheckB'（选填项）为区分多选样式名，可修改，若修改，样式表也必须对应修改
		 * checkGroup:'默认为空'（必填项），告诉每一组的组名（标签的样式名 class名）,作用：选项分组，防止动态加载整组选项不起作用
		 * checkR：默认为'zcheckR'（选填项）为区分单选样式名，可修改，若修改，样式表也必须对应修改
		 * defaultT: 默认为空 （选填项），附加项，可传自定义内容
		 * 
		 * 注
		 * jquery版本：1.9.0     1.9.0以上
		 * 注册事件时，建议用className；  
		 * id 也可，但radio选中和取消中需要修改  
		 * var curS=p_this.attr('class') 为var curS=p_this.attr('id');
		 * $(this).parents('.'+curS).find('em').attr('class','zcheck') 为 $(this).parents('#'+curS).find('em').attr('class','zcheck');
		 *---------------------------------------
		 * Great：2016.5.24
		 * Update: 2018.5.11
		 */
		'checkAndRadio':function(options){
			var p_this=$(this);
			options=$.extend({
				inputType:'',
				checked:'zchecked',
				checkB:'.zcheckB',
				checkR:'.zcheckR',
				disabled:'zdisabled',
				checkGroup:'',
				defaultT:''
			},options);
			//多选
			if(options.inputType=='checkbox'){
				//初始化默认选中项
				p_this.find(".zcheckB").each(function(){
					if($(this).find("input[type=checkbox]").is(':checked')) { $(this).find('em').addClass(options.checked);}
					if($(this).find("input[type=checkbox]").prop('disabled')) { $(this).find('label').addClass(options.disabled);}
				});
				
				//选中和取消
				function Setcheckbox(){
					if(!$(this).prev("input[type=checkbox]").prop('disabled')){
						// 自定义处理
						if(options.defaultT){
							$(this).parents(options.defaultT).toggleClass("zse_bg");
						}
						$(this).find('em').toggleClass(options.checked);
					}
				}
				p_this.on('click','.zcheckB label',Setcheckbox);
			}
			
			//单选
			if(options.inputType=='radio'){
				//初始化默认选中项
				p_this.find(".zcheckR").each(function(){
					if($(this).find("input[type=radio]").is(':checked')) { $(this).find('em').addClass(options.checked);}
					if($(this).find("input[type=radio]").prop('disabled')) { $(this).find('label').addClass(options.disabled);}
				});
					//选中和取消
					p_this.on('click','.zcheckR label',function(){
						if(!$(this).prev("input[type=radio]").prop('disabled')){
							// 自定义处理
							if(options.defaultT){
								$(this).parents(options.defaultT).addClass("zse_bg").siblings(":not(." + options.disabled +")").removeClass("zse_bg");
							}
							$(this).not('.' + options.disabled).parents(options.checkGroup).find('em').prop('class','zcheck');
							$(this).not('.' + options.disabled).find('em').addClass(options.checked);
						}
					});
			}
			return this;
		},
		/**
		 * 功能介绍：全选   必须和以上插件同时使用(checkAndRadio)
		 * 参数介绍：
		 * CAR_btn:默认为空（必传项）全选按钮样式名 。例:'.checkAll',
		 * checkGroup:默认为空（必传项）全选一组的组样式名 。例:'.zclasses'
		 * 
		 * 注
		 * jquery版本：1.9.0     1.9.0以上
		 *---------------------------------------
		 * Great：2016.6.24
		 * Update: 2016.6.24
		 */
		'CAR_All':function(options){
			var p_this=$(this);
			options=$.extend({
				CAR_btn:'',
				checkGroup:'',
				disabled:'zdisabled',
				checks:false,
				defaultT:''
			},options);
			// 全选
			if(options.CAR_btn && options.checkGroup){
				//取消全选/全选
				var flag=true;
				p_this.on("click",options.CAR_btn,function(){
					//找到全选按钮的作用域
					if(options.checks){
						var zgroup_cur=$(this).parents(options.checkGroup);
					}else{
						var zgroup_cur=$(options.checkGroup);
					}
					flag=!flag;
					if(flag){
						var disabledLen = zgroup_cur.find('.zcheckB').find("label." + options.disabled) ? zgroup_cur.find('.zcheckB').find("label." + options.disabled).length : 0;
						
						//如果没有全选，尽量全选，如果是全选就取消全选
						if(zgroup_cur.find('.zcheckB').find("label." + options.disabled).prev("input[type='checkbox']").length - disabledLen == zgroup_cur.find('.zcheckB').find("label." + options.disabled).prev("input:checked").length - disabledLen){
							zgroup_cur.find('.zcheckB').find("label:not(." + options.disabled +")").prev("input:checked").prop('checked',false);
							zgroup_cur.find('.zcheckB').find("label:not(." + options.disabled +")").find('em').removeClass('zchecked');
							// 自定义处理
							if(options.defaultT){
								zgroup_cur.find(options.defaultT).removeClass("zse_bg");
							}
						}else{
							zgroup_cur.find('.zcheckB').find("label:not(." + options.disabled +")").prev("input:not(:checked)").prop('checked',true);
							zgroup_cur.find('.zcheckB').find("label:not(." + options.disabled +")").find('em').addClass('zchecked');
							// 自定义处理
							if(options.defaultT){
								zgroup_cur.find(options.defaultT).addClass("zse_bg");
							}
						}
						
					}else{
						zgroup_cur.find('.zcheckB').find("label:not(." + options.disabled +")").prev("input:not(:checked)").prop('checked',true);
						zgroup_cur.find('.zcheckB').find("label:not(." + options.disabled +")").find('em').addClass('zchecked');
						// 自定义处理
						if(options.defaultT){
							zgroup_cur.find(options.defaultT).addClass("zse_bg");
						}
					}
				});
			}
			else{
				alert("请给方法 CAR_All 的 CAR_btn（必传）:和 checkGroup（必传）:传参");
			}
			return this;
		},
		/**
		 * 功能介绍：反选 必须和以上插件同时使用(checkAndRadio)
		 * 参数介绍：
		 * CAR_btn:默认为空（必传项）全选按钮样式名 。例:'.checkReverse',
		 * checkGroup:默认为空（必传项）全选一组的组样式名 。例:'.zclasses',
		 * checks:默认为 false(选填项) 是否为多组分别操作，false 为单组，true 为多组 。多组时，操作按钮一定放在组名内
		 * 
		 * 注
		 * jquery版本：1.9.0     1.9.0以上
		 * 多组时，操作按钮一定放在组名内(出错时建议从此入手查错)
		 *---------------------------------------
		 * Great：2016.6.24
		 * Update: 2016.6.24
		 */
		'CAR_Reverse':function(options){
			var p_this=$(this);
			options=$.extend({
				CAR_btn:'',
				checkGroup:'',
				disabled:'zdisabled',
				defaultT:''
			},options);
			
			if(options.CAR_btn && options.checkGroup){
				p_this.on("click",options.CAR_btn,function(){
					//找到反选按钮的作用域
					if(options.checks){
					var zgroup_cur=$(this).parents(options.checkGroup);
					}else{
						var zgroup_cur=$(options.checkGroup);
					}
					zgroup_cur.find('.zcheckB').find("label:not(." + options.disabled +")").prev("input[type=checkbox]").each(function(){
						
						if($(this).prop("checked")){
							zgroup_cur.find("label[for="+$(this).attr("id")+"]").find("em").removeClass('zchecked');
							// 自定义处理
							if(options.defaultT){
								$(this).parents(options.defaultT).removeClass("zse_bg");
							}
							$(this).prop('checked',false);
						}else{
							zgroup_cur.find("label[for="+$(this).attr("id")+"]").find("em").addClass('zchecked');
							// 自定义处理
							if(options.defaultT){
								$(this).parents(options.defaultT).addClass("zse_bg");
							}
							$(this).prop('checked',true);
						}
					});
				});
			}else{
				alert("请给方法CAR_Reverse 的 CAR_btn（必传）:和 checkGroup（必传）:传参");
			}
			return this;
		}
	});
})(jQuery);
