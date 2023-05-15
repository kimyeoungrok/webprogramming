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


var brick_width = 100;
var brick_height = 30;

var brick = [] // 벽돌 위치 저장

var start = false;
var space = false; // 스페이스바 누름 여부

var life = 3; // 라이프
var score = 0; //점수


$("document").ready(function(){
	canvas_width = parseInt($("#mycanvas").attr("width"));
	canvas_height = parseInt($("#mycanvas").attr("height"));
	paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
	paddle_y = (canvas_height-100)-paddle_height; //paddle y축 위치

	Ball_x = canvas_width/2;
	Ball_y = canvas_height/2;
	console.log(Ball_x);
	console.log(Ball_y);
	init();
	//document.addEventListener("mousemove", mouseMoveHandler, false);
	$(this).on("mousemove", mouseMoveHandler);
	$(this).on("keydown",function(e){
		if(e.key == " "){
			start = !start;
		}
		console.log(e.key); //트러블 슈팅 : 한글키는 인식안됨
	});
	// $("#start").on("click",function(){
	// 	start = !start;
	// });
	setInterval(draw,20);
});
function init(){
	canvas = document.getElementById("mycanvas");
	context = canvas.getContext('2d');
	map()
	draw();

}
function map(){ //벽돌배치
	brick_x = 450;
	brick_y = 30;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 320;
	brick_y = 80;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 580;
	brick_y = 80;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 450;
	brick_y = 140;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 320;
	brick_y = 200;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 320;
	brick_y = 270;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 320;
	brick_y = 340;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 580;
	brick_y = 200;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 630;
	brick_y = 250;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_x = 680;
	brick_y = 300;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
}
function draw(){
	context.clearRect(0,0,canvas_width,canvas_height);
	drawPaddle();
	drawBall();
	makebrick();
	moveBall();
}
function drawPaddle(){
	context.beginPath();
	context.fillStyle = "#00FF00";
	context.fillRect(paddle_x,paddle_y,paddle_width,paddle_height); // 항상 가운데에 배치
	context.closePath();
}


function drawBall(){
	
	context.beginPath();
	context.arc(Ball_x,Ball_y,Ball_radius,0,2.0*Math.PI,false); // 항상 가운데에 배치
	context.fillStyle = "red";
	context.fill();
	context.closePath();
	
}

function makebrick(){

	for(var i=0; i<brick.length; i=i+3){
		if(brick[i] == 1){
			context.beginPath();
			context.fillStyle = "blue";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); // 항상 가운데에 배치
			context.closePath();
		}
		
	}
	
	
}
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
		if(Ball_x-Ball_radius <= 0 || Ball_x+Ball_radius >= canvas_width){//좌우 벽에 부딪혔을 때
		//Balldx += 0.1;
		Balldx = -Balldx;
		} 
		else if(Ball_y-Ball_radius <= 0){ // 위 아래 벽에 부딪혔을 때
			Balldy = -Balldy;
		}
		else if(Ball_y+Ball_radius >= paddle_y && Ball_x-Ball_radius >= paddle_x && Ball_x+Ball_radius <= paddle_x+paddle_width){//패들에 부딪혔을 때
			var speedx = ((Ball_x)-((paddle_x + paddle_width)/2))*0.02
			console.log(speedx)
			Balldy = -Balldy;
			Balldx += speedx;
			paddlecolision = true;
		}
		else if(Ball_y - Ball_radius > canvas_height){//바닥에 떨어졌을때
			start = !start;
			life -= 1;
			$("#life").text("생명 : " + life);
			Ball_x = canvas_width/2;
			Ball_y = canvas_height/2;
		} 
		for(var i=0; i<brick.length; i=i+3){
			if(brick[i] == 1){
				if((Ball_y+Ball_radius >= brick[i+2] && Ball_y-Ball_radius <= brick[i+2]+brick_height) && Ball_x-Ball_radius >= brick[i+1] && Ball_x+Ball_radius <= brick[i+1]+brick_width){
					brick[i] = 0;
					Balldy = -Balldy;
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

