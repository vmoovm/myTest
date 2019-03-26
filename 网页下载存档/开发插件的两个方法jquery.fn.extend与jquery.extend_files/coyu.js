//获取一个对象
function getByid(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (document.all) {
		return document.all[id];
	} else if (document.layers) {
		return document.layers[id];
	} else {
		return null;
	}
}


//运行框操作
function creatID(DivID){
var objs=getByid(DivID).getElementsByTagName('textarea');
var inps=getByid(DivID).getElementsByTagName('input');
var buts=getByid(DivID).getElementsByTagName('button');
var labs=getByid(DivID).getElementsByTagName('label');
	for (i=0; i<objs.length; i++) {
		objs[i].id="runcode"+i;
		inps[i].id=i
		buts[i].id=i
		labs[i].id=i
	}
}
function runCode(obj){  //定义一个运行代码的函数，
	  var code=getByid("runcode"+obj).value;//即要运行的代码。
	  var newwin=window.open('','','');  //打开一个窗口并赋给变量newwin。
	  newwin.opener = null // 防止代码对论谈页面修改
	  newwin.document.write(code);  //向这个打开的窗口中写入代码code，这样就实现了运行代码功能。
	  newwin.document.close();
}

//复制代码
function doCopy(obj) { 
	if (document.all){
		 textRange = getByid("runcode"+obj).createTextRange(); 
		 textRange.execCommand("Copy"); 
		 alert("代码已经复制到剪切板");
	}else{
		 alert("此功能只能在IE上有效\n\n请在文本域中用Ctrl+A选择再复制")
	}
}
//另存代码
function saveCode(obj) {
        var winname = window.open('','','width=0,height=0,top=200,left=200px');
        winname.document.open('text/html', 'replace');
        winname.document.write(obj.value);
        winname.document.execCommand('saveas','','代码.html');
        winname.close();
}
