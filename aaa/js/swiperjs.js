(function (win) {
	/**
	 * 滑动删除
	 * @param {Object} sid 范围id  例："#fid"
	 * @param {Object} sclass 单项class 例：'.fclass' 
	 */
	function SwiperJs (sid, sclass) {
		if (sid) {
			this.sid = sid
		}
		if (sclass) {
			this.sclass = sclass
		} else {
			alert('SwiperJs的第一个参数必传')
		}
		
		var swiperArr = [];
		var lastSlide = null;
		/**
		 * new Swiper
		 * 
		 */
		this.NewSwiper = function (that) {
			var self = this
			if (!that.getAttribute('isNew')) {
				that.setAttribute('isNew', 'new')
				return new Swiper(that, {
					slidesPerView: 'auto',
					onTouchStart: function(swiper,even){
				    	if (swiper.isBeginning) {
				    		swiper.unlockSwipeToNext();
				    		swiper.lockSwipeToPrev();
				    	}
				    	if (swiper.isEnd) {
				    		swiper.unlockSwipeToPrev();
				    		swiper.lockSwipeToNext();
				    	}
				    	if (self.fnSart && swiper) self.fnSart() 
				    	if (lastSlide && lastSlide != swiper) {
				    		lastSlide.slideTo(0)
				    	}
				    	lastSlide = swiper
					}
				})
			}
		}
		/**
		 * 初始化或者异步
		 */
		this.init = function () {
			if (this.sid) {
				var doms = document.querySelector(this.sid).querySelectorAll(this.sclass)
			} else {
				var doms = document.querySelectorAll(this.sclass)
			}
			for (var d = 0; d < doms.length; d++) {
				swiperArr.push(this.NewSwiper(doms[d]))
			}
		}
		
		this.init()
	}
	win.SwiperJs = SwiperJs
})(window);