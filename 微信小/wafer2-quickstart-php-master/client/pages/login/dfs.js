// pages/login/dfs.js
Page({

	/**
	 * 页面的初始数据
	 */
   	data: {
		flag: 5 < 10,
		checkboxItems: [
			{name: 'USA', value: '美国'},
			{ name: 'CHN', value: '中国', checked: true },
			{ name: 'BRA', value: '巴西' },
			{ name: 'JPN', value: '日本', checked: true},
			{ name: 'ENG', value: '英国' },
			{ name: 'TUR', value: '法国' }
		],
		radioItems: [
			{color:'红色', value: '中国', checked: true},
			{ color: '白色', value: '日本' },
			{ color: '蓝色', value: '美国' },
			{ color: '绿色', value: '巴西' },
			{ color: '黑色', value: '海盗' }
		],
		item: {
			index: 0,
			msg: 'this is a template',
			time: '2016-09-15'
		},
		dataimgs: [
			{
				url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511445031777&di=d59e0eb3ad9038ed004c5f20631b2f7b&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fd53f8794a4c27d1eef5c850c11d5ad6edcc438fb.jpg',
				title: '唯美紫禁城角楼风景壁纸,桌面背景图片,高清桌面壁纸下载',
				addr: '唯美紫禁'

			},
			{
				url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511445031777&di=5b14d1a6059b2f0240cd87ad81eac29b&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F34fae6cd7b899e511c16c7c648a7d933c9950d43.jpg',
				title: '漂亮的高清自然风景',
				addr: '风景图集'

			},
			{
				url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511445031776&di=fb77bcca8f212609a7e9e89e83d3e0c0&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fbf096b63f6246b60914025b4e2f81a4c500fa2a0.jpg',
				title: '自然风景摄影指南_自然风景摄影指南',
				addr: '自然风景'

			}
		]
  	},
	/**
	 * 多选美化操作
	 */
	checkboxChange: function (e) {
		var checked = e.detail.value
		var changed = {}
		for (var i = 0; i < this.data.checkboxItems.length; i++) {
			if (checked.indexOf(this.data.checkboxItems[i].name) === -1) {
				changed['checkboxItems[' + i + '].checked'] = false
			} else {
				changed['checkboxItems[' + i + '].checked'] = true
			}
		}
		this.setData(changed)
	},
	radioChange: function(e) {
		var checked = e.detail.value
		var changed = {}
		for (var n = 0; n < this.data.radioItems.length; n++) {
			if ( this.data.radioItems[n].color === checked) {
				changed['radioItems[' + n + '].checked'] = true
			} else {
				changed['radioItems[' + n + '].checked'] = false
			}
		}
		this.setData(changed)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
	
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
	
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
	
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
	
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
	
	}
})