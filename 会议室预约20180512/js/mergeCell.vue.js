
// 注： 所有行高必须一致，为出现不致行高，请注意限制字数。字数由样式内单元格宽度决定
var mergecell = {
	props: ['initdata','abc'],
	template: '<div class="">\
		<h1 class="ztitle" @click="da(initdata)">会议室预约</h1>\
		<div class="fiex" ref="fiex" ></div>\
		<table border="" class="table" cellspacing="" cellpadding="" >\
			<tr>\
				<th v-for="(item,index) in tableData[0]" v-text="index ? (\'周\' + index) : \'时间/周\'"></th>\
			</tr>\
			<tr v-for="(item,index) in tableData">\
				<td v-for="(key,val) in item" :index="val" @touchstart="getTdSiteStart($event)" @touchmove="getTdSiteMove($event)" @touchend="getTdSiteEnd($event)" v-if="key.row != 0" :class="{cas: key.remark, caself: key.flag}" :rowspan="key.row">{{val ? key.title : index + conf.startRowTime + \'：00\'}}</td>\
			</tr>\
		</table>\
	</div>',
	data: function() {
		return {
			conf: { // 可配置项
				tr: 10, // 单元格总行数
				td: 7, // 单元格总列数
				startRowTime: 8, // 第一行时间基数，即：从几点开始
				waitingWith: 0.3 // 超出一格多少时算做一整行，数值越大需滑动更长才算做一整行，最大值为1
			},
			tableData: [],	// 预定义驱动数据
			resData: this.initdata, // 预定义请求数据
			touchSite: { // 记录位置及滑动长度
				startX: 0, 
				startY: 0,
				moveX: 0,
				moveY: 0
			},
			ot: 0, // 当前触到的单元格距浏览器视窗(webView)顶部长度
			h: 0, // 记录当前单元格高度，为当前滑块div记录尺寸
			w: 0, // 记录当前单元格宽度，为当前滑块div记录尺寸
			ch: 0, // 当前触点距当前单元格顶部的距离
			tx: 0, // 记录最初手触单元格所在第几行
			ty: 0, // 记录最初手触单元格所处第几列
			fn: 1, // 记录手触当前行到结束行的行数，即：共滑动了几行，因手触行为1行，故必须设置为1行
			ismove: true, // 为防止滑动到已预约单元格，故设置此标志
			init: false
		}
	},
	mounted: function () {
		var _this = this;
		this.init = 1 + 1;
		// 初始化驱动数据
		this.tableData = this._lie(this.conf.tr,this.conf.td);
		
	},
	methods: {
		// 手触到单元格并初始化数据
		getTdSiteStart: function (ee) {
			ee.preventDefault()
			if (new RegExp(' cas ', 'g').test(' ' + ee.target.className + ' ')) return;
			this.ot = ee.target.offsetTop;
			this.h = ee.target.offsetHeight;
			this.w = ee.target.offsetWidth;
			this.ch = ee.targetTouches[0].pageY - ee.target.offsetTop - ee.target.offsetHeight * this.conf.waitingWith;
			this.t = ee.targetTouches[0].pageY - this.ch;
			this.tx = ee.target.parentNode.rowIndex - 1;
			this.ty = ee.target.getAttribute('index');
			this.fn = 1
			this.touchSite = {
				startX: ee.targetTouches[0].pageX,
				startY: ee.targetTouches[0].pageY,
				moveX: 0,
				moveY: 0
			}
			ee.target.appendChild(this.$refs.fiex);
			this.$refs.fiex.style.display = 'block';
			this.$refs.fiex.style.width = this.w + 'px';
			this.$refs.fiex.style.height = this.h + 'px';
		},
		// 开始滑动,更新初始化数据
		getTdSiteMove: function (ee) {
			if(!this.ismove) return;
			if (new RegExp(' cas ', 'g').test(' ' + ee.target.className + ' ')) return;
			ee.preventDefault();
			this.touchSite.moveX = ee.targetTouches[0].pageX - this.touchSite.startX;
			this.touchSite.moveY = ee.targetTouches[0].pageY - this.touchSite.startY;
			var top = ee.target.offsetTop + ee.target.clientHeight;
			var site = ee.targetTouches[0].pageY - ee.target.parentNode.parentNode.parentNode.offsetTop;
			var fn1 = Math.floor((this.ch + this.touchSite.moveY)/this.h)
			var cn1 = Math.ceil((this.ch + this.touchSite.moveY)/this.h) // 往下或往上滑动了几行 
			//防止滑到已预约的单元格上， 创造此条件this.ismove为false,另外，防止第一行往上滑时报错
			if((this.tx - 1 + cn1) >= 0 && ( this.conf.tr >= this.tx - 1 + cn1)) {
				var isNext = this.tableData[this.tx - 1 + cn1][this.ty];
				this.ismove = isNext.remark ? false : true;
			} else if ((this.tx + cn1) >= 0 && ( this.conf.tr >= this.tx - 1 + cn1)){
				var isNext = this.tableData[this.tx + cn1][this.ty];
				this.ismove = isNext.remark ? false : true;
			} else {
				this.ismove = false;
			}
			// 只有没预约的单元格才可滑动预约
			if(this.ismove) {
				if((this.ch + this.touchSite.moveY) > this.h * fn1 ) {
					this.$refs.fiex.style.height = this.h * cn1 + 'px';
				}
				this.fn = cn1; // 将滑动行数赋给fn，为改变驱动数据做记录。
			} else {
				this.ismove = false;
			}
		},
		// 手触单元格结束
		getTdSiteEnd: function (ee) {
			// 手触到已被预约的单元格上立即退出
			if (new RegExp(' cas ', 'g').test(' ' + ee.target.className + ' ') && this.fn > 1) return;
			// 按滑动行数记录,更新为最终驱动数据
			for(var m = 0; m < this.fn; m++) {
				this.$set(this.tableData[this.tx + m], this.ty, {
					row: 0, 
					title: '', 
					remark: true
				});
			}
			// 行数大于0时，按记录行数更新驱动数据； 为避免滑动后的行数为负数，导致浏览器报错
			if(this.fn > 0) {
				this.$set(this.tableData[this.tx], this.ty, {
					row: this.fn, 
					title: '已预约成功', 
					flag: true, 
					remark: true
				});
				this.$refs.fiex.style.display = 'none';
			}
			this.ismove = true;
		},
		// 创建驱动数据
		_lie: function (tr,td) {
			var arr = [];
			for(var t = 0; t <= tr; t++) {
				arr[t] = []
				for(var d = 0; d <= td; d++) {
					arr[t].push({
						row:1, 
						title: ''
					});
				}
			}
			return arr;
		},
		// 按请求数据更新驱动数据
		_modifyTableData: function(curArr) {
			if(curArr[1].hour - curArr[0].hour >= 1) {
				// 更新被合并行数据，将被合并行row设置为0
				for (var h = 0; h < (curArr[1].hour - curArr[0].hour); h++) {
					var tempRow = curArr[0].hour - this.conf.startRowTime + h;
					this.$set(this.tableData[tempRow], curArr[0].week-1, {
						row: 0, 
						title: '', 
						remark: true
					});
				}
				// 更新合并行数据，将合并行row设置为指定的行数
				this.$set(this.tableData[curArr[0].hour - this.conf.startRowTime], curArr[0].week-1, {
					row: curArr[1].hour - curArr[0].hour, 
					title: curArr[2].uname + curArr[2].remark, 
					remark: true
				});
			}
		},
		// 将纵向数据处理为vue易渲染的横行数据，并返回
		_getHour: function (itemObj) {
			// 格式化会议开始时间
			var startTime = new Date(itemObj.starttime);
			// 格式化会议结束时间
			var endTime = new Date(itemObj.endtime);
			return [
				{
					week: startTime.getDay(), // 第几周开始
					hour: startTime.getHours() // 几点开始
				},
				{
					week: endTime.getDay(), // 第几周结束
					hour: endTime.getHours() // 几点结束
				},
				{
					remark: itemObj.remark, // 预约信息
					uname: itemObj.uname // 预约人
				}
			];
		},
		// resData请求得到数据后,开始整理驱动数据
		changeData: function() {
			var _this = this;
			var tableTime = []; // 存放整理后数据
			// 外循环周
			for(var w = 0; w < this.resData.length; w++) {
				var wData = this.resData[w];
				// 内循环一天内预约次数
				for(var l = 0; l < wData.length; l++) {
					tableTime.push(this._getHour(wData[l])); 
				}
			}
			// 更新驱动数据			
			tableTime.forEach(function (curArr) {
				// 会议开始时间与结束时间必须保证一小时以上
				if(curArr[1].hour - curArr[0].hour >= 1) {
					// 将预约的多个小时行row,设置为0，即合并单元格判断依据
					for (var h = 0; h < (curArr[1].hour - curArr[0].hour); h++) {
						var tempRow = curArr[0].hour - _this.conf.startRowTime + h;
						_this.$set(_this.tableData[tempRow], (curArr[0].week-1),{
							row: 0,
							title: '',
							remark: true
						});
					}
					// 更新合并行数据，将合并行row设置为指定的行数
					_this.$set(_this.tableData[curArr[0].hour - _this.conf.startRowTime], (curArr[0].week-1),{
						row: curArr[1].hour - curArr[0].hour,
						title: curArr[2].uname + curArr[2].remark,
						remark: true
					});
				}
			});
		}
	},
	watch: {
		init: function() {
			this.changeData();
		}
	},
	computed: {
	}
}
