//��ȡһ������
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


//���п����
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
function runCode(obj){  //����һ�����д���ĺ�����
	  var code=getByid("runcode"+obj).value;//��Ҫ���еĴ��롣
	  var newwin=window.open('','','');  //��һ�����ڲ���������newwin��
	  newwin.opener = null // ��ֹ�������̸ҳ���޸�
	  newwin.document.write(code);  //������򿪵Ĵ�����д�����code��������ʵ�������д��빦�ܡ�
	  newwin.document.close();
}

//���ƴ���
function doCopy(obj) { 
	if (document.all){
		 textRange = getByid("runcode"+obj).createTextRange(); 
		 textRange.execCommand("Copy"); 
		 alert("�����Ѿ����Ƶ����а�");
	}else{
		 alert("�˹���ֻ����IE����Ч\n\n�����ı�������Ctrl+Aѡ���ٸ���")
	}
}
//������
function saveCode(obj) {
        var winname = window.open('','','width=0,height=0,top=200,left=200px');
        winname.document.open('text/html', 'replace');
        winname.document.write(obj.value);
        winname.document.execCommand('saveas','','����.html');
        winname.close();
}
