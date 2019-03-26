// JavaScript Document
/*-----------------------------------------------------
如何操作DOM元素
-----------------------------------------------------*/
//获取元素
document.getElementById();//以id方式获取元素
document.getElementsByClassName();//以样式名获取元素
document.getElementsByTagName();//以标签名获取元素
document.getElementsByName();//以name属性获取元素


document.getCSSCanvasContext();
document.getElementsByTagNameNS()
document.getAnonymousNodes()
document.getAnonymousElementByAttribute()
document.getAttribute();

document.getItems()
//如何操作表单元素


//给IE和其他浏览器监听单击事件
function bindEvent() {  
    var button = document.getElementById("buttonId"); 
    if (button.addEventListener) {  
        alert("Other browser");  
        button.addEventListener("click",showEvent,false);  
        //button.addEventListener("click",showEvent2,false);  
        //button.addEventListener("click", showEvent, true);  
        //button.addEventListener("click", showEvent2, true);  
    } else if (button.attachEvent) {  
        alert("IE browser");  
        button.attachEvent("onclick", showEvent);  
        button.attachEvent("onclick", showEvent2);  
    }  
}  
//给IE和其他浏览器取消监听事件
function removeEvent() {  
    var button = document.getElementById("buttonId");  
    if (button.removeEventListener) {  
        alert("Other browser");  
        //button.removeEventListener("click",showEvent,false);  
        button.removeEventListener("click", showEvent, true);  
    } else if (button.detachEvent) {  
        alert("IE browser");  
        button.detachEvent("onclick", showEvent);  
    }  
}

//取消冒泡
function showEvent(e) {  
    if (window.event != undefined) {  
        window.event.cancelBubble = true;  
    } else if (e.stopPropagation) {  
        e.stopPropagation();  
    }  
    alert("Event here!");  
}  

























