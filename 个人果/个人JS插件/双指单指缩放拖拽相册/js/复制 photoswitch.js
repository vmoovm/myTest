(function (win) {
	var pageWidth = window.innerWidth // 屏宽
	var pageHeight = window.innerHeight // 屏高
	// 获取目标元素类型方法
    function getType(target) {
        var type;
        if (target.indexOf(".") !== -1) {
            type = "className";
        } else if (target.indexOf("#") !== -1) {
            type = "id";
        } else {
            type = "tagName";
        }
        return type;
    }
	
	/**
	 * 委托事件绑定方法
	 * @params parent 委托父元素的css选择符 tag id class
	 * @params eventsName 绑定的事件
	 * @params child 绑定事件的元素css选择符 tag id class
	 * @params callback 事件响应函数
	 * 
	 * 有bug，动态生成的标签没能生效
	 * update: 2017.11.6
	 * 
	 */
	function on (parent, eventsName, child, callback) {
        var parentNodes = document.querySelectorAll(parent);
        var len = parentNodes.length;
        var targetType = getType(child);
        var curSite = null;	//记录当前对象
        if (len === 0) return

        for (var i = 0; i < len; i++) {
            parentNodes[i].setAttribute('target', 'self') // 设置本身，以防点击本身时使用
            addListener(i)
        }
        // 绑定事件方法
        function addListener(i) {
	        parentNodes[i].addEventListener(eventsName, function(event){
	        	var obj = getNode(event.target,targetType);
	        	var cd = parentNodes[i].querySelectorAll(child)
	        	for(var c = 0; c < cd.length; c++){
	        		if (cd[c].getAttribute('curSite') === curSite) {
	        			obj.index = c;
	        			cd[c].removeAttribute('curSite');
	        		}
	        	}
		        if (obj instanceof Object) {
		        	obj.e = event;
		        	callback(obj);
		        }
		        event.stopPropagation()
	        }, false);
        }
        // 某元素是否包含指定cls
	    function hasClass (el, c) {
			if (!el.className) return false
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
	        return re.test(el.className);
		}
        
		function getNode(node, targetType) {
	        var obj = {
	        	self: node,
	        	flag: false
	        }
	        if (targetType === "className") {
                if (hasClass(node, child.replace('.', ''))) {
		            obj.flag = true;
		            curSite = 'cur' + new Date()*1
					node.setAttribute('curSite',curSite);
		            return obj;
		        } else if (node.getAttribute('target') == 'self') {
		            return false
		        } else {
		        	return getNode(node.parentNode, targetType);
		        }
            } else if (targetType === "id") {
                if (node.id.toLowerCase() === child.toLowerCase()) {
		            obj.flag = true;
		            curSite = 'cur' + new Date()*1
					node.setAttribute('curSite',curSite);
		            return obj
		        } else if (node.getAttribute('target') == 'self') {
		            return false
		        } else {
		        	return getNode(node.parentNode, targetType);
		        }
            } else {
                if (node.nodeName.toLowerCase() === child.toLowerCase()) {
		            obj.flag = true;
		            curSite = 'cur' + new Date()*1
					node.setAttribute('curSite',curSite);
		            return obj
		        } else if (node.getAttribute('target') == 'self') {
		            return false
		        } else {
		        	return getNode(node.parentNode, targetType);
		        }
            }
	    }
    }
	
	// 获取元素在浏览器位置
	function offset(target) {
	    var top = 0,
	        left = 0
	
	    while(target.offsetParent) {
	        top += target.offsetTop
	        left += target.offsetLeft
	        target = target.offsetParent
	    }
	
	    return {
	        top: top,
	        left: left,
	    }
	}
	/**
	 * 寻找指定父节点
	 */
	function parent (self, parent) {
		var targetType = getType(parent);
		
		function getNode(node) {
            switch(targetType) {
            	case 'className':
		            if ('.' + node.className.toLowerCase() === parent.toLowerCase()) {
			            return node;
			        } else if (node.nodeName.toLowerCase() == 'body' || node.nodeName.toLowerCase() == 'html'){
			            return false
			        } else {
			        	return getNode(node.parentNode);
			        }
            		break
            	case 'id':
		            if ('#' + node.id.toLowerCase() === parent.toLowerCase()) {
			            return node;
			        } else if (node.nodeName.toLowerCase() == 'body' || node.nodeName.toLowerCase() == 'html'){
			            return false
			        } else {
			        	return getNode(node.parentNode);
			        }
            		break
            	case 'tagName':
            		if (node.nodeName.toLowerCase() === parent.toLowerCase()) {
			            return node;
			        } else if (node.nodeName.toLowerCase() == 'body' || node.nodeName.toLowerCase() == 'html'){
			            return false
			        } else {
			        	return getNode(node.parentNode);
			        }
            		break
            }
            
		}
		return getNode(self)
	}
	
	/**
	 * 获取当前组内元素在其父元素中的索引
	 */
	function index (parent, child) {
		var doms = parent.querySelectorAll(child)
		for (var d = 0; d < doms.length; d++) {
			if (doms[d].getAttribute('index') == 'current') {
				doms[d].removeAttribute('index')
				return d
			}
		}
	}
	
	/**
	 * 手机相册
	 * @param {Object} domId 设定范围id  必填项
	 * @param {Object} itemCls 目标元素className 必填项
	 * @param {Object} groupCls 是否分组，某className，选填项
	 */
	function PhotoSwitch (domId, itemCls, groupCls) {
		var that = this
		this.imageData = null // 一组图片对象
		this.isEnlarge = false // 记录图片是否放大
		this.current = null
		this.drag = null
		this.current = 0
		this.scale = 1
		this.layer = this.createLayer()
		this.bindDrag()
		on(domId, 'click', itemCls, function(obj){
			if (groupCls) {
				var currentGroup = parent(obj.self, groupCls)
				obj.self.setAttribute('index', 'current') // 设置当前属性，方便获取当前组内索引作为参考
				that.current = index(currentGroup, itemCls)
				that.imageData = currentGroup.querySelectorAll(itemCls)
			} else {
				that.imageData = document.querySelector(domId).querySelectorAll(itemCls)
				that.current = obj.index
			}
			that.layer[0].style.display = 'block'
			that.imageInit()
		})
	}
	
	
	PhotoSwitch.prototype = {
		// 创建弹层
		createLayer: function () {
			var that = this
			var clearTimer = null
			var lastTap = null // 计时器，模拟双击使用
			var layer = []
			var isdoubleTap = false // 是否双击
			var layer_bg = document.createElement('div')
			layer_bg.id = 'dragBox'
			layer_bg.style.cssText = 'display:none; position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 10000; overflow: hidden; background: rgba(0, 0, 0, .5);'
			layer_bg.addEventListener('click', function (e) {
				var now = new Date() * 1
				if (lastTap && (now - lastTap) < 201) { // 240毫秒是模拟单击和双击区分，240毫秒内点两次为双周，超过为单击
					isdoubleTap = true
					that.imageScale()
					lastTap = null
					e.stopPropagation()
					if (clearTimer) clearTimeout(clearTimer)
					return
				}
				isdoubleTap = false
				lastTap = now
			clearTimer = setTimeout(function () { // 240毫秒内无再次点击为单击事件
					if (isdoubleTap) return
					layer_bg.style.display = "none"
					that.removeScale()
					if (clearTimer) clearTimeout(clearTimer)
				}, 220)
				e.stopPropagation()
			}, false)
			
			var layer_box = document.createElement('div')
			var layer_img = document.createElement('img')
			// layer_img.style.margin = '0 auto'
			layer_img.setAttribute('width', '100%')
			// layer_box.style.cssText = ' display: flex; align-items: center; position: absolute; width: 100%; height: 100%; overflow: hidden;'
			layer_box.style.cssText = 'position: absolute; width: 100%; height: 100%; overflow: hidden;'
			layer_box.appendChild(layer_img)
			
			layer.push(layer_bg) // 遮罩层
			layer.push(layer_box.cloneNode(true)) // 左预备图片（动态）
			layer.push(layer_box.cloneNode(true)) // 当前可视图片（动态）
			layer.push(layer_box.cloneNode(true)) // 右预备图片（动态）
			
			layer_bg.appendChild(layer[1])
			layer_bg.appendChild(layer[2])
			layer_bg.appendChild(layer[3])
			document.querySelector('body').appendChild(layer_bg)
			
			return layer
		},
		currentImg: function () {
			if (this.current == 0) { // 第一张图片时
				this.imgDom = this.layer[1].querySelector('img')
			} else if (this.current != (this.imageData.length - 1) || this.imageData.length == 2) { // 非最后一张或者总数为2张图片时
				this.imgDom = this.layer[2].querySelector('img')
			} else { // 最后一张图片时
				this.imgDom = this.layer[3].querySelector('img')
			}
			this.backImg()
		},
		/**
		 * 关闭放大效果并还原默认状态
		 * return 返回当前图片dom
		 */
		removeScale: function () {
			if (this.isEnlarge) { // 关闭弹层时，同时将缩放行为及事件移除
				
				/*if (this.current == 0) { // 第一张图片时
				var imgDom = this.layer[1].querySelector('img')
				} else if (this.current != (this.imageData.length - 1) || this.imageData.length == 2) { // 非最后一张或者总数为2张图片时
					var imgDom = this.layer[2].querySelector('img')
				} else { // 最后一张图片时
					var imgDom = this.layer[3].querySelector('img')
				}*/
				
				this.bindDrag()
				this.getImageSite(true)
				this.isEnlarge.removemouse()
				this.isEnlarge = null
				// imgDom.style.transform = 'translate(0px, 0px)'
				
			}
			return
		},
		/**检测是否超出边缘
		 * 
		 */
		isedge: function (x, y, w, h, d) {
			var sitex = pageWidth - w
			var sitey = pageHeight - h
			var isboundary = false // 是否到了边界
			if (sitex < 0) {
				x = x < sitex ? sitex : x
				x = x > 0 ? 0 : x
			} else {
				x =  x < 0 ? 0 : x
				x =  x > sitex ? sitex : x
			}
			
			if (sitey < 0) {
				y = y > 0 ? 0 : y
				y = y < sitey ? sitey : y
			} else {
				y =  y < 0 ? 0 : y
				y =  y > sitey ? sitey : y
			}
			
			// if (x == sitex || x == 0) {
				// this.removeScale()
			// }
			return {x: x, y: y}
		},
	
		/**
		 * 图片放大
		 */
		imageScale: function () {
			var selfX = 0, selfY = 0
			
			/*if (this.current == 0) { // 第一张图片时
				var imgDom = this.layer[1].querySelector('img')
			} else if (this.current != (this.imageData.length - 1) || this.imageData.length == 2) { // 非最后一张或者总数为2张图片时
				var imgDom = this.layer[2].querySelector('img')
			} else { // 最后一张图片时
				var imgDom = this.layer[3].querySelector('img')
			}*/
			
			
			// if (isEnlarge) { // 如果已放大即取消放大
			if (this.scale > 1.5){
				this.scale = 1
				this.removeScale()
				this.getImageSite()
				this.imgDom.setAttribute('width', '100%')
				// this.imgDom.style.flex = '1'
			} else { // 否则将图片放大
				
				this.clearDrag() // 清除滑屏图片翻页
				this.getImageSite(true)
				if (!this.isEnlarge) {
					this.binImageMove(this.imgDom)
				}
				this.scale+=0.5
				var tempWidth = 0
				if (this.scale > 1.5) {
					this.imgDom.style.removeProperty('width')
					this.imgDom.removeAttribute('width')
					tempWidth = this.imgDom.scrollWidth
				}
		
				this.imgDom.style.width = Math.max(tempWidth, pageWidth * this.scale) + 'px'
				selfY = (pageHeight - this.imgDom.scrollHeight) * .5
				this.imgDom.style.transform = 'translate(0px,' + selfY + 'px)'
				this.imgDom.setAttribute('x', 0)
				this.imgDom.setAttribute('y', selfY)
				
			}
			
		},

		// 绑定拖动图片位置
		binImageMove: function () {
			var that = this
			var imgwidth = 0, imgheight = 0
			var scaleWidth = 0, scaleHeight = 0
			var selfX = 0, selfY = 0
			
			// 是否可拖动图片移动
			this.isEnlarge = new DragBox(this.imgDom, {
				drag: function (o) {
					o.self.style.removeProperty('transition')
					o.self.style.transform = 'translate(0px,0px)'
					
					if (o.eve.targetTouches.length > 1) { // 双指放大操作
					} else { // 单指移动操作
						x = o.mx + selfX * 1
						y = o.my + selfY * 1
						var site = that.isedge (x, y, imgwidth, imgheight)
						that.imgDom.style.transform = 'translate(' + site.x + 'px, ' + site.y + 'px)'
						scaleWidth = scaleWidth > pageWidth * 4 ? pageWidth * 4 : scaleWidth
						scaleWidth = scaleWidth < pageWidth ? pageWidth : scaleWidth
						that.imgDom.setAttribute('x', site.x)
						that.imgDom.setAttribute('y', site.y)
					}
				},
				// 拖动事件开始时触发
				dragStart: function(o) {
					selfX = that.imgDom.getAttribute('x')
					selfY = that.imgDom.getAttribute('y')
					
					that.imgDom.style.removeProperty('transition')
					imgwidth = that.imgDom.clientWidth
					imgheight = that.imgDom.clientHeight
				},
				// 拖动事件结束时触发
				dragEnd: function(o) {
					scaleWidth = scaleWidth > pageWidth * 4 ? pageWidth * 4 : scaleWidth
					scaleWidth = scaleWidth < pageWidth ? pageWidth : scaleWidth
				}
			})
		},
		// 还原图片状态
		backImg: function () {
			for (var l = 1; l < this.layer.length; l++) {
				this.layer[l].querySelector('img').setAttribute('width', '100%')
				this.layer[l].querySelector('img').removeAttribute('style')
				this.layer[l].querySelector('img').removeAttribute('x')
				this.layer[l].querySelector('img').removeAttribute('y')
				this.layer[l].style.display = 'flex'
				this.layer[l].style.alignItems = 'center'
			}
		},
		
		/**
		 * 初始化图片位置
		 */
		imageInit: function  () {
			
			if (this.imageData.length == 1) {
				this.layer[1].style.left = 0
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				this.currentImg()
				return
			} else if (this.imageData.length == 2) {
				if (this.current == 0) {
					this.layer[1].style.left = 0
					this.layer[2].style.left = pageWidth + 'px'
					this.layer[3].style.left = 2 * pageWidth + 'px'
					
					this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
					this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current + 1].getAttribute('large'))
				} else {
					this.layer[1].style.left = -1 * pageWidth + 'px'
					this.layer[2].style.left = 0
					this.layer[3].style.left = pageWidth + 'px'
					
					this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current - 1].getAttribute('large'))
					this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				}
				this.currentImg()
				return
			}
			if (this.current == 0) {
				this.layer[1].style.left = 0
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
				
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current + 1].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', this.imageData[this.current + 2].getAttribute('large'))
			} else if (this.current == (this.imageData.length - 1)) {
				this.layer[1].style.left = -2 * pageWidth + 'px'
				this.layer[2].style.left = -1 * pageWidth + 'px'
				this.layer[3].style.left = 0
				
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current - 2].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current - 1].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
			} else {
				this.layer[1].style.left = - pageWidth + 'px'
				this.layer[2].style.left = 0
				this.layer[3].style.left = pageWidth + 'px'
				
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current -1].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', this.imageData[this.current + 1].getAttribute('large'))
			}
			this.currentImg()
			this.getImageSite()
		},
	
		/**
		 * 返回缩略图居中位置
		 */
		getImageSite: function  (x) {
			for (var l = 1; l < this.layer.length; l++) {
				if (x) {
					this.layer[l].style.removeProperty('display')
					this.layer[l].style.removeProperty('align-items')
				} else {
					this.layer[l].style.display = 'flex'
					this.layer[l].style.alignItems = 'center'
				}
				
			}
		},
	
		/**
		 * 归位
		 * flag: true为下翻，false为上翻
		 */
		homing: function  (flag) {
			this.layer[1].style.removeProperty('transition')
			this.layer[2].style.removeProperty('transition')
			this.layer[3].style.removeProperty('transition')
			this.layer[1].style.transform = 'translate(0px, 0px)'
			this.layer[2].style.transform = 'translate(0px, 0px)'
			this.layer[3].style.transform = 'translate(0px, 0px)'
			this.removeScale()
			if (this.imageData.length == 1) {
				return
			} else if (this.imageData.length == 2) {
				if (this.current == 0) {
					this.layer[1].style.left = 0 + 'px'
					this.layer[2].style.left = pageWidth + 'px'
				} else {
					this.layer[1].style.left = -1 * pageWidth + 'px'
					this.layer[2].style.left = 0 + 'px'
				}
				return
			}
			
			if (this.current == (this.imageData.length - 1)) {
				if (flag) { // 下翻时
					this.layer[1].style.left = -2 * pageWidth + 'px'
					this.layer[2].style.left = -1 * pageWidth + 'px'
					this.layer[3].style.left =  0 + 'px'
				} else { // 上翻时
					this.layer[1].style.left = -1 * pageWidth + 'px'
					this.layer[2].style.left =  0 + 'px'
					this.layer[3].style.left = 1 * pageWidth + 'px'
				}
			} else if (this.current == 0) {
				this.layer[1].style.left = 0 + 'px'
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
			} else {
				this.layer[1].style.left = -1 * pageWidth + 'px'
				this.layer[2].style.left = 0 + 'px'
				this.layer[3].style.left = pageWidth + 'px'
			}
			this.currentImg()
		},
	
	
		/**
		 * 图片选位
		 */
		prevSite: function  () {
			var that = this
			var a = performance.now()
			requestAnimationFrame(function aa(o) {
				if ((o-a) > 200) { // 200是动画时设置的时间
					if (that.current > 0 && that.current < (that.imageData.length - 2)) {
						that.layer[0].insertBefore(that.layer[3], that.layer[0].childNodes[0])
						that.layer[3].querySelector('img').setAttribute('src', that.imageData[that.current - 1].getAttribute('large'))
						var temp1 = that.layer[1]
						var temp2 = that.layer[2]
						var temp3 = that.layer[3]
						that.layer[1] = temp3
						that.layer[2] = temp1
						that.layer[3] = temp2
					}
					// getImageSite()
					that.homing(false)
				} else {
					requestAnimationFrame(aa)
				}
			})
		},
	
		/**
		 * 图片选位
		 */
		nextSite: function () {
			var that = this
			var a = performance.now()
			requestAnimationFrame(function bb(o) {
				if ((o-a) > 200) {
					if (that.current < (that.imageData.length - 1) && that.current > 1) {
						that.layer[0].appendChild(that.layer[1])
						that.layer[1].querySelector('img').setAttribute('src', that.imageData[that.current + 1].getAttribute('large'))
						var temp1 = that.layer[1]
						var temp2 = that.layer[2]
						var temp3 = that.layer[3]
						that.layer[1] = temp2
						that.layer[2] = temp3
						that.layer[3] = temp1
					}
					// getImageSite()
					that.homing(true)
				} else {
					requestAnimationFrame(bb)
				}
			})
		},
	
		/**
		 * 上一张
		 */
		prev: function () {
			if (this.current <= 0) {
				this.layer[1].style.transform = 'translate(0px, 0px)'
				this.layer[2].style.transform = 'translate(0px, 0px)'
				this.layer[3].style.transform = 'translate(0px, 0px)'
				return
			}
			this.current--
			console.log('上翻成功')
			this.layer[1].style.transform = 'translate(' + pageWidth + 'px, 0px)'
			this.layer[2].style.transform = 'translate(' + pageWidth + 'px, 0px)'
			this.layer[3].style.transform = 'translate(' + pageWidth + 'px, 0px)'
			this.prevSite()
		},
		/**
		 * 下一张
		 */
		next: function () {
			if (this.current > (this.imageData.length - 2)) {
				this.layer[1].style.transform = 'translate(0px, 0px)'
				this.layer[2].style.transform = 'translate(0px, 0px)'
				this.layer[3].style.transform = 'translate(0px, 0px)'
				return
			}
			console.log('下翻成功')
			this.layer[1].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
			this.layer[2].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
			this.layer[3].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
			this.nextSite()
			this.current++
		},
	
		// 清除滑屏切换
		clearDrag: function () {
			if (this.drag) {// 清楚拖拽事件
				this.drag.removemouse()
				this.drag = null
			}
		},
		// 绑定滑屏切换图片
		bindDrag: function () {
			var that = this
			this.clearDrag()
			this.backImg() // 绑定切屏事件时，先还原图片状态
			this.drag = new DragBox(this.layer[0], {
				drag: function (o) {
					var x = o.eve.targetTouches[0].pageX
					that.layer[1].style.transform = 'translate(' + o.mx + 'px, 0px)'
					that.layer[2].style.transform = 'translate(' + o.mx + 'px, 0px)'
					that.layer[3].style.transform = 'translate(' + o.mx + 'px, 0px)'
				},
				// 拖动事件开始时触发
				dragStart: function(o) {
					that.layer[1].style.removeProperty('transition')
					that.layer[2].style.removeProperty('transition')
					that.layer[3].style.removeProperty('transition')
					that.backImg()
				},
				// 拖动事件结束时触发
				dragEnd: function(o) {
					if (Math.abs(o.mx) > 80) {
						if (o.mx > 0) {
							that.prev()
						} else {
							that.next()
						}
					} else {
						that.layer[1].style.transform = 'translate(0px, 0px)'
						that.layer[2].style.transform = 'translate(0px, 0px)'
						that.layer[3].style.transform = 'translate(0px, 0px)'
					}
					that.layer[1].style.transition = 'all .15s ease'
					that.layer[2].style.transition = 'all .15s ease'
					that.layer[3].style.transition = 'all .15s ease'
				}
			})
		}
	}
	win.PhotoSwitch = PhotoSwitch
})(window)
