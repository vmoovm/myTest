// JavaScript Document

/*-----------------------------------------------------
原生DOM选择器
-----------------------------------------------------*/
/* 选择元素 querySelector、querySelectorAll 接收的参数和 CSS 选择器完全一致。
 * 区别在于 querySelector 用来获取一个元素，而querySelectorAll 可以获取多个元素。
 * querySelector 将返回匹配到的第一个元素，如果没有匹配的元素则返回 Null。
 * querySelectorAll 返回一个包含匹配到的元素的数组，如果没有匹配的元素则返回的数组为空。
*/
// jq:
$("div");
// js:
document.querySelector("div");//选中一个
// 例:
document.querySelector("div.test>p:first-child");
// jq:
$(".ele")
// js:
div.querySelectorAll(".ele");//选中全部
// 例:
<div class="test">
	<p>第一个</p>
	<p>第二个</p>
</div>
<div class="test">
	<p>第一个</p>
	<p>第二个</p>
</div>
document.querySelector("div.test>p:first-child")[0];

// 父兄弟元素
// jq:
$(".ele").parent();
$(".ele").prev();
$(".ele").next();
$(".ele").last();
$(".ele").first();
// js:
document.querySelector(".ele").parentNode;//其父元素
document.querySelector(".ele").previouElementSibing;//其前紧挨着的一个兄弟元素
document.querySelector(".ele").nextElementSibling;//其后紧挨着的一个兄弟元素
document.querySelector(".ele").lastElementChild;//最后一个子元素
document.querySelector(".ele").children[0];//第一个子元素
// 获取元素文本
// jq:
$(".ele").html();
$(".ele").text();
$(".ele").val();
$(".ele").replaceWidth(string);
// js:
document.getElementById(".ele").innerHTML;//获取该元素的html代码
document.getElementById(".ele").textContent;//获取该元素的文本
document.getElementById(".ele").value;//获取该input的value值
document.getElementById(".ele").outerHTML=string;//
// 创建元素
// jq:
var newEle=$("div");
// js:
var newEle=document.createElement("div");//创建一个div

// set/get 设置和获得属性
// jq:
$(".ele").filter(":first").attr("key","value"); //设置值
$(".ele").filter(":first").attr("key"); //取值
$(".ele").addClass("class");
$(".ele").removeClass("class");
$(".ele").toggoleClass("class");
$(".ele").css("border-width","20px");
// js:
document.querySelector(".ele").setAttribute("key","value");//给该元素设置属性
document.querySelector(".ele").getAttribute("key");//获取该元素的属性值
document.querySelector(".ele").classList.add("class");//给该元素添加样式名
document.querySelector(".ele").classList.remove("class");//移动譔元素的样式名
document.querySelector(".ele").classList.toggle("class");//有或无添加或删除样式名
document.querySelector(".ele").style.borderWidth="20px";//设置边框宽度

// 附加
// jq:
$(".ele").append($("<div/>"));
// js:
document.querySelector(".ele").appendChild(document.createElement("div"));

// 克隆
// jq:
var cloneEl=$(".ele").clone();
// js:
var cloneEl=document.querySelector(".ele").cloneNode(true);
// 移除
// jq:
$(".ele").remove();
// js:
var toRemove=document.querySelector(ele);
toRemove.parentNode.removeChild(toRemove);
// 显示和隐藏
// jq:
$(".ele").show();
$(".ele").hide();
// js:
ele.style.display="";
ele.style.display="none";

// 是否包含某个class
// jq:
$("ele").addClass("className");
// js:
if(ele.classList){
	ele.classList.add(className);
}else{
	ele.className+=' '+className;
}

// 移除class
// jq:
$("ele").removeClass(className);
// js:
function removeClass(ele,cls){
	var reg=new RegExp("(\\s|^)"+cls+"\\s|$");
	ele.className=ele.className.replace(reg," ").replace(/(^\s*)|(\s*$)/g,"");
}
// 如何你只需要支持IE10+,Chrome,Firefox,Opera,Safari可以使用html5的classList功能
ele.classList.add(className);
ele.classList.remove("foo");
ele.classList.contains("foo");
ele.classList.toggle("acitve");
// 插入 HTML
// jq:
ele.before(htmlString);
$(parent).append(ele);
$(ele).after(htmlString);
// js:
ele.insertAdjacentElement("beforebegin",htmlString);
parent.appendChild(ele);
ele.insertAdjacentElement("afterend",htmlString);

// 获取子节点
// jq:
$(ele).children();
// js:
ele.children;
// Trim全选复制放进笔记
// jq:
$.trim(string);
// js:
string.trim();
/*-----------------------------------------------------
合并对象
-----------------------------------------------------*/
// 合并数组  concat()
a=[1,3,6];
b=[1,3,6];
c=a.concat(b);
// console.log(c);
// 结果:
c=[1,3,6,1,3,6]

//合并字面量对象  Object.assign()(会改变目标对象本身)
var newC={
	a:'.class',
	b:'.name'
}
var oldA={
	check:'zcheck',
	checkB:'.zcheckB'
}
var newS=Object.assign(newC,oldA);
//注意目标对象自身也会改变。
// console.log(newC);{	a:'.class',	b:'.name',	check:'zcheck',	checkB:'.zcheckB'}
// console.log(newS);{	a:'.class',	b:'.name',	check:'zcheck',	checkB:'.zcheckB'}

// 函数实现合并字面量对象(不会改变任何一个目标对象本身)
var o1={a:1, b:2};
var o2={c:3, d:4};
// 把o1和o2合并起来，变成o3={a:1, b:2,c:3, d:4}
// 合并方法：
function mergeObj(o1,o2){
	var o3={};
	for(var key in o1){
		o3[key]=o1[key]
	}
	for(var key in o2){
		o3[key]=o2[key]
	}
	return o3;
}
// 调用方法：
var o3=mergeObj(o1,o2);
console.log(o1);//{a:1, b:2};
console.log(o2);//{c:3, d:4};
console.log(o3);//{a:1, b:2,c:3, d:4};

// 去空格函数
function del_space(elem){
  var elem_child = elem.childNodes;//得到参数元素的所有子元素

  for(var i=0;i<elem_child.length;i++){ //遍历子元素
        if(elem_child.nodeName == "#text" && !/\S/.test(elem_child.nodeValue)) { 
           elem.removeChild(elem_child)
        }
    }

}

/*-----------------------------------------------------
自定义方法insertHTML（el.where,html） 参数beforeBegin、beforeEnd、afterBegin、afterEnd
-----------------------------------------------------*/
function insertHTML(el, where, html) {
    if (!el) {
        return false;
    }
     
    where = where.toLowerCase();
     
    if (el.insertAdjacentHTML) {//IE
        el.insertAdjacentHTML(where, html);
    } else {
        var range = el.ownerDocument.createRange(),
            frag = null;
         
        switch (where) {
            case "beforebegin":
                range.setStartBefore(el);
                frag = range.createContextualFragment(html);
                el.parentNode.insertBefore(frag, el);
                return el.previousSibling;
            case "afterbegin":
                if (el.firstChild) {
                    range.setStartBefore(el.firstChild);
                    frag = range.createContextualFragment(html);
                    el.insertBefore(frag, el.firstChild);
                } else {
                    el.innerHTML = html;
                }
                return el.firstChild;
            case "beforeend":
                if (el.lastChild) {
                    range.setStartAfter(el.lastChild);
                    frag = range.createContextualFragment(html);
                    el.appendChild(frag);
                } else {
                    el.innerHTML = html;
                }
                return el.lastChild;
            case "afterend":
                range.setStartAfter(el);
                frag = range.createContextualFragment(html);
                el.parentNode.insertBefore(frag, el.nextSibling);
                return el.nextSibling;
        }
    }
}

// 使用方法
var elem = document.getElementById('abc');
     
    insertHTML(elem, 'beforeBegin', '<dd class="color_2">上一个兄弟节点previousSibling</dd>');
    insertHTML(elem, 'beforeEnd', '<dd class="color_3">最后一个节点lastChild</dd>');
    insertHTML(elem, 'afterBegin', '<dd class="color_4">第一个节点firstChild</dd>');
    insertHTML(elem, 'afterEnd', '<dd class="color_5">下一个兄弟节点nextSibling</dd>');

/*-----------------------------------------------------
FF下支持IE特有的insertAdjacentElement以及insertAdjacentText
-----------------------------------------------------*/
if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement)
{
     HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode)
     {
        switch (where)
        {
            case 'beforeBegin':
                this.parentNode.insertBefore(parsedNode,this)
                break;
            case 'afterBegin':
                this.insertBefore(parsedNode,this.firstChild);
                break;
            case 'beforeEnd':
                this.appendChild(parsedNode);
                break;
            case 'afterEnd':
                if (this.nextSibling) this.parentNode.insertBefore(parsedNode,this.nextSibling);
                    else this.parentNode.appendChild(parsedNode);
                break;
         }
     }

     HTMLElement.prototype.insertAdjacentHTML = function (where,htmlStr)
     {
         var r = this.ownerDocument.createRange();
         r.setStartBefore(this);
         var parsedHTML = r.createContextualFragment(htmlStr);
         this.insertAdjacentElement(where,parsedHTML)
     }

     HTMLElement.prototype.insertAdjacentText = function (where,txtStr)
     {
         var parsedText = document.createTextNode(txtStr)
         this.insertAdjacentElement(where,parsedText)
     }
}

// 使用方法
 if(e.insertAdjacentElement)
    {
        e.insertAdjacentElement("beforeEnd" , el);
    }
    else
    {
        e.insertAdjacentHTML("beforeEnd" , el.outerHTML);
    }

/*-----------------------------------------------------
解决绑定事件全部主流浏览器方法
-----------------------------------------------------*/
var ele=document.getElementById("ele");
//ie9及以上版addEventListener() 注释：usecaptrue 冒泡或捕获，值域 ture | false
ele.addEventListener(event,fun,usecaptrue);
// 例：
ele.addEventListenter('click',function(){this.innerHTML='对了'},false);
// ie8及更早的ie版本 判断 if(ele.attachEvent){} 
ele.attachEvent(event,fun);
//例：
ele.attachEvent('click',function(){this.innerHTML='对了'});

/*-----------------------------------------------------
取N位小数
思路：对该数放大10的N次方倍，四舍五入取最小整数，再缩小10的N次方倍
-----------------------------------------------------*/
function xround(x, num){
    Math.round(x * Math.pow(10, num)) / Math.pow(10, num) ;
}
xround(3.44492, 3); // 得到 3.445

/*-----------------------------------------------------
批量定义样式表
-----------------------------------------------------*/
var cssText="width:200px; height:40px; padding: 0 10px; display:block;background:rgba(249,249,249,0.6);color:#333333;font-size: 16px;line-height: 30px;";
var dd=document.querySelectorAll('li.userCenter');
	for(var n=0; n<dd.length;n++){
		dd[n].style.cssText=cssText;
	}

/*-----------------------------------------------------
是否支持css的某个属性
-----------------------------------------------------*/
	var canScroll = true;
	var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
	transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];
	function isSuportCss(property){
		var body = $("body")[0];
		for(var i=0; i<property.length;i++){
			if(property[i] in body.style){
				return true;
			}
		}
		return false;
	}

/*-----------------------------------------------------
重写鼠标滑动事件
-----------------------------------------------------*/
	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if(canScroll){
			if (delta < 0) {
				alert(isSuportCss(transition));
			}else {
				isSuportCss(transition);
			}
		}
		return false;
	}

/*-----------------------------------------------------
计算中英文符号的总长度
-----------------------------------------------------*/
首先你要知道，.length得到的是字符长度，不是字节长度，一个汉字和一个英文字符都是算一个字符的；
其次，在不同编码格式的网页中，汉字占用的字节是不同的，比如在GB2312中汉字是2个字节，而在UTF-8编码格式中汉字可以是2个字节，也可能是3个字节，甚至在iso-8859-1编码中汉字是5个字节的！
所以要根据不同的编码来计算：
 
// 比如在GB2312中：
function getByteForGB(s)
{
return s.replace(/[^\u0000-\u007f]/g, "\u0061\u0061").length;
}
 
// 在UTF-8中：
function  getByteForUTF(s)
{
	a=s.replace(/[\u0000-\u007f]/g, "\u0061");
	b=a.replace(/[\u0080-\u07ff]/g, "\u0061\u0061");
	c=b.replace(/[\u0800-\uffff]/g, "\u0061\u0061\u0061");
	return c.length; 
}





//js数组求最大最小值可以这么写，不用自己写遍历比较 
//最大：
Math.max.apply(Math,array);   
//最小:
Math.min.apply(Math.array); 



/*-----------------------------------------------------
选中本身html(jquery)
-----------------------------------------------------*/
// <div class="test"><p>hello，你好！</p></div>
// <script>
$(".test").prop("outerHTML");
//结果:'<div class="test"><p>hello，你好！</p></div>';
// </script>


/*-----------------------------------------------------
滚动条事件
-----------------------------------------------------*/
window.onscroll=function(){
	alert('滚动条事件');
}


/*-----------------------------------------------------
监控窗口大小事件
-----------------------------------------------------*/
window.onresize=function(){
	alert('窗口大小事件');
}

window.addEventListener('resize', function(){
	alert('窗口大小事件');
})

/*-----------------------------------------------------
表单攻略(jquery)
-----------------------------------------------------*/

/* 多选/全选/反选
 * 
 * 我用jQuery写的一个全选反选的小功能，但是发现为何只能用一次？
 * 第一次可以全选反选都正常，等到下一轮的时候就不管用了，但是alert提示出的却是正确的。
 * 用prop函数就可以了、可以百度一下prop个attr的区别
 */
// 设置值
$("input[type='checkbox']").prop("checked", true);
$("input[type='checkbox']").prop("checked", false);
// 取值
$("input[type='checkbox']").prop("checked");
$("input[type='checkbox']").prop("checked");


/*在IE下是支持firstChild,lastChild,nextSibling,previousSibling
但是在FF下，由于它会把标签之间的空格当成文本节点，所以为了准确地找到相应的元素，会用
firstElementChild,
lastElementChild,
nextElementSibling,
previousElementSibling
兼容的写法是这样的*/
var oFirst = oParent.firstElementChild||oParent.firstChild                                    
//也可以这么写      
var  oFirst = oParent.children[0];
var oLast = oParent.lastElementChild||oParent.lastChild                                   
//也可以这么写       
var  oLast = oParent.children[oParent.children.length-1];
var oNext = obj.nextElementSibling||obj.nextSibling                                   
var oPre = obj.previousElementSibling||obj.previousSibling


/*-----------------------------------------------------
递归实例
-----------------------------------------------------*/
function sum(num){
	//console.log(num);
	if(num<=1){
		return 1;
	}else{
		return num+sum(num-1);
	}
}
console.log(sum(5));//15

/*-----------------------------------------------------
时间加减法
-----------------------------------------------------*/
 var t = new Date();//你已知的时间
 var t_s = t.getTime();//转化为时间戳毫秒数
 
 t.setTime(t_s + 1000 * 60);//设置新时间比旧时间多一分钟
 alert(t) // 2016-12-11 20:21:20
 
 t.setTime(t_s + 1000 * 60 * 60);//设置新时间比旧时间多一小时
 alert(t) // 2016-12-11 21:20:20
 
 t.setTime(t_s + 1000 * 60 * 60 * 24);//设置新时间比旧时间多一天
 alert(t) // 2016-12-12 20:20:20
/*-----------------------------------------------------
多次自执行,可免去clearTimeout()的麻烦
-----------------------------------------------------*/
	var time = "";
	this.stime = function(){
		var dateTime = new Date();
		time = dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds();
		// $("myDate_time").value=time;
		setTimeout('stime()',1000);
	}
	stime();

/*-----------------------------------------------------
快速删除数组,保留前几个 
-----------------------------------------------------*/
var arr = ['abc',2,4,546,'st']
arr.length = 1  // ['abc']
arr.length = 2  // ['abc',2]
arr.length = 3  // ['abc',2,4]
