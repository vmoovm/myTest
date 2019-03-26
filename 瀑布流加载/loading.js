// JavaScript Document


/*----------------------------------------------------
鼠标经过记录时(瀑布流条件)
-----------------------------------------------------*/
var winScroll=$(window.parent.window) ? $(window.parent.window) : $(window);
var docScroll=$(window.parent.document) ? $(window.parent.document) : $(document);
    
    winScroll.scroll(function(){
    	if (winScroll.scrollTop()+winScroll.height() >= docScroll.height() - 5) {
			try{
				loading();//请自定义此函数
			}catch(err){
				return false;
			}
		}
    });





























