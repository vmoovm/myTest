// JavaScript Document

$(function(){

	var conf={//��������
		
		'btn_l':$("#left"),		//�󵥻���ť
		'btn_l_h':'left_h',		//����껬����ʽ��
		'btn_r':$("#right"),		//�ҵ�����ť
		'btn_r_h':'right_h',		//����껬����ʽ��
		'content':$('.content'),		//һ������
		'middle':$("#middle"),		//����������ƶ�Ŀ��
		'bg':$('#bg'),		//�󱳾�
		'minW':1024		//������С���

	}
	
	var ali={//����������
		'flag':0,		//������ı��־λ
		'count':0,		//�ڼ�������¼��ǰ����ţ�Ĭ�ϵ�һ��
		'lastW':$(window).width(),		//�ϴ�����
		'lastH':$(window).width(),		//�ϴ�����
		'width':$(window).width(),		//��ǰ����
		'height':$(window).height()		//��ǰ����
	}
	
	//���ݴ��ڸı����³�ʼ��
	function setwindow(){
		ali.width=$(window).width();
		ali.height=$(window).height();
		if(ali.width<=conf.minW){
			ali.width=conf.minW;
		}
		
		conf.bg.height(ali.height+'px');
		conf.content.width(ali.width);
		conf.middle.width(conf.content.length*ali.width);
		
		if(ali.flag){
			conf.middle.css('left',-ali.width*ali.count+'px');
			ali.lastW=ali.width;
			ali.lastH=ali.height;
			ali.flag=0;
		}
	}
	setwindow();
	
	function move_left(){
		var left_site=conf.middle.css("left");
		if(!(conf.middle.position().left==(-(conf.content.length-1)*ali.width))){
			conf.middle.not(':animated').animate({left:"-="+ali.width},500);
			ali.count++;
		}
	}
	
	function move_right(){
		var left_site=conf.middle.css("left");
		if(!(conf.middle.position().left==0)){
			conf.middle.not(':animated').animate({left:"+="+ali.width},500);
			ali.count--;
		}
	}
	
	//obo�ж��ƶ�����  ������1��left��0��right
	function move(obo){
		setwindow();
		if(obo){
			move_left();
		}else{
			move_right();
		}
	}
	
	//��ť����Ч��
	conf.btn_l.mouseover(function(){
		$(this).parents('.left').addClass(conf.btn_l_h);	  
	}).mouseout(function(){
		$(this).parents('.left').removeClass(conf.btn_l_h);
	});
	
	//�Ұ�ť����Ч��
	conf.btn_r.mouseover(function(){
		$(this).parents('.right').addClass(conf.btn_r_h);		  
	}).mouseout(function(){
		$(this).parents('.right').removeClass(conf.btn_r_h);
	});
	

	//��������ڴ�С���
	$(window).resize(function(){
		ali.flag=1;
		setwindow();				  
	});

	conf.btn_l.bind("click",function(){move(1)});
	conf.btn_r.bind("click",function(){move()});
	
});





























