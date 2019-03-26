// JavaScript Document

/*-----------------------------------------------------
set/get 设置和获得属性
-----------------------------------------------------*/
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
