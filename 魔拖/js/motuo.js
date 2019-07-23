// 可配置项所有Id
var configIdArr = {
	routine: [ // 常规
		'#dataWidth',
		'#dataHeight',
		'#dataPaddingTop',
		'#dataPaddingRight',
		'#dataPaddingBottom',
		'#dataPaddingLeft',
		'#dataMarginTop',
		'#dataMarginRight',
		'#dataMarginBottom',
		'#dataMarginLeft'
	],
	layout: [ // 布局
		'#dataFloatLeft',
    	'#dataFloatRight',
    	'#dataPostionStatic',
    	'#dataPostionRelative',
    	'#dataPostionAbsolute',
    	'#dataPostionFixed',
    	'#dataTop',
    	'#dataRight',
    	'#dataBottom',
    	'#dataLeft'
	],
	text: [ // 文本
		'#dataFontSize',
    	'#dataColor',
    	'#dataTextAlign',
    	'#dataVerticalAlign',
    	'#dataFontWeight',
    	'#dataFontStyle'
	],
	bg: [ // 背景
		'#dataBackgroundImage',
    	'#dataBackgroundColor',
    	'#dataBackgroundNoRepeat',
    	'#dataBackgroundRepeatXY',
    	'#dataBackgroundRepeatX',
    	'#dataBackgroundRepeatY',
    	'#dataBackgroundPosition'
	],
	decorate: [ // 装饰
    	'#dataBorderTop',
    	'#dataBorderRight',
    	'#dataBorderBottom',
    	'#dataBorderLeft',
    	'#dataBorderColor',
    	'#dataBorderStyle',
    	'#dataBorderRadius',
    	'#dataBox-shadow'
    ]
}

/**
 * 默认配置
 * id: 该元素的id
 * dataCss: 样式属性
 * dataAllow: 是否允许该样式生效，yes：允许生效，no:不允许生效，null：不应该限制
 * type: 该属性是什么类型
 * postil: 该元素的标注
 * 
 */

var config = {
	// 常规 
	dataWidth: {
		id: '#dataWidth',
		value: '100px',
		dataCss: 'width:',
		dataAllow: 'yes',
		type: 'text',
		postil: '宽'
	},
	dataHeight: {
		id: '#dataHeight',
		value: '120px',
		dataCss: 'height:',
		dataAllow: 'yes',
		type: 'text',
		postil: '高'
	},
	dataPaddingTop: {
		id: '#dataPaddingTop',
		value: '12px',
		dataCss: 'paddingTop:',
		dataAllow: 'yes',
		type: 'text',
		postil: '内边距上'
	},
	dataPaddingRight: {
		id: '#dataPaddingRight',
		value: '14px',
		dataCss: 'paddingRight:',
		dataAllow: 'yes',
		type: 'text',
		postil: '内边距右'
	},
	dataPaddingBottom: {
		id: '#dataPaddingBottom',
		value: '14px',
		dataCss: 'paddingBottom:',
		dataAllow: 'yes',
		type: 'text',
		postil: '内边距下'
	},
	dataPaddingLeft: {
		id: '#dataPaddingLeft',
		value: '10px',
		dataCss: 'paddingLeft:',
		dataAllow: 'yes',
		type: 'text',
		postil: '内边距左'
	},
	dataMarginTop: {
		id: '#dataMarginTop',
		value: '10px',
		dataCss: 'marginTop:',
		dataAllow: 'yes',
		type: 'text',
		postil: '外边距上'
	},
	dataMarginRight: {
		id: '#dataMarginRight',
		value: '0px',
		dataCss: 'marginRight:',
		dataAllow: 'yes',
		type: 'text',
		postil: '外边距右'
	},
	dataMarginBottom: {
		id: '#dataMarginBottom',
		value: '0px',
		dataCss: 'marginBottom:',
		dataAllow: 'yes',
		type: 'text',
		postil: '外边距下'
	},
	dataMarginLeft: {
		id: '#dataMarginLeft',
		value: '5px',
		dataCss: 'dataMarginLeft:',
		dataAllow: 'yes',
		type: 'text',
		postil: '外边距左'
	},
	prefix0: {
		id: '#prefix0',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '父级权限',
	},
	styleName0: {
		id: '#styleName0',
		value: 'changGui',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '样式名',
	},
	cssText0: {
		id: '#cssText0',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '生成的样式',
	},
	
	// 布局 
	dataFloatLeft: {
		id: '#dataFloatLeft',
		value: false,
		dataCss: 'float:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '浮动左'
	},
	dataFloatRight: {
		id: '#dataFloatRight',
		value: true,
		dataCss: 'float:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '浮动右'
	},
	dataPostionStatic: {
		id: '#dataPostionStatic',
		value: false,
		dataCss: 'position:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '静态定位'
	},
	dataPostionRelative: {
		id: '#dataPostionRelative',
		value: true,
		dataCss: 'position:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '相对定位'
	},
	dataPostionAbsolute: {
		id: '#dataPostionAbsolute',
		value: false,
		dataCss: 'position:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '绝对定位'
	},
	dataPostionFixed: {
		id: '#dataPostionFixed',
		value: false,
		dataCss: 'position:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '悬浮定位'
	},
	dataTop: {
		id: '#dataTop',
		value: '12px',
		dataCss: 'top:',
		dataAllow: 'yes',
		type: 'text',
		postil: '定位上',
	},
	dataRight: {
		id: '#dataRight',
		value: '14px',
		dataCss: 'right:',
		dataAllow: 'yes',
		type: 'text',
		postil: '定位右',
	},
	dataBottom: {
		id: '#dataBottom',
		value: '4px',
		dataCss: 'bottom:',
		dataAllow: 'yes',
		type: 'text',
		postil: '定位下',
	},
	dataLeft: {
		id: '#dataLeft',
		value: '10px',
		dataCss: 'left:',
		dataAllow: 'yes',
		type: 'text',
		postil: '定位左',
	},
	prefix1: {
		id: '#prefix1',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '父级权限'
	},
	styleName1: {
		id: '#styleName1',
		value: 'buJu',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '样式名'
	},
	cssText1: {
		id: '#cssText1',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '生成的样式',
	},
	
	// 文本
	dataFontSize: {
		id: '#dataFontSize',
		value: '',
		dataCss: 'font-size:',
		type: 'text',
		postil: '字号'
	},
	dataColor: {
		id: '#dataColor',
		value: '',
		dataCss: 'color:',
		dataAllow: 'yes',
		type: 'text',
		postil: '字颜色'
	},
	dataTextAlign: {
		id: '#dataTextAlign',
		value: 'center',
		dataCss: 'text-align:',
		dataAllow: 'yes',
		type: 'select',
		postil: '水平对齐方式'
	},
	dataVerticalAlign: {
		id: '#dataVerticalAlign',
		value: 'middle',
		dataCss: 'vertical-align:',
		dataAllow: 'yes',
		type: 'select',
		postil: '垂直对齐方式'
	},
	dataFontWeight: {
		id: '#dataFontWeight',
		value: true,
		dataCss: 'font-weight:',
		dataAllow: 'yes',
		type: 'checkbox',
		postil: '格式加粗'
	},
	dataFontStyle: {
		id: '#dataFontStyle',
		value: true,
		dataCss: 'font-style:',
		dataAllow: 'yes',
		type: 'checkbox',
		postil: '格式斜体'
	},
	prefix2: {
		id: '#prefix2',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '父级权限'
	},
	styleName2: {
		id: '#styleName2',
		value: 'wenBen',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '样式名'
	},
	cssText2: {
		id: '#cssText2',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'class',
		postil: '生成的样式'
	},
	// 背景
	dataBackgroundImage: {
		id: '#dataBackgroundImage',
		value: '',
		dataCss: 'background-image:',
		dataAllow: 'yes',
		type: 'text',
		postil: '背景图片',
	},
	dataBackgroundColor: {
		id: '#dataBackgroundColor',
		value: '#fafafa',
		dataCss: 'background-color:',
		dataAllow: 'yes',
		type: 'text',
		postil: '背景颜色',
	},
	dataBackgroundNoRepeat: {
		id: '#dataBackgroundNoRepeat',
		value: true,
		dataCss: 'background-repeat:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '背景不平铺',
	},
	dataBackgroundRepeatXY: {
		id: '#dataBackgroundRepeatXY',
		value: true,
		dataCss: 'background-repeat:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '背景平铺XY轴',
	},
	dataBackgroundRepeatX: {
		id: '#dataBackgroundRepeatX',
		value: false,
		dataCss: 'background-repeat:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '背景平铺X轴',
	},
	dataBackgroundRepeatY: {
		id: '#dataBackgroundRepeatY',
		value: false,
		dataCss: 'background-repeat:',
		dataAllow: 'yes',
		type: 'radio',
		postil: '背景平铺Y轴',
	},
	dataBackgroundPosition: {
		id: '#dataBackgroundPosition',
		value: '10px 10px',
		dataCss: 'background-position:',
		dataAllow: 'yes',
		type: 'text',
		postil: '背景图片的位置坐标',
	},
	prefix3: {
		id: '#prefix3',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'text',
		postil: '父级样式名',
	},
	styleName3: {
		id: '#styleName3',
		value: 'bg',
		dataCss: '',
		dataAllow: null,
		type: 'text',
		postil: '样式名',
	},
	cssText3: {
		id: '#cssText3',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'text',
		postil: '最终样式',
	},
	
	// 装饰
	dataBorderTop: {
		id: '#dataBorderTop',
		value: '1px',
		dataCss: 'border-top:',
		dataAllow: 'yes',
		type: 'text',
		postil: '上边框',
	},
	dataBorderRight: {
		id: '#dataBorderRight',
		value: '1px',
		dataCss: 'border-right:',
		dataAllow: 'yes',
		type: 'text',
		postil: '右边框',
	},
	dataBorderBottom: {
		id: '#dataBorderBottom',
		value: '1px',
		dataCss: 'border-bottom:',
		dataAllow: 'yes',
		type: 'text',
		postil: '下边框',
	},
	dataBorderLeft: {
		id: '#dataBorderLeft',
		value: '1px',
		dataCss: 'border-left:',
		dataAllow: 'yes',
		type: 'text',
		postil: '左边框',
	},
	dataBorderColor: {
		id: '#dataBorderColor',
		value: '#0ff',
		dataCss: 'border-color:',
		dataAllow: 'yes',
		type: 'text',
		postil: '边框线颜色'
	},
	dataBorderStyle: {
		id: '#dataBorderStyle',
		value: 'solid',
		dataCss: 'border-style:',
		dataAllow: 'yes',
		type: 'text',
		postil: '边框线类型'
	},
	dataBorderRadius: {
		id: '#dataBorderRadius',
		value: '0 0 0 5px',
		dataCss: 'border-radius:',
		dataAllow: 'yes',
		type: 'hidden',
		postil: '角弧度'
	},
	prefix4: {
		id: '#prefix4',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'text',
		postil: '父级样式名',
	},
	styleName4: {
		id: '#styleName4',
		value: 'bg',
		dataCss: '',
		dataAllow: null,
		type: 'text',
		postil: '样式名',
	},
	cssText4: {
		id: '#cssText4',
		value: '',
		dataCss: '',
		dataAllow: null,
		type: 'text',
		postil: '最终样式',
	},
	// dataBorderTop: {
		// id: '#',
		// value: '1',
		// dataCss: 'border-top:',
		// type: 'text',
		// postil: '上边框',
	// }
}

/**
 * 样式生效状态权限配置
 */
var configLimit = {
	// 常规 
	dataWidth: {
		id: '#dataWidth',
		dataAllow: 'yes',
		type: 'single',
		postil: '宽'
	},
	dataHeight: {
		id: '#dataHeight',
		dataAllow: 'yes',
		type: 'single',
		postil: '高'
	},
	dataPaddingTop: {
		id: '#dataPaddingTop',
		dataAllow: 'yes',
		type: 'single',
		postil: '内边距上'
	},
	dataPaddingRight: {
		id: '#dataPaddingRight',
		dataAllow: 'yes',
		type: 'single',
		postil: '内边距右'
	},
	dataPaddingBottom: {
		id: '#dataPaddingBottom',
		dataAllow: 'yes',
		type: 'single',
		postil: '内边距下'
	},
	dataPaddingLeft: {
		id: '#dataPaddingLeft',
		dataAllow: 'yes',
		type: 'single',
		postil: '内边距左'
	},
	dataMarginTop: {
		id: '#dataMarginTop',
		dataAllow: 'yes',
		type: 'single',
		postil: '外边距上'
	},
	dataMarginRight: {
		id: '#dataMarginRight',
		dataAllow: 'yes',
		type: 'single',
		postil: '外边距右'
	},
	dataMarginBottom: {
		id: '#dataMarginBottom',
		dataAllow: 'yes',
		type: 'single',
		postil: '外边距下'
	},
	dataMarginLeft: {
		id: '#dataMarginLeft',
		dataAllow: 'yes',
		type: 'single',
		postil: '外边距左'
	},
	
	// 布局 
	groupFloat: {
		id: '#group-float',
		dataAllow: 'yes',
		type: 'group',
		postil: '浮动'
	},
	groupPosition: {
		id: '#group-position',
		dataAllow: 'yes',
		type: 'group',
		postil: '定位'
	},
	
	// 文本
	dataFontSize: {
		id: '#dataFontSize',
		dataAllow: 'yes',
		type: 'single',
		postil: '字号'
	},
	dataColor: {
		id: '#dataColor',
		dataAllow: 'yes',
		type: 'single',
		postil: '字颜色'
	},
	dataTextAlign: {
		id: '#dataTextAlign',
		dataAllow: 'yes',
		type: 'single',
		postil: '水平对齐方式'
	},
	dataVerticalAlign: {
		id: '#dataVerticalAlign',
		dataAllow: 'yes',
		type: 'single',
		postil: '垂直对齐方式'
	},
	groupLayout: {
		id: '#group-layout',
		dataAllow: 'yes',
		type: 'group',
		postil: '格式'
	},
	
	// 背景
	dataBackgroundImage: {
		id: '#dataBackgroundImage',
		dataAllow: 'yes',
		type: 'single',
		postil: '背景图片',
	},
	dataBackgroundColor: {
		id: '#dataBackgroundColor',
		dataAllow: 'yes',
		type: 'single',
		postil: '背景颜色',
	},
	dataBackgroundPosition: {
		id: '#dataBackgroundPosition',
		dataAllow: 'yes',
		type: 'single',
		postil: '背景图片的位置坐标',
	},
	groupBgRepeat: {
		id: '#group-bgRepeat',
		dataAllow: 'yes',
		type: 'group',
		postil: '背景不平铺',
	},
	
	// 装饰
	dataBorderTop: {
		id: '#dataBorderTop',
		dataAllow: 'yes',
		type: 'text',
		postil: '上边框',
	},
	dataBorderRight: {
		id: '#dataBorderRight',
		dataAllow: 'yes',
		type: 'text',
		postil: '右边框',
	},
	dataBorderBottom: {
		id: '#dataBorderBottom',
		dataAllow: 'yes',
		type: 'text',
		postil: '下边框',
	},
	dataBorderLeft: {
		id: '#dataBorderLeft',
		dataAllow: 'yes',
		type: 'text',
		postil: '左边框',
	},
	dataBorderColor: {
		id: '#dataBorderColor',
		dataAllow: 'yes',
		type: 'text',
		postil: '边框线颜色'
	},
	dataBorderStyle: {
		id: '#dataBorderStyle',
		dataAllow: 'yes',
		type: 'text',
		postil: '边框线类型'
	},
	dataBorderRadius: {
		id: '#dataBorderRadius',
		dataAllow: 'yes',
		type: 'hidden',
		postil: '角弧度'
	}
}
// console.log(configLimit)
var b = localStorage.getItem('configLimit')
if (b) {
	configLimit = JSON.parse(b)
	console.log(configLimit)
}
for (s in configLimit) {
// for (var s = 0; s < configLimit.length; s++) {
	if (configLimit[s].dataAllow == 'yes') {
		$(configLimit[s].id).data('allow', 'yes')
		$(configLimit[s].id).prop('checked', true)
	} else {
		// console.log(configLimit[s].dataAllow)
		// console.log($(configLimit[s].id))
		// console.log($(configLimit[s].id).is(':checked'))
		$(configLimit[s].id).data('allow', 'no')
		$(configLimit[s].id).prop('checked', false)
	}
}

/**
 * 将配置项同步到配置界面
 */
function updatePage () {
	for(i in config){
		var type = config[i].type
		switch(type) {
			case 'text':
				if (config[i].value) $(config[i].id).val(config[i].value)
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
	// console.log(configIdArr)
	var d = 0
	for (k in configIdArr) {
		init(getStyle(configIdArr[k]), d)
		d++
	}
}
/*function updateConfig () {
	// console.log(configIdArr)
	var d = 0
	for (k in configIdArr) {
		init(getStyle(configIdArr[k]), d)
		d++
	}
	TakeEffect()
}*/

// $('#site').on('change', 'input', function () {
	// console.log(123)
	// if ($(this).attr('id') == 'dataPostionStatic' && $('#dataPostionStatic').prop('checked')) {
		// $('#positionBox').hide()
	// } else {
		// $('#positionBox').show()
	// }
// })
// $('#dataPostionStatic').change(function () {
	// console.log(123)
// })

/**
 * tab切换
 */
var curType = 0 
/**
 * 初始化选项卡保存后的状态
 */
function setTabCard () {
	$(".zsetting-box").addClass('zsetting-hide')
	curType = localStorage.getItem('curType') ? localStorage.getItem('curType') : 0 
	$('#zsettingTab li').eq(curType).addClass('cur').siblings().removeClass('cur')
	$(".zsetting-box").eq(curType).removeClass('zsetting-hide')
	
}
setTabCard ()
$('#zsettingTab').on('click', 'li', function () {
	$(this).addClass('cur').siblings().removeClass('cur')
	$(".zsetting-box").eq(curType).addClass('zsetting-hide')
	curType = $(this).index()
	$(".zsetting-box").eq(curType).removeClass('zsetting-hide')
})

/**
 * 监控是否允许该样式生效
 */
$('#zsetting-body').on('change', '.isSetting-js', function () {
	
	var SetEle = $($(this).data('set'))
	console.log($(this).data('set'))
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
	console.log($(this).is(':checked'))
	console.log(SetEle.data('allow'))
})


function saveConfigLimit () {
	for (s in configLimit) {
		console.log($(configLimit[s].id).prop('checked'))
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
				if (curType == 1 && $('#dataPostionStatic').prop('checked')) break
				if ($(arr[i]).data('allow') == 'yes') {
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
					if ($(arr[i]).data('allow') == 'yes') {
						strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
					}
				}
				break
			case 'radio':
				if ($(arr[i]).prop('checked')) {
					if ($('#' + $(arr[i]).data('group')).data('allow') == 'yes')
						strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
					} else {
						// strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
					}
				
					if ($(arr[i]).attr('id') != 'dataPostionStatic' && curType == 1) {
						$('#positionBox').show()
					} else {
						$('#positionBox').hide()
					}
				// }
				break
			default:
				if ($(arr[i]).data('allow') == 'yes') {
					strCss += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				}
				break
		}
	}
	return strCss
}

/**
 * 初始化配置界面
 * @param {Object} styleTxt
 */
function init (styleTxt, type) {
	var st = styleTxt
	$('#cssText' + type).text(st)
	$('#cssText' + type).val(st)
    var className = $('#styleName' + type).val()
    var temp = $('#prefix' + type).val() + '.' + className + '{' + $('#cssText' + type).val() + '}\n'
	$('#style' + type).text(temp)
	$('#test').addClass(className)
}

/**
 * 生效当前选项卡样式
 */
$('#zsetting-use').on('click', function () {
	$('#style' + curType).text('')
	switch(curType) {
		case 0: // 常规
			init(getStyle(configIdArr.routine), curType)
		    break
		    
		case 1: // 布局
		    init(getStyle(configIdArr.layout), curType)
		    break
		
		case 2: // 文本
		    init(getStyle(configIdArr.text), curType)
		    break
		
		case 3: // 背景
		    init(getStyle(configIdArr.bg), curType)
		    break
		
		case 4: // 修饰
		    init(getStyle(configIdArr.decorate), curType)
		    break
		    
	}
})

// 保存并生成所有选项卡配置
$("#zsetting-ok").on('click', function() {
	updateConfig()
	TakeConfig()
	saveConfigLimit ()
	
	localStorage.setItem('configLimit', JSON.stringify(configLimit))
	localStorage.setItem('key', JSON.stringify(config))
	localStorage.setItem('curType', curType)
})

// 删除本地存储
// window.localStorage.removeItem('key')

var a = localStorage.getItem('key')
var b = localStorage.getItem('configLimit')
if (a) {
	config = JSON.parse(a)
	updatePage()
	updateConfig()
}




/**
 * 存在的bug:
 * 1.仅能设置一个元素样式，多个样式会被后面的样式覆盖（解决方案：使用数组）
 * 2.如何选定要设置的目录元素设置样式（解决方案：没有）
 * 3.还不能通过筛选后的样式生效功能（解决方案：通过选中和未选中判断该属性是否生效）
 * 4.还不能将样式表保存到本地（解决方案：点击保存后，将生成的样式表保存到本地存储localStorage,sessionStorage）
 * 5.保存后的配置，在刷新后如何自动生效（默认读到本地配置，）
 * 6.还差保存记录每一项是否禁止生效样式状态******重要重要重要重要重要重要重要重要重要重要重要重要
 * 
 * 
 */




