/**
 * 默认id及配置
 * 前端：张中乐
 * 更新时间：2019-7-25
 * 
 */


// 可配置项所有Id
var configDefaultIdArr = [
		// ------------------------------------------ 常规[routine]
		'#dataWidth',   // 宽
		'#dataHeight',  // 高
		'#dataPaddingTop',  // 内边距上
		'#dataPaddingRight',  // 内边距右
		'#dataPaddingBottom',  // 内边距下
		'#dataPaddingLeft',  // 内边距左
		'#dataMarginTop',  // 外边距上
		'#dataMarginRight',  // 外边距右
		'#dataMarginBottom',  // 外边距下
		'#dataMarginLeft',  // 外边距左
		// ------------------------------------------ 布局[layout]
		'#dataFloatLeft',  // 左浮动
    	'#dataFloatRight',  // 右浮动
    	'#dataPostionStatic',  // 静态页流布局
    	'#dataPostionRelative',  // 相对父级标签定位
    	'#dataPostionAbsolute',  // 绝对父级标签定位
    	'#dataPostionFixed',  // 绝对屏幕定位
    	'#dataTop',  // 下移（定位top）
    	'#dataRight',  // 左移（定位right）
    	'#dataBottom',  // 上移（定位bottom）
    	'#dataLeft',  // 右移（定位left）
		// ------------------------------------------ 文本[text]
		'#dataFontSize',  // 字号大小
    	'#dataColor',  // 字体颜色
    	'#dataLineHeight',  // 行高/行间距
    	'#dataTextAlign',  // 水平对齐方式
    	'#dataVerticalAlign',  // 垂直对齐方式
    	'#dataFontWeight',  // 字体加粗
    	'#dataFontStyle',  // 字体斜体
		// ------------------------------------------ 背景[bg]
		'#dataBackgroundImage',  // 背景图片
    	'#dataBackgroundColor',  // 背景颜色
    	'#dataBackgroundNoRepeat',  // 背景图片不平铺
    	'#dataBackgroundRepeatXY',  // 背景图片双向平铺
    	'#dataBackgroundRepeatX',  // 背景图片水平平铺
    	'#dataBackgroundRepeatY',  // 背景图片垂直平铺
    	'#dataBackgroundPosition',  // 背景图片坐标位置
		// ------------------------------------------ 装饰[decorate]
    	'#dataBorderTopWidth',  // 上边框粗细
    	'#dataBorderTopColor',  // 上边框颜色
    	'#dataBorderTopStyle',  // 上边框线条类型
    	'#dataBorderBottomWidth',  // 下边框框粗细
    	'#dataBorderBottomColor',  // 下边框颜色
    	'#dataBorderBottomStyle',  // 下边框线条类型
    	'#dataBorderLeftWidth',  // 左边框粗细
    	'#dataBorderLeftColor',  // 左边框颜色
    	'#dataBorderLeftStyle',  // 左边框线条类型
    	'#dataBorderRightWidth',  // 右边框粗细
    	'#dataBorderRightColor',  // 右边框颜色
    	'#dataBorderRightStyle',  // 右边框线条类型
    	'#dataBorderRadius',  // 圆角弧度
    	'#dataBox-shadow'  // 阴影
    ]
// }

/**
 * 默认值配置
 * id: 该元素的id
 * value: 默认值
 * dataCss: 样式属性
 * type: 该属性是什么类型
 * postil: 该元素的标注
 * 
 */
var configDefaultData = {
	// ------------------------------------------常规 
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
	// ------------------------------------------布局 
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
	dataClearFloat: {
		id: '#dataClearFloat',
		value: false,
		dataCss: 'clear:',
		type: 'checkbox',
		postil: '清浮动'
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
		postil: '下移'
	},
	dataRight: {
		id: '#dataRight',
		value: '14px',
		dataCss: 'right:',
		type: 'text',
		postil: '左移'
	},
	dataBottom: {
		id: '#dataBottom',
		value: '4px',
		dataCss: 'bottom:',
		type: 'text',
		postil: '上移'
	},
	dataLeft: {
		id: '#dataLeft',
		value: '10px',
		dataCss: 'left:',
		type: 'text',
		postil: '右移'
	},
	// ------------------------------------------文本
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
	dataLineHeight: {
		id: '#dataLineHeight',
		value: '',
		dataCss: 'line-height:',
		type: 'text',
		postil: '行高'
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
	// ------------------------------------------背景
	dataBackgroundImage: {
		id: '#dataBackgroundImage',
		value: '',
		dataCss: 'background-image:',
		type: 'text',
		postil: '背景图片'
	},
	dataBackgroundColor: {
		id: '#dataBackgroundColor',
		value: '#fafafa',
		dataCss: 'background-color:',
		type: 'text',
		postil: '背景颜色'
	},
	dataBackgroundNoRepeat: {
		id: '#dataBackgroundNoRepeat',
		value: true,
		dataCss: 'background-repeat:',
		type: 'radio',
		postil: '背景不平铺'
	},
	dataBackgroundRepeatXY: {
		id: '#dataBackgroundRepeatXY',
		value: true,
		dataCss: 'background-repeat:',
		type: 'radio',
		postil: '背景平铺XY轴'
	},
	dataBackgroundRepeatX: {
		id: '#dataBackgroundRepeatX',
		value: false,
		dataCss: 'background-repeat:',
		type: 'radio',
		postil: '背景平铺X轴'
	},
	dataBackgroundRepeatY: {
		id: '#dataBackgroundRepeatY',
		value: false,
		dataCss: 'background-repeat:',
		type: 'radio',
		postil: '背景平铺Y轴'
	},
	dataBackgroundPosition: {
		id: '#dataBackgroundPosition',
		value: '10px 10px',
		dataCss: 'background-position:',
		type: 'text',
		postil: '背景图片的位置坐标'
	},
	// ------------------------------------------装饰
	dataBorderTopWidth: {
		id: '#dataBorderTopWidth',
		value: '1px',
		dataCss: 'border-top-width:',
		type: 'text',
		postil: '上边框-粗细'
	},
	dataBorderTopColor: {
		id: '#dataBorderTopColor',
		value: '#ccc',
		dataCss: 'border-top-color:',
		type: 'text',
		postil: '上边框-颜色'
	},
	dataBorderTopStyle: {
		id: '#dataBorderTopStyle',
		value: 'solid',
		dataCss: 'border-top-style:',
		type: 'select',
		postil: '上边框-类型'
	},
	dataBorderBottomWidth: {
		id: '#dataBorderBottomWidth',
		value: '1px',
		dataCss: 'border-bottom-width:',
		type: 'text',
		postil: '下边框-粗细'
	},
	dataBorderBottomColor: {
		id: '#dataBorderBottomColor',
		value: '#ccc',
		dataCss: 'border-bottom-color:',
		type: 'text',
		postil: '下边框-颜色'
	},
	dataBorderBottomStyle: {
		id: '#dataBorderTopStyle',
		value: 'solid',
		dataCss: 'border-bottom-style:',
		type: 'select',
		postil: '下边框-类型'
	},
	dataBorderLeftWidth: {
		id: '#dataBorderLeftWidth',
		value: '1px',
		dataCss: 'border-left-width:',
		type: 'text',
		postil: '左边框-粗细'
	},
	dataBorderLeftColor: {
		id: '#dataBorderLeftColor',
		value: '#ccc',
		dataCss: 'border-left-color:',
		type: 'text',
		postil: '左边框-颜色'
	},
	dataBorderLeftStyle: {
		id: '#dataBorderLeftStyle',
		value: 'solid',
		dataCss: 'border-left-style:',
		type: 'select',
		postil: '左边框-类型'
	},
	dataBorderRightWidth: {
		id: '#dataBorderRightWidth',
		value: '1px',
		dataCss: 'border-right-width:',
		type: 'text',
		postil: '右边框-粗细'
	},
	dataBorderRightColor: {
		id: '#dataBorderRightColor',
		value: '#ccc',
		dataCss: 'border-right-color:',
		type: 'text',
		postil: '右边框-颜色'
	},
	dataBorderRightStyle: {
		id: '#dataBorderRightStyle',
		value: 'solid',
		dataCss: 'border-right-style:',
		type: 'select',
		postil: '右边框-类型'
	},
	dataBorderRadius: {
		id: '#dataBorderRadius',
		value: '0 0 0 5px',
		dataCss: 'border-radius:',
		type: 'hidden',
		postil: '角弧度'
	},
	prefix: {
		id: '#prefix',
		value: '',
		dataCss: '',
		type: 'class',
		postil: '父级权限'
	},
	styleName: {
		id: '#styleName',
		value: '.changGui',
		dataCss: '',
		type: 'class',
		postil: '样式名'
	},
	cssText: {
		id: '#cssText',
		value: '',
		dataCss: '',
		type: 'class',
		postil: '生成的样式'
	}
}

/**
 * 样式生效状态权限配置
 * id: 该元素的id
 * dataAllow: 是否允许该样式生效，yes：允许生效，no:不允许生效，null：不应该限制
 * type: single/group 一对一控制样式生效/一对多控制样式生效
 * postil: 该元素的标注
 * 
 */
var configDefaultLimit = {
	// ------------------------------------------常规 
	dataWidth: {
		id: '#dataWidth',
		dataAllow: 'no',
		type: 'single',
		postil: '宽'
	},
	dataHeight: {
		id: '#dataHeight',
		dataAllow: 'no',
		type: 'single',
		postil: '高'
	},
	dataPaddingTop: {
		id: '#dataPaddingTop',
		dataAllow: 'no',
		type: 'single',
		postil: '内边距上'
	},
	dataPaddingRight: {
		id: '#dataPaddingRight',
		dataAllow: 'no',
		type: 'single',
		postil: '内边距右'
	},
	dataPaddingBottom: {
		id: '#dataPaddingBottom',
		dataAllow: 'no',
		type: 'single',
		postil: '内边距下'
	},
	dataPaddingLeft: {
		id: '#dataPaddingLeft',
		dataAllow: 'no',
		type: 'single',
		postil: '内边距左'
	},
	dataMarginTop: {
		id: '#dataMarginTop',
		dataAllow: 'no',
		type: 'single',
		postil: '外边距上'
	},
	dataMarginRight: {
		id: '#dataMarginRight',
		dataAllow: 'no',
		type: 'single',
		postil: '外边距右'
	},
	dataMarginBottom: {
		id: '#dataMarginBottom',
		dataAllow: 'no',
		type: 'single',
		postil: '外边距下'
	},
	dataMarginLeft: {
		id: '#dataMarginLeft',
		dataAllow: 'no',
		type: 'single',
		postil: '外边距左'
	},
	
	// ------------------------------------------布局 
	groupFloat: {
		id: '#group-float',
		dataAllow: 'no',
		type: 'group',
		postil: '浮动方向'
	},
	dataClearFloat: {
		id: '#dataClearFloat',
		dataAllow: 'no',
		type: 'single',
		postil: '清浮动'
	},
	
	groupPosition: {
		id: '#group-position',
		dataAllow: 'no',
		type: 'group',
		postil: '定位'
	},
	groupPosition: {
		id: '#group-position',
		dataAllow: 'no',
		type: 'group',
		postil: '定位'
	},
	dataTop: {
		id: '#dataTop',
		dataAllow: 'no',
		type: 'single',
		postil: '下移'
	},
	dataRight: {
		id: '#dataRight',
		dataAllow: 'no',
		type: 'single',
		postil: '左移'
	},
	dataBottom: {
		id: '#dataBottom',
		dataAllow: 'no',
		type: 'single',
		postil: '上移'
	},
	dataLeft: {
		id: '#dataLeft',
		dataAllow: 'no',
		type: 'single',
		postil: '右移'
	},
	
	// ------------------------------------------文本
	dataFontSize: {
		id: '#dataFontSize',
		dataAllow: 'no',
		type: 'single',
		postil: '字号'
	},
	dataColor: {
		id: '#dataColor',
		dataAllow: 'no',
		type: 'single',
		postil: '字颜色'
	},
	dataLineHeight: {
		id: '#dataLineHeight',
		dataAllow: 'no',
		type: 'single',
		postil: '行高'
	},
	dataTextAlign: {
		id: '#dataTextAlign',
		dataAllow: 'no',
		type: 'single',
		postil: '水平对齐方式'
	},
	dataVerticalAlign: {
		id: '#dataVerticalAlign',
		dataAllow: 'no',
		type: 'single',
		postil: '垂直对齐方式'
	},
	groupLayout: {
		id: '#group-layout',
		dataAllow: 'no',
		type: 'group',
		postil: '格式'
	},
	
	// ------------------------------------------背景
	dataBackgroundImage: {
		id: '#dataBackgroundImage',
		dataAllow: 'no',
		type: 'single',
		postil: '背景图片',
	},
	dataBackgroundColor: {
		id: '#dataBackgroundColor',
		dataAllow: 'no',
		type: 'single',
		postil: '背景颜色',
	},
	dataBackgroundPosition: {
		id: '#dataBackgroundPosition',
		dataAllow: 'no',
		type: 'single',
		postil: '背景图片的位置坐标',
	},
	groupBgRepeat: {
		id: '#group-bgRepeat',
		dataAllow: 'no',
		type: 'group',
		postil: '背景不平铺',
	},
	
	// ------------------------------------------装饰
	groupBorderTop: {
		id: '#group-BorderTop',
		dataAllow: 'no',
		type: 'group',
		postil: '上边框',
	},
	groupBorderRight: {
		id: '#group-BorderRight',
		dataAllow: 'no',
		type: 'group',
		postil: '右边框',
	},
	groupBorderBottom: {
		id: '#group-BorderBottom',
		dataAllow: 'no',
		type: 'group',
		postil: '下边框',
	},
	groupBorderLeft: {
		id: '#group-BorderLeft',
		dataAllow: 'no',
		type: 'group',
		postil: '左边框',
	},
	dataBorderRadius: {
		id: '#dataBorderRadius',
		dataAllow: 'no',
		type: 'single',
		postil: '角弧度'
	},
	dataBoxShadow: {
		id: '#dataBoxShadow',
		dataAllow: 'no',
		type: 'single',
		postil: '边框线类型'
	}
}



/***************************************************************************
 * 全页模块配置 = {
 *   模块id配置: {
 * 	       该模块id中样式名称: {
 * 	    configIdArr: {},
		configData: {},
		configLimit: {},
		cssText: ''
 *   }
 * }
 * 
 * }
 * 
 */


// var moTuoConfig = {
	// moduleId1: {
		// className1: {
			// configIdArr: {},
			// configData: {},
			// configLimit: {},
			// cssText: ''
		// },
		// className2: {
			// configIdArr: {},
			// configData: {},
			// configLimit: {},
			// cssText: ''
		// }
	// },
	// moduleId2: {
		// className1: {
			// configIdArr: {},
			// configData: {},
			// configLimit: {},
			// cssText: ''
		// }
	// }
	// 
// }
