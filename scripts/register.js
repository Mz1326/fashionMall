/**
 * Created by Mz on 2017/8/10.
 */

$(function () {
    var $input = $(".content form label");
    var $phone = $input.find("input[name='number']");
    var $password = $input.find("input[name='password']");
    var $email = $input.find("input[name='email']");
////            $input.children("input").mouseenter(function () {
////            $(this).css("box-shadow","-5px 0 5px red,5px 0 5px yellow,0 -5px 5px blue,0 5px 5px green");
////        }).mouseleave(function () {
////            $(this).css("box-shadow","");
////        });
    $input.children("input").on({
//            mouseenter:function () {
//                $(this).css("box-shadow","-5px 0 5px red,5px 0 5px yellow,0 -5px 5px blue,0 5px 5px green");
//            },
//            mouseleave:function () {
//                $(this).css("box-shadow","");
//            },
        focus:function () {
            $(this).css("box-shadow","-5px 0 5px red,5px 0 5px yellow,0 -5px 5px blue,0 5px 5px green");
        }
//            ,
//            blur:function () {
//                $(this).css("box-shadow","");
//            }
    });
    $input.find("input[type='submit']").focus(function () {
        $(this).css("box-shadow","");
    });
    $input.find("input[name='securityCode']").focus(function () {
        $(this).css("box-shadow","-5px 0 5px red,5px 0 5px yellow,0 -5px 5px blue,0 5px 5px green");
    }).blur(function () {

        $(this).css("box-shadow","");
    });

    var phone=(function () {
        var reg_phone= /^1[3578][0-9]{9}$/;
        var phoneAgain = 0; //记录是否存在此账号 默认存在
        $phone.focus(function () {                       //获得焦点
            if (!reg_phone.test($phone.val())) {
                $phone.css("color","red");
            } else {

            }
        });
        $phone.keyup(function () {                          //按键弹起
            if(reg_phone.test($phone.val())){
                $phone.css("color","");
//                        alert(checkUserPhone($phone.val()));
//                        alert(phoneAgain);
                if(checkUserPhone($phone.val())){ //如果不存在
                    phoneAgain = 1;         //记录不存在 此账号可用
                }else {
                    phoneAgain = 0;
                }
//                        alert(phoneAgain);
            }else {
                $phone.css("color", "red");
            }
        });
        $phone.blur(function () {
//                    alert(phoneAgain);
            if(reg_phone.test($phone.val())&&phoneAgain){
                $(this).css("box-shadow","-5px 0 5px red,5px 0 5px yellow,0 -5px 5px blue,0 5px 5px green");
                $(this).css("border","");
                phonenum=1;
            }else {
                $(this).css({
                    boxShadow:"",
                    border:"1px solid red"
                });
                if (phoneAgain==0) {
                    console.log("用户已存在请立即登录");
                }
                phonenum = 0;
            }
        })
    })(phone);

//                        密码
    var password = (function () {
        var reg_pass = /^[A-Za-z0-9]{6,18}$/;
        $password.focus(function () {
            if(!reg_pass.test($password.val())){
                $(this).css("color","red");
            }else {
            }
        });
        $password.keyup(function () {
            if(reg_pass.test($password.val())){
                $(this).css("color","");
            }else {
            }
        });
        $password.blur(function () {
            if(reg_pass.test($password.val())){
                passwordnum=1;
                $(this).css("borderColor","#CCC");
            }else {
                $(this).css({
                    boxShadow:"",
                    border:"1px solid red"
                });
                console.log("输入的邮箱 格式不正确");
                passwordnum=0;
            }
        })
    })(password);

//              邮箱
    var email = (function () {
        var reg_email = /^[\w_]{5,18}@[1-9A-z]+.com$/;
        $email.focus(function () {
            if(!reg_email.test($email.val())){
                $(this).css("color","red");
            }else {
            }
        });
        $email.keyup(function () {
            if(reg_email.test($email.val())){
                $(this).css("color","");
            }else {
            }
        });
        $email.blur(function () {
            if(reg_email.test($email.val())){
                emailnum=1;
                $(this).css("borderColor","#CCC");
            }else {
                $(this).css({
                    boxShadow:"",
                    border:"1px solid red"
                });
                console.log("输入的邮箱 格式不正确");
                emailnum=0;
            }
        })
    })(email);

    var phonenum=0,passwordnum=0,emailnum=0;
    //取值
    function checkUserPhone(phone) {
        //username=abc; password=123456; user=blue; pass=123
        var arr = document.cookie.split(';');
        //此时得到的数组是
        //arr->['username=abc','password=123456',....]
        //这时候我们只要写一个循环遍历一下该数组
        var i=0;
        for(i=0;i<arr.length;i++){
            var arr2 = arr[i].split('=');
            //arr2->['username','abc'....]
            if(arr2[0]==phone){
                return 0;
            }
        }
        return 1;
    }
//              存储cookie
    function setCookie(name,value,iday) {
        var oData = new Date();
        oData.setDate(oData.getDate()+iday);
        document.cookie =name+"="+value+";expires="+oData;
    }
//            提交按钮
    var $submit = $input.find("input[name='submit']");
    $submit.click(function () {
//                alert($phone.val());
        if(phonenum&&passwordnum&&emailnum){
            setCookie($phone.val(),$password.val(),30);
            confirm("注册成功！");
        }
        return false;
    });
//       top效果
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


//      以下是可扩展的功能
    //                     闪烁的边框
//                var flag=0;
//                function shine(id) {
//                    var obj = document.getElementById(id);
//                    if(flag==1){
//                        $(obj).css("borderColor","#CCC");
//                        flag=0;
//                    }else if(flag==0){
//                        $(obj).css("borderColor","red");
//                        flag=1;
//                    }
//                }
//                setInterval(shine('phone'),1000);

//        function produceCode() { //产生验证码
//            var code = ""; //初始化一个字符串型的空验证码
//            for(var i = 0; i < 4; i++) { //循环四次
//                var num = Math.floor(Math.random() * 10);
//                code += num; //产生一个数字加到验证码上
//            }
//            vercodeSpan.firstChild.nodeValue = code; //设置span为验证码
//        }

})
