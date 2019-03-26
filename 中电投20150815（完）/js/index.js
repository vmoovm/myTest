$(function(){
	//搜索
	$('#zh_search').defaultInput({
		color:'#333',
		gray:'#b3b7ba',
		text:'请输入搜索信息'
	});
	//banner轮播图
	$('#postion').fullScreenSwitch({
		isNum:true,
		pointOff:'btn_off',
		pointOn:'btn_on',
		pointHtml:'a',
		btn_l_h:'',
		btn_r_h:'',
		isBtn:true,
		showBtn:false,
		isPoint:true,
		isAuto:true,
		isfull:true,
		speed:3000,
		minW:1200,
		LorR:1
	});
	
	//新闻图片切换
	Qfast.add('widgets', { path: "js/terminator2.2.min.js", type: "js", requires: ['fx'] });  
	Qfast(false, 'widgets', function () {
		K.tabs({
			id: 'fsD1',   //焦点图包裹id  
			conId: "D1pic1",  //** 大图域包裹id  
			tabId:"D1fBt",  
			tabTn:"a",
			conCn: '.fcon', //** 大图域配置class       
			auto: 1,   //自动播放 1或0
			effect: 'fade',   //效果配置
			eType: 'click', //** 鼠标事件
			pageBt:true,//是否有按钮切换页码
			bns: ['.prev', '.next'],//** 前后按钮配置class                          
			interval: 3000  //** 停顿时间  
		}) 
	})
	//最新公告
	$("#zopen").carousel({
			//isPagination: false,	// 是否有底部按钮
			isButton: true,		// 是否有左右按钮组
			isLoop: true,			// 是否循环
			isHideBtn: false,		// 是否 hover button
			isSlow: false,			// 是否缓慢移动
			direction: true,		// 正方向为向上滚动，向左滚动
			directionXY: false,		// 默认滚动X轴
			interval: 3000			// 间隔时间
			//speed: 700,				// 如果为缓慢滚动此为滚动 1px 间歇时间 否则为滚动一屏的时间
			//curClass: "cur",		// 底部按钮默认选中的class
		});
	//新闻
	$('#zne_tab').tab({
		myevent:'mouseover',  //默认为单击click事件，可修改 
		contentCss:'.zne_list',	//可切换内容标签样式，必填项
		titleOff:'zne_def',	//默认为空，提示标题常规状态样式，可选项
		titleOn:'zne_cur',	//默认为空，提示标题当前选中状态样式，可选项
		btn:'li',  //默认为li标签,做为点击按钮，可修改
		animteCss:'fadeInUp'
	});
	//集团业务
	$('#zib_b_tab').tab({
		myevent:'mouseover',
		contentCss:'.zib_b_content',
		titleOff:'zib_b_def',
		titleOn:'zib_b_cur',
		animteCss:'fadeInUp'
	});
	//动态信息
	$('#zdy_s_title').tab({
		myevent:'mouseover', 
		contentCss:'.zdy_s_box',
		titleOff:'',
		titleOn:'zdy_s_cur',
		active:true,
		animteCss:'fadeInUp'
	});
	$('#zdy_b_title').tab({
		myevent:'mouseover', 
		contentCss:'.zdy_b_list',
		titleOff:'',
		titleOn:'zdy_b_cur',
		active:true,
		animteCss:'fadeInUp'
	});

	
	//投资者关系
	$('#zib_r_tab').tab({
		myevent:'mouseover', 
		contentCss:'.zib_r_space',
		titleOff:'zib_r_def',
		titleOn:'zib_r_cur',
		animteCss:'fadeInUp'
	});
	
	
	//友情链接
	$('#selectdd').imiSelect({
		sub_ul:'ul',	//默认下拉框父标签为‘ul’,可修改为其他标签
		sub_li:'li',	//默认下拉框子标签为‘li’，可修改为其他标签
		myevent:'click',	//默认事件为‘click’，可修改
		selected:1,	//默认选中下拉菜单第一项，可修改为1,2,3... ;若为last,选中最后一项
		speed:100,	//默认100,下拉和收起速度，可修改
		clickIsHide:true,	//默认为true，点击后下拉框是否消失
		parent_css:'.zselect' //默认项，如果所有样式名都有修改，此样式名必须重传，解决下拉框层级问题
	});
	
	$('#selectdd2').imiSelect({
		selected:1	//默认选中下拉菜单第一项，可修改为1,2,3... ;若为last,选中最后一项
	});
	$('#selectdd3').imiSelect({
		selected:1	//默认选中下拉菜单第一项，可修改为1,2,3... ;若为last,选中最后一项
	});
	$('#selectdd4').imiSelect({
		selected:1	//默认选中下拉菜单第一项，可修改为1,2,3... ;若为last,选中最后一项
	});
	$('#selectdd5').imiSelect({
		selected:1	//默认选中下拉菜单第一项，可修改为1,2,3... ;若为last,选中最后一项
	});
	
});

























