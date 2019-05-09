// JavaScript Document
;(function($){
	$.fn.carousel = function(args) {
		var $this = $(this),
			$viewport = $this.find("[role=viewport]"),
			$content = $this.find("[role=content]"),
			$leftBtn = null,
			$rightBtn = null,
			$btnNum	= 0,
			$btnHtml = '<a href="javascript:;"></a>',
			
			defaults = $.extend({
				self: $this,
				content: $content,
				points: null,			// 底部按钮组
				isPagination: false,	// 是否有底部按钮
				isButton: false,		// 是否有左右按钮组
				isLoop: true,			// 是否循环
				isHideBtn: true,		// 是否 hover button
				isSlow: false,			// 是否缓慢移动
				direction: true,		// 正方向为向上滚动，向左滚动
				directionXY: true,		// 默认滚动X轴
				interval: 3000,			// 间隔时间
				speed: 700,				// 如果为缓慢滚动此为滚动 1px 间歇时间 否则为滚动一屏的时间
				curClass: "cur",		// 底部按钮默认选中的class
				isMove: true
			}, args),
			
			timer = null;
			
		//添加底部按钮
		$btnNum=defaults.content.children().length;
		for(N=0;N<$btnNum-1;N++){
			$this.find("[role=points]").append($btnHtml);
		};
		// 计算高度或者宽度值
		defaults.contentXY = defaults.directionXY ? $content.children().eq(0).width() * $content.children().length : $content.height();
		defaults.distance = defaults.directionXY ? $viewport.width() : $viewport.height();
		
		$content.html($content.html() + $content.html() + $content.html());
		$content.css((defaults.directionXY ? "width" : "height"), defaults.contentXY * 3);
		$content.css((defaults.directionXY ? "left" : "top"), defaults.contentXY * -1);
		
		if (defaults.isButton && !defaults.isSlow) {
			$leftBtn = $this.find("[role=left]");
			$rightBtn = $this.find("[role=right]");
			
			$this.on({
				click: function() {
					if ($(this).attr("role") == "right") {
						move(true, defaults);
					} else {
						move(false, defaults);
					}
				}
			}, "[role=left], [role=right]");
			
			if (defaults.isHideBtn) {
				$this.on({
					mouseenter: function() {
						$leftBtn.css("display", "block");
						$rightBtn.css("display", "block");
					},
					mouseleave: function() {
						$leftBtn.css("display", "none");
						$rightBtn.css("display", "none");
					}
				});
			}
		}
		
		$this.on({
			mouseenter: function() {
				clearInterval(timer);
			},
			mouseleave: function() {
				timer = setInterval(function() {
					move(defaults.direction, defaults);
				}, defaults.isSlow ? defaults.speed : defaults.interval);
			}
		});
		
		if (defaults.isPagination && !defaults.isSlow) {
			defaults.points = $this.find("[role=points]").children();
			
			defaults.points.each(function(i) {
				$(this).on("click", function() {
					move(true, defaults, i);
				});
			});
		}
		
		timer = setInterval(function() {
			move(defaults.direction, defaults);
		}, defaults.isSlow ? defaults.speed : defaults.interval);
	};
	
	function move(mark, args, index) {
		if (!args.isSlow) {
			if (args.isMove) {
				args.isMove = false;
			} else {
				return false;
			}
		}
		var $this = args.self,
			$content = args.content,
			subDis = args.isSlow ? 1 : args.distance,
			directionXY = args.directionXY ? "left" : "top",
			curPos = parseInt($content.css(directionXY)),
			destination = mark ? curPos - subDis : curPos + subDis;
		
		if (!args.isLoop) {
			if (destination > args.contentXY * -1) {
				destination = args.contentXY * -2 + subDis;
			}else if (destination < args.contentXY * -2 + subDis) {
				destination = args.contentXY * -1;
			}
		}
		
		if (!args.isSlow && args.isPagination) {
			args.points.removeClass(args.curClass);
			
			if (typeof index == "number") {
				destination = args.contentXY * -1 - index * subDis;
			} else {
				index = Math.abs((destination + args.contentXY)/subDis);
			}
			if (index >= args.points.length) index = 0;
			args.points.eq(index).addClass(args.curClass);
		}
		
		if (args.isSlow) {
			$content.css(directionXY, destination);
			moveComplete();
		} else {
			if (args.directionXY) {
				$content.animate({left: destination}, args.speed, function() {
					moveComplete();
				});
			} else {
				console.log(destination);
				$content.animate({top: destination}, args.speed, function() {
					moveComplete();
				});
			}
		}
		
		function moveComplete() {
			curPos = parseInt($content.css(directionXY));
			
			if ((curPos <= args.contentXY * -2 || curPos >= 0) && args.isLoop) {
				args.content.css(directionXY, args.contentXY * -1);
			}
			
			args.isMove = true;
		}
	}
})(jQuery);
