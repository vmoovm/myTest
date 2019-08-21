// localStorage.removeItem('configDefaultLimit')
	// localStorage.removeItem('configData')
	// localStorage.removeItem('curType')
	// localStorage.removeItem('moTuoConfig')
var moTuoConfig = {}
var currentModule = 'moTuoModule1' // 当前操作的模块
var currentClass = '' // 当前操作的样式名
var currentCssText = '' // 当前生成的样式
var currentConfig = {
		configIdArr: configDefaultIdArr.slice(),
		configData: JSON.parse(JSON.stringify(configDefaultData)),
		configLimit: JSON.parse(JSON.stringify(configDefaultLimit)),
		cssText: ''
	}
var configIdArr = configDefaultIdArr.slice()
var configData = JSON.parse(JSON.stringify(configDefaultData))
var configLimit = JSON.parse(JSON.stringify(configDefaultLimit))
var flag = '默认配置'
// 测试当前模块与当前class
function test () {
	var test = $("#test")
	test.html(test.html() + '<h1>当前模块:' + currentModule + ' 当前class:' + currentClass + '</h1>')
	test.scrollTop('1000000')
}
test()
/**
 * 将配置项同步到配置界面
 */
function configToPage () {
	for(i in configData){
		var type = configData[i].type
		switch(type) {
			case 'text':
				if (configData[i].value) {
					$(configData[i].id).val(configData[i].value)
				} else {
					$(configData[i].id).val('')
				}
				break
			
			case 'hidden':
				if (configData[i].value) {
					var brVal = configData[i].value.split(' ')
					$('#dataBorderRadiusLT').val(brVal[0])
					$('#dataBorderRadiusRT').val(brVal[1])
					$('#dataBorderRadiusRB').val(brVal[2])
					$('#dataBorderRadiusLB').val(brVal[3])
				} else {
					$('#dataBorderRadiusLT').val('')
					$('#dataBorderRadiusRT').val('')
					$('#dataBorderRadiusRB').val('')
					$('#dataBorderRadiusLB').val('')
				}
				$(configData[i].id).val(configData[i].value)
				break
				
			case 'checkbox':
				if (configData[i].value) {
					$(configData[i].id).prop('checked', true)
				} else {
					$(configData[i].id).prop('checked', false)
				}
				break
				
			case 'radio':
				if (configData[i].value) {
					$(configData[i].id).prop('checked', true)
				} else {
					$(configData[i].id).prop('checked', false)
				}
				break
				
			case 'select':
				if (configData[i].value) $(configData[i].id).val(configData[i].value)
				break
				
			case 'class':
				if (configData[i].value) {
					$(configData[i].id).val(configData[i].value)
				} else {
					$(configData[i].id).val('')
				}
				console.log($(configData[i].id).attr('id'), $(configData[i].id).val())
				break
		}
	}
}

/**
 * 将界面值生成配置项，覆盖默认配置
 */
function pageToConfig () {
	for (i in configData) {
		var type = configData[i].type
		switch(type) {
			case 'text':
				if ($(configData[i].id).val()) {
					configData[i].value = $(configData[i].id).val()
				} else {
					configData[i].value = ''
				}
				console.log(configData[i].id, configData[i].value)
				break
			case 'hidden':
				configData[i].value = $('#dataBorderRadiusLT').val() + ' ' + $('#dataBorderRadiusRT').val() + ' ' + $('#dataBorderRadiusRB').val() + ' ' + $('#dataBorderRadiusLB').val()
				break
				
			case 'checkbox':
				configData[i].value = $(configData[i].id).prop('checked')
				break
				
			case 'radio':
				configData[i].value = $(configData[i].id).prop('checked')
				break
				
			case 'select':
				if ($(configData[i].id).val()) configData[i].value = $(configData[i].id).val()
				break
				
			case 'class':
				if ($(configData[i].id).val()) {
					configData[i].value = $(configData[i].id).val()
				} else {
					configData[i].value = ''
				}
				break
		}
	}
}

/**
 * 将样式追加到页面
 */
function cssTextToPage () {
	var cssText = ''
	for(m in moTuoConfig) {
		for(t in moTuoConfig[m]) {
			cssText += moTuoConfig[m][t].cssText
		}
	}
	$('#style').text(cssText)
}

/**
 * 将界面值生成配置对象
 */
function pageToCss () {
	var st = getStyle(configIdArr)
	$(configData.cssText.id).text(st)
	$(configData.cssText.id).val(st)
    var className = $(configData.styleName.id).val()
    if (className == '') {
    	alert('样式名不能为空！')
    	return
    }
    var temp = ''
    if (className && $(configData.cssText.id).val()) {
    	temp ='#' + currentModule + ' ' + $(configData.prefix.id).val() + ' ' + className + '{' + $(configData.cssText.id).val() + '}\n'
    }
    // 清浮动
    if (configData['dataClearFloat'].id == '#dataClearFloat' && $('#dataClearFloat').data('allow') == 'yes') {
    	temp += '#' + currentModule + ' ' + $(configData.prefix.id).val() + ' ' + className + ':after{display: block; content:""; clear:both}'
    }
    
	currentCssText = temp
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
						// if (arr[i] == configData['dataClearFloat'].id) break // 清除浮动选项不可写样式，故返回下一个循环
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
// var configData = {}
/**
 * 将生效样式权限配置映射到界面
 */
function initPage (c) {
	currentClass = c.substring(1, )
	var getConfig = localStorage.getItem('moTuoConfig')
	if (getConfig) {
		moTuoConfig = JSON.parse(getConfig)
		// console.log(moTuoConfig, currentModule, currentClass)
		if (!moTuoConfig || !moTuoConfig[currentModule] || !moTuoConfig[currentModule][currentClass]) {
			configData = JSON.parse(JSON.stringify(configDefaultData)),
			configLimit = JSON.parse(JSON.stringify(configDefaultLimit))
			console.log(configLimit, configDefaultLimit)
			flag = '默认配置'
			// return
		} else {
			configData = moTuoConfig[currentModule][currentClass]['configData']
			configLimit = moTuoConfig[currentModule][currentClass]['configLimit']
			flag = '用户配置'
		}
	}
	configData['styleName'].value = c
	console.log(!moTuoConfig[currentModule] || !moTuoConfig[currentModule][currentClass])
	console.log(moTuoConfig)
	console.log(flag)
	console.log(configLimit)
	test()
	// console.log(flag)
	// console.log(configLimit)
	for (s in configLimit) {
		if (configLimit[s].dataAllow == 'yes') {
			console.log(configLimit[s].id + '--------------')
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
	test()
	configToPage()
	pageToCss()
	test()
}

/*
 * 将界面权限保存配置权限
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
 * 保存
 */
function save () {
	test()
	pageToCss()
	pageToConfig()
	saveConfigLimit ()
	// currentModule = 'moTuoModule1' // 当前操作的模块
	// currentClass = '' // 当前操作的样式名
	currentConfig = {
		configIdArr: configIdArr,
		configData: configData,
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
	console.log('确保只执行一次')
	// render(tagArr)
}


// 保存并生成所有选项卡配置
$("#zsetting-ok").on('click', function() {
	save()
	cssTextToPage()
})

// 删除本地存储
$('#zsetting-clear').on('click', function () {
	if (confirm('清除该模块' + currentModule + '中元素' + currentClass + '的样式,清除不可恢复。\n确定清除吗？')) {
		delete moTuoConfig[currentModule][currentClass]
		localStorage.removeItem('moTuoConfig')
		localStorage.setItem('moTuoConfig', JSON.stringify(moTuoConfig))
		render(tagArr)
	}
})
/**
 * 还原为初始化样式状态
 * @param {Object} moduleId:要初始化模块的Id
 */
function restore (moduleId) {
	var getConfig = localStorage.getItem('moTuoConfig')
	if (!getConfig) return
		moTuoConfig = JSON.parse(getConfig)
		
	if (confirm('清除该模块' + currentModule + '的样式，清除不可恢复，\n确定清除吗？')) {
		delete moTuoConfig[moduleId]
		localStorage.removeItem('moTuoConfig')
		localStorage.setItem('moTuoConfig', JSON.stringify(moTuoConfig))
		render(tagArr)
	}
}


$("#zsetting-close").on('click', function () {
	$("#zsetting").hide()
})

/*----------------------------------------------------------*/
$("#view").on('mouseenter', '.moTuoModule', function () {
	currentModule = $(this).attr('id')
	$('#view .moTuoModule-setting').addClass('zsetting-hide')
	$(this).children('.moTuoModule-setting').removeClass('zsetting-hide')
})

$('#view').on('mouseenter', '.moTuoModule-cName', function () {
	currentModule = $(this).data('module')
	$('#' + currentModule + ' ' + $(this).text()).addClass('moTuoModule-settiingHover')
})
$('#view').on('mouseleave', '.moTuoModule-cName', function () {
	$($(this).text()).removeClass('moTuoModule-settiingHover')
})

$('#view').on('click', '.moTuoModule-cName', function () {
	currentModule = $(this).data('module')
	$('.moTuoModule-settingSelected').removeClass('moTuoModule-settingSelected')
	$('#' + currentModule + ' ' + $(this).text()).addClass('moTuoModule-settingSelected')
	$("#styleName").val($(this).text())
	console.log($("#styleName").val())
	$("#zsetting").show()
	currentClass = $(this).text().substring(1, )
	initPage($(this).text())
})

// 
// $('#view .moTuoModule-settingElements').children().each(function () {
	// $(this).on('mouseenter', function () {
		// currentModule = $(this).data('module')
		// $('#' + currentModule + ' ' + $(this).text()).addClass('moTuoModule-settiingHover')
	// }).on('mouseleave', function () {
		// $($(this).text()).removeClass('moTuoModule-settiingHover')
	// })
	// $(this).on('click', function () {
		// currentModule = $(this).data('module')
		// $('.moTuoModule-settingSelected').removeClass('moTuoModule-settingSelected')
		// $('#' + currentModule + ' ' + $(this).text()).addClass('moTuoModule-settingSelected')
		// $("#styleName").val($(this).text())
		// console.log($("#styleName").val())
		// $("#zsetting").show()
		// currentClass = $(this).text().substring(1, )
		// initPage($(this).text())
	// })
// })


$("#view").on('click', '.moTuoModule-settingRestore', function () {
	restore($(this).data('module'))
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

function render (arr) {
	for (w in arr) {
		for(c in arr[w]) {
			initPage(arr[w][c])
		}
	}
	cssTextToPage()
}

// 取该样式名下所有子标签
function getChildren(mId, cn) {
	var tags = []
	$('#' + mId +' ' + cn).children(':not(.moTuoModule-setting)').find('*').each(function () {
		tags.push($(this).prop("tagName"))
	})
	tags = newArray(tags)
	return tags
}


// <div class="moTuoModule-settingElements">\
							// <span data-module="moTuoModule1">.wyx</span>
							// <span data-module="moTuoModule1">.changGui</span>
							// <span data-module="moTuoModule1">.sub</span>
							// <span data-module="moTuoModule1">.changGui-sub</span>
						// </div>\


var getCTags = {}
var tagArr = {}
var getMIdTags = {}
$('#view .moTuoModule').each(function () {
	var moduleId = $(this).attr('id') 
	var getClasses = getTags(moduleId)
	tagArr[moduleId] = getClasses
	var getMIdArr = []
	for(var t = 0; t < getClasses.length; t++) {
		getMIdArr.push(getChildren(moduleId, getClasses[t]))
	}
	getMIdTags[moduleId] = getMIdArr
})
console.log(getMIdTags)
// console.log(tagArr)
if (tagArr) {
	var handleHtmlA = ''
	var handleHtmlB = ''
	var handleHtmlC = '</div>\
					</div>\
				</div>'
	console.log(tagArr)
	for (m in tagArr) {
		handleHtmlB = ''
		for (c in tagArr[m]) {
			handleHtmlB += '<span class="moTuoModule-cName" data-module="' + m + '">' + tagArr[m][c] + '</span>'
		}
		var handleHtmlA = '<div class="moTuoModule-setting">\
					<div class="moTuoModule-settingBox">\
						<div class="moTuoModule-settingFn">\
							<p class="moTuoModule-settingRestore" data-module="' + m + '">还原</p>\
							<p class="moTuoModule-settingEdit">编辑</p>\
							<p class="moTuoModule-settingDelete">删除</p>\
						</div>\
						<h1 class="moTuoModule-settingTitle">要修改的元素</h1>\
						<div class="moTuoModule-settingElements">'
		$('#' + m).append(handleHtmlA + handleHtmlB + handleHtmlC)
	}
	
	
	render(tagArr)
}


/**
 * 存在的bug:
 * 
 * 2.一旦使用了父级权限，会导致所有样式编辑失效，原因是会默认全部加固定名称的父级权限，其他模块并不一定有这个固定的名称
 * 3.暂时只能修改有class名的样式，不能直接修改标签的样式
 * 4.偶尔出现界面参数保留上次编辑状态
 * 5.动态生成要编辑的标签
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


/**
 * 评价:
 * 体验不友好,专业化,不适合大众操作,可视化比较差,不知道编辑的是哪个元素,编辑的元素
 */



