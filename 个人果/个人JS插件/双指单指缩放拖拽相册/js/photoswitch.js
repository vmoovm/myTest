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
	
	// 创建弹层
	function createLayer() {
		var layer_bg =  null
		var clearTimer = null
		var layer = []
		layer_bg = document.createElement('div')
		layer_bg.id = 'dragBox'
		layer_bg.style.cssText = 'display:none; position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 10000; overflow: hidden; background: rgba(0, 0, 0, .5);'
		var layer_box = document.createElement('div')
		var layer_img = document.createElement('img')
		// layer_img.style.margin = '0 auto'
		layer_img.setAttribute('width', '100%')
		// layer_box.style.cssText = ' display: flex; align-items: center; position: absolute; width: 100%; height: 100%; overflow: hidden;'
		layer_box.style.cssText = 'position: absolute; width: 100%; height: 100%;'
		// var img_box = document.createElement('div')
		// img_box.style.cssText = 'position: absolute; width: 100%;'
		// img_box.appendChild(layer_img)
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
	}
	
	/**
	 * 手机相册
	 * @param {Object} domId 设定范围id  必填项
	 * @param {Object} itemCls 目标元素className 必填项
	 * @param {Object} groupCls 是否分组，某className，选填项
	 */
	function PhotoSwitch (domId, itemCls, groupCls) {
		this.bindDrag()
		var that = this
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
		imageData: null,
		isEnlarge: null,
		// lastTap: null,
		isdoubleTap: null,
		current: null,
		zoompic: null,
		drag: null,
		layer: createLayer(),
		/**
		 * 绑定缩放对象
		 * @param {Object} dom
		 */
		pinch: function (dom) {
			if (this.zoompic) {
				this.zoompic.destroy()
				this.zoompic = null
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
				tapEventName: (function (o) {
					// test.textContent = 'tap事件'
					this.layer[0].style.display = "none"
					if (this.zoompic) {
						this.zoompic.destroy()
						this.zoompic = null
					}
				}).bind(this),
				doubleTapEventName: function (o) {
					// test.textContent = '双tap事件'
				}
			});
			return pinch
		},
		createLayer: createLayer.bind(this),
		imageInit: function () { // 初始化图片位置
			if (this.imageData.length == 1) {
				this.layer[1].style.left = 0
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				this.zoompic = this.pinch(this.layer[1])
				return
			} else if (this.imageData.length == 2) {
				if (this.current == 0) {
					this.layer[1].style.left = 0
					this.layer[2].style.left = pageWidth + 'px'
					this.layer[3].style.left = 2 * pageWidth + 'px'
					
					this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
					this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current + 1].getAttribute('large'))
					this.zoompic = this.pinch(this.layer[1])
				} else {
					this.layer[1].style.left = -1 * pageWidth + 'px'
					this.layer[2].style.left = 0
					this.layer[3].style.left = pageWidth + 'px'
					
					this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current - 1].getAttribute('large'))
					this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
					this.zoompic = this.pinch(this.layer[2])
				}
				return
			}
			if (this.current == 0) {
				this.layer[1].style.left = 0
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
				
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current + 1].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', this.imageData[this.current + 2].getAttribute('large'))
				this.zoompic = this.pinch(this.layer[1])
			} else if (this.current == (this.imageData.length - 1)) {
				this.layer[1].style.left = -2 * pageWidth + 'px'
				this.layer[2].style.left = -1 * pageWidth + 'px'
				this.layer[3].style.left = 0
				
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current - 2].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current - 1].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				this.zoompic = this.pinch(this.layer[3])
			} else {
				this.layer[1].style.left = - pageWidth + 'px'
				this.layer[2].style.left = 0
				this.layer[3].style.left = pageWidth + 'px'
				
				this.layer[1].querySelector('img').setAttribute('src', this.imageData[this.current -1].getAttribute('large'))
				this.layer[2].querySelector('img').setAttribute('src', this.imageData[this.current].getAttribute('large'))
				this.layer[3].querySelector('img').setAttribute('src', this.imageData[this.current + 1].getAttribute('large'))
				this.zoompic = this.pinch(this.layer[2])
			}
		},
		/**
		 * 归位
		 * flag: true为下翻，false为上翻
		 */
		homing: function (flag) {
			this.layer[1].style.removeProperty('transition')
			this.layer[2].style.removeProperty('transition')
			this.layer[3].style.removeProperty('transition')
			this.layer[1].style.transform = 'translate(0px, 0px)'
			this.layer[2].style.transform = 'translate(0px, 0px)'
			this.layer[3].style.transform = 'translate(0px, 0px)'
			if (this.imageData.length == 1) {
				return
			} else if (this.imageData.length == 2) {
				if (this.current == 0) {
					this.layer[1].style.left = 0 + 'px'
					this.layer[2].style.left = pageWidth + 'px'
					this.zoompic = this.pinch(this.layer[1])
				} else {
					this.layer[1].style.left = -1 * pageWidth + 'px'
					this.layer[2].style.left = 0 + 'px'
					this.zoompic = this.pinch(this.layer[2])
				}
				return
			}
			
			if (this.current == (this.imageData.length - 1)) {
				if (flag) { // 下翻时
					this.layer[1].style.left = -2 * pageWidth + 'px'
					this.layer[2].style.left = -1 * pageWidth + 'px'
					this.layer[3].style.left =  0 + 'px'
					this.zoompic = this.pinch(this.layer[3])
				} else { // 上翻时
					console.log(this.current)
					this.layer[1].style.left = -1 * pageWidth + 'px'
					this.layer[2].style.left =  0 + 'px'
					this.layer[3].style.left = 1 * pageWidth + 'px'
					this.zoompic = this.pinch(this.layer[2])
				}
			} else if (this.current == 0) {
				this.layer[1].style.left = 0 + 'px'
				this.layer[2].style.left = pageWidth + 'px'
				this.layer[3].style.left = 2 * pageWidth + 'px'
				this.zoompic = this.pinch(this.layer[1])
			} else {
				this.layer[1].style.left = -1 * pageWidth + 'px'
				this.layer[2].style.left = 0 + 'px'
				this.layer[3].style.left = pageWidth + 'px'
				this.zoompic = this.pinch(this.layer[2])
			}
			
		},
		/**
		 * 图片选位
		 */
		prevSite: function () {
			var a = performance.now()
			var that = this
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
			var a = performance.now()
			var that = this
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
			// console.log('上翻成功')
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
			// console.log('下翻成功')
			this.layer[1].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
			this.layer[2].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
			this.layer[3].style.transform = 'translate(' + -1 * pageWidth + 'px, 0px)'
			this.nextSite()
			this.current++
		},
		clearDrag: function () {
			if (this.drag) {// 清楚拖拽事件
				this.drag.removemouse()
				this.drag = null
			}
		},
		// 清除滑屏切换
		bindDrag: function () {
			this.clearDrag()
			this.drag = new DragBox(this.layer[0], {
				drag: (function (o) {
					if (o.eve.touches.length == 1 && this.zoompic.zoomFactor == 1) {
						var x
						if (o.mx < 0 && Math.abs(o.mx) > pageWidth * .9) {
							x = -1 * pageWidth * .9
						} else if (o.mx > 0 && o.mx > pageWidth * .9) {
							x = pageWidth * .9
						} else {
							x = o.mx
						}
						this.layer[1].style.transform = 'translate(' + x + 'px, 0px)'
						this.layer[2].style.transform = 'translate(' + x + 'px, 0px)'
						this.layer[3].style.transform = 'translate(' + x + 'px, 0px)'
					}
				}).bind(this),
				// 拖动事件开始时触发
				dragStart: (function(o) {
					if (o.eve.touches.length == 1 && this.zoompic.zoomFactor > 1) {
						this.layer[1].style.removeProperty('transition')
						this.layer[2].style.removeProperty('transition')
						this.layer[3].style.removeProperty('transition')
						
					}
					console.log(this.zoompic)
				}).bind(this),
				// 拖动事件结束时触发
				dragEnd: (function(o) {
					if (o.eve.touches.length == 0 && this.zoompic.zoomFactor == 1) {
						if (Math.abs(o.mx) > 80) {
							if (o.mx > 0) {
								this.prev()
							} else {
								this.next()
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
				}).bind(this),
			})
		}
	}
	
	win.PhotoSwitch = PhotoSwitch
})(window)


