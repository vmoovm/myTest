var config = {
	// 以下是常规 
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
	
	// 以下是布局 
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
	
	// 以下是文本
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
	// 以下是背景
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
	
	// 以下是修饰
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
for(i in config){
	var type = config[i].type
	
	switch(type) {
		case 'text':
			console.log('text')
			if (config[i].value) $(config[i].id).val(config[i].value)
			break
		case 'checkbox':
			console.log('checkbox')
			if (config[i].value) {
				$(config[i].id).prop('checked', true)
			} else {
				$(config[i].id).prop('checked', false)
			}
			break
		case 'radio':
			console.log('radio')
			if (config[i].value) {
				$(config[i].id).prop('checked', true)
			} else {
				$(config[i].id).prop('checked', false)
			}
			break
		case 'select':
			console.log('select')
			if (config[i].value) $(config[i].id).val(config[i].value)
			break
		case 'class':
			console.log('class')
			if (config[i].value) $(config[i].id).val(config[i].value)
			break
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
$('#dataPostionStatic').change(function () {
	console.log(123)
})


var curType = 0

$('#zsettingTab').on('click', 'li', function () {
	$(this).addClass('cur').siblings().removeClass('cur')
	$(".zsetting-box").eq(curType).addClass('zsetting-hide')
	curType = $(this).index()
	$(".zsetting-box").eq(curType).removeClass('zsetting-hide')
})


function getStyle (arr) {
	var str = ''
	for (var i = 0; i < arr.length; i++) {
		switch($(arr[i]).attr('type')) {
			case 'text':
				if (curType == 1 && $('#dataPostionStatic').prop('checked')) break
				str += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				break
			case 'checkbox':
				console.log('checkbox')
				if ($(arr[i]).prop('checked')) {
					str += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				}
				break
			case 'radio':
				console.log('radio')
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
				console.log('select')
				console.log($(arr[i]).val())
				str += $(arr[i]).data('css') + $(arr[i]).val() + ';\n'
				break
		}
	}
	return str
}


function init (styleTxt) {
	var st = styleTxt
	$('#cssText' + curType).text(st)
    var className = $('#styleName' + curType).val()
    var temp = $('#prefix' + curType).val() + '.' + className + '{' + $('#cssText' + curType).val() + '}\n'
	$('#style' + curType).text($('#style' + curType).text() + temp)
	$('#test').addClass(className)
}

$('#zsetting-use').on('click', function () {
	$('#style' + curType).text('')
	switch(curType) {
		case 0:
		    var idArr = [
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
		    	]
			init (getStyle(idArr))
		    break
		    
		case 1:
		    console.log(1)
		    var idArr = [
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
		    	]
		    init (getStyle(idArr))
		    break
		
		case 2:
		    console.log(2)
		    var idArr = [
		    	'#dataFontSize',
		    	'#dataColor',
		    	'#dataTextAlign',
		    	'#dataVerticalAlign',
		    	'#dataFontWeight',
		    	'#dataFontStyle'
		    	]
		    var styleTxt = getStyle(idArr)
		    $('#cssText' + curType).text(styleTxt)
		    var className = $('#styleName' + curType).val()
		    console.log(className)
		    var temp = $('#prefix' + curType).val() + '.' + className + '{' + $('#cssText' + curType).val() + '}\n'
			$('#style' + curType).text($('#style' + curType).text() + temp)
			$('#test').addClass(className)
		    break
		
		case 3:
		    console.log(3)
		    var idArr = [
		    	'#dataBackgroundImage',
		    	'#dataBackgroundColor',
		    	'#dataBackgroundRepeatXY',
		    	'#dataBackgroundRepeatX',
		    	'#dataBackgroundRepeatY',
		    	'#dataBackgroundPosition'
		    	
		    	]
		    init (getStyle(idArr))
		    break
		
		case 4:
		    console.log(4)
		    var idArr = [
		    	'#dataBorderTop',
		    	'#dataBorderRight',
		    	'#dataBorderBottom',
		    	'#dataBorderLeft',
		    	'#dataBorderColor',
		    	'#dataBorderStyle'
		    	]
		    init (getStyle(idArr))
		    break
	}
})