// 변수 선언부(김영록)
var canvas; // 캔버스 객체
var context; // context

var paddle_width = 200; // paddle 너비
var paddle_height = 30; // paddle 높이

var canvas_width; // 캔버스 너비
var canvas_height; // 캔버스 높이

var paddle_x; // paddle x위치
var paddle_y; // paddle y위치

var Ball_x; // ball 중심 x좌표
var Ball_y; //ball 중심 y좌표
var Ball_radius = 10; // Ball 반지름
var Balldx = 5; // Ball 변환값
var Balldy = 5; // Ball 변환값
var BallColor = ["white", "gray", "black"];
var BCIndex = 0;


var brick_width = 100;
var brick_height = 30;

var brick = [] // 벽돌 위치 저장

var start = false;
var space = false; // 스페이스바 누름 여부

var life = 3; // 라이프
var score = 0; //점수
var brick_count = 0; //벽돌 개수

var item_width = 50; // 아이템 가로 길이
var item_height = 50; // 아이템 세로 길이
var item_x; // 아이템 x위치
var item_y; // 아이템 y위치
var item_array = []; //아이템 위치 저장
var item_count = 0; //먹은 아이템 개수
var item_total = 0; //아이템 총 개수

var interval, level; //인터벌 객체
//김영록
$("document").ready(function(){
	init();
	//document.addEventListener("mousemove", mouseMoveHandler, false);
	
	// $("#start").on("click",function(){
	// 	start = !start;
	// });
	
});
//김영록
function init(){ // 맵 초기화
	canvas_width = parseInt($("#mycanvas").attr("width"));
	canvas_height = parseInt($("#mycanvas").attr("height"));
	paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
	paddle_y = (canvas_height-100)-paddle_height; //paddle y축 위치

	Ball_x = paddle_x + 100;										//Ball의 초기 위치 및 재생성 위치는 paddle의 위
	Ball_y = paddle_y - 50;
	console.log(Ball_x);
	console.log(Ball_y);
	$(document).on("mousemove", mouseMoveHandler);
	$(document).on("keydown",function(e){
		if(e.key == " "){
			start = !start;
		}
		console.log(e.key); //트러블 슈팅 : 한글키는 인식안됨
	});
	canvas = document.getElementById("mycanvas");
	context = canvas.getContext('2d');
	brick = [];
	item_array = [];
	mapG();																//test용 mapG,itemG
	itemG();
	draw();
	interval = setInterval(draw,20);

}
//김영록
function draw(){
	context.clearRect(0,0,canvas_width,canvas_height);
	if(start){
		$(document).off("keydown");
	}else{
		$(document).on("keydown",function(e){
			if(e.key == " "){
				start = !start;
			}
			if(life <= 0){
				life = 3;
				score = 0;
				item_count = 0;
				item_total = 0;
				init();
				$("#life").text("생명 : " + life);
				$("#score").text("점수 : " + score); // 다시 시작시 점수, 생명, 먹은 아이템 개수 초기화
				$("#item").text("아이템 : " + item_count + "/" + item_array.length/3);
			}
			console.log(e.key); //트러블 슈팅 : 한글키는 인식안됨
		});
	}
	if(life <= 0) { // 생명이 고갈되면 게임오버 화면으로 전환
		gameover();
	}
	if(item_count >= item_total){ // 아이템을 모두 모으면 클리어 화면으로 전환
		gameclear();
	}
	else{
		drawPaddle();
		drawBall();
		makebrick();
		makeitem();
		moveBall();
	}
	

}
//김영록
function drawPaddle(){
	context.beginPath();
	context.fillStyle = "#00FF00";
	context.fillRect(paddle_x,paddle_y,paddle_width,paddle_height); // 항상 가운데에 배치
	context.closePath();
}

//김영록
function drawBall(){
	context.beginPath();
	context.arc(Ball_x,Ball_y,Ball_radius,0,2.0*Math.PI,false); // 항상 가운데에 배치   
	context.fillStyle = BallColor[BCIndex];
	context.fill();
	context.lineWidth = 1;     
	context.strokeStyle = "white";
	context.stroke();  
	context.closePath();
	
}
//김영록
function makebrick(){
	for(var i=0; i<brick.length; i=i+3){
		context.beginPath();
		if(brick[i]==1){
			context.fillStyle = "#E2E2E2";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();
		}
		else if(brick[i]==2){
			context.fillStyle = "#666666";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();
		}
		else if(brick[i]==3){
			context.lineWidth = 1;     
			context.strokeStyle = "white";
			context.strokeRect(brick[i+1],brick[i+2],brick_width,brick_height);
			context.fillStyle = "black";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();
		}
		else if(brick[i]==4){
			context.fillStyle = "red";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();
		}
		else if(brick[i]==5){
			context.fillStyle = "green";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();
		}
		else if(brick[i]==6){
			context.fillStyle = "blue";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();
		}
		else if(brick[i]==7){
			context.fillStyle = "red"
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();;
		}
	}
}
//김영록
function makeitem(){
	for(var i=0; i<item_array.length; i=i+3){
		if(item_array[i] == 1){
			context.beginPath();
			context.fillStyle = "red";
			context.fillRect(item_array[i+1],item_array[i+2],item_width,item_height); 
		}
		
	}
}
//김영록
var paddlecolision = false; // 패들 충돌 감지

function moveBall(){
	
	if(start){
		if(paddlecolision) {
			if(Balldx < 0) {
				Balldx = -5;
			}
			else{
				Balldx = 5;
			}
			paddlecolision = false;
		}
		if(Ball_x - Ball_radius <= 0 || Ball_x + Ball_radius >= canvas_width){//좌우 벽에 부딪혔을 때
		//Balldx += 0.1;
		Balldx = -Balldx;
		} 
		else if(Ball_y - Ball_radius <= 0 && Balldy < 0){ // 윗벽에 부딪혔을 때(김영록 작성, 김시현 수정)
			Balldy = -Balldy;
		}

		/*var paddle_width = 200; // paddle 너비
		var paddle_height = 30; // paddle 높이*/
		//패들에 부딪혔을 떨어졌을때				//무한튕김 수정(김시현 수정)
		else if(Ball_y+Ball_radius >= paddle_y && Ball_y-Ball_radius <= paddle_y+paddle_height && Ball_x-Ball_radius >= paddle_x
		&& Ball_x+Ball_radius <= paddle_x+paddle_width && Balldy > 0){
			// var speedx = ((Ball_x)-((paddle_x + paddle_width)/2))*0.02;
			// console.log(speedx);
			Balldy = -Balldy;
			// Balldx += speedx;
			paddlecolision = true;
		}
		else if(Ball_y - Ball_radius > canvas_height){//바닥에 떨어졌을때
			start = !start;
			life -= 1;
			$("#life").text("생명 : " + life);
			BCIndex++;
			Ball_x = paddle_x + 100;
			Ball_y = paddle_y - 50;
		}

		// 벽돌충돌 이벤트						//가로로 맞았을 때 x축 방향 변화 (김시현 수정)
		for(var i=0; i<brick.length; i=i+3){
			if(brick[i] > 0){
				if(Ball_y+Ball_radius >= brick[i+2] && Ball_y-Ball_radius <= brick[i+2]+brick_height){
					if(Ball_x+Ball_radius == brick[i+1] || Ball_x-Ball_radius == brick[i+1]+brick_width){
						brickSmash(i);
						Balldx = -Balldx;
						score += 20;
						$("#score").text("점수 : " + score);
					}
					else if(Ball_x+Ball_radius > brick[i+1] && Ball_x-Ball_radius < brick[i+1]+brick_width){
						brickSmash(i);
						Balldy = -Balldy;
						score += 20;
						$("#score").text("점수 : " + score);

					}
				}
			}
		}
		// 아이템 먹었을 때
		for(var i=0; i<item_array.length; i=i+3){
			if(item_array[i] == 1){
				if((Ball_y+Ball_radius >= item_array[i+2] && Ball_y-Ball_radius <= item_array[i+2]+item_height)
					&& Ball_x+Ball_radius >= item_array[i+1] && Ball_x-Ball_radius <= item_array[i+1]+item_width){
					item_array[i] = 0;
					score += 50;
					item_count += 1;
					$("#score").text("점수 : " + score);
					$("#item").text("아이템 : " + item_count + "/" + item_total);
				}
			}
		// context.beginPath();
		// context.fillStyle = "blue";
		// context.fillRect(brick[i],brick[i+1],brick_width,brick_height); // 항상 가운데에 배치
		// context.closePath();
		}
		Ball_x += Balldx;
		Ball_y += Balldy;
	}
	
}
function brickSmash(i) {
	if(brick[i] == 1 || brick[i] == 2) brick[i]--;
	else if(brick[i] == 3) {
		life -= 1;
		$("#life").text("생명 : " + life);
		BCIndex++;
	}
	else if(brick[i] == 4 || brick[i] == 5 || brick[i] == 6) {
		brick[i] = 0;
		//스킬 포인트 ++;
	}
	else if(brick[i] == 7) {
		//공이 red상태일 때 0
	}
}
//김영록
function gameover(){ // 게임오버시 나타나는 창
	clearInterval(interval);
	context.clearRect(0,0,canvas_width,canvas_height); // 게임화면 지우기
	context.font = 'italic 30pt Arial'
	context.fillText("게임 오버 다시 시작하려면 스페이바 키를 눌러주세요!", canvas_width/6-150, canvas_height/2);
}
//김영록
function gameclear(){ // 게임 클리어시 나타나는 창
	clearInterval(interval);
	context.clearRect(0,0,canvas_width,canvas_height); // 게임화면 지우기
	context.font = 'italic 30pt Arial'
	context.fillText("게임클리어! 다음단계로 넘어가려면 (키)를 눌러주세요!", canvas_width/6-150, canvas_height/2);
}
//김영록
function mouseMoveHandler(e) {
	
    var relativeX = e.clientX - canvas.offsetLeft;
    
    if(relativeX > 0 && relativeX < canvas.width) {
        paddle_x = relativeX - paddle_width;
        if(paddle_x < 0) {
        	paddle_x = 0;
        }
        //console.log(paddle_x);
    }
}
//김영록
function mapR(){ //벽돌배치
	brick_x = 450;
	brick_y = 30;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 80;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 580;
	brick_y = 80;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 450;
	brick_y = 140;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 200;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 270;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 340;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 580;
	brick_y = 200;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 630;
	brick_y = 250;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 680;
	brick_y = 300;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
}
//김영록
function itemR(){ // 아이템 배치
	item_x = 300;
	item_y = 20;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 480;
	item_y = 80;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 700;
	item_y = 100;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 480;
	item_y = 300;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 250;
	item_y = 330;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 700;
	item_y = 400;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;
} 

//김영록
function mapG(){ //벽돌배치
	brick_x = 450;
	brick_y = 30;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 80;
	brick.push(2);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 580;
	brick_y = 80;
	brick.push(3);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 450;
	brick_y = 140;
	brick.push(4);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 200;
	brick.push(5);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 270;
	brick.push(6);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 340;
	brick.push(7);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 580;
	brick_y = 200;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 630;
	brick_y = 250;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 680;
	brick_y = 300;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
}
//김영록
function itemG(){ // 아이템 배치
	item_x = 300;
	item_y = 20;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 480;
	item_y = 80;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 700;
	item_y = 100;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 480;
	item_y = 300;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 250;
	item_y = 330;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 700;
	item_y = 400;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;
} 