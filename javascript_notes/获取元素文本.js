// JavaScript Document

/*-----------------------------------------------------
获取元素文本
-----------------------------------------------------*/
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
