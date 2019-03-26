// JavaScript Document

//document.getElementsByName();
//var byName003=document.getElementById('byName003')
//byName003.addEventListener('click',cc,false);
//
//function cc(){
//	alert(1111);
//}
/*-----------------------------------------------------
获取元素
-----------------------------------------------------*/
 
document.getElementsByClassName("btn");

var zbyId003=document.getElementById('byId003').onclick=function(e){
};



function temp1() { 
//console.log(this); //Object {}
console.log(this);
var c=this;
function temp2() { 
console.log(this); //Window 
} 
var obc={};
temp2.call(obc); 
} 
var Obj = {}; 
temp1.call();

function tac(){//
}

var a=new tac();

//window instanceof Object ? console.log('Y'):console.log('N'); 
if(window instanceof Object){ console.log("y")}else{console.log("n")}
//if (window instanceof Object) alert('Y');else alert('N');
/*-----------------------------------------------------
打开窗口
-----------------------------------------------------*/
//function Wopen(){
//    window.open('http://www.baidu.com','_blank','width=300,height=300,menubar=no,toolbar=no,status=no,scrollbars=yes')
//
//} 
//
//document.getElementById('byId003').onclick=function(){
//	Wopen();
//}












