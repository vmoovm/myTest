(function(win) {
	CXFun_period = function(clickDom, n, show){
		var that = this;
		this.n = n;
		this.show = show;
		this.zperiodDom = document.querySelector(clickDom);
		
		// 初始化数据源
		var zinitArr = ['第一节','第二节','第三节','第四节','第五节','第六节','第七节','第八节','第九节','第十节','第十一节','第十二节','第十三节','第十四节','第十五节','第十六节'];
		
		
		// 获取数据长度
		function getCount (len) {
			var arr = [];
			for ( var i = 0; i < len; i++) {
				arr.push(zinitArr[i]);
			}
			return arr;
		}
		
		// 获取起始到结束的数据
		function getPeriod (start , len){
			var arr = [];
			for ( var i = start; i < zperiodArr.length; i++) {
				arr.push(
					{
					id: i + '',
					value: zperiodArr[i]
				});
			}
			return arr;
		}
		
		// 中间字
		var zhi = function (zhi) {
			var arr = [];
			for (var i = 0; i < zhi; i++) {
		        arr.push({
		            id: i,
		            value: '至'
		        });
		    }
			return arr;
		}
		
		// 定义数据长度
		var zperiodArr = getCount (this.n);
		
		var startData = function (callback) {
		    callback(getPeriod(0));
		};
		var zhiData = function(date, callback) {
		    callback(zhi(1));
		};
		var endData = function(date, hour, callback) {
			 callback(getPeriod(date));
		};
		
		this.zperiodDom.addEventListener('click', function () {
		    if (that.show) {
		    	var oneLevelId = that.zperiodDom.querySelector(that.show).getAttribute('data-start');
		    	var twoLevelId = that.zperiodDom.querySelector(that.show).getAttribute('data-zhi');
		    	var threeLevelId = that.zperiodDom.querySelector(that.show).getAttribute('data-end');
		    } else {
		    	var oneLevelId = that.zperiodDom.getAttribute('data-start');
		    	var twoLevelId = that.zperiodDom.getAttribute('data-zhi');
		    	var threeLevelId = that.zperiodDom.getAttribute('data-end');
		    }
		    var iosSelect = new IosSelect(3, 
		        [startData, zhiData, endData],
		        {
		            title: '设置节',
		            itemHeight: 0.6786,
		            headerHeight:0.819,
		            relation: [1, 0, 0, 0],
		            cssUnit:'rem',
		            itemShowCount: 7,
		            oneLevelId: oneLevelId,
		            twoLevelId: twoLevelId,
		            threeLevelId: threeLevelId,
		            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
		                var s = 0, e =0;
		                for(var n =0; n < zperiodArr.length; n++) {
		                	if(zperiodArr[n] == selectOneObj.value) {
		                		s = n;
		                	}
		                	if(zperiodArr[n] == selectThreeObj.value) {
		                		e = n;
		                	}
		                }
		                if (that.show) {
		                	that.zperiodDom.querySelector(that.show).setAttribute('data-start', selectOneObj.value);
		                	that.zperiodDom.querySelector(that.show).setAttribute('data-zhi', selectTwoObj.value);
		                	that.zperiodDom.querySelector(that.show).setAttribute('data-end', selectThreeObj.value);
		                	that.zperiodDom.querySelector(that.show).innerHTML = '第' + (s + 1)*1 + '—' + (e + 1)*1 + '节课';
		                } else {
		                	that.zperiodDom.setAttribute('data-start', selectOneObj.value);
		                	that.zperiodDom.setAttribute('data-zhi', selectTwoObj.value);
		                	that.zperiodDom.setAttribute('data-end', selectThreeObj.value);
		                	that.zperiodDom.innerHTML = '第' + (s + 1)*1 + '—' + (e + 1)*1 + '节课';
		                }
		            }
		    });
		});
	}
	// 将对像暴露给window
	win['CXFun_period'] = CXFun_period;
})(window);