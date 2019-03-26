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
是否支持css的某个属性
-----------------------------------------------------*/






//js数组求最大最小值可以这么写，不用自己写遍历比较 
//最大：
Math.max.apply(Math,array);   
//最小:
Math.min.apply(Math.array); 



/*-----------------------------------------------------
表单攻略
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




