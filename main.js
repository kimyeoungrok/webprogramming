var ctx;
var img;

$(document).ready(function(){
    draw();
    img.src="img/main1.png";
    $("#gamestart").mouseover(function(){
        $("#gamestart").css({"font-size":"55px"});
        })
    .mouseout(function(){
        $("#gamestart").css({"font-size":"50px"});
        })
    $("#gamestart").click(function(){
        ctx.clearRect(0,0,1280,720);
        ctx.beginPath();
        $('#gamestart').remove();
        draw();
        img.src="img/mainmenu.png";
        $(".menu").css("display","block")
        $(".ch").css("display","block");
        audio();
    })


    $("#setimg").click(function(){
        $("#set").addClass("popup");
        $("#set").css("display","block");
    })
    .mouseover(function(){
        $("#setimg").css({"width":"65px","height":"65px"})
    })
    .mouseout(function(){
        $("#setimg").css({"width":"60px","height":"60px"})
    })

    $("#set_ximg").click(function(){
        $("#set").removeClass("popup");
        $("#set").css("display","none");
    })
    .mouseover(function(){
        $('#set_ximg').css({"width":"35px","height":"35px"})
    })
    .mouseout(function(){
        $('#set_ximg').css({"width":"30px","height":"30px"})
    })

    $(".ch").each(function(){
        var container=$(this);
        $(container).mouseover(function(){
            container.css({"width":"320px", "height":"330px"});
        })
        .mouseout(function(){
            container.css({"width":"300px", "height":"300px"})
        })
        $(container).click(function(){
            $("#previmg").click(function(){
                $(".ch").css({"display":"block"});
                $(".prne").css({"display":"block"});
                $('#set').hide();
            })
            $("#nextimg").click(function(){
                $('#menutitle').remove();
                $(".prne").css({"display":"none"});
                $('.ch').css({"display":"none"});
                $("#leveltitle").css({"display":"block"});
                $(".level").css({"display":"block"});
                $('#set').hide();
            })
        })
    })

    $("#ch1").click(function(){
        $("#ch2").css({"display":"none"});
        $("#ch3").css({"display":"none"});
        $(".prne").css({"display":"block"});
    })
    $("#ch2").click(function(){
        $("#ch1").css({"display":"none"});
        $("#ch3").css({"display":"none"});
        $(".prne").css({"display":"block"});
    })
    $("#ch3").click(function(){
        $("#ch2").css({"display":"none"});
        $("#ch1").css({"display":"none"});
        $(".prne").css({"display":"block"});
    })

    $(".level").each(function(){
        var container=$(this);
        $(container).mouseover(function(){
            container.css({"width":"360px"});
        })
        .mouseout(function(){
            container.css({"width":"350px"})
        })
        $(container).click(function(){
            $("#previmg").click(function(){
                $(".ch").css({"display":"none"});
                $(".level").css({"display":"block"});
                $(".prne").css({"display":"none"});
                $('#set').hide();
            })
            $("#nextimg").click(function(){
                ctx.clearRect(0,0,1280,720);
                ctx.beginPath();
                $('#leveltitle').remove();
                $(".prne").remove();
                $('.level').css({"display":"none"});
                $('#setContainer').hide();
                draw();
                img.src="img/story1.png";
                storywr();
            })
        })
    })

    $("#level1img").click(function(){
        $("#level2img").css({"display":"none"});
        $("#level3img").css({"display":"none"});
        $(".prne").css({"display":"block"});
    })
    $("#level2img").click(function(){
        $("#level1img").css({"display":"none"});
        $("#level3img").css({"display":"none"});
        $(".prne").css({"display":"block"});
    })
    $("#level3img").click(function(){
        $("#level2img").css({"display":"none"});
        $("#level1img").css({"display":"none"});
        $(".prne").css({"display":"block"});
    })

    $(".bgm").each(function(){
        var a=$(this);
        $(a).click(function(){
            var bgmnum=a.attr('id');
            option(bgmnum);
             a.css({"background-color":"#BF0033"});
            if(bgmnum==1){
                $("#2").css({"background-color":"white"});
                $("#3").css({"background-color":"white"});
            }else if(bgmnum==2){
                $("#1").css({"background-color":"white"});
                $("#3").css({"background-color":"white"});
            }else{
                $("#2").css({"background-color":"white"});
                $("#1").css({"background-color":"white"});
            }

        })
    })

    var slider=$("#bar");
    var result=$("#result");
    slider.on('input',function(){
        var vol=$(this).val();
        var audiovol=vol/100;
        $("#audio-de")[0].volume=audiovol;
        result.html(vol);
    });

})

function audio(){
    $("#audio-de")[0].play();
    $("#audio-de")[0].volume=0.5;
}

function draw(){
    img=new Image();
    img.addEventListener('load',function(){
        ctx=document.getElementById("main").getContext("2d");

        ctx.drawImage(img,0,0,1280,720);
        change_position();
        $(window).on("resize",change_position)

    },false);
}

function change_position(){
    var w=($(window).width()-1280)/2;
    var gamestartw=w+830;

    $("#canvas").css({left:w});
    $("#player_State").css({left:w});

    var bossw=w+400;
    var scorew = bossw + 550;
    $("#boss_State").css({left:bossw});
    $("#score_State").css({left:scorew});
    $("#retry_page").css({left:w});
    $("#maingame").css({left:w});
    $("#ending_page").css({left:w});

    $("#main").css({left:w})
    $("#gamestart").css({left:gamestartw});

    var titlew=w+332;
    $("#menutitle").css({left:titlew});
    var menutitle=w+360;
    $("#leveltitle").css({left:menutitle});
    var nextimgw=w+40;
    $("#nextimg").css({right:nextimgw});
    $("#previmg").css({left:nextimgw});
    var popw=w+390;
    $("#set").css({left:popw});

    var setimgw=w+40;
    $("#setimg").css({left:setimgw});

    var ch1w=w+150;
    $("#ch1").css({left:ch1w});
    var ch2w=w+485;
    $("#ch2").css({left:ch2w});
    var ch3w=w+150;
    $("#ch3").css({right:ch3w});

    var level1w=w+50;
    $("#level1img").css({left:level1w});
    $("#level3img").css({right:level1w});
    var level2w=w+465;
    $("#level2img").css({left:level2w});

    var story1w=w+350;
    $("#story1").css({left:story1w});
    $("#story2").css({left:story1w});
    $("#story3").css({left:story1w});
    $("#story4").css({left:story1w});

    var storych=w+300;
    $("#storych1").css({left:storych});
    $("#storych2").css({left:storych});
    $("#storych3").css({left:storych});

    var storydk=w+580;
    $("#storydk1").css({left:storydk});
    $("#storydk2").css({left:storydk});

    var storykd=w+300;
    $("#storykd1").css({left:storykd});
    $("#storykd2").css({left:storykd});

    var gamestartimg=w+520;
    $("#gamestartimg").css({left:gamestartimg});
}


function storywr(){
    var str="지구에서 아주아주 멀리 떨어진 작은 별, 또 그작은 나라인 푸푸푸랜드 ▼<br>";
    var story1=$("#story1");
    var story2=$("#story2");
    var story3=$("#story3");
    var story4=$("#story4");
    setTimeout(function(){
        story1.html(str);
    },1000);
    var str1="<br>기가 막히도록 평화로운 생활을 즐기고 있던 푸푸푸랜드에<br>디디디산에 사는 먹보로 유명한 디디디 대왕이 부하들과 찾아와... ▼<br>";
    var str2="<br>밤새 푸푸푸랜드의 음식이란 음식을 모두 도둑질하고..<br>푸푸푸랜드에 전해지는 하늘을 나는 비보 반짝반짝 별까지도 훔쳐가는데... ▼<br>";
    var str3="<br>음식과 보물을 빼앗겨 모두 슬픔에 빠진 그때...<br>여행을 하던 커비가 푸푸푸랜드를 지나가는 도중... ▼<br>"
    $("#story1").click(function(){
        story2.html(str1);
    })
    $("#story2").click(function(){
        story3.html(str2);
    })
    $("#story3").click(function(){
        story4.html(str3);
    })
    story4.click(function(){
        ctx.clearRect(0,0,1280,720);
        ctx.beginPath();
        $("#storyContainer").remove();
        draw();
        img.src="img/storych1.png";
        storychwrD();
    })
}

function storychwrD(){
    var str="음식과 보물을 모두 디디디대왕에게 빼앗기고 말았어... ▼<br>";
    var str1="어떻게 하면 음식과 보물을 되찾을 수 있지? 흑흑... ▼<br>";
    var storych1=$("#storych1");
    var storych2=$("#storych2");
    setTimeout(function(){
        storych1.html(str);
    },1000)
    storych1.click(function(){
        storych2.html(str1);
    })
    storych2.click(function(){
        ctx.clearRect(0,0,1280,720);
        ctx.beginPath();
        $("#storyD").remove();
        draw();
        img.src="img/storych2.png";
        storychwrK();
    })

}

function storychwrK(){
    var str="푸푸푸랜드에 무슨일 있니? ▼<br>";
    var storych3=$("#storych3");
    setTimeout(function(){
        storych3.html(str);
    },1000)
    storych3.click(function(){
        ctx.clearRect(0,0,1280,720);
        ctx.beginPath();
        $("#storyK").remove();
        draw();
        img.src="img/storychDK.png";
        storychDK();
    })
}

function storychDK(){
    var str="푸푸푸랜드가 위험해! 우리를 도와줘..▼<br>";
    var str1="디디디 대왕이 우리의 음식과 보물을<br> 모두 훔쳐가버렸어.. ▼<br>";
    var storydk1=$("#storydk1");
    var storydk2=$("#storydk2");
    setTimeout(function(){
        storydk1.html(str);
    },1000)
    storydk1.click(function(){
        storydk2.html(str1);
    })
    storydk2.click(function(){
        ctx.clearRect(0,0,1280,720);
        ctx.beginPath();
        $("#storyDK").hide();
        draw();
        img.src="img/storychKD.png";
        storychKD();
    })

}

function storychKD(){
    var str="내가 도와줄게!! ▼<br>";
    var str1="<br>우리 함께 힘을 합쳐 디디디대왕을 물리치고<br> 보물을 되찾아오자!! ▼<br>";
    var storykd1=$("#storykd1");
    var storykd2=$("#storykd2");
    setTimeout(function(){
        storykd1.html(str);
    },1000);

    storykd1.click(function(){
        storykd2.html(str1);
    })

    storykd2.click(function(){
        $("#gamestartimg").css({"display":"block"});
    })

    $("#gamestartimg").click(function(){
        ctx.clearRect(0,0,1280,720);
        ctx.beginPath();
        $("#storyKD").hide();
    })

}

//option
function option(num){
    var bgmnum=num;
    audiosrc="audio/bgm"+bgmnum+".mp3";
    $("#audio-de").attr("src",audiosrc);
}




