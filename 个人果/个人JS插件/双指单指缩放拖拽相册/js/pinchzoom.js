/**
 * Pinch zoom
 * @version 1.0.0
 * @author zzl
 * @param el
 * @param options
 * @constructor
 */
var PinchZoom = function (el, options) {
        this.el = el;
        this.zoomFactor = 1;
        this.lastScale = 1;
        this.sx = 0
		this.sy = 0
		this.mx = 0
		this.my = 0
		this.imgHeight = 0 // 图片尺寸
        this.offset = {
            x: 0,
            y: 0
        };
        this.options = Object.assign({}, this.defaults, options);
        this.setupMarkup();
        this.bindEvents();
        this.update();
        // 默认启用。
        this.enable();

    },
    sum = function (a, b) {
        return a + b;
    },
    isCloseTo = function (value, expected) {
        return value > expected - 0.01 && value < expected + 0.01;
    };

PinchZoom.prototype = {

    defaults: {
        tapZoomFactor: 2,
        zoomOutFactor: 1.3,
        animationDuration: 300,
        maxZoom: 4,
        minZoom: 0.5,
        lockDragAxis: false,
        use2d: true,
        zoomStartEventName: function pz_zoomstart () {},
        zoomEndEventName: function pz_zoomend () {},
        dragStartEventName: function pz_dragstart () {},
        dragEndEventName: function pz_dragend () {},
        moveStartEventName: function pz_movestart () {}, // 没缩放比例时生效, 图片上的坐标事件
        moveEventName: function pz_move () {}, // 没缩放比例时生效, 图片上的坐标事件
        moveEndEventName: function pz_moveend () {}, // 没缩放比例时生效, 图片上的坐标事件
        tapEventName: function pz_tap () {},
        doubleTapEventName: function pz_doubletap () {}
    },
	
    /**
     * Event handler for 'dragstart'
     * @param event
     */
    handleDragStart: function (event) {
        this.trigger(this.options.dragStartEventName, event);
        this.stopAnimation();
        this.lastDragPosition = false;
        this.hasInteraction = true;
        this.handleDrag(event);
    },

    /**
     * Event handler for 'drag'
     * @param event
     */
    handleDrag: function (event) {

        if (this.zoomFactor > 1.0) {
            var touch = this.getTouches(event)[0];
            this.drag(touch, this.lastDragPosition);
            this.offset = this.sanitizeOffset(this.offset);
            this.lastDragPosition = touch;
        }
    },
	moveStartEvent: function (event) {
		this.trigger(this.options.moveStartEventName, event);
	},
	moveEvent: function (event) {
		this.trigger(this.options.moveEventName, event);
	},
	moveEndEvent: function (event) {
		this.trigger(this.options.moveEndEventName, event);
	},
    handleDragEnd: function () {
        this.trigger(this.options.dragEndEventName, event);
        this.end();
    },
	trigger: function (callfn, event) {
		if (callfn && event) {
			callfn({that: this, eve: event})
		} else if (callfn) {
			callfn(this)
		}
	},
	
    /**
     * Event handler for 'zoomstart'
     * @param event
     */
    handleZoomStart: function (event) {
        this.trigger(this.options.zoomStartEventName, event);
        this.stopAnimation();
        this.lastScale = 1;
        this.nthZoom = 0;
        this.lastZoomCenter = false;
        this.hasInteraction = true;
    },

    /**
     * Event handler for 'zoom'
     * @param event
     */
    handleZoom: function (event, newScale) {

        // a relative scale factor is used
        var touchCenter = this.getTouchCenter(this.getTouches(event)),
            scale = newScale / this.lastScale;
        this.lastScale = newScale;

        // the first touch events are thrown away since they are not precise
        this.nthZoom += 1;
        if (this.nthZoom > 3) {

            this.scale(scale, touchCenter);
            this.drag(touchCenter, this.lastZoomCenter);
        }
        this.lastZoomCenter = touchCenter;
    },

    handleZoomEnd: function () {
        this.trigger(this.options.zoomEndEventName, event);
        this.end();
    },
	
	handleTap: function () {
        this.trigger(this.options.tapEventName, event);
        this.end();
    },
	
    /**
     * Event handler for 'doubletap'
     * @param event
     */
    handleDoubleTap: function (event) {
        var center = this.getTouches(event)[0],
            zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
            startZoomFactor = this.zoomFactor,
            updateProgress = (function (progress) {
                this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
            }).bind(this);

        if (this.hasInteraction) {
            return;
        }
        if (startZoomFactor > zoomFactor) {
            center = this.getCurrentZoomCenter();
        }

        this.animate(this.options.animationDuration, updateProgress, this.swing);
        this.trigger(this.options.doubleTapEventName, event);
    },

    /**
     * 偏移的最大/最小值
     * @param offset
     * @return {Object} 已消毒的偏移量
     */
    sanitizeOffset: function (offset) {
        var maxX = (this.zoomFactor - 1) * this.getContainerX(),
            maxY = (this.zoomFactor - 1) * this.getContainerY(),
            maxOffsetX = Math.max(maxX, 0),
            maxOffsetY = Math.max(maxY, 0),
            minOffsetX = Math.min(maxX, 0),
            minOffsetY = Math.min(maxY, 0);

        return {
            x: Math.min(Math.max(offset.x, minOffsetX), maxOffsetX),
            y: Math.min(Math.max(offset.y, minOffsetY), maxOffsetY)
        };
    },

    /**
     * 缩放到特定的缩放比例（非相对）
     * @param zoomFactor
     * @param center
     */
    scaleTo: function (zoomFactor, center) {
        this.scale(zoomFactor / this.zoomFactor, center);
    },

    /**
     * 从指定的中心缩放元素
     * @param scale
     * @param center
     */
    scale: function (scale, center) {
        scale = this.scaleZoomFactor(scale);
        this.addOffset({
            x: (scale - 1) * (center.x + this.offset.x),
            y: (scale - 1) * (center.y + this.offset.y)
        });
    },

    /**
     * 缩放比例和当前缩放状态相比较
     * @param scale
     * @return 实际比例（因最大最小缩放因子而不同）
     */
    scaleZoomFactor: function (scale) {
        var originalZoomFactor = this.zoomFactor;
        this.zoomFactor *= scale;
        this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom));
        return this.zoomFactor / originalZoomFactor;
    },

    /**
     * 拖拖元素
     * @param center
     * @param lastCenter
     */
    drag: function (center, lastCenter) {
        if (lastCenter) {
          if(this.options.lockDragAxis) {
            // 锁定滚动到更改最多的位置
            if(Math.abs(center.x - lastCenter.x) > Math.abs(center.y - lastCenter.y)) {
              this.addOffset({
                x: -(center.x - lastCenter.x),
                y: 0
              });
            }
            else {
              this.addOffset({
                y: -(center.y - lastCenter.y),
                x: 0
              });
            }
          }
          else {
            this.addOffset({
              y: -(center.y - lastCenter.y),
              x: -(center.x - lastCenter.x)
            });
          }
        }
    },

    /**
     * 计算多个触摸的触摸中心
     * @param touches
     * @return {Object}
     */
    getTouchCenter: function (touches) {
        return this.getVectorAvg(touches);
    },

    /**
     * 计算多个向量（x，y值）的平均值
     */
    getVectorAvg: function (vectors) {
        return {
            x: vectors.map(function (v) { return v.x; }).reduce(sum) / vectors.length,
            y: vectors.map(function (v) { return v.y; }).reduce(sum) / vectors.length
        };
    },

    /**
     * 添加偏移量
     * @param 偏移要添加的偏移量
     * @return 接受偏移量更改时返回true
     */
    addOffset: function (offset) {
        this.offset = {
            x: this.offset.x + offset.x,
            y: this.offset.y + offset.y
        };
    },

    sanitize: function () {
        if (this.zoomFactor < this.options.zoomOutFactor) {
            this.zoomOutAnimation();
        } else if (this.isInsaneOffset(this.offset)) {
            this.sanitizeOffsetAnimation();
        }
    },

    /**
     * 检查当前缩放因子的偏移是否正常
     * @param offset
     * @return {Boolean}
     */
    isInsaneOffset: function (offset) {
        var sanitizedOffset = this.sanitizeOffset(offset);
        return sanitizedOffset.x !== offset.x ||
            sanitizedOffset.y !== offset.y;
    },

    /**
     * 创建移动到正常偏移的动画
     */
    sanitizeOffsetAnimation: function () {
        var targetOffset = this.sanitizeOffset(this.offset),
            startOffset = {
                x: this.offset.x,
                y: this.offset.y
            },
            updateProgress = (function (progress) {
                this.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
                this.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
                this.update();
            }).bind(this);

        this.animate(
            this.options.animationDuration,
            updateProgress,
            this.swing
        );
    },

    /**
     * 缩放回原始位置，
     * （无偏移和缩放系数1）
     */
    zoomOutAnimation: function () {
        var startZoomFactor = this.zoomFactor,
            zoomFactor = 1,
            center = this.getCurrentZoomCenter(),
            updateProgress = (function (progress) {
                this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
            }).bind(this);

        this.animate(
            this.options.animationDuration,
            updateProgress,
            this.swing
        );
    },

    /**
     * 更新纵横比
     */
    updateAspectRatio: function () {
        this.setContainerY(this.getContainerX() / this.getAspectRatio());
        // this.setContainerY(window.innerHeight)
    },

    /**
     * 计算初始缩放因子（使元素适合容器）
     * @return the initial zoom factor
     */
    getInitialZoomFactor: function () {
        // 使用.offsetWidth代替width（）
        // 因为jQuery-width（）返回原始宽度，而Zepto-width（）将使用transform计算宽度。
        // 与.height（）相同
        return this.container.offsetWidth / this.el.offsetWidth;
    },

    /**
     * 计算元素的纵横比
     * @return the aspect ratio
     */
    getAspectRatio: function () {
        return this.el.offsetWidth / this.el.offsetHeight;
    },

    /**
     * 计算当前偏移和缩放因子的虚拟缩放中心
     * (used for reverse zoom)
     * @return {Object} the current zoom center
     */
    getCurrentZoomCenter: function () {

        // 使用以下公式计算缩放中心x值
        // offset_left / offset_right = zoomcenter_x / (container_x - zoomcenter_x)
        var length = this.container.offsetWidth * this.zoomFactor,
            offsetLeft  = this.offset.x,
            offsetRight = length - offsetLeft -this.container.offsetWidth,
            widthOffsetRatio = offsetLeft / offsetRight,
            centerX = widthOffsetRatio * this.container.offsetWidth / (widthOffsetRatio + 1),

        // zoomcenter y也是如此
            height = this.container.offsetHeight * this.zoomFactor,
            offsetTop  = this.offset.y,
            offsetBottom = height - offsetTop - this.container.offsetHeight,
            heightOffsetRatio = offsetTop / offsetBottom,
            centerY = heightOffsetRatio * this.container.offsetHeight / (heightOffsetRatio + 1);

        // 防止被零除
        if (offsetRight === 0) { centerX = this.container.offsetWidth; }
        if (offsetBottom === 0) { centerY = this.container.offsetHeight; }

        return {
            x: centerX,
            y: centerY
        };
    },

    canDrag: function (target) {
        return !isCloseTo(this.zoomFactor, 1);
    },
	position: function (target) { 
		// jquery position原生实现
        return {
            top: target.offsetTop,
            left: target.offsetLeft,
        }
   },
    /**
     * 返回事件相对于容器偏移量的接触
     * @param event
     * @return array touches
     */
    getTouches: function (event) {
        var position = this.position(this.container);
        return Array.prototype.slice.call(event.touches).map(function (touch) {
            return {
                x: touch.pageX - position.left,
                y: touch.pageY - position.top
            };
        });
    },

    /**
     * 动画循环
     * 不支持同步动画
     * @param duration
     * @param framefn
     * @param timefn
     * @param callback
     */
    animate: function (duration, framefn, timefn, callback) {
        var startTime = new Date().getTime(),
            renderFrame = (function () {
                if (!this.inAnimation) { return; }
                var frameTime = new Date().getTime() - startTime,
                    progress = frameTime / duration;
                if (frameTime >= duration) {
                    framefn(1);
                    if (callback) {
                        callback();
                    }
                    this.update();
                    this.stopAnimation();
                    this.update();
                } else {
                    if (timefn) {
                        progress = timefn(progress);
                    }
                    framefn(progress);
                    this.update();
                    requestAnimationFrame(renderFrame);
                }
            }).bind(this);
        this.inAnimation = true;
        requestAnimationFrame(renderFrame);
    },

    /**
     * 停止动画
     */
    stopAnimation: function () {
        this.inAnimation = false;
    },
    /**
     * 获取图片尺寸 
     * @param {Object} imgDom
     * @param {Object} callFn
     */
	getImgDimensions: function (imgDom, callFn) {
	　　var w, h;
	　　if (!imgDom.naturalWidth) { // 现代浏览器
	
	　　　　nWidth = imgDom.naturalWidth
	　　　　nHeight = imgDom.naturalHeight
	　　　　callFn({width: w, height: h})
	
	　　} else { // IE6/7/8
	　　　　var img = new Image()
	        img.onload = function() {
	            w = img.width
	            h = img.height
	           callFn({width: w, height: h})
	　　　　}
	　　　　img.src = imgDom.src
	　　}
	},
    /**
     * 动画的摆动计时功能
     * @param p
     * @return {Number}
     */
    swing: function (p) {
        return -Math.cos(p * Math.PI) / 2  + 0.5;
    },

    getContainerX: function () {
        return this.container.offsetWidth;
    },

    getContainerY: function () {
        return this.container.offsetHeight;
    },
	
    setContainerY: function (y) {
    	
    	
    	
    	if (parseInt(this.imgHeight) == parseInt(this.container.style.height)) return // 相同不需要重复赋值高度
    	this.getImgDimensions(this.container.querySelector('img'), (function (img) {
    		var pageHeight = window.innerHeight
    		var boxheight = window.innerWidth / img.width * img.height
    		console.log(img.height)
    		// var boxheight = this.getContainerX() / img.width * img.height
    		if (boxheight < pageHeight) {
    			// boxheight = this.getContainerY()
    			this.container.style.top = parseInt(pageHeight - boxheight)/ 2 + 'px'
    			return this.container.style.height = boxheight + 'px';
    		} else {
    			this.container.style.removeProperty('top')
    			return this.container.style.height = boxheight + 'px';
    		}
    		
    		// boxheight = boxheight < this.getContainerY() ? this.getContainerY() : boxheight
    		// return this.container.style.height = boxheight + 'px';
    	}).bind(this))
        // return this.container.style.height = y + 'px';
        
    },

    /**
     * 创建预期的html结构
     */
    setupMarkup: function () {
        // this.container = document.createElement('div')
        // this.container.classList.add('pinch-zoom-container')
        // this.el.parentNode.insertBefore(this.container,this.el);
// 
        // this.container.appendChild( this.el)
// 
		// this.container.style.overflow = 'hidden'
		// this.container.style.position = 'relative'
        // Zepto doesn't recognize `webkitTransform..` style
        this.container = this.el
        this.el.style.webkitTransformOrigin = '0% 0%'
        this.el.style.transformOrigin = '0% 0%'
        // this.el.style.position = 'absolute'
    },

    end: function () {
        this.hasInteraction = false;
        this.sanitize();
        this.update();
    },

    /**
     * 绑定所有必需的事件侦听器
     */
    bindEvents: function () {
        detectGestures(this.container, this);
        // Zepto and jQuery both know about `on`
        window.addEventListener('resize', this.update.bind(this), false)
        this.el.querySelector('img').addEventListener('load', this.update.bind(this))
    },

    /**
     * 根据当前缩放因子和偏移量更新css值
     */
    update: function () {
        if (this.updatePlaned) {
            return;
        }
        this.updatePlaned = true;

        setTimeout((function () {
            this.updatePlaned = false;
            this.updateAspectRatio();
            var zoomFactor = this.getInitialZoomFactor() * this.zoomFactor,
                offsetX = -this.offset.x / zoomFactor,
                offsetY = -this.offset.y / zoomFactor,
                transform3d =   'scale3d('     + zoomFactor + ', '  + zoomFactor + ',1) ' +
                    'translate3d(' + offsetX    + 'px,' + offsetY    + 'px,0px)',
                transform2d="scale("+zoomFactor+", "+zoomFactor+") "+"translate("+offsetX+"px,"+offsetY+"px)",
                removeClone = (function () {
                    if (this.clone) {
                        this.clone.remove();
                        delete this.clone;
                    }
                }).bind(this);

            // 缩放3d和translate3d更快（至少在ios上）
            // 但它们也降低了质量
            // PinchZoom在交互过程中使用3d变换
            // 在相互作用之后，它又回到二维变换
            if (!this.options.use2d || this.hasInteraction || this.inAnimation) {
                this.is3d = true;
                removeClone();
                this.el.style.webkitTransform = transform3d
                this.el.style.transform = transform3d
            } else {

                // 从三维转换为二维转换时，webkit出现一些问题。
                // 为了避免这种情况，当图元从三维转换为二维变换时，将在前景中显示三维转换图元的副本
                if (this.is3d) {
                    this.clone = this.el.cloneNode();
                    this.clone.style.PointerEvents = 'none'
                    this.container.appendChild(this.clone)
                    setTimeout(removeClone, 200);
                }
                
                this.el.style.webkitTransform = transform2d
                this.el.style.transform = transform2d
                
                this.is3d = false;
            }
        }).bind(this), 0);
    },

    /**
     * 启用手势的事件处理
     */
    enable: function() {
      this.enabled = true;
    },

    /**
     * 禁用手势的事件处理
     */
    disable: function() {
      this.enabled = false;
    },
    
    /**
     * 消毁所有事件
     */
    destroy: function () {
    	// this.disable()
    	window.removeEventListener('resize', this.update.bind(this))
        this.el.querySelector('img').removeEventListener('load', this.update.bind(this))
        this.el.removeEventListener('touchstart', touchstarthandler, false);
        this.el.removeEventListener('touchstart', touchstarthandler, false);
        this.el.removeEventListener('touchstart', touchstarthandler, false);
    }
};

var touchstarthandler = null,
    touchmovehandler = null,
	touchendhandler = null
	
var detectGestures = function (el, target) {
    var interaction = null,
	    isTap = false, // 是否触发单次tap事件
	    isdoubleTap = false, // 是否触发双tap事件
	    timer = null, // 计时器，配合isTap 和dobuleTap 使用
	    eventing = false, // 正在滑屏
        fingers = 0,
        lastTouchStart = null,
        startTouches = null,
        setInteraction = function (newInteraction, event) {
            if (interaction !== newInteraction) {

                if (interaction && !newInteraction) {
                    switch (interaction) {
                        case "zoom":
                            target.handleZoomEnd(event);
                            break;
                        case 'drag':
                            target.handleDragEnd(event);
                            break;
                    }
                }

                switch (newInteraction) {
                    case 'zoom':
                        target.handleZoomStart(event);
                        break;
                    case 'drag':
                        target.handleDragStart(event);
                        break;
                }
            }
            interaction = newInteraction;
        },

        updateInteraction = function (event) {
            if (fingers === 2) {
                setInteraction('zoom');
            } else if (fingers === 1 && target.canDrag()) {
                setInteraction('drag', event);
            } else {
                setInteraction(null, event);
            }
        },

        targetTouches = function (touches) {
            return Array.prototype.slice.call(touches).map(function (touch) {
                return {
                    x: touch.pageX,
                    y: touch.pageY
                };
            });
        },

        getDistance = function (a, b) {
            var x, y;
            x = a.x - b.x;
            y = a.y - b.y;
            return Math.sqrt(x * x + y * y);
        },

        calculateScale = function (startTouches, endTouches) {
            var startDistance = getDistance(startTouches[0], startTouches[1]),
                endDistance = getDistance(endTouches[0], endTouches[1]);
            return endDistance / startDistance;
        },

        cancelEvent = function (event) {
            event.stopPropagation();
            event.preventDefault();
        },
		detectDoubleTap = function (event) {
            var time = (new Date()).getTime();

            if (fingers > 1) {
                lastTouchStart = null;
            }
			isTap = false
			isdoubleTap = false
			if (timer) {
				clearTimeout(timer)
				timer = null
			}
            if (time - lastTouchStart < 300) {
                cancelEvent(event);
				isdoubleTap = true
				if (timer) {
					clearTimeout(timer)
					timer = null
				}
                target.handleDoubleTap(event);
                switch (interaction) {
                    case "zoom":
                        target.handleZoomEnd(event);
                        break;
                    case 'drag':
                        target.handleDragEnd(event);
                        break;
                }
                lastTouchStart = null
                
            }
			timer = setTimeout(function () {
				if (!eventing && isTap && !isdoubleTap) {
					target.handleTap(event); // 触发tap事件
					isTap = false
					isdoubleTap = false
				}
				if (timer) {
					clearTimeout(timer)
					timer = null
				}
			}, 300)
			
            if (fingers === 1) {
                lastTouchStart = time;
            }
        },
        getImgHeight = function () { // 暂存图片尺寸
	        target.getImgDimensions(target.container.querySelector('img'), function (img) {
	        	var boxheight = target.getContainerX() / img.width * img.height
	        	boxheight = boxheight < target.getContainerY() ? target.getContainerY() : boxheight
        		target.imgHeight = boxheight
    	    })
		},
        firstMove = true;
        
        
        var sx,sy
	touchstarthandler = function (event) {
        if(target.enabled) {
            firstMove = true;
            fingers = event.touches.length;
            detectDoubleTap(event);
            if(target.zoomFactor == 1) {
				target.sx = event.touches[0].pageX
				target.sy = event.touches[0].pageY
				target.mx = 0
				target.my = 0
				target.moveStartEvent(event);
			}
            sx = event.touches[0].pageX
            sy = event.touches[0].pageY
            getImgHeight()
        }
	}
    el.addEventListener('touchstart', touchstarthandler, false);
    
	touchmovehandler = function (event) {
        if(target.enabled && (Math.abs(event.touches[0].pageX - sx) >= 2 || Math.abs(event.touches[0].pageY - sy) >= 2)) {
            if (firstMove) {
                updateInteraction(event);
                if (interaction) {
                    cancelEvent(event);
                }
                startTouches = targetTouches(event.touches);
            } else {
                switch (interaction) {
                    case 'zoom':
                        target.handleZoom(event, calculateScale(startTouches, targetTouches(event.touches)));
                        break;
                    case 'drag':
                        target.handleDrag(event);
                        break;
                }
                if (interaction) {
                    cancelEvent(event);
                    target.update();
                }
            }
			
			if(target.zoomFactor == 1) {
				target.mx = event.touches[0].pageX 
				target.mx = event.touches[0].pageY
				target.moveEvent(event);
			}
            firstMove = false;
            isTap = false;
        }
        if (timer) {
			clearTimeout(timer)
			timer = null
		}
		eventing = true
    }
    el.addEventListener('touchmove', touchmovehandler, false);


	touchendhandler = function (event) {
        if(target.enabled) {
            fingers = event.touches.length;
            updateInteraction(event);
            isTap = true // 标志已经抬起，tap事件触发必要条件
			eventing = false
			if(target.zoomFactor == 1) {
				target.moveEndEvent(event);
			}
        }
    }
    el.addEventListener('touchend', touchendhandler, false);
};

