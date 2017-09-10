/**
 * Created by Mz on 2017/8/7.
 */

$(function () {
    // 1. 一键换肤模块
    var colors = ["#FFF","pink","black","orange","red","yellow"];
    var $aLi = $(".skin li");
   $.each($aLi,function (index,element) {
       $(element).css("backgroundColor",colors[index]);
   });
    $aLi.on("mouseenter",function () {
        $("body").css("backgroundColor",$(this).css("backgroundColor"));
    });
    // 出现小爱心
    $(".banner div a").on("mouseenter",function () {
        $("span",this).css("display","inline-block");
    });
    $(".banner div a").on("mouseleave",function () {
        $("span",this).css("display","none");
    });
    //2.出现小三角
    $(".brandTap ul li").on("mouseenter",function () {
        $("span",this).css("display","inline-block");
    });
    $(".brandTap ul li").on("mouseleave",function () {
        $("span",this).css("display","none");
    });

    //4.搜索框文字效果  （ie不支持placeholder）
    $(".inputSearch").focus(function () {
        $(this).addClass("foucs");
        if($(this).val() == this.defaultValue){
            $(this).val("");
        }
    }).blur(function () {
        $(this).removeClass("foucs");
        if($(this).val()==""){
            $(this).val(this.defaultValue);
        }
    }).keyup(function (e) {
        if(e.which == 13){
            alert("回车提交表单！")
        }
    });
//    5.导航效果
    $("#nav li").mouseenter(function () {
        $(this).find(".jnNav").stop().fadeIn(500);
    }).mouseleave(function () {
        $(this).find(".jnNav").stop().fadeOut(500);
    });
//    top二级菜单
    $(".Mz_top .more").mouseenter(function () {
        $(this).children(".secNav").stop().slideDown(200);
    }).mouseleave(function () {
        $(this).children(".secNav").stop().slideUp();
    });
//   6.与文字匹配+轮播图效果
    var adTimer = null;
    var number =0;
    var startLoop = function(i) {
        var count=0;
        if(i){count=i}
        else {
            count=0;
        }
        // clearInterval(adTimer);
        var totalIndex = $(".banner div a").length;
        // alert(totalIndex);
        adTimer = setInterval(function(){
            if(count == totalIndex){count=0;}
            $(".banner a img:last-child")
                .attr("src","images/banner"+(count+1)+".png");
            $(".banner div a").eq(count).addClass("highlight")
                .siblings().removeClass("highlight");
            count++;
        },1000)
    };
    startLoop();
    $(".banner div a").mouseenter(function () {
        // alert($(this).index());
        clearInterval(adTimer);
        $(this).siblings().removeClass("highlight");
        // alert(typeof  startLoop);
        var count = $(this).index();
        $(".banner a img:last-child")
            .siblings().hide().end()
            .attr("src","images/banner"+(count+1)+".png")
            .css("display","none").fadeIn();
    }).mouseleave(function () {
        number = $(this).index()+1; //记录一下暂停时的index数值
        startLoop(number);
    });

//    7.添加最新动态模块超链接提示
    function showToolTip() {
        var x =10;
        var y=20;
        $("a.tooltip").mouseenter(function (ev) {
            this.myTitle = this.title;
            this.title = "";
            var tooltip = "<div id='tooltip'>"+this.myTitle+"</div>";//创建div元素
            $("body").append(tooltip);
            $("#tooltip").css({
                "top":(ev.pageY+y)+"px",
                "left":(ev.pageX+x)+"px"
            }).show("fast");
        }).mouseleave(function () {
            this.title = this.myTitle;
            $("#tooltip").remove();
        }).mousemove(function (ev) {
            $("#tooltip").css({
                "top":(ev.pageY+y)+"px",
                "left":(ev.pageX+x)+"px"
            });
        });
    }
    showToolTip();

//    8.商品滚动展示
    (function commTimer() {
        var commodityTimer = null;
        var $rollobj = $(".brandList ul");
        $rollobj[0].innerHTML += $rollobj.html();  //复制
        var $iLi = $rollobj.find("li").length;         // li的个数
        var rollWidth = $rollobj.find("li").outerWidth()+7;  //每个li的宽度
        $rollobj[0].style.width = rollWidth*$iLi+"px";        //设置ul 的自适应宽度
        function move(){
            $rollobj[0].style.left = $rollobj[0].offsetLeft-7+"px";
            // console.log($rollobj[0].style.left);
            if(Math.abs($rollobj[0].offsetLeft+($rollobj[0].offsetWidth/2))<8){
                // $rollobj.css("left",0);
                $rollobj[0].style.left = "0px";
            }
        }
        commodityTimer=setInterval(move,80);
        $rollobj.find("li").mouseenter(function () {
            clearInterval(commodityTimer);
        }).mouseleave(function () {
            commodityTimer=setInterval(move,80);
        });
    })();


        //9.top gift抖动效果
        setInterval(function () {
            $("#gift").animate({
                width:20,
                height:20
            },500).animate({
                width:20,
                height:24
            },20).mouseenter(function () {
                $(this).css("color","pink");
            })
        },500);


//    10. 商品大图 遮罩效果

        function jump() {
            window.location.href = "detail.html";
        }
        $(".brandList ul li").each(function (index) {
            var $img = $(this).find("img");
            var img_w = $img.width()+20;
            var img_h = $img.height()+20;
            var iHtml = '<i style="position: absolute;' +
                'top: 0;left: 10px;width:'+img_w+'px;height: '+img_h+'px;"' +
                'class="imageMask"></i>';
            $(iHtml).appendTo(this).click(function () {
                $(this).trigger(jump());
            });
        });
        $(".brandList").on("hover",".imageMask",function () {
            $(this).toggleClass("imageOver");
        });


});
