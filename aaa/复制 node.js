(function (win){
	function NodeTree(id, options) {
		var that = this
		
		this.config = {
			newNodeFn: null, // 新建节点成功后
			deleteNodeFn: null, // 删除节点成功后
			setNodeFn: null, // 设置节点成功后
			addCaseFn: null, // 添加平行条件成功后
			newNodeBeforeFn: null, // 新建节点成功前
			deleteNodeBeforeFn: null, // 删除节点前
			addCaseBeforeFn: null, // 添加平行条件前
		}
		// 合并配置项
		if (options) {
			for (s in options) {
				this.config[s] = options[s]
			}
		}
		
	var elem_init=	'<div class="ztree-start" type="start">\
					<p class="zstart-btn">开始</p>\
					<div class="zalignCenter">\
						<p class="ztree-mArrow"></p>\
						<p class="ztree-plus">+</p>\
					</div>\
				</div>\
				<div class="ztree-end">\
					<div class="zalignCenter">\
						<p class="ztree-mArrow"></p>\
						<p class="zbtn">结束</p>\
					</div>\
				</div>'
		
		var elem_menu = '<ul class="zmenu" id="zmenu">\
			<li class="zmenu-row zmenu-verify" data-type="0"><i></i><span>审核环节</span></li>\
			<li class="zmenu-row zmenu-copy" data-type="1"><i></i><span>抄送节点</span></li>\
			<li class="zmenu-row zmenu-factor" data-type="3"><i></i><span>条件分值</span></li>\
			<li class="zmenu-row zmenu-level" data-type="2"><i></i><span>级别审核</span></li>\
		</ul>'
		
		// 元素节点
		var elem_node = '<div class="ztree-item">\
					<div class="zalignCenter">\
						<p class="ztree-mArrow"></p>\
					</div>\
					<div class="ztree-module module-js">\
						<div class="ztree-header"><i></i><span class="title-js">标题</span></div>\
						<div class="ztree-body">\
							<div class="ztree-content content-js">内容*** </div>\
						</div>\
						<div class="ztree-mask">\
							<div class="ztree-close"></div>\
							<div class="ztree-setting"><i></i><span>点击设置</span></div>\
						</div>\
					</div>\
					<div class="zalignCenter">\
						<p class="ztree-mArrow"></p>\
						<p class="ztree-plus">+</p>\
					</div>\
				</div>'
				
		// 条件标题 
		var factor_top = '<div class="ztree-txt factor-js">分支条件1</div>'
		
		// 新分支
		var factor_item = '<div class=" ztree-cell">\
				<div class="zborderCenter">\
					<p class="ztree-mArrow"></p>\
				</div>\
				<div class="ztree-case">\
					<div class="ztree-item ztree-last">\
						<p></p>\
					</div>\
				</div>\
			</div>'
		
		// 分支节点
		var node_factor='<div class="zalignCenter">\
							<p class="ztree-mArrow"></p>\
						</div>\
						<div class="ztree-extend">\
							<p class="zextend-btn">添加平行条件</p>\
						</div>\
						<div class="zalignCenter">\
							<p class="ztree-vLine"></p>\
						</div>\
						<div class="zdisplayCenter ztree-table">\
							<div class="ztree-cellLeft" style="height: 314px">\
								<p class="ztree-lArrow"></p>\
								<div class="ztree-case firstCase-js">\
								</div>\
							</div>\
							<div class="ztree-cellRight" style="height: 314px">\
								<p class="ztree-rArrow"></p>\
								<div class="ztree-case lastCase-js">\
								</div>\
							</div>\
						</div>'
		
		// 末尾节点竖线
		var node_last = '<div class="ztree-item ztree-last">\
										<p></p>\
									</div>'
		
		
		var node_cellA = '<div class=" ztree-cell">\
								<div class="zborderCenter">\
									<p class="ztree-mArrow"></p>\
								</div>\
								<div class="ztree-case">'
		var node_cellB = '</div></div>'
		
		
		// 结束节点
		var node_end = '<div class="ztree-end">\
							<div class="zalignCenter">\
								<p class="ztree-mArrow"></p>\
								<p class="zbtn">结束</p>\
							</div>\
						</div>'
			
		var type = null // 记录当前菜单选择节点类型
		
		var nodeType = {
			type_0: 'ztree-verify', // 审核环节type = 0
			type_1: 'ztree-copy', // 抄送节点type = 1
			type_2: 'ztree-level', // 级别审核type = 2
			type_3: 'ztree-factor' // 条件分值type = 3
		}
		
		var tree = $(id)
		var start = $(elem_init)
		var menu = $(elem_menu)
		var nodeWidth = 222 // 每节点的宽度
		var nodeHeight = 237 // 每节点的高度
		var oneFactor = null // 只分支一次 ,暂存分支时间戳
		
		
		tree.html(start)
		tree.after(menu)
		
		var start_stamp = new Date().getTime()
		start.attr('id', 'itemid_' + start_stamp)
		start.find('.ztree-plus').attr('itemid', start_stamp)
		
		/**
		 * 创建分支节点
		 */
		function createCaseNode (stamp) {
			menu.find('.zmenu-factor').hide() // 暂时只分支一次,隐藏建立分支
			html = $('<div>' + node_factor + '</div>')
			// 为寻找是否有分支存在而加标记
			html.find('.zalignCenter').addClass('factor_' + stamp)
			html.find('.ztree-extend').addClass('factor_' + stamp)
			html.find('.ztree-table').addClass('factor_' + stamp)
			// 拼分支组件
			factor = $(elem_node)
			factor.children(':first').remove()
			factor.find('.module-js').before(factor_top)
			factor.attr('id', 'itemid_' + stamp)
			factor.find('.ztree-close').attr('itemid', stamp)
			factor.find('.ztree-plus').attr('itemid', stamp)
			factor.find('.ztree-setting').attr('itemid', stamp)
			factor.find('.module-js').addClass(nodeType['type_3'])
			factor.attr('type', type)
			var clone = factor.clone(true)
			clone.attr('id', 'itemid_' + stamp + 'clone')
			clone.find('.ztree-close').hide()
			clone.find('.ztree-setting').remove()
			clone.find('.ztree-plus').attr('itemid', stamp +'clone')
			clone.find('.title-js').text('其他(不可删除)')
			clone.find('.factor-js').text('其他优先条件')
			clone.find('.module-js').removeClass('ztree-factor')
			html.find('.firstCase-js').append(factor)
			html.find('.firstCase-js').append($(node_last))
			// 为方便删除按钮找当前节点作标记
			html.find('.zextend-btn').attr('nodeid', stamp)
			html.find('.ztree-cellRight').attr('id', 'extent_' + stamp)
			html.find('.ztree-table').attr('id', 'table_' + stamp)
			html.find('.lastCase-js').append(clone)
			html.find('.lastCase-js').append($(node_last))
			html = $(html.html())
			return html
		}
		
		/**
		 * 创建节点
		 */
		function createNode (type, stamp) {
			if (type == null) return
			var html, factor
			if (type == 3) {
				oneFactor = stamp
				html = createCaseNode(stamp)
			} else {
				html = $(elem_node)
				html.attr('type', type)
				html.attr('id', 'itemid_' + stamp)
				html.find('.ztree-close').attr('itemid', stamp)
				html.find('.ztree-plus').attr('itemid', stamp)
				html.find('.ztree-setting').attr('itemid', stamp)
				html.find('.module-js').addClass(nodeType['type_' + type])
			}
			
			type = null
			return html
		}
		// 离开菜单时消失
		menu.on('mouseleave', function () {
			$(this).hide()
		})
		
		// 选择菜单新建节点
		menu.on('click', 'li', function (e) {
			if (!siteNode) return
			type = $(this).data('type')
			var stamp = new Date().getTime()
			var html = that.newNode(type, stamp)
			
			menu.hide()
			if (that.config.newNodeFn) {
				that.config.newNodeFn({
					e: e,
					type: type, // 当前节点类型
					dom: html, // 当前节点dom
					stamp: stamp // 当前节点时间戳
				})
			}
			
			e.stopPropagation()
		})
		var siteNode = null // 记录当前加号位置,方便追加节点
		// 绑定加节点
		tree.on('click', '.ztree-plus', function (e) {
			// 流程上没有或者删除后再恢复可加分支
			if (!$('.factor_' + oneFactor).length) oneFactor = null
			siteNode = $('#itemid_' + $(this).attr('itemid'))
			if (!siteNode.length) {
				siteNode = $(this).parents('.ztree-start')
			}
			if (!siteNode.next().hasClass('ztree-end')) {
				menu.find('.zmenu-factor').hide() // 暂时只分支一次,隐藏建立分支
			} else if (oneFactor == null) {
				menu.find('.zmenu-factor').show()
			}
				
				var plus = {
					x: 0,
					y: $(this).position().top
				}
				console.log($(this).offset().top, tree.position().top)
			var x = e.pageX + 10, y = e.pageY + 10
			console.log(e.pageY)
			
			menu.css({'left': x + 'px', 'top': y + 'px'})
			menu.show()
			if (that.config.newNodeBeforeFn) {
				that.config.newNodeBeforeFn({
					e: e,
					type: siteNode.attr('type'),
					stamp: $(this).attr('itemid'),
					dom: siteNode,
				})
			}
			setSpaceLine()
			e.stopPropagation()
		})
		
		
		
		// 绑定设置按钮
		tree.on('click', '.ztree-setting', function (e) {
			var stamp = $(this).attr('itemid')
			var dom = $('#itemid_' + stamp)
			var type = dom.attr('type')
			if (that.config.setNodeFn) {
				that.config.setNodeFn({
					e: e,
					type: type,
					stamp: stamp,
					dom: dom,
					title: dom.find('.title-js'),
					content: dom.find('.content-js')
				})
			}
		})
		
		// 绑定删除按钮
		tree.on('click', '.ztree-close', function (e) {
			var stamp = $(this).attr('itemid')
			var nodeItem = $('#itemid_' + stamp)
			var type = nodeItem.attr('type')
			if (that.config.deleteNodeBeforeFn) {
				that.config.deleteNodeBeforeFn({
					e: e,
					type: type,
					dom: nodeItem,
					stamp: stamp,
					self: $(this)
				})
			}
			if (type == 3) {
				var table = $('#table_' + oneFactor)
				if (table.children().length < 3) { // 2条件时
					if (table.find('.lastCase-js').children().length > 1) {
						$('#itemid_' + oneFactor + 'clone').remove()
						table.find('.lastCase-js').find('.ztree-last').remove()
						var merge = table.find('.lastCase-js').clone()
						$('.factor_' + oneFactor).remove()
						merge.children().each(function (index) {
							tree.find('.ztree-end').before($(this))
						})
						oneFactor = null
					}
				} else { // 3条件以上时
					var colLeft = $(this).parents('.ztree-cellLeft')
					if (colLeft.length) { // 删除左侧时
						$('#itemid_' + oneFactor).nextAll().remove()
						$('#itemid_' + oneFactor).find('.title-js').text(colLeft.next().find('.ztree-item:first').find('.title-js').text())
						$('#itemid_' + oneFactor).find('.content-js').text(colLeft.next().find('.ztree-item:first').find('.content-js').text())
						
						colLeft.next().find('.ztree-item:first').nextAll().each(function () {
							colLeft.find('.firstCase-js').append($(this))
						})
						
						colLeft.next().remove()
						colLeft.height(colLeft.find('.ztree-item').length * nodeHeight- 160)
					} else {// 删除中间时
						var table = $('#table_' + stamp)
						$(this).parents('.ztree-cell').remove()
						
					}
					var len = $('#table_' + oneFactor).children().length
					tree.width((len - 1) * nodeWidth + (len-1) * 20)
				}
			} else {
				
				var parent = $(this).parents('.ztree-cellLeft')
				var casebox = parent.find('.firstCase-js')
				if (!parent.length) {
					parent = $(this).parents('.ztree-cellRight')
					casebox = parent.find('.lastCase-js')
				}
				nodeItem.nextAll(':not(.ztree-end)').remove()
				nodeItem.remove()
				casebox.append($(node_last))
				parent.height(parent.find('.ztree-item').length * nodeHeight- 160)
			}
			if (that.config.deleteNodeFn) that.config.deleteNodeFn({e: e, type: type, stamp: stamp})
			
			setSpaceLine()
		})
		
		// 添加平行条件
		tree.on('click', '.zextend-btn', function (e) {
			var stamp = new Date().getTime()
			if (that.config.addCaseBeforeFn) {
				that.config.addCaseBeforeFn({
					e: e,
					type: 3,
					stamp: stamp,
					self: $(this)
				})
			}
			var case_stamp = $(this).attr('nodeid')
			
			var factor = that.addCase(stamp, case_stamp)
			
			if (that.config.addCaseFn) {
				that.config.addCaseFn({
					e: e, // 事件对象
					type: 3, // 节点类型
					dom: factor, // dom
					stamp: stamp, // 当前节点时间戳
					nodeStamp: case_stamp // 当前分支节点时间戳
				})
			}
			setSpaceLine()
		})
		
		var caseLength = []
		
		// 计算空格竖线高度
		function setSpaceLine () {
			if (oneFactor == null) {
				tree.find('.ztree-end').removeClass('isCase')
				return // 有分支时间戳时才有效果
			} else {
				tree.find('.ztree-end').addClass('isCase')
			}
			caseLength = [] // 将每个分支个数暂存数组再求最长个数max
			var cells = $("#table_" + oneFactor).children()
			cells.each(function (index) {
				caseLength.push($(this).find('.ztree-item').length)
				if (cells.length - 1 > index) {
					$(this).find('.ztree-item:first').find('.factor-js').text('第' + (index+1) +'优先条件')
				}
			})
			var max = Math.max.apply(Math,caseLength) // 求出最长个数
			
			var len = 0
			// 每个分支与最长相差几个,再补充相差的个数高度
			cells.each(function () {
				len = (max - $(this).find('.ztree-item').length)
				if (len) {
					$(this).find('.ztree-last').height(len * nodeHeight +50)
				} else {
					$(this).find('.ztree-last').removeAttr('style')
				}
			})
			
		}
		
		/**
		 * 计算字符长度
		 */
		/*function getByteForUTF(s) {
			if (!s) return 0
			var enLen = 0, cnLen = 0, len = 0;
			// 过虑英文字母
			var a = s.replace(/[\u0000-\u007f]/g, "\u0061");
			// 过虑英文符号
			var b = a.replace(/[\u0080-\u07ff]/g, "\u0061\u0061");
			cnLen = b.replace(/a/g,'').length, enLen = b.length - cnLen;
			len = cnLen *2 +enLen;
			// 过滤汉字和汉字符号 c=b.replace(/[\u0800-\uffff]/g, "\u0061\u0061\u0061");
			return len;
		}*/
		
		
		/**
		 * 给节点设置内容
		 */
		this.setContent = function (stamp, obj) {
			if (!obj) return
			if (obj.title) {
				$("#itemid_" + stamp).find('.title-js').text(obj.title)
			}
			if (obj.content) {
				$("#itemid_" + stamp).find('.content-js').text(obj.content)
			}
		}
		
		this.newNode = function (type, stamp) {
			var html = createNode(type, stamp)
			
			siteNode.after(html)
			var parent = siteNode.parents('.ztree-cellLeft')
			if (!parent.length) {
				parent = siteNode.parents('.ztree-cellRight')
			}
			parent.height(parent.find('.ztree-item').length * nodeHeight- 160)
			setSpaceLine()
			return html
		}
		
		/**
		 * 添加平行条件
		 */
		this.addCase = function (stamp, case_stamp) {
			
			var factor = $(elem_node)
			factor.attr('type', 3)
			factor.children(':first').remove()
			factor.find('.module-js').before(factor_top)
			factor.attr('id', 'itemid_' + stamp)
			factor.find('.ztree-close').attr('itemid', stamp)
			factor.find('.ztree-plus').attr('itemid', stamp)
			factor.find('.ztree-setting').attr('itemid', stamp)
			factor.find('.module-js').addClass(nodeType['type_3'])
			var html = node_cellA + factor.prop("outerHTML") + node_last + node_cellB
			
			$('#extent_' + case_stamp).before(html)
			var len = $('#table_' + case_stamp).children().length
			tree.width((len - 1) * nodeWidth + (len-1) * 20)
			factor = $('#itemid_' + stamp)
			return factor
		}
		
		/**
		 * 渲染分支节点
		 */
		function renderCase (list, stamp) {
			for (var g = 1; g < list.length; g++) {
				stamp += g
				if (list[g].type == 9) {
					// 再分支
					// that.newNode (3, stamp)
					
				} else {
				siteNode = that.newNode(list[g].type, stamp)
				that.setContent(stamp, {title: list[g].nodename, content: list[g].content})
				}
			}
		}
	
	
		/**
		 * 渲染节点
		 */
		this.render = function (data) {
			console.log(data.nodelist)
			var list = data.nodelist
			var html, stamp, case_stamp
			siteNode = $('.ztree-start')
			for (var n = 0; n < list.length; n++) {
				if (list[n].type == 9) {
					stamp = new Date().getTime() + n
					siteNode = this.newNode(3, stamp)
					case_stamp = stamp
					
					siteNode = $("#itemid_" + stamp)
					var list1 = list[n].auditlist
					this.setContent(stamp, {title: list1[0].nodelist[0].nodename, content: list1[0].nodelist[0].content})
					renderCase (list1[0].nodelist, stamp)
					
					siteNode = $("#itemid_" + stamp + 'clone')
					this.setContent(stamp+'clone', {title: list1[list1.length-1].nodelist[0].nodename, content: list1[0].nodelist[0].content})
					renderCase(list1[list1.length-1].nodelist, stamp+ 'clone')
					
					for (var m = 1; m < list1.length-1; m++) {
						
						stamp = new Date().getTime() + n + m
						siteNode = this.addCase(stamp, case_stamp)
						this.setContent(stamp, {title: list1[m].nodelist[0].nodename, content: list1[m].nodelist[0].content})
						
						var list2 = list1[m].nodelist
						stamp = stamp = new Date().getTime() + n + m
						renderCase(list2, stamp)
						
					}
				} else {
					stamp = new Date().getTime() + n
					siteNode = this.newNode(list[n].type, stamp)
					
					this.setContent(stamp, {title: list[n].nodename, content: list[n].content})
				}
			}
		}
		
	}
	window.NodeTree = NodeTree
})(window)












