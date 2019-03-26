// JavaScript Document

$(document).ready(function() {
	
	$("#scroll-pane").niceScroll({touchbehavior:false,cursorcolor:"#aaa",cursorborder:"0px solid #666",cursorborderradius:"3px",cursoropacitymax:0.7,cursorwidth:3,background:"#ececec",autohidemode:false});
	$("#prem_l_text").niceScroll({touchbehavior:false,cursorcolor:"#aaa",cursorborder:"0px solid #666",cursorborderradius:"3px",cursoropacitymax:0.7,cursorwidth:3,background:"#ececec",autohidemode:false});
	$("#prem_l_i_text").niceScroll({touchbehavior:false,cursorcolor:"#aaa",cursorborder:"0px solid #666",cursorborderradius:"3px",cursoropacitymax:0.7,cursorwidth:3,background:"#ececec",autohidemode:false});
	$("#prem_l_is_text").niceScroll({touchbehavior:false,cursorcolor:"#aaa",cursorborder:"0px solid #666",cursorborderradius:"3px",cursoropacitymax:0.7,cursorwidth:3,background:"#ececec",autohidemode:false});
	$("#scroll-pane").getNiceScroll().resize();
	$("#scroll-pane").scrollTop($("#scroll-pane").prop("scrollHeight"));
	
	function jspdraw(){
		var first_li='<li>"<span class="prem_r_class">°æ” ¿¥” Õ¯°ø£∫</span><span>The biggest highlight is the use of plastic carving printing process. Mock cutter under four kinds of cats look different, cat\'s eye piercing on a walk or rest in God can still see a trace of vigilance. Enjoy the "cat" stamps, the whole four cats silhouette pixels painted with thick lines in general, but also has a line drawing of the local details and delicate works fineional, making stamps cats fur pattern richer</span><span class="prem_r_date">(08-08 17:49)</span>+"00000</li>';
		$("#scroll-pane").append(first_li);
		$("#scroll-pane").scrollTop($("#scroll-pane").prop("scrollHeight"));
		$("#scroll-pane").getNiceScroll().resize();
	}
	//var jishi=setInterval(jspdraw,1000);
	/*============================================
	nav-switch
	============================================*/
	var scroll_id={1:"#prem_l_text",3:"#prem_l_i_text",4:"#prem_l_is_text"};
	
	
	$("#prem_l_nav li").click(function(){
			$.each(scroll_id,function(index){
					$(scroll_id[index]).getNiceScroll().remove();		
			});
			var scroll_num=$(this).index();
			if(scroll_id[scroll_num]){
				$(scroll_id[scroll_num]).niceScroll({touchbehavior:false,cursorcolor:"#aaa",cursorborder:"0px solid #666",cursorborderradius:"3px",cursoropacitymax:0.7,cursorwidth:3,background:"#ececec",autohidemode:false});
			}
		$(this).children("h1").addClass("prem_l_current");
		$(this).siblings().children("h1").removeClass("prem_l_current");
		$("#prem_l_center").children("ul").eq($(this).index()).css("display","block").siblings().css("display","none");
		if($(this).index()==0){
			$("#prem_l_center").css("backgroundColor","#333");
		}else{
			$("#prem_l_center").css("backgroundColor","#fff");
		}
	});
	
	$("#prem_l_nav li").hover(function(){
		$(this).addClass("prem_l_hover").siblings().removeClass("prem_l_hover");
	},function(){
		$(this).removeClass("prem_l_hover");
	});
	/*============================================
	Countdown
	============================================*/
	var setdate={
			y:2013,	m:9,d:1,h:16,mt:44,s:50
		}
	function datea(setdate){
		var time_string=""+setdate.y+"/"+setdate.m+"/"+setdate.d+" "+setdate.h+":"+setdate.mt+":"+setdate.s;
		//alert(time_string);
		var result_time=new Date(time_string)-new Date();
		if(result_time<0){
			
		}else{
			result_time=Math.ceil(result_time/1000/60/60/24);
			$("#setTime").text(result_time);
		}			
	}
	datea(setdate);


	/*============================================
	View large image
	============================================*/
	var start_ele=$('<div id="img_box_bg" class="img_box_bg"></div><div id="img_box" class="img_box"><div id="img_box_con" class="img_box_con"><div id="img_box_center" class="img_box_center"><img id="img_src" src="" /></div><p id="img_close_bt" class="img_close_bt"></p></div></div>');
	start_ele.appendTo(('body'));

	function this_img_size(this_img_element){
		var img_obj=new Image();
		img_obj.src=this_img_element.attr("src");
		var img_w=img_obj.width;
		var img_h=img_obj.height;
		var browser_w=$(window).width()*0.65;
		var browser_h=$(window).height()*0.85;
		if(img_w>browser_w){
			if(img_w>img_h){
				img_h=img_h*(browser_w/img_w);
				img_w=browser_w;
			}
		}
		if(img_h>browser_h){
			if(img_w<img_h){
				img_w=img_w*(browser_h/img_h);
				img_h=browser_h;
			}
		}
		$("#img_src").attr("width",img_w);
		$("#img_src").attr("height",img_h);
		var img_box_top=($(window).height()-(img_h+10))/2;
		if($.browser.msie&&$.browser.version==6.0){
			$("#img_box_con").css({width:img_w+10,height:img_h+10,marginTop:img_box_top});
			$("#img_box_center").css({width:img_w,height:img_h});
		}else{
			$("#img_box_con").animate({width:img_w+10,height:img_h+10,marginTop:img_box_top},200);
			$("#img_box_center").animate({width:img_w,height:img_h},200);
		}		
		$("#img_box_bg,#img_box").height($(window).height()).width($(window).width());
	}
	

	function openWindow_img(v_v,current_element){
		if(current_element){
			  var c_img_src=current_element.attr("src");
		}
		if(v_v){
				$("#img_box").css("display","block");
				$("#img_box_bg").css("display","block");
				this_img_size(current_element);
				$("#img_src").attr("src",c_img_src);
		}else{
			$("#img_box").css("display","none");
			$("#img_box_bg").css("display","none");
		}
	}
	$("#img_close_bt").click(function(){
		openWindow_img(false)
	});
	$.extend({ 'show_img': function(type_bt,current_element) {
		openWindow_img(type_bt,$(current_element));						
	}});
	/*============================================
	zoom of element -- div(product mode)
	============================================*/
	var product={

		a:1,
		at:$("#prem_m_wlqs"),
		aa:$("#prem_mode_wlqs"),
		b:1,
		bt:$("#prem_m_ydsj"),
		bb:$("#prem_mode_ydsj"),
		c:1,
		ct:$("#prem_m_qbcp"),
		cc:$("#prem_mode_qbcp"),
		add:"prem_m_show1"
		};
		
	product.at.click(function(){
		product.aa.slideToggle();
		$(this).toggleClass(product.add);
	});
	product.bt.click(function(){
		product.bb.slideToggle();
		$(this).toggleClass(product.add);
	});
	product.ct.click(function(){
		product.cc.slideToggle();
		$(this).toggleClass(product.add);
	});
	/*============================================
	yuyuan-mouseMove 
	============================================*/
	function Argument(){
		this.zoom1={num:1,mul:1.7,step:0.2,speed:200,z_w:190,z_h:175,flag:1,z_img:"",out:"",over:"null",test:0 }
		this.zoomSize=function(z_img,mul){
			var z_w=z_img.width(),z_h=z_img.height();
			if(this.zoom.flag==1){
				z_w*=(1+mul),z_h*=(1+mul);
				if(z_w>this.zoom.z_w) z_w=this.zoom.z_w;
				if(z_h>this.zoom.z_h) z_h=this.zoom.z_h
			}
			if(this.zoom.flag==0){
				z_w*=(1-mul),z_h*=(1-mul);
				if(z_w<114) z_w=114;
				if(z_h<106) z_h=106
			}
			;
			z_img.width(z_w),z_img.height(z_h);
		}
		this.zoomSpeed=function(){
			this.zoom.mul/=2;
			if(this.zoom.mul<=0.1){
				clearInterval(this.zoom.over);
				this.zoom.mul=0.1
			}
			this.zoom.test+=this.zoom.mul+"  "+this.zoom.over+"  <br />";
			$("#testdiv").html(this.zoom.test);
			this.zoomSize(this.zoom.z_img,this.zoom.mul);
		}
		this.zoomImg=function(){
			this.zoom.over=setInterval(this.zoomSpeed,this.zoom.speed);
		}
	}
	
	
	
	var prem_l_yuyan=new Array();
	$("#prem_l_yuyan img").each(function(index){
			prem_l_yuyan[index]=new Argument();
			
	});

	$("#prem_l_yuyan img").mouseover(function(){
		$(this).addClass("prem_l_y_c");
		prem_l_yuyan[$(this).index()].zoom.z_img=$(this);
		prem_l_yuyan[$(this).index()].zoom.flag=1;
		prem_l_yuyan[$(this).index()].zoom.mul=1.7;
		prem_l_yuyan[$(this).index()].zoomImg();
											 
	}).mouseout(function(){
		prem_l_yuyan[$(this).index()].zoom.flag=0;
		prem_l_yuyan[$(this).index()].zoomImg();
		$(this).removeClass("prem_l_y_c");
	});
	/*============================================
	activeInfo-switch 
	============================================*/
	/*	jQuery Cycle Plugin for light-weight slideshows
 * Copyright (c) 2007-2008 M. Alsup
 * Version: 2.22 (06/08/2008)
 */
 
 //plug-ins  start
	;(function($) {
	
// If the UI scope is not available, add it
$.ui = $.ui || {};

$.fn.extend({
	accordion: function(options, data) {
		var args = Array.prototype.slice.call(arguments, 1);

		return this.each(function() {
			if (typeof options == "string") {
				var accordion = $.data(this, "ui-accordion");
				accordion[options].apply(accordion, args);
			// INIT with optional options
			} else if (!$(this).is(".ui-accordion"))
				$.data(this, "ui-accordion", new $.ui.accordion(this, options));
		});
	},
	// deprecated, use accordion("activate", index) instead
	activate: function(index) {
		return this.accordion("activate", index);
	}
});

$.ui.accordion = function(container, options) {
	
	// setup configuration
	this.options = options = $.extend({}, $.ui.accordion.defaults, options);
	this.element = container;
	
	$(container).addClass("ui-accordion");
	
	if ( options.navigation ) {
		var current = $(container).find("a").filter(options.navigationFilter);
		if ( current.length ) {
			if ( current.filter(options.header).length ) {
				options.active = current;
			} else {
				options.active = current.parent().parent().prev();
				current.addClass("current");
			}
		}
	}
	
	// calculate active if not specified, using the first header
	options.headers = $(container).find(options.header);
	options.active = findActive(options.headers, options.active);

	if ( options.fillSpace ) {
		var maxHeight = $(container).parent().height();
		options.headers.each(function() {
			maxHeight -= $(this).outerHeight();
		});
		var maxPadding = 0;
		options.headers.next().each(function() {
			maxPadding = Math.max(maxPadding, $(this).innerHeight() - $(this).height());
		}).height(maxHeight - maxPadding);
	} else if ( options.autoheight ) {
		var maxHeight = 0;
		options.headers.next().each(function() {
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		}).height(maxHeight);
	}

	options.headers
		.not(options.active || "")
		.next()
		.hide();
	options.active.parent().andSelf().addClass(options.selectedClass);
	
	if (options.event)
		$(container).bind((options.event) + ".ui-accordion", clickHandler);
};

$.ui.accordion.prototype = {
	activate: function(index) {
		// call clickHandler with custom event
		clickHandler.call(this.element, {
			target: findActive( this.options.headers, index )[0]
		});
	},
	
	enable: function() {
		this.options.disabled = false;
	},
	disable: function() {
		this.options.disabled = true;
	},
	destroy: function() {
		this.options.headers.next().css("display", "");
		if ( this.options.fillSpace || this.options.autoheight ) {
			this.options.headers.next().css("height", "");
		}
		$.removeData(this.element, "ui-accordion");
		$(this.element).removeClass("ui-accordion").unbind(".ui-accordion");
	}
}

function scopeCallback(callback, scope) {
	return function() {
		return callback.apply(scope, arguments);
	};
}

function completed(cancel) {
	// if removed while animated data can be empty
	if (!$.data(this, "ui-accordion"))
		return;
	var instance = $.data(this, "ui-accordion");
	var options = instance.options;
	options.running = cancel ? 0 : --options.running;
	if ( options.running )
		return;
	if ( options.clearStyle ) {
		options.toShow.add(options.toHide).css({
			height: "",
			overflow: ""
		});
	}
	$(this).triggerHandler("change.ui-accordion", [options.data], options.change);
}

function toggle(toShow, toHide, data, clickedActive, down) {
	var options = $.data(this, "ui-accordion").options;
	options.toShow = toShow;
	options.toHide = toHide;
	options.data = data;
	var complete = scopeCallback(completed, this);
	
	// count elements to animate
	options.running = toHide.size() == 0 ? toShow.size() : toHide.size();
	
	if ( options.animated ) {
		if ( !options.alwaysOpen && clickedActive ) {
			$.ui.accordion.animations[options.animated]({
				toShow: jQuery([]),
				toHide: toHide,
				complete: complete,
				down: down,
				autoheight: options.autoheight
			});
		} else {
			$.ui.accordion.animations[options.animated]({
				toShow: toShow,
				toHide: toHide,
				complete: complete,
				down: down,
				autoheight: options.autoheight
			});
		}
	} else {
		if ( !options.alwaysOpen && clickedActive ) {
			toShow.toggle();
		} else {
			toHide.hide();
			toShow.show();
		}
		complete(true);
	}
}

function clickHandler(event) {
	var options = $.data(this, "ui-accordion").options;
	if (options.disabled)
		return false;
	
	// called only when using activate(false) to close all parts programmatically
	if ( !event.target && !options.alwaysOpen ) {
		options.active.parent().andSelf().toggleClass(options.selectedClass);
		var toHide = options.active.next(),
			data = {
				instance: this,
				options: options,
				newHeader: jQuery([]),
				oldHeader: options.active,
				newContent: jQuery([]),
				oldContent: toHide
			},
			toShow = options.active = $([]);
		toggle.call(this, toShow, toHide, data );
		return false;
	}
	// get the click target
	var clicked = $(event.target);
	
	// due to the event delegation model, we have to check if one
	// of the parent elements is our actual header, and find that
	if ( clicked.parents(options.header).length )
		while ( !clicked.is(options.header) )
			clicked = clicked.parent();
	
	var clickedActive = clicked[0] == options.active[0];
	
	// if animations are still active, or the active header is the target, ignore click
	if (options.running || (options.alwaysOpen && clickedActive))
		return false;
	if (!clicked.is(options.header))
		return;

	// switch classes
	options.active.parent().andSelf().toggleClass(options.selectedClass);
	if ( !clickedActive ) {
		clicked.parent().andSelf().addClass(options.selectedClass);
	}

	// find elements to show and hide
	var toShow = clicked.next(),
		toHide = options.active.next(),
		//data = [clicked, options.active, toShow, toHide],
		data = {
			instance: this,
			options: options,
			newHeader: clicked,
			oldHeader: options.active,
			newContent: toShow,
			oldContent: toHide
		},
		down = options.headers.index( options.active[0] ) > options.headers.index( clicked[0] );
	
	options.active = clickedActive ? $([]) : clicked;
	toggle.call(this, toShow, toHide, data, clickedActive, down );

	return false;
};

function findActive(headers, selector) {
	return selector != undefined
		? typeof selector == "number"
			? headers.filter(":eq(" + selector + ")")
			: headers.not(headers.not(selector))
		: selector === false
			? $([])
			: headers.filter(":eq(0)");
}

$.extend($.ui.accordion, {
	defaults: {
		selectedClass: "selected",
		alwaysOpen: true,
		animated: 'slide',
		event: "click",
		header: "a",
		autoheight: true,
		running: 0,
		navigationFilter: function() {
			return this.href.toLowerCase() == location.href.toLowerCase();
		}
	},
	animations: {
		slide: function(options, additions) {
			options = $.extend({
				easing: "swing",
				duration: 300
			}, options, additions);
			if ( !options.toHide.size() ) {
				options.toShow.animate({height: "show"}, options);
				return;
			}
			var hideHeight = options.toHide.height(),
				showHeight = options.toShow.height(),
				difference = showHeight / hideHeight;
			options.toShow.css({ height: 0, overflow: 'hidden' }).show();
			options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate({height:"hide"},{
				step: function(now) {
					var current = (hideHeight - now) * difference;
					if ($.browser.msie || $.browser.opera) {
						current = Math.ceil(current);
					}
					options.toShow.height( current );
				},
				duration: options.duration,
				easing: options.easing,
				complete: function() {
					if ( !options.autoheight ) {
						options.toShow.css("height", "auto");
					}
					options.complete();
				}
			});
		},
		bounceslide: function(options) {
			this.slide(options, {
				easing: options.down ? "bounceout" : "swing",
				duration: options.down ? 1000 : 200
			});
		},
		easeslide: function(options) {
			this.slide(options, {
				easing: "easeinout",
				duration: 700
			})
		}
	}
});

})(jQuery);

//jQuery UI Accordion 1.6
(function($) {

var ver = '2.22';
var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent);

function log() {
    if (window.console && window.console.log)
        window.console.log('[cycle] ' + Array.prototype.join.call(arguments,''));
};

$.fn.cycle = function(options) {
    return this.each(function() {
        options = options || {};
        if (options.constructor == String) {
            switch(options) {
            case 'stop':
                if (this.cycleTimeout) clearTimeout(this.cycleTimeout);
                this.cycleTimeout = 0;
                return;
            case 'pause':
                this.cyclePause = 1;
                return;
            case 'resume':
                this.cyclePause = 0;
                return;
            default:
                options = { fx: options };
            };
        }

        // stop existing slideshow for this container (if there is one)
        if (this.cycleTimeout) clearTimeout(this.cycleTimeout);
        this.cycleTimeout = 0;
        this.cyclePause = 0;

        var $cont = $(this);
        var $slides = options.slideExpr ? $(options.slideExpr, this) : $cont.children();
        var els = $slides.get();
        if (els.length < 2) {
            log('terminating; too few slides: ' + els.length);
            return; // don't bother
        }

        // support metadata plugin (v1.0 and v2.0)
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        if (opts.autostop)
            opts.countdown = opts.autostopCount || els.length;

        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        opts.after.unshift(function(){ opts.busy=0; });
        if (opts.continuous)
            opts.after.push(function() { go(els,opts,0,!opts.rev); });

        // clearType corrections
        if (ie6 && opts.cleartype && !opts.cleartypeNoBg)
            clearTypeFix($slides);

        // allow shorthand overrides of width, height and timeout
        var cls = this.className;
        opts.width = parseInt((cls.match(/w:(\d+)/)||[])[1]) || opts.width;
        opts.height = parseInt((cls.match(/h:(\d+)/)||[])[1]) || opts.height;
        opts.timeout = parseInt((cls.match(/t:(\d+)/)||[])[1]) || opts.timeout;

        if ($cont.css('position') == 'static')
            $cont.css('position', 'relative');
        if (opts.width)
            $cont.width(opts.width);
        if (opts.height && opts.height != 'auto')
            $cont.height(opts.height);

        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++)
                opts.randomMap.push(i);
            opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
            opts.randomIndex = 0;
            opts.startingSlide = opts.randomMap[0];
        }
        else if (opts.startingSlide >= els.length)
            opts.startingSlide = 0; // catch bogus input
        var first = opts.startingSlide || 0;
        $slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
            var z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
            $(this).css('z-index', z)
        });

        $(els[first]).css('opacity',1).show(); // opacity bit needed to handle reinit case
        if ($.browser.msie) els[first].style.removeAttribute('filter');

        if (opts.fit && opts.width)
            $slides.width(opts.width);
        if (opts.fit && opts.height && opts.height != 'auto')
            $slides.height(opts.height);
        if (opts.pause)
            $cont.hover(function(){this.cyclePause=1;}, function(){this.cyclePause=0;});

        // run transition init fn
        var init = $.fn.cycle.transitions[opts.fx];
        if ($.isFunction(init))
            init($cont, $slides, opts);
        else if (opts.fx != 'custom')
            log('unknown transition: ' + opts.fx);

        $slides.each(function() {
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : $el.height();
            this.cycleW = (opts.fit && opts.width) ? opts.width : $el.width();
        });

        opts.cssBefore = opts.cssBefore || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};

        $slides.not(':eq('+first+')').css(opts.cssBefore);
        if (opts.cssFirst)
            $($slides[first]).css(opts.cssFirst);

        if (opts.timeout) {
            // ensure that timeout and speed settings are sane
            if (opts.speed.constructor == String)
                opts.speed = {slow: 600, fast: 200}[opts.speed] || 400;
            if (!opts.sync)
                opts.speed = opts.speed / 2;
            while((opts.timeout - opts.speed) < 250)
                opts.timeout += opts.speed;
        }
        if (opts.easing)
            opts.easeIn = opts.easeOut = opts.easing;
        if (!opts.speedIn)
            opts.speedIn = opts.speed;
        if (!opts.speedOut)
            opts.speedOut = opts.speed;

 		opts.slideCount = els.length;
        opts.currSlide = first;
        if (opts.random) {
            opts.nextSlide = opts.currSlide;
            if (++opts.randomIndex == els.length)
                opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else
            opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

        // fire artificial events
        var e0 = $slides[first];
        if (opts.before.length)
            opts.before[0].apply(e0, [e0, e0, opts, true]);
        if (opts.after.length > 1)
            opts.after[1].apply(e0, [e0, e0, opts, true]);

        if (opts.click && !opts.next)
            opts.next = opts.click;
        if (opts.next)
            $(opts.next).bind('click', function(){return advance(els,opts,opts.rev?-1:1)});
        if (opts.prev)
            $(opts.prev).bind('click', function(){return advance(els,opts,opts.rev?1:-1)});
        if (opts.pager)
            buildPager(els,opts);

        // expose fn for adding slides after the show has started
        opts.addSlide = function(newSlide) {
            var $s = $(newSlide), s = $s[0];
            if (!opts.autostopCount)
                opts.countdown++;
            els.push(s);
            if (opts.els)
                opts.els.push(s); // shuffle needs this
            opts.slideCount = els.length;

            $s.css('position','absolute').appendTo($cont);

            if (ie6 && opts.cleartype && !opts.cleartypeNoBg)
                clearTypeFix($s);

            if (opts.fit && opts.width)
                $s.width(opts.width);
            if (opts.fit && opts.height && opts.height != 'auto')
                $slides.height(opts.height);
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

            $s.css(opts.cssBefore);

            if (typeof opts.onAddSlide == 'function')
                opts.onAddSlide($s);
        };

        if (opts.timeout || opts.continuous)
            this.cycleTimeout = setTimeout(
                function(){go(els,opts,0,!opts.rev)},
                opts.continuous ? 10 : opts.timeout + (opts.delay||0));
    });
};

function go(els, opts, manual, fwd) {
    if (opts.busy) return;
    var p = els[0].parentNode, curr = els[opts.currSlide], next = els[opts.nextSlide];
    if (p.cycleTimeout === 0 && !manual)
        return;

    if (!manual && !p.cyclePause &&
        ((opts.autostop && (--opts.countdown <= 0)) ||
        (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
        if (opts.end)
            opts.end(opts);
        return;
    }

    if (manual || !p.cyclePause) {
        if (opts.before.length)
            $.each(opts.before, function(i,o) { o.apply(next, [curr, next, opts, fwd]); });

        var after = function() {
            if ($.browser.msie && opts.cleartype)
                this.style.removeAttribute('filter');
            $.each(opts.after, function(i,o) { o.apply(next, [curr, next, opts, fwd]); });
        };

        if (opts.nextSlide != opts.currSlide) {
            opts.busy = 1;
            if (opts.fxFn)
                opts.fxFn(curr, next, opts, after, fwd);
            else if ($.isFunction($.fn.cycle[opts.fx]))
                $.fn.cycle[opts.fx](curr, next, opts, after);
            else
                $.fn.cycle.custom(curr, next, opts, after);
        }
        if (opts.random) {
            opts.currSlide = opts.nextSlide;
            if (++opts.randomIndex == els.length)
                opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else { // sequence
            var roll = (opts.nextSlide + 1) == els.length;
            opts.nextSlide = roll ? 0 : opts.nextSlide+1;
            opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
        }
        if (opts.pager)
            $.fn.cycle.updateActivePagerLink(opts.pager, opts.currSlide);
    }
    if (opts.timeout && !opts.continuous)
        p.cycleTimeout = setTimeout(function() { go(els,opts,0,!opts.rev) }, opts.timeout);
    else if (opts.continuous && p.cyclePause)
        p.cycleTimeout = setTimeout(function() { go(els,opts,0,!opts.rev) }, 10);
};

$.fn.cycle.updateActivePagerLink = function(pager, currSlide) {
    $(pager).find('a').removeClass('activeSlide').filter('a:eq('+currSlide+')').addClass('activeSlide');
};

// advance slide forward or back
function advance(els, opts, val) {
    var p = els[0].parentNode, timeout = p.cycleTimeout;
    if (timeout) {
        clearTimeout(timeout);
        p.cycleTimeout = 0;
    }
    opts.nextSlide = opts.currSlide + val;
    if (opts.nextSlide < 0) {
        if (opts.nowrap) return false;
        opts.nextSlide = els.length - 1;
    }
    else if (opts.nextSlide >= els.length) {
        if (opts.nowrap) return false;
        opts.nextSlide = 0;
    }
    if (opts.prevNextClick && typeof opts.prevNextClick == 'function')
        opts.prevNextClick(val > 0, opts.nextSlide, els[opts.nextSlide]);
    go(els, opts, 1, val>=0);
    return false;
};

function buildPager(els, opts) {
    var $p = $(opts.pager);
    $.each(els, function(i,o) {
        var $a = (typeof opts.pagerAnchorBuilder == 'function')
            ? $(opts.pagerAnchorBuilder(i,o))
            : $('<a href="#">'+(i+1)+'</a>');
        // don't reparent if anchor is in the dom
        if ($a.parents('body').length == 0)
            $a.appendTo($p);
        $a.bind(opts.pagerEvent, function() {
            opts.nextSlide = i;
            var p = els[0].parentNode, timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            if (typeof opts.pagerClick == 'function')
                opts.pagerClick(opts.nextSlide, els[opts.nextSlide]);
            go(els,opts,1,!opts.rev);
            return false;
        });
    });
   //$p.find('a').filter('a:eq('+opts.startingSlide+')').addClass('activeSlide');
   $.fn.cycle.updateActivePagerLink(opts.pager, opts.startingSlide);
};

// this fixes clearType problems in ie6 by setting an explicit bg color
function clearTypeFix($slides) {
    function hex(s) {
        var s = parseInt(s).toString(16);
        return s.length < 2 ? '0'+s : s;
    };
    function getBg(e) {
        for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
            var v = $.css(e,'background-color');
            if (v.indexOf('rgb') >= 0 ) {
                var rgb = v.match(/\d+/g);
                return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
            }
            if (v && v != 'transparent')
                return v;
        }
        return '#ffffff';
    };
    $slides.each(function() { $(this).css('background-color', getBg(this)); });
};


$.fn.cycle.custom = function(curr, next, opts, cb) {
    var $l = $(curr), $n = $(next);
    $n.css(opts.cssBefore);
    var fn = function() {$n.animate(opts.animIn, opts.speedIn, opts.easeIn, cb)};
    $l.animate(opts.animOut, opts.speedOut, opts.easeOut, function() {
        if (opts.cssAfter) $l.css(opts.cssAfter);
        if (!opts.sync) fn();
    });
    if (opts.sync) fn();
};

$.fn.cycle.transitions = {
    fade: function($cont, $slides, opts) {
        $slides.not(':eq('+opts.startingSlide+')').css('opacity',0);
        opts.before.push(function() { $(this).show() });
        opts.animIn    = { opacity: 1 };
        opts.animOut   = { opacity: 0 };
        opts.cssBefore = { opacity: 0 };
        opts.cssAfter  = { display: 'none' };
    }
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
    fx:           'scollLeft', // one of: fade, shuffle, zoom, scrollLeft, etc
    timeout:       4000,  // milliseconds between slide transitions (0 to disable auto advance)
    continuous:    0,     // true to start next transition immediately after current one completes
    speed:         800,  // speed of the transition (any valid fx speed value)
    speedIn:       null,  // speed of the 'in' transition
    speedOut:      null,  // speed of the 'out' transition
    next:          null,  // id of element to use as click trigger for next slide
    prev:          null,  // id of element to use as click trigger for previous slide
    prevNextClick: null,  // callback fn for prev/next clicks:  function(isNext, zeroBasedSlideIndex, slideElement)
    pager:         null,  // id of element to use as pager container
    pagerClick:    null,  // callback fn for pager clicks:  function(zeroBasedSlideIndex, slideElement)
    pagerEvent:   'click', // event which drives the pager navigation
    pagerAnchorBuilder: null, // callback fn for building anchor links
    before:        null,  // transition callback (scope set to element to be shown)
    after:         null,  // transition callback (scope set to element that was shown)
    end:           null,  // callback invoked when the slideshow terminates (use with autostop or nowrap options)
    easing:        null,  // easing method for both in and out transitions
    easeIn:        null,  // easing for "in" transition
    easeOut:       null,  // easing for "out" transition
    shuffle:       null,  // coords for shuffle animation, ex: { top:15, left: 200 }
    animIn:        null,  // properties that define how the slide animates in
    animOut:       null,  // properties that define how the slide animates out
    cssBefore:     null,  // properties that define the initial state of the slide before transitioning in
    cssAfter:      null,  // properties that defined the state of the slide after transitioning out
    fxFn:          null,  // function used to control the transition
    height:       'auto', // container height
    startingSlide: 0,     // zero-based index of the first slide to be displayed
    sync:          1,     // true if in/out transitions should occur simultaneously
    random:        0,     // true for random, false for sequence (not applicable to shuffle fx)
    fit:           0,     // force slides to fit container
    pause:         1,     // true to enable "pause on hover"
    autostop:      0,     // true to end slideshow after X transitions (where X == slide count)
    autostopCount: 0,     // number of transitions (optionally used with autostop to define X)
    delay:         0,     // additional delay (in ms) for first transition (hint: can be negative)
    slideExpr:     null,  // expression for selecting slides (if something other than all children is required)
    cleartype:     0,     // true if clearType corrections should be applied (for IE)
    nowrap:        0      // true to prevent slideshow from wrapping
};

})(jQuery);


/*
 * jQuery Cycle Plugin Transition Definitions
 * Copyright (c) 2007-2008 M. Alsup
 * Version:  2.22
 */
(function($) {

//
// These functions define one-time slide initialization for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//

// scrollLeft/Right
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
    $cont.css('overflow','hidden');
    opts.before.push(function(curr, next, opts) {
        $(this).show();
        opts.cssBefore.left = next.offsetWidth;
        opts.animOut.left = 0-curr.offsetWidth;
    });
    opts.cssFirst = { left: 0 };
    opts.animIn   = { left: 0 };
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
    $cont.css('overflow','hidden');
    opts.before.push(function(curr, next, opts) {
        $(this).show();
        opts.cssBefore.left = 0-next.offsetWidth;
        opts.animOut.left = curr.offsetWidth;
    });
    opts.cssFirst = { left: 0 };
    opts.animIn   = { left: 0 };
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
    $cont.css('overflow','hidden').width();
//    $slides.show();
    opts.before.push(function(curr, next, opts, fwd) {
        $(this).show();
        var currW = curr.offsetWidth, nextW = next.offsetWidth;
        opts.cssBefore = fwd ? { left: nextW } : { left: -nextW };
        opts.animIn.left = 0;
        opts.animOut.left = fwd ? -currW : currW;
        $slides.not(curr).css(opts.cssBefore);
    });
    opts.cssFirst = { left: 0 };
    opts.cssAfter = { display: 'none' }
};

})(jQuery);

/*These plug-ins call*/
	jQuery('#serviceContent').accordion({
			autoheight: false
			});
	// Cycle
		$(function() {
			$('#fW_Content').cycle({ 
			fx:    'scrollLeft',
			pager: '#fW_Controls'
 			});
		});
//plug-ins  end
	
});


		