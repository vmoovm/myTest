/* swiperSlide 滑动组件
 * 使用介绍：
 * 传一id  格式 #id
 * 请将以下classname注入到html中，具体请参考本实例
 * zswiperSlider-js
 * zswiperHandle-js
 * zswiperOptions-js
 * zswiperOption-js
 * 作者： 张中乐
 * 依赖关系：本组件-依赖-> onEvent.js
 * 
 * bug:
 * 1.由于使用了e.preventDefault(), window.scrollTo(),因此使页面滚动条失去了弹性
 * 
 * 
 * update: 2017-12-02
 * */
function swiperSlide (elId, objFn) {
	//长按进入编辑状态
	var timeLong = 0;
	var mw = 0;
	var self={//各种坐标
		startX:null,
		startY:null,
		endX:null,
		endY:null,
		moveX:null,
		moveY:null
	};
	objFn.astart = objFn.astart ? objFn.astart : function(){}
	objFn.aend = objFn.aend ? objFn.aend : function(){}
	objFn.fn = objFn.fn ? objFn.fn : function(){}
	objFn.longTap = objFn.longTap ? objFn.longTap : function(){}
	
	var els = document.querySelector(elId).querySelectorAll('.zswiperSlider-js')
	for(var i = 0; i < els.length; i++) {
    	els[i].addEventListener("animationstart", objFn.astart, false);
    	els[i].addEventListener("animationend", objFn.aend, false);
    	// els[i].addEventListener("animationiteration", listener, false);
	}
	
	// 使每个zswiper-js归位
	function homing (index) {
		var doms = document.querySelector(elId).querySelectorAll('.zswiperHandle-js')
		for (var i = 0; i < doms.length; i++) {
			if(new RegExp(' ztransition ', 'g').test(' ' + doms[i].className + ' ') && index != i) {
				setTransform(doms[i], 0)
			}
		}
	}
	// 获得最大滑动长度并返回长度
	function getMoveWidth (ele) {
		var domP=ele.querySelector('.zswiperOptions-js').querySelectorAll('.zswiperOption-js');
		var w = 0;
		if (domP.length > 1) {
			for (var i = 0; i < domP.length; i++) {
				w += domP[i].scrollWidth;
			}
		} else {
			w = domP[0].scrollWidth;
		}
		return w;
		
	}
	// 调translateX兼容
	var setTransform = function(obj, leftWidth) {
		leftWidth = leftWidth || 0;
		var style = 'translateX(' + leftWidth + 'px)'
		obj.style.webkitTransform = style;
		obj.style.transform = style;
	};
	// 获取滚动条位置
	function getScrollTop(){   
	    var scrollTop=0;   
	    if(document.documentElement&&document.documentElement.scrollTop){   
	        scrollTop=document.documentElement.scrollTop;   
	    }else if(document.body){   
	        scrollTop=document.body.scrollTop;   
	    }   
	    return scrollTop;   
	}
    var clear = null;
	var start = function (obj) {
		self={//重新初始化
			endX:null,
			endY:null,
			startX:null,
			startY:null
		};
		self.startX=obj.e.touches[0].pageX;
		self.startY=obj.e.touches[0].pageY;
		timeLong =  new Date() * 1;
		if (clear) {
			clearTimeout(clear);
			clear = null;
		}
		clear = setTimeout(objFn.longTap, 1000);
		// 触发点击目标事件
		if(new RegExp(' zswiperOption-js ', 'g').test(' ' + obj.e.target.className + ' ')) {
			objFn.fn(obj)
		}
		moveN.addEvt();
	}
	var move = function (obj) {
		obj.e.preventDefault();
		//偏移量
		self.endX=obj.e.touches[0].pageX-self.startX;
		self.endY=obj.e.touches[0].pageY-self.startY;
		if (Math.abs(self.endY) > Math.abs(self.endX)) {
			window.scrollTo(0, getScrollTop() - self.endY)
			console.log(123)
		} else {
			if (Math.abs(self.endX) > 4 || Math.abs(self.endY) > 4) {
				if (clear) {
					clearTimeout(clear);
					clear = null;
				}
			}
			mw = getMoveWidth (obj.self);
			if (self.endX > 0) {
				setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
			} else {
				homing(obj.self.index);
				if(Math.tan(20*Math.PI/180) > Math.abs(self.endY)/Math.abs(self.endX)) {
					self.endX = self.endX *.6;
					if (Math.abs(self.endX) >= mw) {
						self.endX = -mw
					}	
					obj.self.querySelector('.zswiperHandle-js').classList.remove('ztransition');
					setTransform(obj.self.querySelector('.zswiperHandle-js'), self.endX);
				} else {
					// setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
					// moveN.addEvt = false;
				}
			}
		}
	}
	
	var end = function (obj) {
		if (self.endX > 0) {
			if(Math.tan(20) > self.endY/self.endY) {
				
			}
			setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
		} else {
			if(Math.tan(20*Math.PI/180) > Math.abs(self.endY)/Math.abs(self.endX)) {
				console.log(new Date() * 1 - timeLong)
				if (Math.abs(self.endX) > mw * 0.3) {
					self.endX = -mw
					setTransform(obj.self.querySelector('.zswiperHandle-js'), self.endX);
					obj.self.querySelector('.zswiperHandle-js').classList.add('ztransition');
				} else {
					setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
					obj.self.querySelector('.zswiperHandle-js').classList.add('ztransition');
				}
			} else {
				setTransform(obj.self.querySelector('.zswiperHandle-js'), 0);
				obj.self.querySelector('.zswiperHandle-js').classList.add('ztransition');
			}
		}
		mw = 0;
    	timeLong = 0;
		clearTimeout(clear);
		clear = null;
    	moveN.removeEvt();
	}
	
	//长按进入编辑状态
    var startN = new On(elId, 'touchstart', '.zswiperSlider-js', start);
	var moveN = new On(elId, 'touchmove', '.zswiperSlider-js', move);
	var endN = new On(elId, 'touchend', '.zswiperSlider-js', end);
	moveN.removeEvt();
}