/**
 * 拖动盒子
 * @param {Object} dragId
 * @param {Object} options
 */
function DragBox (dragId, options) {
	var that = this
	this.dragBox = dragId
	// 默认配置项
	this.options = {
		dragging: null,  // 拖动元素时回调函数
		dragStart: null,  // 开始拖动元素时回调函数
		dragEnd: null  // 结束拖动元素时回调函数
	}
	// 合并配置项
	if (options) {
		for (s in options) {
			this.options[s] = options[s]
		}
	}
	//
	this.eventing = false // 是否正在拖动中（鼠标按下后是否弹起）
	// 以下为拖动事件***********************************************
	this.startX = 0 // 开始坐标x
	this.startY = 0 // 开始坐标y
	this.endX = 0 // 结束坐标x
	this.endY = 0 // 结束坐标y
	this.oLeft = null // 该元素在页面位置offsetLeft
	this.oTop =  null // 该元素在页面位置offsetTop
	/**
	 * 鼠标按下事件
	 * @param {Object} e
	 */
	this._down_hander = function (e) {
		e.preventDefault()
		that.eventing = true
		that.dragBox.addEventListener('touchmove', that._move_hander, false)
		that.dragBox.addEventListener('touchend', that._up_hander, false)
		that.startX = e.targetTouches[0].pageX
		that.startY = e.targetTouches[0].pageY
		that.endX = e.targetTouches[0].pageX
		that.endY = e.targetTouches[0].pageY
		that.oLeft = that.dragBox.offsetLeft
		that.oTop = that.dragBox.offsetTop
		// 触发开始拖动回调
		if (that.options.dragStart) {
			// 返回值
			var obj = {
				evt: e,  // event / e
				startX: that.startX,
				startY: that.startY,
				endX: that.endX,  // 滑动后当前坐标x
				endY: that.endY,  // 滑动后当前坐标y
				moveX: that.endX - that.startX,  // x移动的长度
				moveY: that.endX - that.startY,  // y移动的长度
				siteX: that.startX - that.oLeft,  // x坐标距该元素left边缘的长度
				siteY: that.startY - that.oTop,  // y坐标距该元素top边缘的长度
				that: that, // 本对象
				self: that.dragBox  // 当前移动的元素
			}
			that.options.dragStart(obj)
		}
	}
	
	/**
	 * 鼠标移动事件
	 * @param {Object} e
	 */
	this._move_hander = function (e) {
		if (!that.eventing) return 
		that.dragBox.removeEventListener('touchstart', that._down_hander)
		// that.dragBox.addEventListener('touchend', that._up_hander, false)
		if (window.innerWidth - 5 == e.clientX || window.innerHeight - 5  == e.clientY || 5 >= e.clientX || 5 >= e.clientY) {
			that.dragBox.removeEventListener('touchmove', that._move_hander)
			that.dragBox.addEventListener('touchstart', that._down_hander, false)
		}
		// that.dragBox.style.top = ty + my + 'px'
		that.endX = e.targetTouches[0].pageX
		that.endY = e.targetTouches[0].pageY		
		// 返回值
		var obj = {
			evt: e,  // event / e
			startX: that.startX,
			startY: that.startY,
			endX: that.endX,  // 滑动后当前坐标x
			endY: that.endY,  // 滑动后当前坐标y
			moveX: that.endX - that.startX,  // x移动的长度
			moveY: that.endY - that.startY,  // y移动的长度
			siteX: that.endX - that.oLeft,  // x坐标距该元素left边缘的长度
			siteY: that.endY - that.oTop,  // y坐标距该元素top边缘的长度
			that: that, // 本对象
			self: that.dragBox  // 当前移动的元素
		}
		// 触发移动回调
		if (that.options.dragging) that.options.dragging(obj)
	}
	
	/**
	 * 鼠标弹起事件
	 * @param {Object} e
	 */
	this._up_hander = function (e) {
		// if (!that.eventing) return
		// 返回值
		var obj = {
			evt: e,  // event / e
			startX: that.startX,
			startY: that.startY,
			endX: that.endX,  // 滑动后当前坐标x
			endY: that.endY,  // 滑动后当前坐标y
			moveX: that.endX - that.startX,  // x移动的长度
			moveY: that.endX - that.startY,  // y移动的长度
			siteX: that.endX - that.dragBox.offsetLeft,  // x坐标距该元素left边缘的长度
			siteY: that.endY - that.dragBox.offsetTop,  // y坐标距该元素top边缘的长度
			that: that, // 本对象
			self: that.dragBox  // 当前移动的元素
			
		}
		// 触发结束回调
		if (that.options.dragEnd) that.options.dragEnd(obj)
		that.eventing = false
		that.dragBox.removeEventListener('touchmove', that._move_hander)
		that.dragBox.removeEventListener('touchend', that._up_hander)
		that.dragBox.addEventListener('touchstart', that._down_hander, false)
	}

	// 绑定拖拽
	this.dragBox.addEventListener('touchstart', that._down_hander, false)
	
	// 消毁对象时为彻底消毁事件，不消毁事件会造成同一元素绑定多次事件
	this.destroy = function () {
		this.dragBox.removeEventListener('touchstart', that._down_hander, false)
	}
}



/**
 * 拖拽排序
 * @param {Object} box 父级dom对象，单
 * @param {Object} Elements 移动dom对象，一组dom对象
 */
function DragSort(box, callBack) {
	var _this = this
	this.fn = callBack
	this.sort = []
	/**
	 * 更新坐标
	 * @param {Object} domArr
	 */
	function updateSite(domArr) {
		var arr = []
		for (var r = 0; r < domArr.length; r++) {
			// domArr[r].setAttribute('left', domArr[r].offsetLeft)
			// domArr[r].setAttribute('top', domArr[r].offsetTop)
			arr.push({
				dom: domArr[r],
				w: domArr[r].clientWidth,
				h: domArr[r].clientHeight,
				x: domArr[r].offsetLeft,
				y: domArr[r].offsetTop
			})
		}
		return arr
	}
	
	/**
	 * 匹配坐标
	 * @param {Object} domArr
	 * @param {Object} mx
	 * @param {Object} my
	 */
	function matchSite(siteArr, o) {
		var obj = {
			obj: null,
			ori: null,
		}
		for (var d = 0; d < siteArr.length; d++) {
			if (siteArr[d].dom != o.self && (siteArr[d].x + siteArr[d].w) > o.endX && siteArr[d].x < o.endX && (siteArr[d].y + siteArr[d].h) > o.endY && siteArr[d].y < o.endY) {
				if ((siteArr[d].x + siteArr[d].w/2) > o.endX) {
					obj = {
						obj: siteArr[d],
						ori: 'left',
					}
				} else if ((siteArr[d].x) <= o.endX) {
					obj = {
						obj: siteArr[d],
						ori: 'right',
					}	
				}
				
				return obj
			}
		}
		return false
	}
	
	/**
	 * insert
	 * @param {Object} newChild
	 * @param {Object} refChild
	 */
	function insertAfter(newChild,refChild) {
		var parElem=refChild.parentNode;
		if(parElem.lastChild==refChild){
			refChild.appendChild(newChild);
		} else {
			parElem.insertBefore(newChild,refChild.nextSibling);
		}
	}
	
	/**
	 * 移除克隆dom
	 * @param {Object} cls
	 */
	function removeDom (cls) {
		var dms = document.querySelectorAll('.' + cls)
		for (var c = 0; c < dms.length; c++) {
			dms[c].remove()
		}
	}
	
	/**
	 * 彻底消毁拖放事件
	 */
	this.destroy = function () {
		for(var d = 0; d < this.historyDom.length; d++) {
			this.historyDom[d].destroy()
			this.historyDom[d] = null
			
		}
		this.historyDom = []
	}
	
	this.box = box
	this.elementsDom = this.box.querySelectorAll('.dragSort-js')
	this.historyDom = []
	
	// 执行排序拖放主程序
	this.main = function () {
		this.boxSiteArr = updateSite(this.elementsDom)
		this.virDom = null
		this.currentObj = null
		for(var d = 0; d < this.elementsDom.length; d++) {
			var dom = new DragBox(this.elementsDom[d], {
				// 拖动事件进行中触发
				dragging: function (o) {
					removeDom('current')
					_this.currentObj = matchSite(_this.boxSiteArr, o)
					if (_this.currentObj) {
						if (_this.currentObj.ori == 'right') {
							insertAfter(_this.virDom,_this.currentObj.obj.dom)
						} else if (_this.currentObj.ori == 'left') {
							_this.box.insertBefore(_this.virDom, _this.currentObj.obj.dom)
						}
					} else {
						_this.currentObj = null
					}
					o.self.style.left = o.endX - (o.startX - o.that.oLeft) + 'px'
					o.self.style.top = o.endY - (o.startY - o.that.oTop) + 'px'
					
				},
				// 拖动事件开始时触发
				dragStart: function(o) {
					_this.virDom = o.self.cloneNode(true)
					_this.virDom.style.opacity = .4
					insertAfter(_this.virDom,o.self)
					document.getElementsByTagName('body')[0].appendChild(o.self)
					o.self.style.cssText = 'margin:0; position:absolute; z-index:999;'
					o.self.style.left = o.startX - (o.startX - o.that.oLeft) + 'px'
					o.self.style.top = o.startY - (o.startY - o.that.oTop) + 'px'
					
				},
				// 拖动事件结束时触发
				dragEnd: function(o) {
					_this.sort = []
					if (_this.currentObj) {
						if (_this.currentObj.ori == 'right') {
							insertAfter(o.self, _this.currentObj.obj.dom)
						} else if (_this.currentObj.ori == 'left') {
							_this.box.insertBefore(o.self, _this.currentObj.obj.dom)
						}
						var edoms = _this.box.querySelectorAll('.dragSort-js')
						for (var s = 0; s < edoms.length; s++) {
							_this.sort.push(edoms[s].getAttribute('sid'))
						}
					} else {
						_this.box.insertBefore(o.self, _this.virDom)
					}
					if (_this.fn) {
						_this.fn(_this.sort)
					}
					_this.virDom.remove()
					o.self.removeAttribute('style')
					_this.boxSiteArr = updateSite(_this.elementsDom)
					
				}
			})
			this.historyDom.push(dom)
		}
	}
	this.main()
	
	/**
	 * 动态增加新移动元素时会用到更新
	 * @param {Object} box 父级dom对象，单
	 * @param {Object} Elements 移动dom对象，一组dom对象
	 */
	this.upDate = function (Elements) {
		this.elementsDom = this.box.querySelectorAll('.dragSort-js')
		this.destroy()
		this.main()
	}
}
