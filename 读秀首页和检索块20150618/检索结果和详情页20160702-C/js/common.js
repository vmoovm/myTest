// JavaScript Document
$(function(){
	/*
	 * 下拉菜单
	 * a为鼠标滑过的标签
	 * b为显示的标签
	 */
	function sDown(a,b){
		$(a).mouseenter(function(){
			$(this).find(b).show();
		}).mouseleave(function(){
			$(this).find(b).hide();
		});
	}
	//服务中心下拉菜单
	sDown('.zt_sub',".zt_site,.zt_arrow1,.zt_arrow2");
	//更多的下拉菜单
	sDown('.zs_m_sub',".zs_m_site,.zs_m_arrow1,.zs_m_arrow2");
});





























