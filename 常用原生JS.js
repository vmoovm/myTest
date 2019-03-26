// JavaScript Document

/*-----------------------------------------------------
21、原生JavaScript中有insertBefore方法,可惜却没有insertAfter方法?用如下函数实现
-----------------------------------------------------*/
function insertAfter(newChild,refChild){
  var parElem=refChild.parentNode;
  if(parElem.lastChild==refChild){
    refChild.appendChild(newChild);
  }else{
    parElem.insertBefore(newChild,refChild.nextSibling);
  }
}
/*-----------------------------------------------------
22、原生JavaScript中兼容浏览器绑定元素事件
-----------------------------------------------------*/
function addEventSamp(obj,evt,fn){
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  }else if(obj.attachEvent){
    obj.attachEvent('on'+evt,fn);
  }
}


/*-----------------------------------------------------
23、原生JavaScript光标停在文字的后面，文本框获得焦点时调用
-----------------------------------------------------*/
function focusLast(){
  var e = event.srcElement;
  var r =e.createTextRange();
  r.moveStart('character',e.value.length);
  r.collapse(true);
  r.select();
}

/*-----------------------------------------------------
判断是否为数字类型
-----------------------------------------------------*/
function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}


/*-----------------------------------------------------

-----------------------------------------------------*/
//slideDown() 
Object.prototype.slideDown = function(){ 
 this.style.display = 'block'; 
 if(this.clientHeight<this.scrollHeight){ 
  this.style.height=10+this.clientHeight+"px"; 
  var _this = this; 
  setTimeout(function(){_this.slideDown()},10) 
 }else{ 
  this.style.height=this.scrollHeight+"px"; 
 } 
} 
//slideUp() 
Object.prototype.slideUp = function(){ 
 if(this.clientHeight>0){ 
  this.style.height=this.clientHeight-10+"px"; 
  var _this = this; 
  setTimeout(function(){_this.slideUp()},10) 
 }else{ 
  this.style.height=0; 
  this.style.display = 'none'; 
 } 
}


/*-----------------------------------------------------
前后追加元素
-----------------------------------------------------*/
//append()  
Object.prototype.append = function(newElem){  
    this.innerHTML += newElem;  
    return this;  
}  
//prepend()  
Object.prototype.prepend = function(newElem){  
    this.innerHTML = arguments[0] + this.innerHTML;  
    return this;  
}  
//after()  
Object.prototype.after = function(newElem){  
    this.outerHTML += arguments[0];  
    return this;  
}  
//before()  
Object.prototype.before = function(newElem){  
    this.outerHTML = arguments[0] + this.outerHTML;  
    return this;  
} 


/*-----------------------------------------------------
删除元素
-----------------------------------------------------*/
//empty()  
Object.prototype.empty = function(){  
    this.innerHTML = "";  
    return this;  
}  
//replaceWith()  
Object.prototype.replaceWith = function(newElem){  
    this.outerHTML = arguments[0];  
    return this;  
} 


/*-----------------------------------------------------
设置css类
-----------------------------------------------------*/
//hasClass()  
Object.prototype.hasClass = function(cName){  
    return !!this.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );  
}  
//addClass()  
Object.prototype.addClass = function(cName){  
    if( !this.hasClass( cName ) ){   
        this.className += " " + cName;  
    }  
    return this;  
}  
//removeClass()  
Object.prototype.removeClass = function(cName){  
    if( this.hasClass( cName ) ){   
        this.className = this.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " );  
    }  
    return this;  
} 


Object.prototype.hasClass = function(cName){  
    return this.classList.contains(cName)  
}  
Object.prototype.addClass = function(cName){  
    if( !this.hasClass( cName ) ){   
        this.classList.add(cName);  
    }  
    return this;  
}  
Object.prototype.removeClass = function(cName){  
    if( this.hasClass( cName ) ){   
        this.classList.remove(cName);  
    }  
    return this;  
}  
/*-----------------------------------------------------
选择器
-----------------------------------------------------*/
//id或class选择器$("elem")  
function $(strExpr){  
    var idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;  
    var classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/;  
    if(idExpr.test(strExpr)){  
        var idMatch = idExpr.exec(strExpr);  
        return document.getElementById(idMatch[2]);  
    }else if(classExpr.test(strExpr)){  
        var classMatch = classExpr.exec(strExpr);  
        var allElement = document.getElementsByTagName("*");  
        var ClassMatch = [];  
        for(var i=0,l=allElement.length; i<l; i++){  
            if(allElement[i].className.match( new RegExp( "(\\s|^)" + classMatch[2] + "(\\s|$)") )){  
                ClassMatch.push(allElement[i]);  
            }  
        }  
        return ClassMatch;  
    }  
}
//需要使用forEach遍历
$(".cls").forEach(function(e){  
    e.css("background","#f6f6f6")  
})

/*-----------------------------------------------------
ajax封装
-----------------------------------------------------*/
function ajax(){  
    var ajaxData = {  
        type:arguments[0].type || "GET",  
        url:arguments[0].url || "",  
        async:arguments[0].async || "true",  
        data:arguments[0].data || null,  
        dataType:arguments[0].dataType || "text",  
        contentType:arguments[0].contentType || "application/x-www-form-urlencoded",  
        beforeSend:arguments[0].beforeSend || function(){},  
        success:arguments[0].success || function(){},  
        error:arguments[0].error || function(){}  
    }  
    ajaxData.beforeSend()  
    var xhr = createxmlHttpRequest();   
    xhr.responseType=ajaxData.dataType;  
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);   
    xhr.setRequestHeader("Content-Type",ajaxData.contentType);   
    xhr.send(convertData(ajaxData.data));   
    xhr.onreadystatechange = function() {   
        if (xhr.readyState == 4) {   
            if(xhr.status == 200){  
                ajaxData.success(xhr.response)  
            }else{  
                ajaxData.error()  
            }   
        }  
    }   
}  
  
function createxmlHttpRequest() {   
    if (window.ActiveXObject) {   
        return new ActiveXObject("Microsoft.XMLHTTP");   
    } else if (window.XMLHttpRequest) {   
        return new XMLHttpRequest();   
    }   
}  
  
function convertData(data){  
    if( typeof data === 'object' ){  
        var convertResult = "" ;   
        for(var c in data){    
            convertResult+= c + "=" + data[c] + "&";    
        }    
        convertResult=convertResult.substring(0,convertResult.length-1)  
        return convertResult;  
    }else{  
        return data;  
    }  
}  


// 调用方式
ajax({  
    type:"POST",  
    url:"ajax.php",  
    dataType:"json",  
    data:{"val1":"abc","val2":123,"val3":"456"},  
    beforeSend:function(){  
        //some js code  
    },  
    success:function(msg){  
        console.log(msg)  
    },  
    error:function(){  
        console.log("error")  
    }  
})  

/*-----------------------------------------------------
使用原生javascript判断及改变checkbox选中状态
-----------------------------------------------------*/

// 判断：
document.getElementById("someCheckbox").checked　　//值为true或false
// 改变
document.getElementById("someCheckbox").checked = true;
document.getElementById("someCheckbox").checked = false;

/*-----------------------------------------------------
用jquery 判断及改变checkbox选中状态
-----------------------------------------------------*/
// 全选： 
$(":checkbox").prop("checked",true)
// 取消全选：
$(":checkbox").prop("checked",false)
// 获取选中的：
$(":checkbox:checked")


/*-----------------------------------------------------

-----------------------------------------------------*/

