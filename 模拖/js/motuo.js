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
    	'#dataBorderStyle'
    ]
}

var config = {
	// 常规 
	dataWidth: {
		id: '#dataWidth',
		value: '100px',
		dataCss: 'width:',
		type: 'text',
		postil: '宽'
	},
	dataHeight: {
		id: '#dataHeight',
		value: '120px',
		dataCss: 'height:',
		type: 'text',
		postil: '高'
	},
	dataPaddingTop: {
		id: '#dataPaddingTop',
		value: '12px',
		dataCss: 'paddingTop:',
		type: 'text',
		postil: '内边距上'
	},
	dataPaddingRight: {
		id: '#dataPaddingRight',
		value: '14px',
		dataCss: 'paddingRight:',
		type: 'text',
		postil: '内边距右'
	},
	dataPaddingBottom: {
		id: '#dataPaddingBottom',
		value: '14px',
		dataCss: 'paddingBottom:',
		type: 'text',
		postil: '内边距下'
	},
	dataPaddingLeft: {
		id: '#dataPaddingLeft',
		value: '10px',
		dataCss: 'paddingLeft:',
		type: 'text',
		postil: '内边距左'
	},
	dataMarginTop: {
		id: '#dataMarginTop',
		value: '10px',
		dataCss: 'marginTop:',
		type: 'text',
		postil: '外边距上'
	},
	dataMarginRight: {
		id: '#dataMarginRight',
		value: '0px',
		dataCss: 'marginRight:',
		type: 'text',
		postil: '外边距右'
	},
	dataMarginBottom: {
		id: '#dataMarginBottom',
		value: '0px',
		dataCss: 'marginBottom:',
		type: 'text',
		postil: '外边距下'
	},
	dataMarginLeft: {
		id: '#dataMarginLeft',
		value: '5px',
		dataCss: 'dataMarginLeft:',
		type: 'text',
		postil: '外边距左'
	},
	prefix0: {
		id: '#prefix0',
		value: '',
		dataCss: '',
		type: 'class',
		postil: '父级权限',
	},
	styleName0: {
		id: '#styleName0',
		value: 'changGui',
		dataCss: '',
		type: 'class',
		postil: '样式名',
	},
	cssText0: {
		id: '#cssText0',
		value: '',
		dataCss: '',
		type: 'class',
		postil: '生成的样式',
	},
	
	// 布局 
	dataFloatLeft: {
		id: '#dataFloatLeft',
		value: false,
		dataCss: 'float:',
		type: 'radio',
		postil: '浮动左'
	},
	dataFloatRight: {
		id: '#dataFloatRight',
		value: true,
		dataCss: 'float:',
		type: 'radio',
		postil: '浮动右'
	},
	dataPostionStatic: {
		id: '#dataPostionStatic',
		value: false,
		dataCss: 'position:',
		type: 'radio',
		postil: '静态定位'
	},
	dataPostionRelative: {
		id: '#dataPostionRelative',
		value: true,
		dataCss: 'position:',
		type: 'radio',
		postil: '相对定位'
	},
	dataPostionAbsolute: {
		id: '#dataPostionAbsolute',
		value: false,
		dataCss: 'position:',
		type: 'radio',
		postil: '绝对定位'
	},
	dataPostionFixed: {
		id: '#dataPostionFixed',
		value: false,
		dataCss: 'position:',
		type: 'radio',
		postil: '悬浮定位'
	},
	dataTop: {
		id: '#dataTop',
		value: '12px',
		dataCss: 'top:',
		type: 'text',
		postil: '定位上',
	},
	dataRight: {
		id: '#dataRight',
		value: '14px',
		dataCss: 'right:',
		type: 'text',
		postil: '定位右',
	},
	dataBottom: {
		id: '#dataBottom',
		value: '4px',
		dataCss: 'bottom:',
		type: 'text',
		postil: '定位下',
	},
	dataLeft: {
		id: '#dataLeft',
		value: '10px',
		dataCss: 'left:',
		type: 'text',
		postil: '定位左',
	},
	prefix1: {
		id: '#prefix1',
		value: '',
		dataCss: '',
		type: 'class',
		postil: '父级权限'
	},
	styleName1: {
		id: '#styleName1',
		value: 'buJu',
		dataCss: '',
		type: 'class',
		postil: '样式名'
	},
	cssText1: {
		id: '#cssText1',
		value: '',
		dataCss: '',
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
		type: 'text',
		postil: '字颜色'
	},
	dataTextAlign: {
		id: '#dataTextAlign',
		value: 'center',
		dataCss: 'text-align:',
		type: 'select',
		postil: '水平对齐方式'
	},
	dataVerticalAlign: {
		id: '#dataVerticalAlign',
		value: 'middle',
		dataCss: 'vertical-align:',
		type: 'select',
		postil: '垂直对齐方式'
	},
	dataFontWeight: {
		id: '#dataFontWeight',
		value: true,
		dataCss: 'font-weight:',
		type: 'checkbox',
		postil: '格式加粗'
	},
	dataFontStyle: {
		id: '#dataFontStyle',
		value: true,
		dataCss: 'font-style:',
		type: 'checkbox',
		postil: '格式斜体'
	},
	prefix2: {
		id: '#prefix2',
		value: '',
		dataCss: '',
		type: 'class',
		postil: '父级权限'
	},
	styleName2: {
		id: '#styleName2',
		value: 'wenBen',
		dataCss: '',
		type: 'class',
		postil: '样式名'
	},
	cssText2: {
		id: '#cssText2',
		value: '',
		dataCss: '',
		type: 'class',
		postil: '生成的样式'
	},
	// 背景
	dataBackgroundImage: {
		id: '#dataBackgroundImage',
		value: '',
		dataCss: 'background-image:',
		type: 'text',
		postil: '背景图片',
	},
	dataBackgroundColor: {
		id: '#dataBackgroundColor',
		value: '#fafafa',
		dataCss: 'background-color:',
		type: 'text',
		postil: '背景颜色',
	},
	dataBackgroundRepeatXY: {
		id: '#dataBackgroundRepeatXY',
		value: true,
		dataCss: 'background-repeat:',
		type: 'radio',
		postil: '背景平铺XY轴',
	},
	dataBackgroundRepeatX: {
		id: '#dataBackgroundRepeatX',
		value: false,
		dataCss: 'background-repeat:',
		type: 'radio',
		postil: '背景平铺X轴',
	},
	dataBackgroundRepeatY: {
		id: '#dataBackgroundRepeatY',
		value: false,
		dataCss: 'background-repeat:',
		type: 'radio',
		postil: '背景平铺Y轴',
	},
	dataBackgroundPosition: {
		id: '#dataBackgroundPosition',
		value: '10px 10px',
		dataCss: 'background-position:',
		type: 'text',
		postil: '背景图片的位置坐标',
	},
	prefix3: {
		id: '#prefix3',
		value: '',
		dataCss: '',
		type: 'text',
		postil: '父级样式名',
	},
	styleName3: {
		id: '#styleName3',
		value: 'bg',
		dataCss: '',
		type: 'text',
		postil: '样式名',
	},
	cssText3: {
		id: '#cssText3',
		value: '',
		dataCss: '',
		type: 'text',
		postil: '最终样式',
	},
	
	// 装饰
	dataBorderTop: {
		id: '#dataBorderTop',
		value: '1px',
		dataCss: 'border-top:',
		type: 'text',
		postil: '上边框',
	},
	dataBorderRight: {
		id: '#dataBorderRight',
		value: '1px',
		dataCss: 'border-right:',
		type: 'text',
		postil: '右边框',
	},
	dataBorderBottom: {
		id: '#dataBorderBottom',
		value: '1px',
		dataCss: 'border-bottom:',
		type: 'text',
		postil: '下边框',
	},
	dataBorderLeft: {
		id: '#dataBorderLeft',
		value: '1px',
		dataCss: 'border-left:',
		type: 'text',
		postil: '左边框',
	},
	dataBorderColor: {
		id: '#dataBorderColor',
		value: '#0ff',
		dataCss: 'border-color:',
		type: 'text',
		postil: '边框线颜色',
	},
	dataBorderStyle: {
		id: '#dataBorderStyle',
		value: 'solid',
		dataCss: 'border-style:',
		type: 'text',
		postil: '边框线类型',
	}
	// dataBorderTop: {
		// id: '#',
		// value: '1',
		// dataCss: 'border-top:',
		// type: 'text',
		// postil: '上边框',
	// }
}

/**
 * 将配置同步到界面
 */
function updatePage () {
	for(i in config){
		var type = config[i].type
		switch(type) {
			case 'text':
				if (config[i].value) $(config[i].id).val(config[i].value)
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
 * 将界面值同步到配置
 */
function updateConfig () {
	// console.log(configIdArr)
	var d = 0
	for (k in configIdArr) {
		console.log(k,d)
		init(getStyle(configIdArr[k]), d)
		d++
		// console.log(configIdArr.text)
	}
	for (i in config) {
		var type = config[i].type
		switch(type) {
			case 'text':
				if ($(config[i].id).val()) config[i].value = $(config[i].id).val()
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


var curType = 0
/**
 * tab切换
 */
$('#zsettingTab').on('click', 'li', function () {
	$(this).addClass('cur').siblings().removeClass('cur')
	$(".zsetting-box").eq(curType).addClass('zsetting-hide')
	curType = $(this).index()
	$(".zsetting-box").eq(curType).removeClass('zsetting-hide')
})

/**
 * 将界面当前值生成样式表
 * @param {Object} arr
 */
function getStyle (arr) {
	console.log(arr)
	var str = ''
	for (var i = 0; i < arr.length; i++) {
		switch($(arr[i]).attr('type')) {
			case 'text':
				if (curType == 1 && $('#dataPostionStatic').prop('checked')) break
				str += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				break
			case 'checkbox':
				if ($(arr[i]).prop('checked')) {
					str += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				}
				break
			case 'radio':
				if ($(arr[i]).prop('checked')) {
					str += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
					if ($(arr[i]).attr('id') != 'dataPostionStatic' && curType == 1) {
						$('#positionBox').show()
					} else {
						$('#positionBox').hide()
					}
				}
				break
			default:
				str += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				break
		}
	}
	return str
}

/**
 * 初始化配置界面
 * @param {Object} styleTxt
 */
function init (styleTxt, type) {
	var st = styleTxt
	console.log(st)
	console.log(type)
	$('#cssText' + type).text(st)
	$('#cssText' + type).val(st)
    var className = $('#styleName' + type).val()
    var temp = $('#prefix' + type).val() + '.' + className + '{' + $('#cssText' + type).val() + '}\n'
	$('#style' + type).text($('#style' + type).text() + temp)
	$('#test').addClass(className)
}


/**
 * 开始生效
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

// 保存
$("#zsetting-ok").on('click', function() {
	updateConfig()
	console.log(6)
})

// localStorage.setItem('key', JSON.stringify(config))
			var a = localStorage.getItem('key')
			console.log(JSON.parse(a))