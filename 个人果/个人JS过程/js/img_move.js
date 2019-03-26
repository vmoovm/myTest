// JavaScript Document
//注：只供已知尺寸下应用，不支持全屏
//若不想要左右按钮，请在html内不添加role=btnl\role=btnl属性或者不写左右按钮标签即可
//若不想要点号按钮，请在html内不添加role=btn 属性或不写点号按钮即可
$(document).ready(function() {
	var p_this=$('#move');
	var conf={
		imgW:990,//必填项，图片宽
		imgH:350,//必填项，图片高
		imgSpeed:3000,//选填项，图片切换间隔 ，默认为3秒
		effectSpeed:500,//选填项，效果过渡速度，默认为500毫秒
		sort:true,//选填项，顺序,分为按顺序切换效果和随机切换效果，默认为true为 顺序，false为随机
		sortN:-1,//选填项，顺序起效时，记录效果坐标，计数器作用，与sort一同使用，true起作用，默认为-1，改值会影响第一个切换效果
		cur:1,//选填项，当前图片， 默认为第一张
		last:1,//不可修改,记录上一张图片
		zidingyi:[],//可选项，自定义几种动画，默认为空数组，必须填写大于等于正整数或为空白，还可以和sort\sortN同时使用
		imgBox:p_this.find("[role='imgBox']"),//选填项,定义获得图片父标签
		imgEffects:p_this.find("[role='imgEffects']"),//选填项,定义获得显示效果父标签
		btn:p_this.find("[role='btn']"),//选填项,定义获得右侧按钮属性
		btnl:p_this.find("[role='left']"),//选填项,定义获得右侧按钮属性
		btnr:p_this.find("[role='right']"),//选填项,定义获得右侧按钮属性
		ele:'<li class="btn_off"></li>'//选填项,默认追加按钮为li
	}
	//初始化
	function oneStart(){
		$('.content:eq('+parseInt(conf.cur-1)+')').show();
		for(n=0;n<conf.imgBox.children().length-1;n++){
			conf.btn.append(conf.ele);
		}
	}
	oneStart();
	//减少占用内存固定格子个数
	var lattice=conf.imgW/10
	//正序或倒序翻页
	function img_move(lorr){
		if(lorr){
			var last=1;
			conf.cur++ ;
			if(conf.cur>$(conf.imgBox).children().length){
				conf.cur=1;
			}
		}else{
			conf.cur-- ;
			if(conf.cur<1){
				conf.cur=$(conf.imgBox).children().length;
			}
		}
		displayImg();
		//是否显示点按钮
		if(conf.btn.length){
			point_cur();
		}else{
			conf.btn.hide();
		}
	}
	//圆点按钮及当前状态
	function point_cur(){
		conf.btn.children().attr('class','btn_off');
		conf.btn.children(':eq('+(conf.cur-1)+')').attr('class','btn_on');
	}
	//是否显示点按钮
	if(conf.btn.length){
		conf.btn.children().bind('click',function(){
			if(conf.cur!=$(this).index()+1){
				conf.cur=$(this).index()+2;
				img_move(false);
			}
		});
	}else{
		conf.btn.hide();
	}
	//右翻页
	if(conf.btnl.length){
		conf.btnr.bind('click',function(){
			img_move(false);
		});
	}else{
		conf.btnr.hide();		
	}
	//左翻页
	if(conf.btnl.length){
		
		conf.btnl.bind('click',function(){
			img_move(true);
		});
	}else{
		conf.btnl.hide();		
	}
	//自动翻页
	var clearN='null';
	clearN=setInterval(function(){img_move(true)},conf.imgSpeed);
	
	p_this.mouseenter(function(){
		clearInterval(clearN);
	}).mouseleave(function(){
		if(clearN) clearInterval(clearN);
		clearN=setInterval(function(){img_move(true)},conf.imgSpeed);
	});
	conf.imgEffects.mouseenter(function(){
		$(this).hide();
	}).mouseleave(function(){
		$(this).show();
	});
	//显示结果
	function displayImg(){
		conf.imgBox.children().hide();
		conf.imgBox.children(':eq('+parseInt(conf.cur-1)+')').show();
		if(conf.sort){
			effect[sortASC()]();
		}else{
			effect[img_random()]();
			
		}
	}
	//创建效果集
	var effect=new Array;
	//随时数
	function img_random(){
		return Math.floor(Math.random() * effect.length);
	}
	
	//正常顺序
	function sortASC(){
		if(conf.sortN>=effect.length-1){
			conf.sortN=0;
		}else{
			conf.sortN++;
		}
		return conf.sortN;
	}
	//建立效果标签
	function xiaoguo(img_w,img_h){
		var scr=conf.imgBox.children(':eq('+parseInt(conf.last-1)+')').find('img').attr('src');
		var html='';
		conf.imgEffects.html('');
		for(tr=0;tr<conf.imgH/img_h;tr++){
			for(td=0;td<conf.imgW/img_w;td++){
				html+='<li class="gezi animated" style="width:'+img_w+'px; height:'+img_h+'px;'+'left:'+td*img_w+'px;'+'top:'+tr*img_h+'px;'+'background:url('+scr+') no-repeat;'+'background-position:'+'-'+td*img_w+'px'+' '+'-'+tr*img_h+'px'+'"></li>';
			}
		}
		conf.imgEffects.append(html);
	}
	//水平百叶窗0
	function baiyechuang1(){
		xiaoguo(conf.imgW,lattice);
		$(".gezi").animate({'width':conf.imgW,'height':0,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(baiyechuang1);
	//垂直百叶窗1
	function baiyechuang2(){
		xiaoguo(lattice,conf.imgH);
		$(".gezi").animate({'width':0,'height':conf.imgH,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(baiyechuang2);
	//溶解3
	function rongjie(){
		xiaoguo(lattice,lattice);
		$(".gezi").animate({'width':0,'height':0,'borderRadius':'50%','opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(rongjie);
	//左移4
	function zuoyi(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'left':-conf.imgW*3,'top':0,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zuoyi);
	//右移5
	function youyi(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'left':conf.imgW*3,'top':0,'opacitiy':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(youyi);
	//上移6
	function shangyi(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'left':0,'top':-conf.imgH*3},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(shangyi);
	//下移7
	function xiayi(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'left':0,'top':conf.imgH*3},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(xiayi);
	//左右分散8
	function zuoyoufensan(){
		xiaoguo(conf.imgW/2,conf.imgH);
		$(".gezi:even").animate({'left':-conf.imgW*2,'top':0},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:odd").animate({'left':conf.imgW*2,'top':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zuoyoufensan);
	//上下分散9
	function shangxiafensan(){
		xiaoguo(conf.imgW,conf.imgH/2);
		$(".gezi:even").animate({'left':0,'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:odd").animate({'left':0,'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(shangxiafensan);
	//上翻10
	function shangfan(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'height':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(shangfan);
	//左翻11
	function zuofan(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'width':0,'left':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zuofan);
	//小方块中间消失12
	function xiaofangkuai(){
		xiaoguo(conf.imgW/2,conf.imgH/2);
		$(".gezi:eq(0)").animate({'width':0,'height':0,'left':conf.imgW*0.25,'top':conf.imgH*0.25,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:eq(1)").animate({'width':0,'height':0,'left':conf.imgW*0.75,'top':conf.imgH*0.25,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:eq(2)").animate({'width':0,'height':0,'left':conf.imgW*0.25,'top':conf.imgH*0.75,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:eq(3)").animate({'width':0,'height':0,'left':conf.imgW*0.75,'top':conf.imgH*0.75,'opacity':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(xiaofangkuai);
	//大方块中间消失13
	function dafangkuai(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'width':5,'height':5,'left':conf.imgW*0.5-2,'top':conf.imgH*0.5-2,'opacity':0.8},conf.effectSpeed,function(){
			$(this).hide();
		});
		conf.last=conf.cur;
	}
	effect.push(dafangkuai);
	//左右中间消失14
	function zhongjianxiaoshi1(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'left':conf.imgW/2,'width':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zhongjianxiaoshi1);
	//上下中间消失15
	function zhongjianxiaoshi2(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'top':conf.imgH/2,'height':0},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zhongjianxiaoshi2);
	//右下角消失16
	function youxiajiao1(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'top':conf.imgH*3,'left':conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(youxiajiao1);
	//左下角消失17
	function zuoxiajiao2(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'top':conf.imgH*3,'left':-conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zuoxiajiao2);
	//左上角消失18
	function zuoshangjiao3(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'top':-conf.imgH*3,'left':-conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zuoshangjiao3);
	//右上角消失19
	function youshangjiao4(){
		xiaoguo(conf.imgW,conf.imgH);
		$(".gezi").animate({'top':-conf.imgH*3,'left':conf.imgW*3},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(youshangjiao4);
	//多格变化20
	function duogezi1(){
		xiaoguo(lattice,lattice);
		$(".gezi:odd").animate({'left':conf.imgH*2,'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:even").animate({'left':-conf.imgH*2,'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(duogezi1);
	//多格变化21
	function duogezi2(){
		xiaoguo(lattice,conf.imgH);
		$(".gezi:odd").animate({'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:even").animate({'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(duogezi2);
	//多格变化21
	function duogezi3(){
		xiaoguo(conf.imgW,lattice);
		$(".gezi:odd").animate({'left':conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:even").animate({'left':-conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(duogezi3);
	//上下格左右消失21
	function zuoyouxiaoshi(){
		xiaoguo(conf.imgW,conf.imgH/2);
		$(".gezi:odd").animate({'left':conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:even").animate({'left':-conf.imgW*2},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(zuoyouxiaoshi);
	//左右格下上消失22
	function shangxiaxiaoshi(){
		xiaoguo(conf.imgW/2,conf.imgH);
		$(".gezi:odd").animate({'top':conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		$(".gezi:even").animate({'top':-conf.imgH*2},conf.effectSpeed,function(){$(this).hide();});
		conf.last=conf.cur;
	}
	effect.push(shangxiaxiaoshi);
	//自之定义16
//	function zidingyi(){
//		
//	}
	
	//根据自定义动画重组动画集
	if(conf.zidingyi.length){
		var zdy=new Array;
		conf.zidingyi.map(function(item,key){
			if(0<=item && item<effect.length){
				zdy.push(effect[item]);
			}else{
				alert("数字："+item+"太大或太小会被忽略，请输入小于"+parseInt(effect.length-1)+"的数字");
			}
		});
		//保证至少有一个动画
		if(zdy.length>0){
			effect=zdy;
		}
	}
	
});









