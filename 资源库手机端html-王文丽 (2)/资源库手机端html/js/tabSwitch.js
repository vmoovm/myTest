
$(function(){
    var indexLi = 0;
    //鼠标放上去就会触发的事件
    $(".w_slect_btn  p").click(function(){
        var index = $(this).index();
        if($(this).hasClass("w_active") && $(".w_main_content").eq(index).hasClass("selected")){
            $(".w_main_content").eq(index).removeClass("selected");
            $(".w_main_wrap").hide();
            $(this).removeClass("w_active")
        }else {
            $('.w_main_wrap').show();//那么就显示div
            $('.w_switch_main').show();//那么就显示div
            $("body,html,.w_main_wrap").css({
                "overflow":"hidden"
            });
            console.log($(this));
            //鼠标放上去时，将当前的li元素添加active样式，其他的兄弟元素都移除active样式
            $(this).addClass("w_active").siblings().removeClass("w_active");
            //获取当前tab中鼠标停在的table栏的索引
            // var index = $(this).index();
            //  console.log(index);
            //根据这个索引切换，下面的展示
            $(".w_main_content").eq(index).addClass("selected").siblings().removeClass("selected");
            indexLi = index;
        }
    });
    $(".w_main_wrap").click(function(e){
        if($('.w_main_wrap').is(':hidden')) {//如果当前隐藏
        }else{
            $(".w_main_wrap").hide();
            $(".w_switch_main").hide();
            console.log(indexLi);
            $(".w_slect_btn  p").eq(indexLi).removeClass("w_active");
            // $($(".w_switch_li")[indexLi].removeClass("activeli"));
            $("body,html.w_main_wrap").css({
                "overflow":"auto"
            })
        }

    });
    $(".w_main_content li").click(function(e){
        $(".w_main_wrap").hide();
        $(".w_switch_main").hide();
        $(this).addClass("w_select_li").siblings().removeClass("w_select_li");
        $(".w_slect_btn  p").eq(indexLi).removeClass("w_active");
        $($(".w_slect_btn  p")[indexLi]).html($(this).text());
    });

})
