// localStorage.removeItem('configLimit')
	// localStorage.removeItem('configDefault')
	// localStorage.removeItem('curType')
	// localStorage.removeItem('moTuoConfig')
var moTuoConfig = {}
var currentModule = 'moTuoModule1' // 当前操作的模块
var currentClass = '' // 当前操作的样式名
var currentCssText = '' // 当前生成的样式
var currentConfig = {
		configIdArr: configIdArr,
		configDefault: configDefault,
		configLimit: configLimit,
		cssText: ''
	}


/**
 * 将配置项同步到配置界面
 */
function updatePage () {
	for(i in configDefault){
		var type = configDefault[i].type
		switch(type) {
			case 'text':
				if (configDefault[i].value) $(configDefault[i].id).val(configDefault[i].value)
				break
			
			case 'hidden':
				if (configDefault[i].value) {
					var brVal = configDefault[i].value.split(' ')
					$('#dataBorderRadiusLT').val(brVal[0])
					$('#dataBorderRadiusRT').val(brVal[1])
					$('#dataBorderRadiusRB').val(brVal[2])
					$('#dataBorderRadiusLB').val(brVal[3])
				}
				$(configDefault[i].id).val(configDefault[i].value)
				break
				
			case 'checkbox':
				if (configDefault[i].value) {
					$(configDefault[i].id).prop('checked', true)
				} else {
					$(configDefault[i].id).prop('checked', false)
				}
				break
				
			case 'radio':
				if (configDefault[i].value) {
					$(configDefault[i].id).prop('checked', true)
				} else {
					$(configDefault[i].id).prop('checked', false)
				}
				break
				
			case 'select':
				if (configDefault[i].value) $(configDefault[i].id).val(configDefault[i].value)
				break
				
			case 'class':
				if (configDefault[i].value) $(configDefault[i].id).val(configDefault[i].value)
				break
		}
	}
}

/**
 * 将配置界面值生成配置项，覆盖默认配置
 */
function TakeConfig () {
	for (i in configDefault) {
		var type = configDefault[i].type
		switch(type) {
			case 'text':
				if ($(configDefault[i].id).val()) configDefault[i].value = $(configDefault[i].id).val()
				break
			case 'hidden':
				configDefault[i].value = $('#dataBorderRadiusLT').val() + ' ' + $('#dataBorderRadiusRT').val() + ' ' + $('#dataBorderRadiusRB').val() + ' ' + $('#dataBorderRadiusLB').val()
				break
				
			case 'checkbox':
				configDefault[i].value = $(configDefault[i].id).prop('checked')
				break
				
			case 'radio':
				configDefault[i].value = $(configDefault[i].id).prop('checked')
				break
				
			case 'select':
				if ($(configDefault[i].id).val()) configDefault[i].value = $(configDefault[i].id).val()
				break
				
			case 'class':
				if ($(configDefault[i].id).val()) configDefault[i].value = $(configDefault[i].id).val()
				break
		}
	}
}

/**
 * 将界面值生成配置对象
 */
function updateConfig () {
	var st = getStyle(configIdArr)
	$(configDefault.cssText.id).text(st)
	$(configDefault.cssText.id).val(st)
    var className = $(configDefault.styleName.id).val()
    var rex = /^[.#]/
    // if (!className.match(rex) && $(configDefault.prefix.id).val() == '') {
    	// alert('样式名为标签时，父级权限不能为空！')
    	// return
    // }
    if (className == '') {
    	alert('样式名不能为空！')
    	return
    }
    
    var temp ='#' + currentModule + ' ' + $(configDefault.prefix.id).val() + ' ' + className + '{' + $(configDefault.cssText.id).val() + '}\n'
    // 清浮动
    if (configDefault.prefix.id == 'dataClearFloat') {
    	temp += '#' + currentModule + ' ' + $(configDefault.prefix.id).val() + ' ' + className + '{clear:both}'
    }
	currentCssText = temp
	var cssText = ''
	console.log(moTuoConfig)
	for(m in moTuoConfig) {
		for(t in moTuoConfig[m]) {
			cssText += moTuoConfig[m][t].cssText
		}
	}
	$('#style').text(cssText)
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
var configDefault = {}
/**
 * 将生效样式权限配置映射到界面
 */
function initPage (c) {
	currentClass = c.substring(1, )
	var getConfig = localStorage.getItem('moTuoConfig')
	if (getConfig) {
		moTuoConfig = JSON.parse(getConfig)
		if (!moTuoConfig[currentModule][currentClass]) return
		configDefault = moTuoConfig[currentModule][currentClass]['configDefault']
		configLimit = moTuoConfig[currentModule][currentClass]['configLimit']
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
	updatePage()
	updateConfig()
}

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





// 保存并生成所有选项卡配置
$("#zsetting-ok").on('click', function() {
	updateConfig()
	TakeConfig()
	saveConfigLimit ()
	// currentModule = 'moTuoModule1' // 当前操作的模块
	// currentClass = '' // 当前操作的样式名
	currentConfig = {
		configIdArr: configIdArr,
		configDefault: configDefault,
		configLimit:configLimit,
		cssText: currentCssText
	}
	var getConfig = localStorage.getItem('moTuoConfig')
	if (getConfig) {
		moTuoConfig = JSON.parse(getConfig)
	}
	if (moTuoConfig[currentModule]) {
		console.log('已存在直接赋值')
		moTuoConfig[currentModule][currentClass] = currentConfig
	} else {
		console.log('不存在创建')
		moTuoConfig[currentModule] = {}
		moTuoConfig[currentModule][currentClass] = currentConfig
	}
	localStorage.setItem('moTuoConfig', JSON.stringify(moTuoConfig))
	localStorage.setItem('curType', curType)
	render(classArr)
})

// 删除本地存储
$('#zsetting-clear').on('click', function () {
	if (confirm()) {
		localStorage.removeItem('configLimit')
		localStorage.removeItem('configDefault')
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

$("#zsetting-close").on('click', function () {
	$("#zsetting").hide()
})

$(".moTuoModule-settingElements").on('click', function () {
	
})

/*----------------------------------------------------------*/
$("#view").on('mouseenter', '.moTuoModule', function () {
	currentModule = $(this).attr('id')
	$('#view .moTuoModule-setting').addClass('zsetting-hide')
	$(this).children('.moTuoModule-setting').removeClass('zsetting-hide')
})


$('#view .moTuoModule-settingElements').children().each(function () {
	$(this).on('mouseenter', function () {
		currentModule = $(this).data('module')
		$('#' + currentModule + ' ' + $(this).text()).addClass('moTuoModule-settiingHover')
	}).on('mouseleave', function () {
		$($(this).text()).removeClass('moTuoModule-settiingHover')
	})
	$(this).on('click', function () {
		currentModule = $(this).data('module')
		$('#' + currentModule + ' .moTuoModule-settingSelected').removeClass('moTuoModule-settingSelected')
		$('#' + currentModule + ' ' + $(this).text()).addClass('moTuoModule-settingSelected')
		$("#styleName").val($(this).text())
		$("#zsetting").show()
		currentClass = $(this).text().substring(1, )
		initPage ($(this).text())
	})
})

/**
 * 去重数组
 * @param {Object} arr
 */
function newArray (arr) {
	var newArr = []
	for (var r = 0; r < arr.length; r++) {
		if (newArr.indexOf(arr[r]) == -1) {
			newArr.push(arr[r])
		}
	}
	return newArr
}
function getTags (moduleId) {
	var tags = []
	tags.push('.' + $('#' + moduleId).children(':first').attr('class'))
	$('#' + moduleId).children(':not(.moTuoModule-setting)').find('*').each(function () {
		 tags.push('.' + $(this).attr('class'))
	})
	tags = newArray(tags)
	return tags
}
var tagArr = {}
$('#view .moTuoModule').each(function () {
	var moduleId = $(this).attr('id') 
	tagArr[moduleId] = getTags(moduleId)
})



var classArr = ['.wyx', '.changGui', '.sub', '.changGui-sub']
function render (arr) {
	for (w in arr) {
		for(c in arr[w]) {
			initPage(arr[w][c])
		}
	}
}
render(tagArr)

console.log(tagArr)
/**
 * 存在的bug:
 * 
 * 
 * 3.暂时只能修改有class名的样式，不能直接修改标签的样式
 * 4.缺少清除浮动
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
 */

/**
 * 规范：
 * 模块必须使用样式名加空格
 * 如： .module1 .ab { color:#fff;}
 * .module1 .cb { font-size:12px;}
 * 
 * 
 */
