// JavaScript Document

/*-----------------------------------------------------
父兄弟元素
-----------------------------------------------------*/
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
