(function(win) {
	/**
	 * 过去m年和未来n年
	 * @param {Element} clickDom指定触发的标签
	 * @param {Object} m过去m年
	 * @param {Object} n过来n年
	 * @param {Element} show指定显示数据的标签
	 * 此功能没有事件委托，有待提升
	 */
	CXFun_getdate = function(clickDom, m, n, show){
		var that = this;
		this.show = show;
		this.zclassDate = document.querySelector(clickDom);
	    // 初始化时间
	    var now = new Date();
	    var nowYear = now.getFullYear();
	    var nowMonth = now.getMonth() + 1;
	    var nowDate = now.getDate();
	    if (this.show) {
			this.zclassDate.querySelector(this.show).setAttribute('data-year', nowYear);
		    this.zclassDate.querySelector(this.show).setAttribute('data-month', nowMonth);
		    this.zclassDate.querySelector(this.show).setAttribute('data-date', nowDate);	    	
	    } else {
	    	this.zclassDate.setAttribute('data-year', nowYear);
		    this.zclassDate.setAttribute('data-month', nowMonth);
		    this.zclassDate.setAttribute('data-date', nowDate);
	    }
	    // 数据初始化
	    function formatYear (nowYear) {
	        var arr = [];
	        for (var i = nowYear - m; i <= nowYear + n; i++) {
	            arr.push({
	                id: i + '',
	                value: i + '年'
	            });
	        }
	        return arr;
	    }
	    function formatMonth () {
	        var arr = [];
	        for (var i = 1; i <= 12; i++) {
	            arr.push({
	                id: i + '',
	                value: i + '月'
	            });
	        }
	        return arr;
	    }
	    function formatDate (count) {
	        var arr = [];
	        for (var i = 1; i <= count; i++) {
	            arr.push({
	                id: i + '',
	                value: i + '日'
	            });
	        }
	        return arr;
	    }
	    var yearData = function(callback) {
	            callback(formatYear(nowYear))
	    }
	    var monthData = function (year, callback) {
	            callback(formatMonth());
	    };
	    var dateData = function (year, month, callback) {
	            if (/^4|6|9|(11)$/.test(month)) {
	                callback(formatDate(30));
	            }
	            else if (/^1|3|5|7|8|(10)|(12)$/.test(month)) {
	                callback(formatDate(31));
	            }
	            else if (/^2$/.test(month)) {
	                if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
	                    callback(formatDate(29));
	                }
	                else {
	                    callback(formatDate(28));
	                }
	            }
	            else {
	                throw new Error('month is illegal');
	            }
	    };
	    this.zclassDate.addEventListener('click', function () {
	    	if (that.show) {
	    		var oneLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-year');
	    		var twoLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-month');
	    		var threeLevelId = that.zclassDate.querySelector(that.show).getAttribute('data-date');
	    	} else {
		        var oneLevelId = that.zclassDate.getAttribute('data-year');
		        var twoLevelId = that.zclassDate.getAttribute('data-month');
		        var threeLevelId = that.zclassDate.getAttribute('data-date');
	    	}
	        this.iosSelect = new IosSelect(3, 
	            [yearData, monthData, dateData],
	            {
	                title: '设置时间',
	                itemHeight: 0.6786,
		            headerHeight:0.819,
		            relation: [1, 1, 0, 0],
		            cssUnit:'rem',
		            itemShowCount: 7,
	                oneLevelId: oneLevelId,
	                twoLevelId: twoLevelId,
	                threeLevelId: threeLevelId,
	                showLoading: true,
	                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
	                    if (that.show) {
	                    	that.zclassDate.querySelector(that.show).setAttribute('data-year', selectOneObj.id);
	                    	that.zclassDate.querySelector(that.show).setAttribute('data-month', selectTwoObj.id);
	                    	that.zclassDate.querySelector(that.show).setAttribute('data-date', selectThreeObj.id);
	                    	that.zclassDate.querySelector(that.show).innerHTML = selectOneObj.value.replace(/年/, '') + '-' + selectTwoObj.value.replace(/月/, '') + '-' + selectThreeObj.value.replace(/日/, '');
	                    } else {
		                    that.zclassDate.setAttribute('data-year', selectOneObj.id);
		                    that.zclassDate.setAttribute('data-month', selectTwoObj.id);
		                    that.zclassDate.setAttribute('data-date', selectThreeObj.id);
		                    that.zclassDate.innerHTML = selectOneObj.value.replace(/年/, '') + '-' + selectTwoObj.value.replace(/月/, '') + '-' + selectThreeObj.value.replace(/日/, '');
	                    }
	                }
	        });
	    }, false);
    }
	
	// 将对像暴露给window
	win['CXFun_getdate'] = CXFun_getdate;
})(window);