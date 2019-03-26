;(function($){
	$.fn.extend({
		/**
		 * 功能介绍：单选和多选美化
		 * 参数介绍：
		 * inputType：默认为空（必传项）表单类型 只能传 checkbox 或 radio
		 * checked：默认为'zchecked'（选填项）选中状态样式名，可修改，若修改，样式表也必须对应修改
		 * checkB：默认为'zcheckB'（选填项）为区分多选样式名，可修改，若修改，样式表也必须对应修改
		 * checkOne:'默认为空'（必填项），告诉每一组的组名（标签的样式名 class名）,作用：选项分组，防止动态加载整组选项不起作用
		 * checkR：默认为'zcheckR'（选填项）为区分单选样式名，可修改，若修改，样式表也必须对应修改
		 * checkboxRadio:'' 默认为空 （选填项）为区分多选型是否以单选效果呈现，最好传class名
		 * defaultT: 默认为空 （选填项），附加项，可传自定义内容
		 * 
		 * 注
		 * jquery版本：1.9.0     1.9.0以上
		 * 注册事件时，建议用className；  
		 * id 也可，但radio选中和取消中需要修改  
		 * var curS=p_this.attr('class') 为var curS=p_this.attr('id');
		 * $(this).parents('.'+curS).find('em').attr('class','zcheck') 为 $(this).parents('#'+curS).find('em').attr('class','zcheck');
		 *---------------------------------------
		 * Great：2016.9.19
		 * Update: 2016.9.19
		 */
		'checkAndRadio':function(options){
			var p_this=$(this);
			
			options=$.extend({
				inputType:'',
				checked:'zchecked',
				checkB:'.zcheckB',
				checkR:'.zcheckR',
				checkGroup:'',
				checkboxRadio:'',
				defaultT:''
			},options);
			//多选
			if(options.inputType=='checkbox'){
				//初始化默认选中项
				p_this.find(options.checkB).each(function(){
					if($(this).find("input[type=checkbox]").is(':checked')) { $(this).find('em').addClass(options.checked);}
				});
				if(!p_this.find("input[type=checkbox]").prop('disabled')){
					//选中和取消
					p_this.on('touchstart',options.checkB+' label',function(){
						
						/*因选中后不能取消，不能实现活动发放多选，故去掉，也许是做跳屏测试忘记取消，N段时间后可以去掉此注释
						if(!$(this).prev("span").find("input[type=checkbox]").prop("checked")){*/
						if(!$(this).prev("input[type=checkbox]").prop("checked")){
							// 自定义处理
							if(options.defaultT){
								$(this).parents(options.defaultT).addClass("zse_bg");
							}
							$(this).find('em').addClass(options.checked);
						}else{
							if(options.defaultT){
								$(this).parents(options.defaultT).removeClass("zse_bg");
							}
							$(this).find('em').removeClass(options.checked);
						}
					});
				}
			}
			
			//多选型单选
			if(options.inputType=='checkboxRadio'){
				//初始化默认选中项
				p_this.find(options.checkR).each(function(){
					if($(this).find("input[type=checkbox]").is(':checked')) { $(this).find('em').addClass(options.checked);}
				});
				if(!p_this.find("input[type=checkbox]").prop('disabled')){
					//选中和取消
					p_this.on('touchstart',options.checkR+' label',function(){
						if(options.checkboxRadio){
							if(options.defaultT){
								$(this).parents(options.checkboxRadio).siblings().removeClass("zse_bg");
							}
							$(this).parents(options.checkboxRadio).siblings().find("input[type=checkbox]").prop("checked",false);
							$(this).parents(options.checkboxRadio).siblings().find('em').removeClass(options.checked);
						}
						if(!$(this).prev("input[type=checkbox]").prop("checked")){
							// 自定义处理
							if(options.defaultT){
								$(this).parents(options.defaultT).addClass("zse_bg");
							}
							$(this).find('em').addClass(options.checked);
						}else{
							if(options.defaultT){
								$(this).parents(options.defaultT).removeClass("zse_bg");
							}
							$(this).find('em').removeClass(options.checked);
						}
					});
				}
			}
			
			//单选
			if(options.inputType=='radio'){
				//初始化默认选中项
				p_this.find(options.checkR).each(function(){
					if($(this).find("input[type=radio]").is(':checked')) { $(this).find('em').addClass(options.checked);}
				});
				if(!p_this.find("input[type=radio]").prop('disabled')){
					//选中和取消
					p_this.on('touchstart',options.checkR+' label',function(){
						// 自定义处理
						if(options.defaultT){
							$(this).parents(options.defaultT).addClass("zse_bg").siblings().removeClass("zse_bg");
						}
						$(this).parents(options.checkGroup).find('em').prop('class','zcheck');
						$(this).find('em').addClass(options.checked);
					});
				}
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
		 * Update: 2017.7.7
		 */
		'CAR_All':function(options){
			var p_this=$(this);
			options=$.extend({
				CAR_btn:'',
				checkGroup:'',
				checks:false,
				defaultT:''
			},options);
			// 全选
			if(options.CAR_btn && options.checkGroup){
				//取消全选/全选
				var flag=true;
				p_this.on("touchstart",options.CAR_btn,function(){
					//找到全选按钮的作用域
					if(options.checks){
						var zgroup_cur=$(this).parents(options.checkGroup);
					}else{
						var zgroup_cur=$(options.checkGroup);
					}
					flag=!flag;
					if(flag){
						//如果没有全选，尽量全选，如果是全选就取消全选
						if(zgroup_cur.find('.zcheckB').find("input[type='checkbox']").length==zgroup_cur.find("input:checked").length){
							zgroup_cur.find('.zcheckB').find("input:checked").prop('checked',false);
							zgroup_cur.find('.zcheckB').find('em').removeClass('zchecked');
							// 自定义处理
							if(options.defaultT){
								zgroup_cur.find(options.defaultT).removeClass("zse_bg");
							}
						}else{
							zgroup_cur.find('.zcheckB').find("input:not(:checked)").prop('checked',true);
							zgroup_cur.find('em').addClass('zchecked');
							// 自定义处理
							if(options.defaultT){
								zgroup_cur.find(options.defaultT).addClass("zse_bg");
							}
						}
						
					}else{
						zgroup_cur.find('.zcheckB').find("input:not(:checked)").prop('checked',true);
						zgroup_cur.find('.zcheckB').find('em').addClass('zchecked');
						// 自定义处理
						if(options.defaultT){
							zgroup_cur.find(options.defaultT).addClass("zse_bg");
						}
					}
					if(zgroup_cur.find('.zcheckB').find("input[type='checkbox']").length==zgroup_cur.find("input:checked").length){
						p_this.find(options.CAR_btn).prop("class","zbox_menu_checkAll")
					}else{
						p_this.find(options.CAR_btn).prop("class","zbox_menu_checkNot")
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
		 * checkGroup:默认为空（必传项）全选一组的组样式名 。例:'.zclasses'
		 * 
		 * 注
		 * jquery版本：1.9.0     1.9.0以上
		 *---------------------------------------
		 * Great：2016.6.24
		 * Update: 2016.6.24
		 */
		'CAR_Reverse':function(options){
			var p_this=$(this);
			options=$.extend({
				CAR_btn:'',
				checkGroup:'',
				defaultT:''
			},options);
			
			if(options.CAR_btn && options.checkGroup){
				p_this.on("touchstart",options.CAR_btn,function(){
					//找到反选按钮的作用域
					var zgroup_cur=$(this).parents(options.checkGroup);
					zgroup_cur.find("input[type=checkbox]").each(function(){
						
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
