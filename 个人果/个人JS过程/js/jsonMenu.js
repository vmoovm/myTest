$(function() {
	var p_this = $('#zmenu');
	var conf = {
		zlist: ".zme_list", //必填项，具有子菜单单位
		zof: 'zme_on', //选填 ，状态1箭头
		zseconf: '.zme_second', //选填 ，加减号， 状态2二级及二级以下等多级菜单样式名
		zspeed: 160 //选填，动画速度
	}
	p_this.on('click', conf.zlist, function() {
		if ($(this).hasClass(conf.zof)) {
			$(this).next().slideUp();
			$(this).nextAll().find(conf.zseconf).slideUp(conf.zspeed);
			$(this).removeClass(conf.zof);
			$(this).nextAll().find(conf.zlist).removeClass(conf.zof);
			$(this).nextAll().find(conf.zlist).find('em').text('+');
			$(this).find('em').text('+');
		} else {
			$(this).next(':not(:animated)').slideDown(conf.zspeed);
			$(this).addClass(conf.zof);
			$(this).find('em').text('-');
		}

	});
});