function poluoluoshare(type)
{
	var link = '';
	switch(type)
	{
		case 'qqweibo': link = 'http://v.t.qq.com/share/share.php?title={title}&url={url}&appkey=&site={title}'; break;
		case 'sina': link = 'http://v.t.sina.com.cn/share/share.php?appkey=1129579542&url={url}&title={title}&content=gb2312'; break;
		case 'kaixin': link = 'http://www.kaixin001.com/repaste/share.php?rtitle={title}&rcontent={url}'; break;
		case 'qqkoujian': link = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pic={pic}'; break;
		case 'qqxiaoyou': link = 'http://pengyou.qq.com/index.php?mod=usershare&act=onekey&to=xiaoyou&url={url}&title={title}'; break;
		case '163weibo': link = 'http://t.163.com/article/user/checkLogin.do?source={site}&info={title}'; break;
		case 'moptui': link = 'http://tk.mop.com/api/post.htm?url={url}&title={title}&desc={content}'; break;
		case 'feixin': link = 'http://space.feixin.10086.cn/api/share?source={site}&title={title}&url={url}'; break;
		case 'sohu': link = 'http://t.sohu.com/third/post.jsp?&url={url}&title={title}&content=utf-8'; break;
		case 'renren': link = 'http://share.renren.com/share/buttonshare.do?link={url}&title={title}'; break;
		case 'baidu': link = 'http://apps.hi.baidu.com/share/?url={url}&title={title}&content={content}'; break;
		case 'taojianghu': link = 'http://share.jianghu.taobao.com/share/addShare.htm?url={url}&title={title}&content={content}'; break;
		//case 'baidu': link = 'http://tieba.baidu.com/i/sys/share?type=text&title={title}&link={url}'; break;
		//case 'douban': link = 'http://www.douban.com/recommend/?url={url}&title={title}'; break;
		//case 'qq': link = 'http://shuqian.qq.com/post?from=3&title={title}&uri={url}'; break;
	}
	link = link.replace('{title}', encodeURIComponent(document.getElementsByTagName('h1')[0].innerHTML));
	link = link.replace('{url}', encodeURIComponent(window.location.href));
	link = link.replace('{source}', 'poluoluo.com');
	window.open(link);
}


window.onload=function()
{
    var oH2More=document.getElementById('sjmore');
    var oUlList=document.getElementById('sjlista');	
    oH2More.onclick=oUlList.onmouseover=function()
    {
    oUlList.style.display="block";

    }

    oH2More.onmouseout=oUlList.onmouseout=function()
    {
    oUlList.style.display="none";

    }

};