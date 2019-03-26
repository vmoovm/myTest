$(function() {
	//每页的导航
	$("#RightCon .RightTop .more").hover(function() {
		$(this).addClass("Hover");
	},function() {
		$(this).removeClass("Hover");
	});
	
	// 课程首页 下边的头像滚动
	var count = $("#StuScrol li").length,
		wid = count * 145;
		
	$("#StuScrol ul").css("width", wid + "px");
	
	if (count < 5) {
		$("#StuScrol .StuPre").css("visibility", "hidden");
		$("#StuScrol .StuNext").css("visibility", "hidden");
	} else {
		$("#StuScrol .StuPre").click(function() {
			var curLeft = parseInt($("#StuScrol ul").css("left")); 
			if (curLeft + 145*4 <= 0) {
				$("#StuScrol ul").animate({
					left : (curLeft + 145*4 + "px")
				});
			} else {
				$("#StuScrol ul").animate({
					left : "0px"
				});
			}
		});
		$("#StuScrol .StuNext").click(function() {
			var curLeft = parseInt($("#StuScrol ul").css("left")); 
			if (curLeft - 2*145*4 >= -wid) {
				$("#StuScrol ul").animate({
					left : (curLeft - 145*4 + "px")
				});
			} else {
				$("#StuScrol ul").animate({
					left : (-wid + 145*4 + "px")
				});
			}
		});
	}
	
	// 课程首页 待批作业 移动效果
	$("#RightCon .WorkList li").hover(function() {
		$(this).addClass("Hover");
	},function() {
		$(this).removeClass("Hover");
	});
	
	// 讨论二级-新  回复框
	$("#rep-list li .idt-bot-times .ibt-btn").each(function(i) {
		if (i != 0) {
			$(this).click(function() {
				var par = $(this).parent().parent(),
					wrapRep = par.find(".wrap-rep");
					if (par.hasClass("ibr-show")) {
						wrapRep.slideUp(1000,function() {
							par.removeClass("ibr-show");
						});
					} else {
						par.addClass("ibr-show");
						wrapRep.slideDown(1000);

						if (wrapRep.find("li").length <= 0) {
							wrapRep.next().addClass("ibr-text-show");
						} else {
							wrapRep.next().removeClass("ibr-text-show");
						}
					}
					
			});
		}	
	});
	$("#rep-list li .wrap-rep .talk-btn").click(function() {
		$(this).parent().parent().next().toggleClass("ibr-text-show");
	});
	
	// 学生端 课程首页 时光轴和通知列表效果
	$("#Notice li").hover(function() {
		$(this).addClass("Hover");
	},function() {
		$(this).removeClass("Hover");
	});
	
	$("#DTList .DTListDaYi").hover(function() {
		$(this).addClass("Hover");
	},function() {
		$(this).removeClass("Hover");
	});
	// 推荐视频/教参资源-新
//	$("#resource .rcb-img").hover(function() {
//		$(this).addClass("rcb-img-show");
//	},function() {
//		$(this).removeClass("rcb-img-show");
//	});
	// 添加资源新
	$("#resource .rl-img").hover(function() {
		$(this).addClass("rl-img-show");
	},function() {
		$(this).removeClass("rl-img-show");
	});
	
	//章节资源、试卷、题库 滑过
	$("#tableId tr").live("mouseover", function() {
		$(this).addClass("Hover");
	});
	$("#tableId tr").live("mouseout", function() {
		$(this).removeClass("Hover");
	});
	
	//资料页开始-----------------------------------------------------------------------------------
	// 上传和更多的下拉
	$("#selected .morebtn").click(function(e) {
			$(this).toggleClass("click");
			return false;
	});
	$("#selected .morebtn li").eq(1).click(function(e) {
		var checkboxs = $("#zlTable input[type='checkbox']");
		checkboxs.each(function(index) {
			if ($(this).prop("checked")) {
				rename($(this).parent().parent());
			}
		});
	});
	$("#uploading").click(function(e) {
		$(this).toggleClass("Hover");
		return false;
	});
	$(document).bind("click", function() {
		$("#selected .morebtn").removeClass("click");
		$("#uploading").removeClass("Hover");
	});
		
	$("#zlTable input[type='checkbox']").each(function() {
		$(this).prop("checked", false);
	});
	$("#zlTable input[type='checkbox']").live("click", function() {
		var checkboxs = $("#zlTable input[type='checkbox']"), temp = 1;
		var count = checkboxs.eq(0).prop("checked") ? -1 : 0;
		if (!checkboxs.index($(this))) {
			checkboxs.prop("checked", $(this).prop("checked"));
		}
		
		checkboxs.each(function(index) {
			if ($(this).prop("checked")) {
				if ($(this).parent().parent().attr("type") == "afolder"){
					temp = 0;
				}
				count++;
			}
		});
		
		if (temp) {
			temp = count > 1 ? 0 : 1;
		}
		
		if (count >= checkboxs.length - 1) {
			checkboxs.eq(0).prop("checked", true);
		} else {
			checkboxs.eq(0).prop("checked", false);
		}
		
		if (count > 0) {
			$("#selected").prev().css("display","none");
			$("#selected").css("display", "block");
			$("#selected").find("span").eq(0).text("已选中" + count + "个文件/文件夹");
		} else {
			$("#selected").prev().css("display","block");
			$("#selected").css("display", "none");
		}
		
		if (!temp) {
			$("#selected").find("span").eq(1).text("更多");//改之前打包
		} else {
			$("#selected").find("span").eq(1).text("更多");//改之前下载
		}
	});
		
	// 新建文件夹
	var mark = 1;
	$("#uploading").prev().click(function() {
		if (mark) {
			mark = 0;
		} else {
			return false;
		}
	
		var date = new Date();
		$("#flod td:last").text(date.getYear() + "-" + date.getMonth() + "-" + date.getDate());
		if ($("#tableId02 tr").length > 0)　{
			$("#tableId02 tr").eq(0).after("<tr>" + $("#flod tr").html() + "</tr>");
		} else {
			$("#tableId02").append("<tr>" + $("#flod tr").html() + "</tr>");
		}
	});
		
		// toobar  
		$("#tableId02 tr .more").live("click", function() {
			$(this).parent().toggleClass("Hover02");
			var tr = $(this).parent().parent().parent();
			$("#tableId02 input[type='checkbox']").prop("checked", false);
			tr.find("input[type='checkbox']").prop("checked", true);
			if ($(this).attr("type") == "afolder") {
				$("#selected").find("span").eq(1).text("更多");//改之前打包下载
			} else {
				$("#selected").find("span").eq(1).text(" 更多 ");//改之前下载
			}
			$("#selected").prev().css("display","none");
			$("#selected").css("display", "block");
			$("#selected").find("span").eq(0).text("已选中" + 1 + "个文件/文件夹");
			return false;
		});
		$("#tableId02 tr").live("mouseover", function() {
			$(this).addClass("Hover");
		});
		$("#tableId02 tr").live("mouseleave", function() {
			$(this).find(".Hover02").removeClass("Hover02");
			$(this).removeClass("Hover");
		});
		
		// 点击重命名
		$("#tableId02 .moreCon li").live("click", function() {
			if ($(this).index() == 1) {
				rename($(this).parent().parent().parent().parent().parent());
			}
			$(this).parent().parent().parent().removeClass("Hover02");
		});
		
		// 取消重命名
		$("#tableId02 .rename .no").live("click",function() {
			if ($(this).parent().parent().parent().find("input").eq(0).attr("value") == "") {
				$(this).parent().parent().parent().remove();
				mark = 1;
				return false;
			}
			rename($(this).parent().parent().parent(), true);
		});
		
		//
		$("#tableId02 .moreCon li").live(
			"mouseover", function() {
				if($(this).children().length){
					$(this).children("dl:eq(0)").show();
				}
		});
		$("#tableId02 .moreCon li").live(
			"mouseout",function(){
				$(this).find("dl").hide();
			}
		);
		
	// 更多和设置
	$("#tableId02 tr .shez").live("click", checkTr);
	$("#tableId02 tr .download").live("click", checkTr);
	function checkTr() {
		var tr = $(this).parent().parent().parent();
		$("#tableId02 input[type='checkbox']").prop("checked", false);
		tr.find("input[type='checkbox']").prop("checked", true);
		if ($(this).attr("type") == "afolder") {
			$("#selected").find("span").eq(1).text("更多");//改之前打包下载
		} else {
			$("#selected").find("span").eq(1).text(" 更多 ");//改之前下载
		}
		$("#selected").prev().css("display","none");
		$("#selected").css("display", "block");
		$("#selected").find("span").eq(0).text("已选中" + 1 + "个文件/文件夹");
	}
	$("#selected #downText").live("click", function() {
		if ($.trim($(this).text()) == "下载") {
			$("#tableId02 input[type='checkbox']").each(function() {
				if ($(this).prop("checked")) {
					var tr = $(this).parent().parent(),
						down = tr.find(".download");
					eval(down.attr("onclick"));
				}
			});
		} else {
			downloadData();
		}
	});
	
	//资料页结束-----------------------------------------------------------------------------------
	// 批阅作业
	$("#AnswerSheet .answerA").toggle(function() {
		$(this).next().css("display", "block");
		$(this).next().find("a").each(function() {
			$(this).removeClass("done");
		});
	}, function() {
		$(this).next().css("display", "none");
	});
	
	$("#AnswerSheet .sheetA a").click(function() {
		$("#AnswerSheet .sheetA a").each(function() {
			$(this).removeClass("done");
		});
		$(this).addClass("done");
		var index = $(this).index();
		$("html, body").animate({"scrollTop": $("#ZyBottom .TiMu").eq(index).offset().top});
	});
	
	// 批阅作业
	$("#ZyBottom .font14 a").click(function() {
		var textarea = $(this).parent().next(),par = $(this).parent();
		
		while (!par.hasClass("TiMu")) {
			par = par.parent();
		}
		
		if (textarea.css("display") != "none") {
			textarea.slideUp();
			textarea.find("textarea").attr("value","");
		} else {
			textarea.slideDown();
			
			$("html, body").animate({"scrollTop": par.offset().top});
		}
	});
	$("#ZyBottom .Py_addpyNr .btnGray_2").click(function() {
		var textarea = $(this).parent().parent();
		textarea.slideUp();
		textarea.find("textarea").attr("value","");
	});
	
	//做作业
	$("#ZyBottom .TiMu .w-top li").hover(function() {
		var index = $(this).index(),
			checks = $(this).parent().next();
		$(this).addClass("Hover");
		checks.find("li").eq(index).addClass("Hover");
	},function() {
		var index = $(this).index(),
			checks = $(this).parent().next();
		if (!checks.find("input").eq(index).prop("checked")) {
			$(this).removeClass("Hover");
			checks.find("li").eq(index).removeClass("Hover");
		}
	});
	
	$("#ZyBottom .TiMu .w-top li").click(function() {
		var index = $(this).index(),
			checks = $(this).parent().next(),
			lis = $(this).parent().find("li");
			
			$(this).parent().find("li").removeClass("Hover");
			checks.find("li").removeClass("Hover");
			
			if (checks.find("input").eq(index).prop("type") == "checkbox") {
				checks.find("input").eq(index).prop("checked",(!checks.find("input").eq(index).prop("checked")));
			} else {
				checks.find("input").eq(index).prop("checked",true);
			}
			
			checks.find("li").each(function() {
				if ($(this).find("input").prop("checked")) {
					$(this).addClass("Hover");
					lis.eq($(this).index()).addClass("Hover");
				}
			});
	});
	
	$("#ZyBottom .TiMu .w-buttom li").hover(function() {
		var index = $(this).index(),
			lis = $(this).parent().prev();
		$(this).addClass("Hover");
		lis.find("li").eq(index).addClass("Hover");
	},function() {
		var index = $(this).index(),
			lis = $(this).parent().prev();
		if (!$(this).find("input").prop("checked")) {
			$(this).removeClass("Hover");
			lis.find("li").eq(index).removeClass("Hover");
		}
	});
	
	$("#ZyBottom .TiMu .w-buttom li").click(function() {
		var index = $(this).index(),
			lis = $(this).parent().prev();
			
			$(this).parent().find("li").removeClass("Hover");
			lis.find("li").removeClass("Hover");
			
			$(this).parent().find("li").each(function() {
				if ($(this).find("input").prop("checked")) {
					$(this).addClass("Hover");
					lis.find("li").eq($(this).index()).addClass("Hover");
				}
			});
	});
	
	// 做测验
	$("#ZyBottom .Cy_tx a").hover(function() {
		$(this).addClass("cur");
	},function() {
		if (!$(this).hasClass("clicked")) {
			$(this).removeClass("cur");
		}
	});
	$("#ZyBottom .Cy_tx a").click(function() {
		$("#ZyBottom .Cy_tx a").removeClass("cur clicked");
		$(this).addClass("cur clicked");
	});
});