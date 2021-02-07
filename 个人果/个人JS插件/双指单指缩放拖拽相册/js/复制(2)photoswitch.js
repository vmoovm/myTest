(function (win) {
	
	
	
	// var imageData = null // 记录图片数据
	// var isEnlarge = false // 记录图片是否放大
	// var lastTap = null // 计时器，模拟双击使用
	// var isdoubleTap = false // 是否双击
	// var current = 0 // 当前屏图片
	var pageWidth = window.innerWidth // 屏宽
	var pageHeight = window.innerHeight // 屏高
	// var zoompic = null // 缩放对象
	// var drag = null // 绑定滑屏对象
	// var layer = null // 滑屏html元素
	
	// var doms = document.querySelectorAll('.pinch-zoom')
	
	
	
	/**
	 * 绑定缩放对象
	 * @param {Object} dom
	 */
	function pinch (dom) {
		if (zoompic) {
			zoompic.destroy()
			zoompic = null
		}
		var pinch = new PinchZoom(dom, {
			zoomStartEventName: function () {
				// test.textContent = '缩放开始'
			},
			zoomEndEventName: function () {
				// test.textContent = '缩放结束'
			},
			dragStartEventName: function (o) {
				// test.textContent = '开始拖拽'
			},
			moveStartEventName: function (o) {
				// test.textContent = '移动开始'
			},
			moveEventName: function (o) {
				// test.textContent = '移动中'
			},
			moveEndEventName: function (o) {
				// test.textContent = '移动结束'
			},
			dragEndEventName: function (o) {
				// test.textContent = '拖拽结束'
				// bindDrag()
			},
			tapEventName: function (o) {
				// test.textContent = 'tap事件'
				layer[0].style.display = "none"
				if (zoompic) {
					zoompic.destroy()
					zoompic = null
				}
			},
			doubleTapEventName: function (o) {
				// test.textContent = '双tap事件'
			}
		});
		return pinch
	}
	
	// 创建弹层
	function createLayer() {
		var layer_bg =  null
		var clearTimer = null
		var layer = []
		layer_bg = document.createElement('div')
		layer_bg.id = 'dragBox'
		layer_bg.style.cssText = 'display:none; position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 10000; overflow: hidden; background: rgba(0, 0, 0, .5);'
		layer_bg.addEventListener('click', function (e) {
			var now = new Date() * 1
			if (lastTap && (now - lastTap) < 220) { // 240毫秒是模拟单击和双击区分，240毫秒内点两次为双周，超过为单击
				isdoubleTap = true
				// imageScale()
				lastTap = null
				e.stopPropagation()
				if (clearTimer) clearTimeout(clearTimer)
				return
			}
			isdoubleTap = false
			lastTap = now
			var that = this
			e.stopPropagation()
		}, false)
		
		var layer_box = document.createElement('div')
		var layer_img = document.createElement('img')
		// layer_img.style.margin = '0 auto'
		layer_img.setAttribute('width', '100%')
		// layer_box.style.cssText = ' display: flex; align-items: center; position: absolute; width: 100%; height: 100%; overflow: hidden;'
		layer_box.style.cssText = 'position: absolute; width: 100%; height: 100%;'
		var img_box = document.createElement('div')
		img_box.style.cssText = 'position: absolute; width: 100%;'
		img_box.appendChild(layer_img)
		layer_box.appendChild(img_box)
		
		layer.push(layer_bg) // 遮罩层
		layer.push(layer_box.cloneNode(true)) // 左预备图片（动态）
		layer.push(layer_box.cloneNode(true)) // 当前可视图片（动态）
		layer.push(layer_box.cloneNode(true)) // 右预备图片（动态）
		
		layer_bg.appendChild(layer[1])
		layer_bg.appendChild(layer[2])
		layer_bg.appendChild(layer[3])
		document.querySelector('body').appendChild(layer_bg)
		
		return layer
	}
	layer = createLayer()
	
	/**
	 * 初始化图片位置
	 */
	function imageInit () {
		if (imageData.length == 1) {
			layer[1].style.left = 0
			layer[2].style.left = pageWidth + 'px'
			layer[3].style.left = 2 * pageWidth + 'px'
			layer[1].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
			zoompic = pinch(layer[1])
			return
		} else if (imageData.length == 2) {
			if (current == 0) {
				layer[1].style.left = 0
				layer[2].style.left = pageWidth + 'px'
				layer[3].style.left = 2 * pageWidth + 'px'
				
				layer[1].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
				layer[2].querySelector('img').setAttribute('src', imageData[current + 1].getAttribute('large'))
				zoompic = pinch(layer[1])
			} else {
				layer[1].style.left = -1 * pageWidth + 'px'
				layer[2].style.left = 0
				layer[3].style.left = pageWidth + 'px'
				
				layer[1].querySelector('img').setAttribute('src', imageData[current - 1].getAttribute('large'))
				layer[2].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
				zoompic = pinch(layer[2])
			}
			return
		}
		if (current == 0) {
			layer[1].style.left = 0
			layer[2].style.left = pageWidth + 'px'
			layer[3].style.left = 2 * pageWidth + 'px'
			
			layer[1].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
			layer[2].querySelector('img').setAttribute('src', imageData[current + 1].getAttribute('large'))
			layer[3].querySelector('img').setAttribute('src', imageData[current + 2].getAttribute('large'))
			zoompic = pinch(layer[1])
		} else if (current == (imageData.length - 1)) {
			layer[1].style.left = -2 * pageWidth + 'px'
			layer[2].style.left = -1 * pageWidth + 'px'
			layer[3].style.left = 0
			
			layer[1].querySelector('img').setAttribute('src', imageData[current - 2].getAttribute('large'))
			layer[2].querySelector('img').setAttribute('src', imageData[current - 1].getAttribute('large'))
			layer[3].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
			zoompic = pinch(layer[3])
		} else {
			layer[1].style.left = - pageWidth + 'px'
			layer[2].style.left = 0
			layer[3].style.left = pageWidth + 'px'
			
			layer[1].querySelector('img').setAttribute('src', imageData[current -1].getAttribute('large'))
			layer[2].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
			layer[3].querySelector('img').setAttribute('src', imageData[current + 1].getAttribute('large'))
			zoompic = pinch(layer[2])
		}
	}
	
	/**
	 * 归位
	 * flag: true为下翻，false为上翻
	 */
	function homing (flag) {
		layer[1].style.removeProperty('transition')
		layer[2].style.removeProperty('transition')
		layer[3].style.removeProperty('transition')
		layer[1].style.transform = 'translate(0px, 0px)'
		layer[2].style.transform = 'translate(0px, 0px)'
		layer[3].style.transform = 'translate(0px, 0px)'
		if (imageData.length == 1) {
			return
		} else if (imageData.length == 2) {
			if (current == 0) {
				layer[1].style.left = 0 + 'px'
				layer[2].style.left = pageWidth + 'px'
				zoompic = pinch(layer[1])
			} else {
				layer[1].style.left = -1 * pageWidth + 'px'
				layer[2].style.left = 0 + 'px'
				zoompic = pinch(layer[2])
			}
			return
		}
		
		if (current == (imageData.length - 1)) {
			if (flag) { // 下翻时
				layer[1].style.left = -2 * pageWidth + 'px'
				layer[2].style.left = -1 * pageWidth + 'px'
				layer[3].style.left =  0 + 'px'
				zoompic = pinch(layer[3])
			} else { // 上翻时
				console.log(current)
				layer[1].style.left = -1 * pageWidth + 'px'
				layer[2].style.left =  0 + 'px'
				layer[3].style.left = 1 * pageWidth + 'px'
				zoompic = pinch(layer[2])
			}
		} else if (current == 0) {
			layer[1].style.left = 0 + 'px'
			layer[2].style.left = pageWidth + 'px'
			layer[3].style.left = 2 * pageWidth + 'px'
			zoompic = pinch(layer[1])
		} else {
			layer[1].style.left = -1 * pageWidth + 'px'
			layer[2].style.left = 0 + 'px'
			layer[3].style.left = pageWidth + 'px'
			zoompic = pinch(layer[2])
		}
		
	}
	
	
	/**
	 * 图片选位
	 */
	function prevSite () {
		var a = performance.now()
		requestAnimationFrame(function aa(o) {
			if ((o-a) > 200) { // 200是动画时设置的时间
				console.log(imageData.length - 2)
				if (current > 0 && current < (imageData.length - 2)) {
					layer[0].insertBefore(layer[3], layer[0].childNodes[0])
					layer[3].querySelector('img').setAttribute('src', imageData[current - 1].getAttribute('large'))
					var temp1 = layer[1]
					var temp2 = layer[2]
					var temp3 = layer[3]
					layer[1] = temp3
					layer[2] = temp1
					layer[3] = temp2
					console.log(current)
				}
				homing(false)
			} else {
				requestAnimationFrame(aa)
			}
		})
	}
	
	/**
	 * 图片选位
	 */
	function nextSite () {
		var a = performance.now()
		requestAnimationFrame(function bb(o) {
			if ((o-a) > 200) {
				if (current < (imageData.length - 1) && current > 1) {
					layer[0].appendChild(layer[1])
					layer[1].querySelector('img').setAttribute('src', imageData[current + 1].getAttribute('large'))
					var temp1 = layer[1]
					var temp2 = layer[2]
					var temp3 = layer[3]
					layer[1] = temp2
					layer[2] = temp3
					layer[3] = temp1
				}
				homing(true)
			} else {
				requestAnimationFrame(bb)
			}
		})
	}
	
	/**
	 * 上一张
	 */
	function prev () {
		if (current <= 0) {
			layer[1].style.transform = 'translate(0px, 0px)'
			layer[2].style.transform = 'translate(0px, 0px)'
			layer[3].style.transform = 'translate(0px, 0px)'
			return
		}
		current--
		// console.log('上翻成功')
		layer[1].style.transform = 'translate(' + pageWidth + 'px, 0px)'
		layer[2].style.transform = 'translate(' + pageWidth + 'px, 0px)'
		layer[3].style.transform = 'translate(' + pageWidth + 'px, 0px)'
		prevSite()
	}
	/**
	 * 下一张
	 */
	function next () {
		if (current > (imageData.length - 2)) {
			layer[1].style.transform = 'translate(0px, 0px)'
			layer[2].style.transform = 'translate(0px, 0px)'
			layer[3].style.transform = 'translate(0px, 0px)'
			return
		}
		// console.log('下翻成功')
		layer[1].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
		layer[2].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
		layer[3].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
		nextSite()
		current++
	}
	
	// 清除滑屏切换
	function clearDrag () {
		console.log(this.a)
		if (this.drag) {// 清楚拖拽事件
			this.drag.removemouse()
			this.drag = null
		}
	}
	
	
	// bindDrag()
	
	/**
	 * 委托事件绑定方法
	 * 
	 */
	function on (parent, eventsName, child, callback) {
	    var parentNodes = document.querySelectorAll(parent);
	    var len = parentNodes.length;
	    var targetType = getType(child);
	    var curSite = null;	//记录当前对象
	    if (len === 0) {
	        return;
	    }
	
	    for (var i = 0; i < len; i++) {
	        addListener(i)
	    }
	    // 绑定事件方法
	    function addListener(i) {
	        parentNodes[i].addEventListener(eventsName, function(event){
	        	var obj = getNode(event.target);
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
	        }, false);
	    }
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
		function getNode(node) {
	        var obj = {
	        	self: node,
	        	flag: false
	        }
	        if (targetType === "className") {
	            if ('.'+node.className.toLowerCase() === child.toLowerCase()) {
		            obj.flag = true;
		            curSite = 'cur' + new Date()*1
					node.setAttribute('curSite',curSite);
		            return obj;
		        } else if (node.nodeName === 'BODY' || node.nodeName === 'HTML'){
		            return false
		        } else {
		        	return getNode(node.parentNode);
		        }
	        } else if (targetType === "id") {
	            if (node.id.toLowerCase() === child.toLowerCase()) {
		            obj.flag = true;
		            curSite = 'cur' + new Date()*1
					node.setAttribute('curSite',curSite);
		            return obj
		        } else if (node.nodeName === 'BODY' || node.nodeName === 'HTML'){
		            return false
		        } else {
		        	return getNode(node.parentNode);
		        }
	        } else {
	            if (node.nodeName.toLowerCase() === child.toLowerCase()) {
		            obj.flag = true;
		            curSite = 'cur' + new Date()*1
					node.setAttribute('curSite',curSite);
		            return obj
		        } else if (node.nodeName === 'BODY' || node.nodeName === 'HTML'){
		            return false
		        } else {
		        	return getNode(node.parentNode);
		        }
	        }
	    }
	}
	on('#imageList', 'click', '.ztopPDownT_pic', function(obj){
		var arr = []
		imageData = document.querySelector('#imageList').querySelectorAll('.ztopPDownT_pic')
		current = obj.index
		layer[0].style.display = 'block'
		imageInit()
	})
	
	function PhotoSwitch (domId) {
		console.log(domId)
		this.bindDrag()
	}
	
	PhotoSwitch.prototype = {
		imageData: null,
		isEnlarge: null,
		lastTap: null,
		isdoubleTap: null,
		current: null,
		zoompic: null,
		drag: null,
		layer: createLayer(),
		pinch: pinch,
		createLayer: createLayer.bind(this),
		imageInit: function () { // 初始化图片位置
			if (imageData.length == 1) {
				this.layer[1].style.left = 0
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
				this.layer[1].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
				zoompic = pinch(this.layer[1])
				return
			} else if (imageData.length == 2) {
				if (current == 0) {
					this.layer[1].style.left = 0
					this.layer[2].style.left = pageWidth + 'px'
					this.layer[3].style.left = 2 * pageWidth + 'px'
					
					this.layer[1].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
					this.layer[2].querySelector('img').setAttribute('src', imageData[current + 1].getAttribute('large'))
					zoompic = pinch(this.layer[1])
				} else {
					this.layer[1].style.left = -1 * pageWidth + 'px'
					this.layer[2].style.left = 0
					this.layer[3].style.left = pageWidth + 'px'
					
					this.layer[1].querySelector('img').setAttribute('src', imageData[current - 1].getAttribute('large'))
					this.layer[2].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
					zoompic = pinch(this.layer[2])
				}
				return
			}
			if (current == 0) {
				this.layer[1].style.left = 0
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
				
				this.layer[1].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', imageData[current + 1].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', imageData[current + 2].getAttribute('large'))
				zoompic = pinch(this.layer[1])
			} else if (current == (imageData.length - 1)) {
				this.layer[1].style.left = -2 * pageWidth + 'px'
				this.layer[2].style.left = -1 * pageWidth + 'px'
				this.layer[3].style.left = 0
				
				this.layer[1].querySelector('img').setAttribute('src', imageData[current - 2].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', imageData[current - 1].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
				zoompic = pinch(this.layer[3])
			} else {
				this.layer[1].style.left = - pageWidth + 'px'
				this.layer[2].style.left = 0
				this.layer[3].style.left = pageWidth + 'px'
				
				this.layer[1].querySelector('img').setAttribute('src', imageData[current -1].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', imageData[current].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', imageData[current + 1].getAttribute('large'))
				zoompic = pinch(this.layer[2])
			}
		},
		homing: homing,
		prevSite: prevSite,
		nextSite: nextSite,
		prev: prev,
		next: next,
		clearDrag: function () {
			if (this.drag) {// 清楚拖拽事件
				this.drag.removemouse()
				this.drag = null
			}
		},
		bindDrag: function () { // 绑定滑屏切换图片
			this.clearDrag()
			this.drag = new DragBox(this.layer[0], {
				drag: function (o) {
					var x = o.eve.targetTouches[0].pageX
					if (o.eve.touches.length == 1 && zoompic.zoomFactor == 1) {
						this.layer[1].style.transform = 'translate(' + o.mx + 'px, 0px)'
						this.layer[2].style.transform = 'translate(' + o.mx + 'px, 0px)'
						this.layer[3].style.transform = 'translate(' + o.mx + 'px, 0px)'
					}
				},
				// 拖动事件开始时触发
				dragStart: function(o) {
					if (o.eve.touches.length == 1 && zoompic.zoomFactor == 1) {
						this.layer[1].style.removeProperty('transition')
						this.layer[2].style.removeProperty('transition')
						this.layer[3].style.removeProperty('transition')
					}
				},
				// 拖动事件结束时触发
				dragEnd: function(o) {
					if (o.eve.touches.length == 0 && zoompic.zoomFactor == 1) {
						if (Math.abs(o.mx) > 80) {
							if (o.mx > 0) {
								prev()
							} else {
								next()
							}
						} else {
							this.layer[1].style.transform = 'translate(0px, 0px)'
							this.layer[2].style.transform = 'translate(0px, 0px)'
							this.layer[3].style.transform = 'translate(0px, 0px)'
						}
						this.layer[1].style.transition = 'all .15s ease'
						this.layer[2].style.transition = 'all .15s ease'
						this.layer[3].style.transition = 'all .15s ease'
					}
				},
			})
		},
		a: 12312313123
	}
	
	win.PhotoSwitch = PhotoSwitch
})(window)

var psc=new PhotoSwitch('#imageList')
