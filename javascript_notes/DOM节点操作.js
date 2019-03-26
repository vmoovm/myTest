// JavaScript Document


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
