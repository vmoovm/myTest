function PushRefresh(refreshId, objConf) {
	this.zconf = {
		backSite: -30,
		swipeDist: 40,
		refreshTime: 2000,
		swipeAngle: 60,
		isStopDown: false,
		pushDownTxt: '下拉刷新',
		releaseTxt: '释放刷新',
		pushDownLoadingTxt: '正在刷新...',
		scroll: null
	};
	this.zconf.onRefreshStart = function() {};
	this.zconf.onRefreshEnd = function() {};
	this.refreshId = document.querySelector(refreshId);
	this.zconf.site = {
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0,
		moveX: 0,
		moveY: 0,
		pushLen: 0
	};
	this.zconf = Object.assign(this.zconf, objConf);
	this.createRefresh(this.zconf);
	this.pushUpLoading = function() {};
}
PushRefresh.prototype.createRefresh = function(conf) {
	var refreshSelf = this;
	var eleScroll = conf.scroll ? document.querySelector(conf.scroll) : null;
	var scroll = eleScroll || window;
	var sTop = eleScroll ? eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
	var isRefresh = false;
	var pushDown = document.createElement('div');
	pushDown.className = "zrefresh", pushDown.id = 'pushDown';
	var pushState = document.createElement('p');
	pushState.className = "refreshing", pushState.id = "pushState";
	var pushTxt = document.createElement('p');
	pushTxt.className = "refresh_text", pushTxt.id = "pushTxt";
	pushDown.appendChild(pushState);
	pushDown.appendChild(pushTxt);
	pushTxt.innerHTML = conf.pushDownTxt;
	refreshSelf.refreshId.parentNode.insertBefore(pushDown, refreshSelf.refreshId);
	var touchS = function(event) {
		pushDown.classList.remove('zanimate');
		conf.site.startX = event.targetTouches[0].pageX;
		conf.site.startY = event.targetTouches[0].pageY;
	};
	var touchM = function(event) {
		conf.site.endX = event.targetTouches[0].pageX;
		conf.site.endY = event.targetTouches[0].pageY;
		conf.site.moveX = conf.site.endX - conf.site.startX, conf.site.moveY = conf.site.endY - conf.site.startY;
		if(conf.site.moveY <= 0 || conf.site.startY == 0) {
			isRefresh = false;
			pushDown.style.marginTop = conf.backSite + 'px';
			return false
		}
		if(conf.site.moveY > 2 && !conf.isStopDown) {
			event.preventDefault();
			var a = 0,
				b = 0,
				c = 0,
				degB = 0;
			a = Math.abs(conf.site.moveY);
			b = Math.abs(conf.site.moveX);
			c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
			degB = Math.floor(180 * Math.asin(b / c) / Math.PI);
			if(degB < conf.swipeAngle) {
				conf.site.pushLen = conf.site.moveY * 0.7;
				pushDown.style.marginTop = (conf.backSite + conf.site.pushLen) + 'px';
				if(conf.site.pushLen > conf.swipeDist) {
					pushTxt.innerHTML = conf.releaseTxt;
					isRefresh = true;
				} else {
					pushTxt.innerHTML = conf.pushDownTxt;
				}
			}
		}
	};
	var pushDownBack = function() {
		pushDown.style.marginTop = conf.site.pushLen + 'px';
		pushTxt.innerHTML = conf.pushDownTxt;
		pushState.classList.remove("zrunning");
		bindPushDown();
		conf.onRefreshEnd(refreshSelf);
	};
	var touchE = function() {
		unbindPushDown();
		if(isRefresh && conf.site.pushLen > conf.swipeDist) {
			pushDown.classList.add('zanimate');
			pushDown.style.marginTop = 4 + 'px';
			pushTxt.innerHTML = conf.pushDownLoadingTxt;
			pushState.classList.add("zrunning");
			conf.onRefreshStart(refreshSelf);
			isRefresh = false;
		} else {
			pushDown.classList.add('zanimate');
			pushDown.style.marginTop = conf.backSite + 'px';
			pushTxt.innerHTML = conf.pushDownTxt;
			pushState.classList.remove("zrunning");
			bindPushDown();
			return false;
		}
		conf.site.pushLen = conf.backSite;
		setTimeout(function() {
			pushDownBack();
		}, conf.refreshTime);
	};

	function bindPushDown() {
		refreshSelf.refreshId.addEventListener('touchstart', touchS, false);
		refreshSelf.refreshId.addEventListener('touchmove', touchM, false);
		refreshSelf.refreshId.addEventListener('touchend', touchE, false);
	};

	function unbindPushDown() {
		refreshSelf.refreshId.removeEventListener('touchstart', touchS);
		refreshSelf.refreshId.removeEventListener('touchmove', touchM);
		refreshSelf.refreshId.removeEventListener('touchend', touchE);
	};
	if(!(conf.sTop > 0) && !conf.isStopDown) {
		bindPushDown();
	} else {
		unbindPushDown();
	}
	scroll.addEventListener('scroll', function() {
		sTop = eleScroll ? eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
		if(sTop <= 0 && !conf.isStopDown) {
			bindPushDown();
		} else {
			unbindPushDown();
		}
	}, false);
}

function PushUp(PushUpId, objConf) {
	this.zconf = {
		isStopUp: false,
		loadingTxt: '加载中...',
		pushUpTxt: '上滑加载更多',
		warnningTxt: '没有更多',
		isData: true,
		scroll: null
	};
	this.zconf.Dataloading = function() {};
	this.PushUpId = document.querySelector(PushUpId);
	this.zconf = Object.assign(this.zconf, objConf);
	this.eleScroll = this.zconf.scroll ? document.querySelector(this.zconf.scroll) : null;
	this.sTop = this.eleScroll ? this.eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
	this.zheight = document.documentElement.clientHeight;
	this.refreshUp = document.createElement('div');
	this.refreshUp.className = "zrefresh", this.refreshUp.id = 'refreshUp';
	this.refreshState = document.createElement('p');
	this.refreshState.className = "refreshing", this.refreshState.id = 'refreshState';
	this.refreshTxt = document.createElement('p');
	this.refreshTxt.className = "refresh_text", this.refreshTxt.id = 'refreshTxt';
	this.refreshUp.appendChild(this.refreshState);
	this.refreshUp.appendChild(this.refreshTxt);
	this.refreshTxt.innerHTML = this.zconf.loadingTxt;
	this.pushUpInit(this.zconf);
};
PushUp.prototype.pushUpInit = function(conf) {
	var refreshSelf = this;
	var scroll = this.eleScroll || window;
	scroll.onscroll = function() {
		refreshSelf.sTop = refreshSelf.eleScroll ? refreshSelf.eleScroll.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
		var isState = refreshSelf.sTop + refreshSelf.zheight;
		var documentHeight = refreshSelf.eleScroll ? refreshSelf.eleScroll.scrollHeight : (document.documentElement.scrollHeight || document.body.scrollHeight);
		if(isState == documentHeight && !conf.isStopUp) {
			conf.isStopUp = true;
			conf.Dataloading(refreshSelf);
			refreshSelf.PushUpId.parentNode.appendChild(refreshSelf.refreshUp, refreshSelf.PushUpId);
			refreshSelf.refreshState.classList.add("zrunning");
		} else {}
	}
};
PushUp.prototype.ChangeState = function() {
	if(this.isData) {
		document.querySelector('#refreshUp').remove();
		this.zconf.isStopUp = false;
	} else {
		document.querySelector('#refreshTxt').innerHTML = this.zconf.warnningTxt;
		document.querySelector('#refreshState').style.display = 'none';
	}
};