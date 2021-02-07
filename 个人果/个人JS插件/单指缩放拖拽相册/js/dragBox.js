
/**
 * 拖动盒子
 * @param {Object} dragId 非拖动元素，可理解为范围dom
 * @param {Object} options
 */
function DragBox (dragDom, options) {
	var that = this
	this.dragBox = dragDom
	// 默认配置项
	this.options = {
		drag: null, // 拖动元素时回调函数
		dragStart: null, // 开始拖动元素时回调函数
		dragEnd: null, // 结束拖动元素时回调函数
		tap: null, // 单次tap事件
		doubleTap: null // 双tap事件
	}
	this.isTap = false // 是否触发单次tap事件
	this.isdoubleTap = false // 是否触发双tap事件
	this.timer = null // 计时器，配合isTap 和dobuleTap 使用
	this.lastTime = null // 记录时长
	
	// 合并配置项
	if (options) {
		for (s in options) {
			this.options[s] = options[s]
		}
	}
	//
	this.eventing = false // 是否正在拖动中（鼠标按下后是否弹起）
	this.downState = false // 是否按下状态
	
	// 以下为拖动事件***********************************************
	var tx = 0 // 盒子坐标x
	var ty = 0 // 盒子坐标y
	var sx = 0 // 开始坐标x
	var sy = 0 // 开始坐标y
	var mx = 0 // 移动水平x
	var my = 0 // 移动纵向y
	
	/**
	 * 鼠标按下事件
	 * @param {Object} e
	 */
	var _down_hander = function (e) {
		mx = 0 // 重置移动水平x
		my = 0 // 重置移动纵向y
		// console.log('start')
		// console.log(that.dragBox)
		that.dragBox.addEventListener('touchend', _up_hander, false)
		// console.log(e.target.id, that.dragBox.id)
		// if (e.target.id != that.dragBox.id) {// 点击目标必须是移动元素，若是自己点自己，不可触发移动事件
			// that.downState = true
		// }
		that.dragBox.addEventListener('touchmove', _move_hander, false)
		// console.log(e.targetTouches[0])
		sx = e.targetTouches[0].pageX
		sy = e.targetTouches[0].pageY
		tx = e.targetTouches[0].offsetX
		ty = e.targetTouches[0].offsetY
		// 触发开始拖动回调
		if (that.options.dragStart) {
			// 返回值
			var obj = {
				eve: e,
				tx: tx,
				ty: ty,
				self: that.dragBox,
				orient: null
			}
			that.options.dragStart(obj)
		}
		
		that.isTap = false
		that.isdoubleTap = false
		if (that.timer) {
			clearTimeout(that.timer)
			that.timer = null
		}
		var time = (new Date()).getTime()
		
		if ((time - that.lastTime) < 300) {
			that.isdoubleTap = true
			if (that.timer) {
				clearTimeout(that.timer)
				that.timer = null
			}
			if (that.options.doubleTap) that.options.doubleTap(obj) // 触发tap事件
		}
		that.timer = setTimeout(function () {
			if (!that.eventing && that.isTap && !that.isdoubleTap) {
				if (that.options.tap) that.options.tap(obj) // 触发tap事件
				that.isTap = false
				that.isdoubleTap = false
			}
			if (that.timer) {
				clearTimeout(that.timer)
				that.timer = null
			}
		}, 300)
		
		that.lastTime = time
		e.stopPropagation()
	}
	/**
	 * 鼠标移动事件
	 * @param {Object} e
	 */
	var _move_hander = function (e) {
		// that.dragBox.removeEventListener('mousedown', _down_hander)
		e.preventDefault()
		// if (!that.downState) return
		mx = e.targetTouches[0].pageX - sx
		my = e.targetTouches[0].pageY - sy
		// 返回值
		var obj = {
			eve: e,
			tx: tx,
			ty: ty,
			mx: mx,
			my: my,
			self: that.dragBox,
			orient: null
		}
		// console.log(mx, my)
		if (Math.abs(mx) > Math.abs(my)) {
			obj.orient = 'horizntal' // 水平拖动
		} else {
			obj.orient = 'vertical' // 垂直拖动
		}
		if (that.options.drag) {
			that.options.drag(obj) // 拖动回调
		}
		if (that.timer) {
			clearTimeout(that.timer)
			that.timer = null
		}
		that.eventing = true
	}
	/**
	 * 鼠标弹起事件
	 * @param {Object} e
	 */
	var _up_hander = function (e) {
		// console.log('end')
		// that.downState = false
		that.dragBox.removeEventListener('touchmove', _move_hander, false)
		that.dragBox.addEventListener('touchstart', _down_hander, false)
		// 触发结束拖动回调
		if (that.options.dragEnd) {
			// 返回值
			var obj = {
				eve: e,
				tx: tx,
				ty: ty,
				mx: mx,
				my: my,
				self: that.dragBox,
				orient: null
			}
			that.options.dragEnd(obj)
		}
		that.isTap = true // 标志已经抬起，tap事件触发必要条件
		that.eventing = false
	}
	
	/**
	 * 清除所有事件
	 * @param {Object} e
	 */
	this.removemouse = function (e) {
		that.dragBox.removeEventListener('touchmove', _move_hander, false)
		that.dragBox.removeEventListener('touchend', _up_hander, false)
		that.dragBox.removeEventListener('touchstart', _down_hander, false)
	}
	this.dragBox.addEventListener('touchstart', _down_hander, false)
	this.dragBox.addEventListener('touchmove', _move_hander, false)
	this.dragBox.addEventListener('touchend', _up_hander, false)
}