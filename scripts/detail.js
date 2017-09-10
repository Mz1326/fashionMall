/**
 * Created by Mz on 2017/8/9.
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

    //   3.详情页品牌大小图切换
    $(".catalog a img").attr("src","images/shop1.jpg");//兼容火狐
    $(".catalog p").mouseenter(function () {
        var count=$(this).index();
        $(".catalog a").attr("href","images/shop"+(count+1)+"_big.jpg");
        $(".catalog a img").attr("src","images/shop"+(count+1)+".jpg");
        //不能用css来设置
        // $(".catalog a img").css(
        //     {
        //         "background":"url(\""+"images/shop"+(count+1)+".jpg\")",
        //         "background-repeat":"no-repeat",
        //         "background-size":"contain"
        //     });
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

    //        11.详情页面的放大效果
    var options =
        {
            zoomWidth: 300, //放大镜的宽度
            zoomHeight: 300,//放大镜的高度
            imageOpacity:0.4,
            zoomType:'reverse'
        };
    $(".jqzoom").jqzoom(options);

//       12.评分
    var oStar_k = "☆";
    var oStar_s = "★";
    $(".proItem .star>li").on("mouseenter",function () {
        // alert("11");
        $(this).text(oStar_s).prevAll().text(oStar_s).end().nextAll().text(oStar_k);
    });
    $(".star").on("mouseleave",function () {
        $(".star").children().text(oStar_k);
        //再做一件事 如果有点击过后添加的标记 则将标记前的都变为实心即可
        $("li.current").text(oStar_s).prevAll().text(oStar_s);
    });
    $("li").on("click",function () {
        //添加标记 记下此刻的星星数 并删除其他元素的标记
        $(this).addClass("current").siblings().removeClass("current");
        $("#showScore").text("您的评分是"+($(this).index()+1)*20+"分");
    });


//  13.  选择颜色数据双向绑定
    $(".buyCar .info b").click(function () {
        //设置一个标记
        $(this).attr("id","signColor").siblings().attr("id","");
        $(this).css("border","1px solid red").children("span").css("display","block")
            .end().siblings().css("border","").children("span").css("display","none");
        var count = $(this).index()-4;
        $(".info .seColor i").eq(count).css("display","block")
            .parent()
            .siblings().children("i").css("display","none");
    });

//    14.点击尺寸 选择
    $(".info .choose").click(function () {
        //设置一个标记
        $(this).attr("id","signSize").siblings().attr("id","");
        $(this).css({
            backgroundColor:"#FF0036",
            color:"#FFF"
        }).siblings(".choose").css({
            backgroundColor:"#FFF",
            color:"black"
        })
    });
//     15. 根据数量计算总价
            var money =  (function () {
                var _this = this;
                var commNumber = $(".info label input").val();//获取原始数量  默认1
                var totalPay = $("#Pay").text();               //获得原始单价
                totalPay = parseInt(totalPay);
                var preCommNumber = 1;              //设置前一个数量值==原始数量值
                return {
                    foo:function () {
                        return totalPay;
                    }
                }
            })();
                Object.defineProperty(Object.prototype, 'get', {
                    get:function () {
                        setInterval(function(){
                            commNumber = $(".info label input").val();   //每一次启动定时器都重新获取数量值
                            if(commNumber !==preCommNumber){          // 该次不等于上一次
                                totalPay = 198;                        //初始化单价
                                totalPay = totalPay*commNumber;          //  计算总价
                                $("#Pay").text(totalPay);          //显示到页面
                                preCommNumber = commNumber;          //  记录变化值
                            }
                            return totalPay;
                        },500)
                    }
                });
                console.log(money.foo('get'));
             // Object.prototype.showMoney = (function () {
             //     return{
             //         showMoney: function(){
             //        }
             //        }
             // })();
             //    console.log(money.foo("showMoney"));


//            15.1  价格联动的方法
            var $span = $("#Pay");
            var price = $span.text();
            // alert(price);
            $(".info label input").change(function () {
                var num = $(this).val();
                var amount = num*price;
                $span.text(amount);
            }).change();
//         16.设置弹出框  让用户确认订单
            var $product = $(".buyCar");
            $("#intoCar,#nowBuy").click(function () {
                var pro_name = $product.find("h3:first").text();
                console.log(pro_name);
                var pro_color = $(".buyCar .info b[id='signColor']").text();
                console.log(pro_color);
                var pro_size = $(".buyCar .info .seColor #signSize").text();
                console.log(pro_size);
                var pro_count = $product.find("input").val();
                console.log(pro_count);
                var pro_pay = $product.find("#Pay").text();
                console.log(pro_pay);
                // var pro_size = $product.
                var dialog = "感谢您的购买。\n您购买的\n"+
                        "产品是："+pro_name+";\n"+
                        "尺寸是："+pro_size+";\n"+
                        "颜色是："+pro_color+";\n"+
                        "数量是："+pro_count+";\n"+
                        "总价是："+pro_pay+"元";

                alert(dialog);
                return false;

            })




});