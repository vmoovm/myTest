function zplayer (mdata) {
	var start = document.getElementById("play"); //播放
	var pause = document.getElementById("pause"); // 暂停
	// var reset = document.getElementById("reset");
	var prev1 = document.getElementById("prev"); // 上一曲
	var next1 = document.getElementById("next"); // 下一曲
	var jumpLeft = document.getElementById("speedLNum"); // 下一曲
	var jumpRight = document.getElementById("speedRNum"); // 下一曲
	var progress = document.getElementById("progress"); // 进度条
	var playRate = document.getElementById("playRate"); // 倍速播放
	var playerList = document.getElementById("playerList"); // 播放列表
	var startTime = document.getElementById("startTime"); // 当前音频时间
	var countTime = document.getElementById("countTime"); // 当前音频总时间
	var musicTitle = document.getElementById("zmusicPlayer-title"); // 当前音频名称
	var musicState = document.getElementById("zmusicPlayer-state"); // 当前音频状态/路径
	var musicCover = document.getElementById("zmusicPlayer-cover"); // 当前音频封面
	var musicCount = document.getElementById("zmusicPlayer-progress"); // 歌曲总数
	var media = document.getElementById("media");
	var isNext  = false;
	var isLoop = true;
	if (isLoop) isNext = true;
	
	var mediaSource = mdata;
	var durationTime,currentTime;
	var cur = 0;
	var url = mediaSource[cur].srcMedia
	document.getElementById("media").src=url;
	
	function parseToDOM(str){
	   var div = document.createElement("div");
	   if(typeof str == "string")
	       div.innerHTML = str;
	   return div.childNodes;
	}
	var htmlStr = '';
	for (var i = 0; i < mediaSource.length; i++) {
		htmlStr += '<li class="zmuiscPlayer-row">\
			<p class="zmuiscPlayer-actionshape"></p>\
			<h1 class="zmuiscPlayer-h" data-src="'+ mediaSource[i].srcMedia +'" data-index="' + i + '"><a href="#">'+ mediaSource[i].title +'</a><span>- 金晓峰</span></h1>\
			<p class="zmuiscPlayer-delete"></p>\
		</li>';
	}
	var liNodes = parseToDOM(htmlStr)
	for(var i = 0; i < liNodes.length; i++) {
		var nd = liNodes[i].cloneNode(true);
		playerList.appendChild(nd);
	}
	
	var playlist = document.querySelectorAll('.zmuiscPlayer-row');
	function playingStyle() {
		for(var c=0; c < playlist.length; c++) {
			playlist[c].classList.remove('zmuiscPlayer-playing')
		}
		console.log(this.parentElement)
		this.parentElement.classList.add('zmuiscPlayer-playing');
		cur = this.getAttribute('data-index');
		updateSrc(this.getAttribute('data-src'));
	}
	
	for(var n=0; n < playlist.length; n++) {
		playlist[n].querySelector('.zmuiscPlayer-h').addEventListener('click', playingStyle, false);
	}
	
	start.addEventListener('touchstart', function () {
		this.classList.add('zmuiscPlayer-scale');
	});
	
	start.addEventListener('touchend', function () {
		if(media.readyState == 4) {
			if (new RegExp(' zmuiscPlayer-start ').test(' ' + this.className + ' ')) {
				play();
			} else {
				pause();
			}
		} else {
			console.log('播放失败,优先尝试查看路径')
		}
		this.classList.remove('zmuiscPlayer-scale');
	});
	
	
	
	// 快退
	jumpLeft.addEventListener('touchstart', function () {
		var long = parseInt(this.getAttribute('data-long'));
		if ((media.currentTime + long) > 0) {
			media.currentTime = media.currentTime + long
		} else {
			media.currentTime = 0
		}
	}, false);
	// 快进
	jumpRight.addEventListener('touchstart', function () {
		var long = parseInt(this.getAttribute('data-long'));
		if ((media.currentTime + long) < media.duration) {
			media.currentTime = media.currentTime + long
		} else {
			media.currentTime = media.duration
		}
	}, false);
	function updateSrc (url) {
		try{
			document.getElementById("media").src=url;
			updateMusic ();
			return true;
		}catch(e){
			console.error('当前音频路径错误!');
			return false;
		}
	}
	// 下一曲
	function next () {
		cur = ++cur;
		if(cur >= mediaSource.length) cur = 0
		url = mediaSource[cur].srcMedia
		updateSrc (url)
	}
	next1.addEventListener('touchstart', next, false);
	// 上一曲
	function prev() {
		if(cur <= 0) cur = mediaSource.length
		cur = --cur;
		url = mediaSource[cur].srcMedia
		updateSrc (url)
	}
	prev1.addEventListener('touchstart',prev, false);
	
	// 返回格式化后时间
	timeFormat = function (time) {
        var tempMin = parseInt(time / 60);
        var tempSec = parseInt(time % 60);
        var curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
        var curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
        return curMin + ':' + curSec;
    }
	
	// 返回进度条百分比
	percentFormat = function (percent) {
        return (percent * 100).toFixed(2) + '%';
    }
	// 更新当前音乐封面
	function updateMusic () {
		musicCover.setAttribute('src', mediaSource[cur].cover);
		musicTitle.innerHTML = mediaSource[cur].title;
		musicState.innerHTML = mediaSource[cur].srcMedia;
	}
	// 更新播放进度
    function updateProgress () {
		var percent = media.currentTime / media.duration;
        progress.style.width = percentFormat(percent);
        startTime.innerHTML = timeFormat(media.currentTime);
        durationTime = media.duration;
    	currentTime = media.currentTime;
        if (media.ended){
    		progress.style.width = '100%';
    		startTime.innerHTML = timeFormat(media.duration);
    		pause();
    		// 是否
    		if (isLoop) {
    			next ();
    		} else {
    		}
    		clearInterval(finishClear)
    	}
    }
    var finishClear = null;
    // 进度条计时器
    function finishTimer() {
    	if(finishClear) clearInterval(finishClear)
    	finishClear = setInterval(updateProgress, 1000)
    }
    // 播放
    var play = function () {
    	media.play();
    	countTime.innerHTML = timeFormat(media.duration);
    	musicCount.innerHTML = (cur+1) + '/' + mediaSource.length;
    	finishTimer();
    	start.classList.remove('zmuiscPlayer-start');
		start.classList.add('zmuiscPlayer-pause');
    }
    // 暂停
    var pause = function () {
    	media.pause();
    	if(finishClear) clearInterval(finishClear);
    	start.classList.remove('zmuiscPlayer-pause');
		start.classList.add('zmuiscPlayer-start');
    }
    // 拖拽事件
    var progressWitdh = progress.parentElement.clientWidth
    progress.querySelector('p').addEventListener("touchstart",handleStart,false);
	progress.querySelector('p').addEventListener("touchmove",handleMove,false);
	progress.querySelector('p').addEventListener("touchend",handleEnd,false);
    var x1,y1,oldTime,newTime,olfWidth,newLeft;
    function handleStart(e){
		e.preventDefault();
		if(finishClear) clearInterval(finishClear);
		var touches = e.changedTouches;
		x1 = touches[0].pageX;
		y1 = touches[0].pageY;
		olfWidth = progress.clientWidth;
		pause();
	}
	function handleMove(e){
		e.preventDefault();
		var x2 = e.changedTouches[0].pageX;
		var y2 = e.changedTouches[0].pageY;
		newLeft = x2-x1;
		var nowWidth = olfWidth + newLeft;
		if(nowWidth<0){
			nowWidth = 0;
		}
		if(nowWidth>progressWitdh){
			nowWidth = progressWitdh;
		}
		progress.style.width = nowWidth + 'px';
		var per = nowWidth/progressWitdh;
		var nowAudioTime = durationTime*per;
		media.currentTime = nowAudioTime;
	}
	function handleEnd(e){
		progress.querySelector('p').removeEventListener("touchmove",handleEnd,false);
		play();
	}
	var rateCur = 0;
	var changeRate = function () {
		// currentTime = media.currentTime;
		rateCur++;
		var rate= [1.0, 2.0, -1.0, -0.5, 0.5]
		if (rateCur > rate.length) {
			rateCur = 0
		}
		media.playbackRate = rate[rateCur];
		// media.currentTime = currentTime
	}
	
	playRate.addEventListener('touchstart', changeRate, false);
    // 传 media.readyState 获得状态
    var getMusicState = function (state, eType) {
    	switch(state) {
    		case 0:
	    		console.log(eType + '没有关于音频/视频是否就绪的信息')
    			break;
    		case 1:
	    		console.log(eType + '关于音频/视频就绪的元数据')
    			break;
    		case 2:
	    		console.log(eType + '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒')
    			break;
    		case 3:
	    		console.log(eType + '当前及至少下一帧的数据是可用的')
    			break;
    		case 4:
	    		console.log(eType + '可用数据足以开始播放')
	    		play();
    			break;
    		default:
				console.log(eType + '获取状态失败','#f00')
    	}
    	
    }

/*    media.addEventListener('loadstart',function (e) {
    	getMusicState(media.readyState, e.type);
    }, false);
    media.addEventListener('durationchange',function (e) {
    	getMusicState(media.readyState, e.type);
    }, false);
    media.addEventListener('loadedmetadata',function (e) {
    	getMusicState(media.readyState, e.type);
    }, false);
    
    
    media.addEventListener('progress',function (e) {
    	getMusicState(media.readyState, e.type);
    }, false);*/
   
   media.addEventListener('loadeddata',function (e) {
    	getMusicState(media.readyState, e.type);
    }, false);
    media.addEventListener('canplay',function (e) {
    	getMusicState(media.readyState, e.type);
    }, false);
    
    
    /*media.addEventListener('canplaythrough',function (e) {
    	getMusicState(media.readyState, e.type);
    }, false);*/
    
    
    // alert(myVid.error.code);
}
