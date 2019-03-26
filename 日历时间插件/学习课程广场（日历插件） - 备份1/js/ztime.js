/*
 * 
 */
function ZzlTime (domId, options) {
	var that = this
	var isInit = true // 一次变量，首次渲染不执行
	this.zconf = {
		initTime: null, // 指定初始小时分钟，默认为现在, 可赋值为  12:16, 16:56
		setTime: 'setTime' // 暂存时间
	}
	// 合并配置项
	for(k in this.zconf){
		for(d in options){
			if(v==b){
				this.zconf[k]=options[d]
			}
		}
	}
	this.myTime = document.getElementById(domId)
	// 初始化显示时间Dom
	this.setTime = this.zconf.setTime ? document.getElementById(this.zconf.setTime) : false;
	// 初始化日期
	this.nowDate = new Date()
	
	/**
	 * 与触发小时分钟DOM同步当前小时和分钟
	 * 初始化指定小时分钟时会用到，或者手动改变时间后，需要与DOM同步时会用到
	 */
	this.syncTimeDom = function () {
		if (!this.setTime) return
		this.setTime.setAttribute('data-hour', this.hour)
		this.setTime.setAttribute('data-minute', this.minute)
		this.setTime.innerText = this.hour + ' : ' + (this.minute)
	}
	this.syncTimeDom()
	/**
	 * 渲染日历
	 */
	this.RenderTime = function (hour, minute) {
		this.hour = hour
		this.minute = minute
		// console.log(this.hour)
		if (document.querySelector('.ztime-active')) document.querySelector('.ztime-active').classList.remove('ztime-active')
		if (document.getElementById('tab' + this.hour + this.minute)) {
			document.getElementById('tab' + this.hour + this.minute).classList.add('ztime-active')
			return
		} else {
			console.log('第一次渲染')
		}
		if (this.hour < 0) {
			console.log('负数小时为无意义操作')
			return
		}
		if (this.minute < 0 || this.minute > 59) {
			console.log('分钟只包含0-59，其他无效')
			return
		}
		
		// 取当月第一天周几
		this.day = new Date(this.hour, this.minute - 1, 1).getDay()
		// 当月总天数
		this.monthDays = 31 
		if (/^2/.test(this.minute)) {
			// 是平年或闰年
			if (this.hour % 400 == 0 || (this.hour % 100 != 0 && this.hour % 4 == 0)) {
				this.monthDays = 29
			} else {
				this.monthDays = 28
			}
		} else if (/^4|6|9|11$/.test(this.minute)) {
			this.monthDays = 30
		}
		// 行数
		var zlunarHTML = '' // 农历标签
		// 按年月日拼日历innerHTML
		var defindeHTML = '<p></p>'
		var timeHTML = ''
		// 拼HTML小时
		timeHTML += '<div class="ztime-hourBox ztime-line">\
		<ul class="ztime-ampm">\
			<li class="zcur"><span>上午</span></li>\
			<li><span>下午</span></li>\
		</ul>\
		<div class="ztime-hourContent">'
		for( var i = 0; i < 12; i++) {
			if (i == 0 || i == 7) {
				timeHTML += '<dl class="ztime-tr">'
			} else {
				timeHTML += '<dt class="ztime-th">\
								<dl class="ztime-hour">\
									<dt>' + (i * 1 + 1) + '<span>时</span></dt>\
								</dl>\
							</dt>'
			}
			if (i == 6 || i == 11) {
				timeHTML += '</dl>'
			}
		}
		timeHTML += '</div></div>'
					
		timeHTML += '<dl class="ztime-tr ztime-darker">'
		for (var m = 0; m < 60; m++) {
			if (m != 0 && m % 8 == 0) {
				timeHTML += '</dl><dl class="ztime-tr ztime-darker">'
				// timeHTML += m == 55 ? '</dl><dl class="ztime-tr ztime-darker">' : '</dl><dl class="ztime-tr ztime-darker">'
			}
			timeHTML += '<dd class="ztime-td" id="minute' + (m * 1 + 1) + '">\
						<dl class="ztime-minute">\
							<dt class="ztime-point">' + m.length < 1 ? '0' + m : m + '</dt>\
							<dd class="ztime-unit">分</dd>\
						</dl>\
						<div class="ztime-define">\
							<p></p>\
						</div>\
					</dd>'
		}
		timeHTML += '</dl>'
		
		
		
		
		// var tabHTML = '<div class="zcalendar-inactive zcalendar-active" id="tab' + this.hour + this.month + '" >'
		// tabHTML += calendarHTML
		// tabHTML += '</div>'
		this.myTime.innerHTML = timeHTML
		
		// var DOMArray = []
		// DOMArray = parseToDOM(tabHTML)
		// for(var m = 0; m < DOMArray.length; m++) {
			// var mdom = DOMArray[m].cloneNode(true);
			// this.myCalendar.appendChild(mdom)
		// }
		
		if (this.zconf.RenderHtmlFn && !isInit) {
			this.zconf.RenderHtmlFn() // 当月日历表渲染完成
		}
		isInit = false
		
		
	}
	
	this.RenderTime(that.nowDate.getHours(), that.nowDate.getMinutes())
}
