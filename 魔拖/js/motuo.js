// localStorage.removeItem('configLimit')
	// localStorage.removeItem('key')
	// localStorage.removeItem('curType')

/**
 * 将配置项同步到配置界面
 */
function updatePage () {
	// console.log(config)
	for(i in config){
		var type = config[i].type
		switch(type) {
			case 'text':
				// console.log($(config[i].id), config[i].value)
				if (config[i].value) $(config[i].id).val(config[i].value)
				// console.log(config[i].id +  '---' +config[i].value)
				break
			
			case 'hidden':
				if (config[i].value) {
					var brVal = config[i].value.split(' ')
					$('#dataBorderRadiusLT').val(brVal[0])
					$('#dataBorderRadiusRT').val(brVal[1])
					$('#dataBorderRadiusRB').val(brVal[2])
					$('#dataBorderRadiusLB').val(brVal[3])
				}
				$(config[i].id).val(config[i].value)
				break
				
			case 'checkbox':
				if (config[i].value) {
					$(config[i].id).prop('checked', true)
				} else {
					$(config[i].id).prop('checked', false)
				}
				break
				
			case 'radio':
				if (config[i].value) {
					$(config[i].id).prop('checked', true)
				} else {
					$(config[i].id).prop('checked', false)
				}
				break
				
			case 'select':
				if (config[i].value) $(config[i].id).val(config[i].value)
				break
				
			case 'class':
				if (config[i].value) $(config[i].id).val(config[i].value)
				break
		}
	}
}

/**
 * 将配置界面值生成配置项，覆盖默认配置
 */
function TakeConfig () {
	for (i in config) {
		var type = config[i].type
		switch(type) {
			case 'text':
				if ($(config[i].id).val()) config[i].value = $(config[i].id).val()
				break
			case 'hidden':
				config[i].value = $('#dataBorderRadiusLT').val() + ' ' + $('#dataBorderRadiusRT').val() + ' ' + $('#dataBorderRadiusRB').val() + ' ' + $('#dataBorderRadiusLB').val()
				break
				
			case 'checkbox':
				config[i].value = $(config[i].id).prop('checked')
				break
				
			case 'radio':
				config[i].value = $(config[i].id).prop('checked')
				break
				
			case 'select':
				if ($(config[i].id).val()) config[i].value = $(config[i].id).val()
				break
				
			case 'class':
				if ($(config[i].id).val()) config[i].value = $(config[i].id).val()
				break
		}
	}
}

/**
 * 将界面值生成配置对象
 */
function updateConfig () {
	var st = getStyle(configIdArr)
	$(config.cssText.id).text(st)
	$(config.cssText.id).val(st)
    var className = $(config.styleName.id).val()
    var rex = /^[.#]/
    if (!className.match(rex) && $(config.prefix.id).val() == '') {
    	alert('样式名为标签时，父级权限不能为空！')
    	return
    }
    if (className == '') {
    	alert('样式名不能为空！')
    	return
    }
    
    var temp = $(config.prefix.id).val() + ' ' + className + '{' + $(config.cssText.id).val() + '}\n'
	$('#style').text(temp)
}


/*
 * 保存生效权限配置
 */
function saveConfigLimit () {
	for (s in configLimit) {
		if ($(configLimit[s].id).prop('checked')) {
			configLimit[s].dataAllow = 'yes'
		} else {
			configLimit[s].dataAllow = 'no'
		}
	}
}

/**
 * 将界面当前值生成样式表
 * @param {Object} arr
 */
function getStyle (arr) {
	var strCss = ''
	for (var i = 0; i < arr.length; i++) {
		switch($(arr[i]).attr('type')) {
			case 'text':
				// if (curType == 1 && $('#dataPostionStatic').prop('checked')) break
				if ($(arr[i]).data('allow') == 'yes' || $($(arr[i]).data('group')).data('allow') == 'yes') {
					strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				}
				break
			case 'hidden':
				if ($(arr[i]).data('allow') == 'yes') {
					strCss += $(arr[i]).data('css') + $('#dataBorderRadiusLT').val() + ' ' + $('#dataBorderRadiusRT').val() + ' ' + $('#dataBorderRadiusRB').val() + ' ' + $('#dataBorderRadiusLB').val() + ';\n'
				}
				break
			case 'checkbox':
				if ($(arr[i]).prop('checked')) {
					if ($(arr[i]).data('allow') == 'yes' || $($(arr[i]).data('group')).data('allow') == 'yes') {
						strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
					}
				}
				break
			case 'radio':
				if ($(arr[i]).prop('checked')) {
					if ($($(arr[i]).data('group')).data('allow') == 'yes') {
						strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
					} else {
						// strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
					}
				}
				break
			default: // select类型
				if ($(arr[i]).data('allow') == 'yes' || $($(arr[i]).data('group')).data('allow') == 'yes') {
					strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				}
				break
		}
	}
	return strCss
}

/**
 * 将生效样式权限配置映射到界面
 */
function powerToPage () {
	var getConfigLimit = localStorage.getItem('configLimit')
	if (getConfigLimit) {
		configLimit = JSON.parse(getConfigLimit)
	}
	for (s in configLimit) {
		if (configLimit[s].dataAllow == 'yes') {
			$(configLimit[s].id).data('allow', 'yes')
			$(configLimit[s].id).prop('checked', true)
			if (configLimit[s].type == 'single') {
				$($(configLimit[s].id).data('single')).prop('checked', true)		
			} else if (configLimit[s].type == 'group') {
				$($(configLimit[s].id).data('group')).prop('checked', true)		
			} else if (configLimit[s].type == 'hidden') {
				console.log('第三种情况')
			}
		} else {
			$(configLimit[s].id).data('allow', 'no')
			$(configLimit[s].id).prop('checked', false)
			if (configLimit[s].type == 'single') {
				$($(configLimit[s].id).data('single')).prop('checked', false)		
			} else if (configLimit[s].type == 'group') {
				$($(configLimit[s].id).data('group')).prop('checked', false)		
			} else if (configLimit[s].type == 'hidden') {
				console.log('第三种情况')
			}
		}
	}
}

/**
 * 初始化配置界面
 */
function initPage () {
	var a = localStorage.getItem('key')
	if (a) {
		config = JSON.parse(a)
	}
	updatePage()
	updateConfig()
}

powerToPage()
initPage()

/**
 * tab切换
 */
var curType = 0 
/**
 * 初始化选项卡保存后的状态
 */
function setTabCard () {
	$(".zsetting-tabContent").addClass('zsetting-hide')
	curType = localStorage.getItem('curType') ? localStorage.getItem('curType') : 0 
	$('#zsettingTab li').eq(curType).addClass('cur').siblings().removeClass('cur')
	$(".zsetting-tabContent").eq(curType).removeClass('zsetting-hide')
	
}
setTabCard ()
$('#zsettingTab').on('click', 'li', function () {
	$(this).addClass('cur').siblings().removeClass('cur')
	$(".zsetting-tabContent").eq(curType).addClass('zsetting-hide')
	curType = $(this).index()
	$(".zsetting-tabContent").eq(curType).removeClass('zsetting-hide')
})

/**
 * 监控是否允许该样式生效(绿点与是否允许该样式生效绑定，实时生效)
 */
$('#zsetting-body').on('change', '.isSetting-js', function () {
	var SetEle = $($(this).data('set'))
	if ($(this).attr('id') && $(this).attr('id').split('-')[0] == 'group') {
		SetEle = $(this)
	}
	if ($(this).is(':checked')) {
		SetEle.data('allow', 'yes') 
		SetEle.prop('checked', true) 
	} else {
		SetEle.data('allow', 'no')
		SetEle.prop('checked', false) 
	}
})

$("#position-style").on('change', 'input[type="radio"]', function () {
	if ($(this).attr('id') != 'dataPostionStatic') {
		$('#positionBox').show()
	} else {
		$('#positionBox').hide()
	}
})



/**
 * 生效当前选项卡样式
 */

// 保存并生成所有选项卡配置
$("#zsetting-ok").on('click', function() {
	updateConfig()
	TakeConfig()
	saveConfigLimit ()
	
	localStorage.removeItem('configLimit')
	localStorage.removeItem('key')
	localStorage.removeItem('curType')
	localStorage.setItem('configLimit', JSON.stringify(configLimit))
	localStorage.setItem('key', JSON.stringify(config))
	localStorage.setItem('curType', curType)
})

// 删除本地存储
$('#zsetting-clear').on('click', function () {
	if (confirm()) {
		localStorage.removeItem('configLimit')
		localStorage.removeItem('key')
		localStorage.removeItem('curType')
		// runConfig()
		// updateConfig()
		// updatePage()
		// TakeConfig()
		// saveConfigLimit ()
		powerToPage()
initPage()
	}
})


/**
 * 存在的bug:
 * 1.布局选项卡中的定位还没有完整实现，top right bottom left
 * 2.如何选定要设置的目录元素设置样式（解决方案：没有）
 * 3.暂时只能修改有class名的样式，不能直接修改标签的样式
 * 
 */
//运行流程:
// 读取默认配置项->将配置项映射到界面->将界面配置生成样式表->追加到指定元素



/**
 * 支持多次重复修改:
 * 每个模块必须有一个不重名的id,可以使用userId
 * 将userId作为该模块的配置名称,类型：数组
 * 每个class样式名一套默认配置
 * 
 * 
 * 
 * 
 * 
 */