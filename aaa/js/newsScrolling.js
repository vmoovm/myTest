(function(win) {
	/**
	 * 新闻向下向上滚动
	 * @param {IDString} id 父盒子ID,必填项
	 * @param {Number} t 时间间隔，毫秒1000 ，默认1500，可选填
	 * @param {Number} d 方向，-1向下滚动，1为下上滚动，默认为向上滚动，可选填
	 */
	CXFun_newScrolling = function(id, t, d) {
		var wrapView = document.getElementById(id),
			allow = true,
			t = t || 1500,
			fq = fq || 10,
			d = d == -1 ? -1 : 1;
			mh = wrapView.clientHeight;
		wrapView.innerHTML += wrapView.innerHTML;
		wrapView.onmouseover = function() {
			allow = false
		};
		wrapView.onmouseout = function() {
			allow = true
		};
		var max = parseInt(wrapView.scrollHeight / 2);
		new function() {
			var stop = wrapView.scrollTop % mh == 0 && !allow;
			if(!stop) {
				var set = d > 0 ? [max, 0] : [0, max];
				wrapView.scrollTop == set[0] ? wrapView.scrollTop = set[1] : wrapView.scrollTop += d;
			};
			setTimeout(arguments.callee, wrapView.scrollTop % mh ? fq : t);
		};
	};
	win['CXFun_newScrolling'] = CXFun_newScrolling
})(window);