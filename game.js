var backimg;
var context;
function init(){
  var canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
}
window.onload = function(){

 // var canvas = document.getElementById('canvas');
	//context = canvas.getContext('2d');
	var mainPhider=document.getElementById("mainP-hider");
	var player_State = document.getElementById("player_State");
	var boss_State = document.getElementById("boss_State");
	var time_State = document.getElementById("Time_State");
  var retry_page =document.getElementById('retry_page');
  var score_State = document.getElementById('score_State');
  var nowscore = document.getElementById('scores');

    /****************************처음상태*************************/
    mainPhider.style.display = "none";
    player_State.style.display = "none";

    /****************************처음 상태*************************/

    /****************************변수 선언*************************/

    /*레벨 변수*/
    var level=0;
    var i=0;
    var albumindex=0;
    //공 관련 변수1
    var cubbyimgcount=0; //커비 공 이미지
    var score=0;
    var kirbyWidth=50;
    var kirbyHeight=50;
    var x = 300;
    var y = 550;
    var dx = 2;
    var dy = 2;
    var ballspeed = 30;
    var kirby=new Image();
    kirby.src="img/kirbyball.png";

    //이미지관련 변수
    var ch1 = document.getElementById('ch1');
    var ch2 = document.getElementById('ch2');
    var ch3 = document.getElementById('ch3');

    var imgvalue;

    //보스공격물체관련 변수

    var attackX1 = 600;
    var attackY1 = 250;
    var attackX2 = 600;
    var attackY2 = 250;
    var ax1 = 0.5;
    var ax2 = -0.5;
    var ay1= 1;
    var ay2 = 1;

    //이득아이템(모래시계)관련 변수
    var sandX = 400;
    var sandY = 400;
    var sandWidth = 50;
    var sandHeight = 50;
    var sx = 2;
    var sy = -2;

    //패널티아이템(폭탄)관련 변수

    var bombX = 600;
    var bombY = 200;
    var bombWidth = 50;
    var bombHeight = 50;
    var bx = 2;
    var by = 2;
    var bomb = new Image();
    bomb.src = "img/bomb.png";

    //아이템(토마토)관련 변수

    var tomatoX = 200;
    var tomatoY = 300;
    var tomatoWidth = 50;
    var tomatoHeight = 50;
    var tx = 2;
    var ty = 2;
    var tomato = new Image();
    tomato.src = "img/tomato.png";

    //플레이어 정보 변수
    var life = 9999;
    var realscore = 0;

    //시간함수
    var time =9999;
    var time_width = 550;

    //보스 정보 변수
    var bosslife = 5;
    var boss_hp =300;
    var boss = new Image();
    boss.src = "img/final_boss.png";

    //공 받침대 변수
    var paddleHeight = 10;
    var paddleWidth = 150;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    document.addEventListener("mousemove", mouseMoveHandler, false);

    //벽돌 생성 변수1
    var brickRowCount1 = 14;
    var brickColumnCount1 = 2;
    var brickWidth1 = 75;
    var brickHeight1 = 20;
    var brickPadding1 = 13;
    var brickOffsetTop1 = 100;
    var brickOffsetLeft1 = 20;
    //벽돌 생성 변수2
    var brickRowCount2 = 14;
    var brickColumnCount2 = 2;
    var brickWidth2 = 75;
    var brickHeight2 = 20;
    var brickPadding2 = 13;
    var brickOffsetTop2 = 100;
    var brickOffsetLeft2 = 20;



    init();
    /****************************변수 선언*************************/

    //벽돌 생성
    var bricks = [];
    for(var c=0; c<brickColumnCount1; c++){
        bricks[c] = [];
        for(var r=0; r<brickRowCount1; r++){
            bricks[c][r] = { x: 0, y:0, status: 1};
        }
    }

    //벽돌 생성2
    var bricks2 = [];
    for(var c=0; c<brickColumnCount2; c++){
        bricks2[c] = [];
        for(var r=0; r<brickRowCount2; r++){
            bricks2[c][r] = { x: 0, y:0, status: 1};
        }
    }


    /****************************함수 선언*************************/

    //마우스 조절 함수
    function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
      }
    }

    //벽돌 생성함수
    function drawBricks(){
      for(var c=0; c<brickColumnCount1; c++){
          for(var r=0; r<brickRowCount1; r++){
              if(bricks[c][r].status == 1){
                  var brickX = (r*(brickWidth1+brickPadding1))+(brickOffsetLeft1);
                  var brickY = (c*(brickHeight1+brickPadding1))+(brickOffsetTop1);
                  bricks[c][r].x = brickX;
                  bricks[c][r].y = brickY;
                  context.beginPath();
                  context.rect(brickX, brickY, brickWidth1, brickHeight1);
                  context.fillStyle = "#BF0033"; 
                  context.fill();
                  context.closePath();
              }
          }
      }
  }

    //벽돌 생성함수2
    function drawBricks2(){
      for(var c=0; c<brickColumnCount2; c++){
          for(var r=0; r<brickRowCount2; r++){
              if(bricks2[c][r].status == 1){
                  var brickX2 = (r*(brickWidth2+brickPadding2))+(brickOffsetLeft2);
                  var brickY2 = (c*(brickHeight2+brickPadding2))+(brickOffsetTop2);
                  bricks2[c][r].x = brickX2;
                  bricks2[c][r].y = brickY2;
                  context.beginPath();
                  context.rect(brickX2, brickY2, brickWidth2, brickHeight2);
                  context.fillStyle = "#BF0033"; 
                  context.fill();
                  context.closePath();
              }
          }
      }
  }

 

//공생성함수
    var kirby2 = new Image();

    function drawBall_2(){
      var kirby2 = new Image();
      kirby2.src = "img/kirby2.png"

        context.drawImage(kirby2,x,y,kirbyHeight,kirbyWidth);
    }

    function drawBall_3(){
      var kirby3 = new Image();
      kirby3.src = "img/kirby3.png"

        context.drawImage(kirby3,x,y,kirbyHeight,kirbyWidth);
    }

    function drawBall_4(){
      var kirby4 = new Image();
      kirby4.src = "img/kirby4.png"

        context.drawImage(kirby4,x,y,kirbyHeight,kirbyWidth);
    }

function drawBall1() {
        if(cubbyimgcount%4 == 0){
          var kirby = new Image();
          kirby.src = "img/kirby1.png"

          context.drawImage(kirby,x,y,kirbyHeight,kirbyWidth);
        }

        else if(cubbyimgcount%4 == 1){

          drawBall_2();
          
        }
        else if(cubbyimgcount%4 == 2){

          drawBall_3();

        }
        else if(cubbyimgcount%4 ==3){

          drawBall_4();

        }

    //공 충돌
    //공 좌우 벽 닿았을때 설정
      if(x + dx > canvas.width-kirbyWidth || x + dx < kirbyWidth-50){
        dx += 0.1;
        dx = -dx;
      }
    //맨위에 닿았을때 튕기도록 설정
      if(y + dy < kirbyHeight){
        dy = -dy;
      }

    //받침대에 닿았을때
      else if(y + dy > canvas.height-(kirbyHeight+paddleHeight)) {
        if(x > paddleX - 50 && x < paddleX + paddleWidth + 10) {
            dy = -dy;
            }

    //공이 받침대가 아닌 바닥에 떨어졌을때
        else {
            life--;
            lifeChange();
            if(life == 0){
              bosslife = 9999;
              time = 9999;
              document.getElementById('canvas').style.display = "none";
              document.getElementById('boss_State').style.display = "none";
              document.getElementById('player_State').style.display = "none";
              document.getElementById("retry_page").style.display ="block";
              document.getElementById("score_State").style.display ="none";

                  dx = 0;
                  dy = 0;
                  ax1 = 0;
                  ax2 = 0;
                  ay1 = 0;
                  ay2 = 0;
                  bx = 0;
                  by = 0;
                }
            else{
                dy = -dy;
                }
            }
        }
        x+=dx;
        y+=dy;
  }



//공받침대 생성 함수
		function drawPaddle(){
  		context.beginPath();
  		context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  		context.fillStyle = "blue";
  		context.fill();
  		context.closePath();
  		if(rightPressed && paddleX < canvas.width-paddleWidth) {
    		paddleX += 7;
  			}
  		else if(leftPressed && paddleX > 0) {
    		paddleX -= 7;
 	 		}
		}

    //목숨 숫자 표현 함수
    function lifeChange() {
      document.getElementById("Lifes").innerHTML = life;
    }

    //벽돌과 공의 충돌감지 함수
function collisionDetection() {
  for(var c=0; c<brickColumnCount1; c++) {
    for(var r=0; r<brickRowCount1; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
          if(x > b.x-7 && x < b.x+brickWidth1+7 && y > b.y-brickHeight1 && y < b.y+brickHeight1) {
            dy = -dy;
            b.status = 0;
            score++;
            realscore +=100;
      }
    }
  }
}
}

// 벽돌 status 값 초기화
  function callBricks(){
    for(var c=0; c<brickColumnCount1; c++){
          for(var r=0; r<brickRowCount1; r++){
              bricks[c][r].status = 1;
            }
          }
  }

  function callBricks2(){
    for(var c=0; c<brickColumnCount2; c++){
          for(var r=0; r<brickRowCount2; r++){
              bricks2[c][r].status = 1;
            }
          }
  }



    //벽돌과 공의 충돌감지 함수2
function collisionDetection2() {
  for(var c=0; c<brickColumnCount2; c++) {
    for(var r=0; r<brickRowCount2; r++) {
      var b = bricks2[c][r];
      if(b.status == 1) {
          if(x > b.x-7 && x < b.x+brickWidth2+7 && y > b.y-brickHeight2 && y < b.y+brickHeight2) {
            dy = -dy;
            b.status = 0;
            score++;
            realscore+=100;
          }
        }
          }
        }
      }  

    

    //이미지 변경 함수

    ch1.onclick = function(){
      imgvalue = 1;
    }
    ch2.onclick = function(){
      imgvalue = 2;
    }
    ch3.onclick = function(){
      imgvalue = 3;
    }

    //아이템(토마토)그림 생성 + 벽과 충돌 했을때 함수
function drawTomato(){
  context.drawImage(tomato,tomatoX,tomatoY,50,50);
if(tomatoX + tx > canvas.width - 50 || tomatoX + tx < tomatoWidth - 50){
  tx += 0.1;
  tx = -tx;
}
     //토마토가 윗면에 닿았을때
if(tomatoY + ty < tomatoHeight){
  ty = -ty;
}
     //토마토가 받침대에 닿았을때 LIFE 1증가 
     //토마토가 아랫면에 닿았을때
else if(tomatoY + ty > canvas.height - tomatoHeight){
  if(tomatoX > paddleX -75 && tomatoX < paddleX + paddleWidth + 10 && life<5){
    life += 1;
    realscore +=50;
    lifeChange();
    ty = -ty;
  }
  else if(tomatoX > paddleX -75 && tomatoX < paddleX + paddleWidth + 10 && life>=5){
    realscore +=50;
    ty = -ty;
    cubbyimgcount++;
  }
  else{
    ty=-ty; 
  }
}
tomatoX += tx;
tomatoY += ty;
}

    //아이템(폭탄)그림 생성 + 벽과 충돌 했을때 반응함수
function drawBomb(){
  context.drawImage(bomb,bombX,bombY,50,50);
  //폭탄이 좌우 면 닿았을때
  if(bombX + bx >= canvas.width-50 || bombX + bx <= bombWidth-50){
    bx += 0.1;
    bx = -bx;
  }
       //폭탄이 윗면에 닿았을때
  if(bombY + by < bombHeight){
    by = -by;
  }
       //폭탄이 받침대에 닿았을때 LIFE 1감소
       //폭탄이 아랫면에 닿았을때
  else if(bombY + by > canvas.height - bombHeight){
    if(bombX > paddleX - 75 && bombX < paddleX + paddleWidth + 7){
      realscore -=50;
      life--;
      kirbyHeight;
      kirbyWidth;
      lifeChange();
      if(life == 0){
          bosslife = 9999;
          time = 9999;
          document.getElementById('canvas').style.display = "none";
          document.getElementById('boss_State').style.display = "none";
          document.getElementById('player_State').style.display = "none";
          document.getElementById("retry_page").style.display ="block";
          document.getElementById("score_State").style.display ="none";
                  dx = 0;
                  dy = 0;
                  ax1 = 0;
                  ax2 = 0;
                  ay1 = 0;
                  ay2 = 0;
                  bx = 0;
                  by = 0;
      }
      paddleWidth -= 5;
      by = -by;
      }
      else{
        by = -by;
      }
    }
  bombX += bx;
  bombY += by;
}

    //보스 그림 생성 함수 + 공과 충돌시 반응 함수
function drawBoss() {
    context.drawImage(boss, 450, 0, 300, 250);
    //보스에게 공이 닿았을때
  if(y + dy < 235 && x + dx < 740 && x +dx > 440){
    dx = -dx;
    dy = -dy;
    bosslife--;
    boss_hp -=60;
    realscore+=200;
    document.getElementById("boss_hp").style.width = boss_hp +"px";
  }
 if(bosslife==0){
        context.clearRect(0,0,canvas.width,canvas.height);
        ending(); 
    }   
}

 //엔딩 멘트 함수

    function ending() {
        
        canvas.style.display = "none";
        boss_State.style.display = "none";
        player_State.style.display = "none";
        time = 99999;
        life = 99999;
        dx =0;
        dy =0;
        tx =0;
        ty =0;
        bx =0;
        by =0;
        ax1 =0;
        ax2 =0;
        ay1 =0;
        ay2 =0;
        document.getElementById('final_score').innerHTML = realscore;
        document.getElementById('score_State').style.display ="none";
        document.getElementById('ending_page').style.display = "block";
        clearInterval(draw);
    }


    //보스 공격 함수
      function bossAttack(){

        var attack1 = new Image();
        attack1.src = "img/bomb.png";

        var attack2 = new Image();
        attack2.src = "img/bomb.png";

          context.drawImage(attack1,attackX1,attackY1,50,50);
          context.drawImage(attack2,attackX2,attackY2,50,50);


        if(attackY1 >= 710){
          attackY1 = 250;
          attackX1 = 600;
          }
        if(attackY2 >= 710){
          attackY2 = 250;
          attackX2 = 600;
          }

        attackX1 += ax1;
        attackY1 += ay1;
        attackX2 += ax2;
        attackY2 += ay2;

      //보스공격(폭탄)이 아랫면에 닿았을때
       if(attackY1 + ay1 > canvas.height - bombHeight){
               if(attackX1 >= paddleX - 50 && attackX1 <= paddleX + paddleWidth - 10){
                realscore -=50;
                life -= 1;
                cubbyimgcount -=1;
                if(cubbyimgcount < 0){
                  cubbyimgcount +=4;
                }
                lifeChange();
                if(life == 0){
                  bosslife = 9999;
                  time = 9999;
                  document.getElementById('canvas').style.display = "none";
                  document.getElementById('boss_State').style.display = "none";
                  document.getElementById('player_State').style.display = "none";
                  document.getElementById("retry_page").style.display ="block";
                  document.getElementById("score_State").style.display ="none";
                  dx = 0;
                  dy = 0;
                  ax1 = 0;
                  ax2 = 0;
                  ay1 = 0;
                  ay2 = 0;
                  bx = 0;
                  by = 0;
                  }
               }
                attackY1 = 250;
                attackX1 = 600;
          }
       if(attackY2 + ay2 > canvas.height - bombHeight){
               if(attackX2 >= paddleX - 50 && attackX2 <= paddleX + paddleWidth + 10){
                realscore -=50;
                life -= 1;
                cubbyimgcount -=1;
                if(cubbyimgcount < 0){
                  cubbyimgcount +=4;
                }
                lifeChange();
                if(life == 0){
                  bosslife = 9999;
                  time = 9999;
                  document.getElementById('canvas').style.display = "none";
                  document.getElementById('boss_State').style.display = "none";
                  document.getElementById('player_State').style.display = "none";
                  document.getElementById("retry_page").style.display ="block";
                  document.getElementById("score_State").style.display ="none";
                  dx = 0;
                  dy = 0;
                  ax1 = 0;
                  ax2 = 0;
                  ay1 = 0;
                  ay2 = 0;
                  bx = 0;
                  by = 0;
                  }
               }
                attackY2 = 250;
                attackX2 = 600;
          }
      }

    //제한시간 감소함수
      function TimeCount() {
        time--;
        time_width -=10;
        var nowtime_width = time_width +"px";
        var nowtime = time + "초";
        document.getElementById("Times").innerHTML = nowtime;
        document.getElementById("Time_div").style.width = nowtime_width;
        
        //시간종료에 따른 게임종료

        if(time == 0){
              bosslife = 9999;
              mainPhider.style.display = "none";
              var bossgame_State1 =document.getElementById('boss_State').style.display = "none";
              var bossgame_State2 =document.getElementById('player_State').style.display = "none";

              document.getElementById("retry_page").style.display ="block";
        }
      }

function levelUp(){
  if(score==brickRowCount1*brickColumnCount1){

    if(level==1){
         context.clearRect(0,0,canvas.width,canvas.height);
      level++;
      score=0;
      x=200;
      y=500;
      //draw();
    }}

    if(score==brickRowCount2*brickColumnCount2){

    if(level==2){
         context.clearRect(0,0,canvas.width,canvas.height);
      level++;
      score=0;
      x=200;
      y=500;
      time = 50;
      time_width = 550;
      $("#player_State").css({"width":"400"});
      document.getElementById("boss_State").style.display="block";
      //draw();
    }}

    if(level==3){
      if(bosslife==0){
         context.clearRect(0,0,canvas.width,canvas.height);
         ending();
       }
    }
}


    /****************************함수 선언*************************/

	//상황설정

	var s_button = document.getElementById('gamestartimg');
  var level1 = document.getElementById('level1img');
  var level2 = document.getElementById('level2img');
  var level3 = document.getElementById('level3img');
  var s_level;

  level1.onclick = function(){
    s_level = 1;
  }
  level2.onclick = function(){
    s_level = 2;
  }
  level3.onclick = function(){
    s_level = 3;
  }

   function startButton(){
    time = 50;
    time_width = 550;
    life = 6;

    dx =2;
    dy =2;
    bx=2;
    by=2;
    ax1 = 2;
    ax2 = -2;
    ay1= 2;
    ay2 = 2;

    if(s_level==1){
      level = 1;
      player_State.style.display = "block";
      mainPhider.style.display="block";
      var bricks = [];
    }
    if(s_level==2){
      level = 2;
      player_State.style.display = "block";
      mainPhider.style.display="block";
    }
    if(s_level == 3){
      level = 3;
      player_State.style.display = "block";
      boss_State.style.display = "block";
      mainPhider.style.display="block";
    }
    if(imgvalue == 1){
      document.getElementById('playerimg').src = "img/ch1.png";
    }
    else if(imgvalue == 2){
      document.getElementById('playerimg').src = "img/ch2.png";
    }
    else if(imgvalue == 3){
      document.getElementById('playerimg').src = "img/ch3.png";
    }
 
    
    draw();
  }

  //점수갱신 함수

  function scorecheck(){
    document.getElementById('scores').innerHTML = realscore;
  }


  //시작버튼 클릭
	s_button.onclick = function() {

    time = 50;
    time_width = 550;
    life = 6;

		dx =2;
		dy =2;

    if(s_level==1){
      level = 1;
		  player_State.style.display = "block";
      $("#maingame").css({"display":"block"});
      mainPhider.style.display="block";
    }
    if(s_level==2){
      level = 2;
      player_State.style.display = "block";
      $("#maingame").css({"display":"block"});
      mainPhider.style.display="block";
    }
    if(s_level == 3){
      level = 3;
      player_State.style.display = "block";
      boss_State.style.display = "block";
      $("#maingame").css({"display":"block"});
      mainPhider.style.display="block";
    }
    if(imgvalue == 1){
      document.getElementById('playerimg').src = "img/ch1.png";
    }
    else if(imgvalue == 2){
      document.getElementById('playerimg').src = "img/ch2.png";
    }
    else if(imgvalue == 3){
      document.getElementById('playerimg').src = "img/ch3.png";
    }
  


	}
  function restartBtnListener(){
    startButton();
    draw();
  }

  $("#retry_button").click(function(){
    score=0;
    realscore =0;
    bosslife = 5;
    boss_hp = 300;
    document.getElementById("boss_hp").style.width = boss_hp +"px";

    x = 300;
    y = 550;
    $("#player_State").css({"width":"1270"});
    startButton();
    document.getElementById("retry_page").style.display ="none";
    player_State.style.display = "block";
    mainPhider.style.display="block";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('score_State').style.display = "block";

    callBricks();
    callBricks2();
    draw();
  })

  $("#gamestartimg").click(function(){
    startButton();
  })

    function draw(){

      context.clearRect(0, 0, 1280, 620);
      init();
      backimg=new Image();
      $('score_State').css.display = "block";

      //mainPhider.style.display="block";
      if(level==1){    
        backimg.src="img/background.png"
        context.drawImage(backimg,0,0,1280,620);

        drawBricks();
        drawBall1();
        drawPaddle();
        collisionDetection();
        drawTomato();
        levelUp();

      }
      if(level==2){
        backimg.src="img/level2background.png"
        context.drawImage(backimg,0,0,1280,620);

        drawBricks2();
        drawBall1();
        drawPaddle();
        collisionDetection2();
        drawTomato();
        drawBomb();
        levelUp();

      }
      if(level==3){

        $("#player_State").css({"width":"400"});
        backimg.src="img/level3background.png"
        context.drawImage(backimg,0,0,1280,620);
        drawBall1();
        drawPaddle();
        drawTomato();
        drawBoss();
        bossAttack();
        //drawBomb();


      }
    }
    setInterval(draw,1);
    setInterval(scorecheck,10);
    //setInterval(TimeCount,1000);
}
