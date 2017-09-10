/**
 * Created by Mz on 2017/8/11.
 */

$(function () {


//   top二级菜单
$(".Mz_top .more").mouseenter(function () {
    $(this).children(".secNav").stop().slideDown(200);
}).mouseleave(function () {
    $(this).children(".secNav").stop().slideUp();
});

//top gift抖动效果
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

        var getCookie = (function () {
            var cookie = document.cookie;
            // alert(cookie)
            var arr1 = cookie.split(";");//得到phone=password
            for(var i=0;i<arr1.length;i++){
                var arr2 = arr1[i].split("=");
                if(arr2[0]){
                    $("#user").text(arr2[0]).css("color","yellow");
                }
                else {
                    $("#user").text("欢迎游客");
                }
            }
        })(getCookie);

})