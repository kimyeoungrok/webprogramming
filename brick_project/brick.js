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
//김시현 Ball색 설정
var BallC = ["black", "gray", "white"];
//Ball상태 (N,R,G,B)
var BS = "N";


var brick_width = 100;
var brick_height = 30;

var brick = [] // 벽돌 위치 저장

var start = false;
//RGB 키 입력 확인 변수
var key = false;

var life = 3; // 라이프
var score = 0; //점수
var brick_count = 0; //벽돌 개수

var Bwidth = 0;
var Bheight = 0;
var item_width = 50; // 아이템 가로 길이
var item_height = 50; // 아이템 세로 길이
var item_x; // 아이템 x위치
var item_y; // 아이템 y위치
var item_array = []; //아이템 위치 저장
var item_count = 0; //먹은 아이템 개수
var item_total = 0; //아이템 총 개수

var Rnum = 100; //김시현 색깔별 스킬 횟수 ----------------- 추후 조정
var Gnum = 100;
var Bnum = 100;

var level_count = 1; // 레벨을 나타내는 변수

var interval; //인터벌 객체
$(document).ready(function(){

	$("#start").click(function(){
		$("#button_field").hide();
		$("#stage").show();
		//$(".interfaceMenu").show();
	});

	$("#red").click(function(){
		$("#stage").hide();
		$(".interfaceMenu").show();
		// 김영록 추가 수정
		$("#mycanvas").show();
		level_count = 1;
		canvas_width = parseInt($("#mycanvas").attr("width"));
		canvas_height = parseInt($("#mycanvas").attr("height"));
		paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
		paddle_y = (canvas_height-100)-paddle_height; //paddle y축 위치

		console.log(Ball_x);
		console.log(Ball_y);
		init();
	});
	$("#green").click(function(){
		$("#stage").hide();
		$(".interfaceMenu").show();
		// 김영록 추가 수정
		$("#mycanvas").show();
		level_count = 2;
		canvas_width = parseInt($("#mycanvas").attr("width"));
		canvas_height = parseInt($("#mycanvas").attr("height"));
		paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
		paddle_y = (canvas_height-100)-paddle_height; //paddle y축 위치
		console.log(Ball_x);
		console.log(Ball_y);
		init();
	});
	$("#blue").click(function(){
		$("#stage").hide();
		$(".interfaceMenu").show();
		// 김영록 추가 수정
		$("#mycanvas").show();
		level_count = 3;
		canvas_width = parseInt($("#mycanvas").attr("width"));
		canvas_height = parseInt($("#mycanvas").attr("height"));
		paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
		paddle_y = (canvas_height-100)-paddle_height; //paddle y축 위치

		console.log(Ball_x);
		console.log(Ball_y);
		init();
	});

	$("#setting").click(function(){
		$("#button_field").hide();
		change_position($(".popup"));
		$("#setting_div").show();
	});

	$("#guide").click(function(){
		$("#button_field").hide();
		change_position($(".popup"));
		$("#guide_div").show();
	});

	$("#story").click(function(){
		$(".story_div").fadeIn();
	});

	$(".story_div").each(function(){
		$(this).click(function(){
			$(this).fadeOut();
		});
	});

	$("#setting_ok").click(function(){
		$("#setting_div").hide();
		$("#button_field").show();
	});

	$("#guide_ok").click(function(){
		$("#guide_div").hide();
		$("#button_field").show();
	});

	function change_position(obj){
		var l = ($(window).width()-obj.width())/2;
		var t = ($(window).height()-obj.height())/2;
		obj.css({top:t,left:l});
	}
	$(window).resize(function(){
		change_position($(".popup"));
	});

	$("#back").click(function(){
		$("#stage").hide();
		$("#button_field").show();
	});

});

//김영록 맵 초기화
function init(){
		Ball_x = paddle_x + 100;//Ball의 초기 위치 및 재생성 위치는 paddle의 위
		Ball_y = paddle_y - 50;

	$(document).on("mousemove", mouseMoveHandler);
	// $(document).on("keydown",function(e){
	// 	if(e.key == " "){
	// 		start = !start;
	// 	}
	// 	console.log(e.key); //트러블 슈팅 : 한글키는 인식안됨
	// });
	
	canvas = document.getElementById("mycanvas");
	context = canvas.getContext('2d');
	brick = [];
	item_array = [];
	if(level_count == 1){
		mapR();
		itemR();
		imagemakingR(); // 아이템 이미지 구현(게임 정보 란에있는 루비그림 투명화 작업 김영록)
	}
	else if(level_count == 2){
		mapG();
		itemG();
		imagemakingG(); // 아이템 이미지 구현(게임 정보 란에있는 루비그림 투명화 작업 김영록)
	}
	else if(level_count == 3){
		mapB();
		itemB();
		imagemakingB(); // 아이템 이미지 구현(게임 정보 란에있는 루비그림 투명화 작업 김영록)
	}
	
	draw(); 
	interval = setInterval(draw,20);

}
//1단계 아이템 이미지 구현
function imagemakingR(){
	for(var i=1; i<item_array.length; i++) {
		$("#" + "img" + i).css("opacity","0.3");
	}
}
//2단계 아이템 이미지 구현
function imagemakingG(){
	for(var i=1; i<item_array.length; i++) {
		$("#" + "img" + i).css("opacity","0.3");
	}
}
//3단계 아이템 이미지 구현
function imagemakingB(){
	for(var i=1; i<item_array.length; i++) {
		$("#" + "img" + i).css("opacity","0.3");
	}
}
//김영록
function draw(){
	context.clearRect(0,0,canvas_width,canvas_height);
	if(start){
		//RGB 키 입력 시 함수 호출, 스킬 사용 중 다른 스킬 입력/중복 입력 불가
		$(document).on("keydown", function(k){
			if(k.key == "r" && !key && Rnum > 0) Rskill();
			else if(k.key == "g" && !key && Gnum > 0) Gskill();
			else if(k.key == "b" && !key && Bnum > 0) Bskill();
		});
	}else{
		$(document).on("keydown",function(e){
			if(e.key == " "){
				start = true;
				// start = !start; 스페이스바가 더 잘먹네요
				if(life <= 0){
					start = false;
					console.log("다시시작");
					life = 3;
					score = 0;
					item_count = 0;
					item_total = 0;
					level_count = 1;
					init();
					$("#life h2").text("");
					for(var i=0; i<life; i++) { // 생명 그림 나타나도록 구현
						$("#life h2").append("♥");
					}
					$("#score h2").text(score); // 다시 시작시 점수, 생명, 먹은 아이템 개수 초기화
					$("#item").text("아이템 : " + item_count + "/" + item_array.length/3);
				}
				else if(item_count >= item_total){
					start = false;
					// 다음단계로 넘어갈시 공이 위로 뜨는 현상 제지하기 위함
					Balldx = 5;	
					Balldy = 5;
					console.log("다음단계");
					item_count = 0;
					item_total = 0;
					init();
					$("#life h2").text("");
					for(var i=0; i<life; i++) { // 생명 그림 나타나도록 구현
						$("#life h2").append("♥");
					}
					$("#item").text("아이템 : " + item_count + "/" + item_array.length/3);
				}
			
			}
			
			//console.log(e.key); //트러블 슈팅 : 한글키는 인식안됨
		});
	}
	//스킬 사용 조건
	// if(RToggle) {
	// 	$(document).off("keydown");
	// }else{
	// 	$(document).on("keydown",function(k){
	// 		if(k.key == "R"){
	// 			RToggle = false;
	// 			//인터벌R 객체 생성하고 Rskill()
	// 		}
	// 	}
	// }

	if(life <= 0) { // 생명이 고갈되면 게임오버 화면으로 전환
		console.log("게임오버" + start);
		gameover();
		start = false;
	}
	else if(item_count >= item_total){ // 아이템을 모두 모으면 클리어 화면으로 전환
		console.log("게임클리어" + start + item_count + " : " + item_total);
		level_count += 1;
		gameclear();
		start = false;
	}
	else{
		drawPaddle();
		drawBall();
		makebrick();
		makeitem();
		moveBall();
	}
}

//김시현 R스킬 메소드
function Rskill() {
	Rnum--;
	BS = "R";
	key = true;
	setTimeout(function(){key = false; BS = "N";},3000);
}

//김시현 G스킬 메소드
function Gskill() {
	Gnum--;
	BS = "G";
	key = true;
	setTimeout(function(){key = false; BS = "N";},3000);
}

//김시현 B스킬 메소드
function Bskill() {
	Bnum--;
	BS = "B";
	key = true;
	Bwidth = 25;
	Bheight = 25;
	setTimeout(function(){
		key = false;
		BS = "N";
		Bwidth = 0;
		Bheight = 0;
	},3000);
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
	if(BS === "B") {
		context.beginPath();
		context.fillStyle = "skyblue";
		context.arc(Ball_x,Ball_y,(Ball_radius+Bwidth),0,2.0*Math.PI,false); // 항상 가운데에 배치
		context.fill();
		context.closePath();
	}
	context.beginPath();
	context.fillStyle = BallColor(BS);
	context.arc(Ball_x,Ball_y,Ball_radius,0,2.0*Math.PI,false); // 항상 가운데에 배치   
	context.fill();

	// context.lineWidth = 1;     
	// context.strokeStyle = "white";
	// context.stroke();  
	context.closePath();
	
}
//김영록 김시현 벽돌색 수정
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
	if(level_count == 1){ //1단계일때는 빨간색 아이템
		for(var i=0; i<item_array.length; i=i+3){ 
		if(item_array[i] == 1){
			context.beginPath();
			context.fillStyle = "red";
			context.fillRect(item_array[i+1],item_array[i+2],item_width,item_height); 
			}
		
		}
	}
	else if(level_count == 2){
		for(var i=0; i<item_array.length; i=i+3){ 
		if(item_array[i] == 1){
			context.beginPath();
			context.fillStyle = "green";
			context.fillRect(item_array[i+1],item_array[i+2],item_width,item_height); 
			}
		
		}
	}
	else if(level_count == 3){
		for(var i=0; i<item_array.length; i=i+3){ 
		if(item_array[i] == 1){
			context.beginPath();
			context.fillStyle = "blue";
			context.fillRect(item_array[i+1],item_array[i+2],item_width,item_height); 
			}
		
		}
	}
	
}
//김영록
var paddlecolision = false; // 패들 충돌 감지

//김시현 공 상태별 색 출력: 변수 BS 변경으로 공 색 변경 가능
function BallColor(BS) {
	if(BS === "N") return BallC[life - 1];
	else if(BS === "R") return "red";
	else if(BS === "G") return "green";
	else if(BS === "B") return "blue";
}

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

		//좌우 벽에 부딪혔을 때
		if(Ball_x - Ball_radius <= 0 || Ball_x + Ball_radius >= canvas_width){
		//Balldx += 0.1;
		Balldx = -Balldx;
		}

		// 윗벽에 부딪혔을 때(김영록 작성, 김시현 수정)
		else if(Ball_y - Ball_radius <= 0 && Balldy < 0){
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
			//Balldx = 1/Math.tan(45*(Math.PI/180) + (Ball_x - (paddle_width + paddle_x)/2)*0.44)*Balldy; // 보정 구현(아직 완벽하게 구현x 김영록)
			// if(Balldx < 0){
			// 	Balldx = -Balldx;
			// }
			paddlecolision = true;
		}

		//바닥에 떨어졌을때
		else if(Ball_y - Ball_radius > canvas_height){
			start = !start;
			life -= 1;
			$("#life h2").text("");
			for(var i=0; i<life; i++) { // 생명 그림 나타나도록 구현
				$("#life h2").append("♥");
			}
			//$("#life").text("생명 : " + life);
			Ball_x = paddle_x + 100;
			Ball_y = paddle_y - 50;
		}

		// 벽돌충돌 이벤트						//가로로 맞았을 때 x축 방향 변화 (김시현 수정)
		for(var i=0; i<brick.length; i=i+3) {
			if(brick[i] > 0) {
				//R스킬 사용 중일 때
				if(BS === "R" && !(brick[i] == 3)) {
					if(Ball_y+Ball_radius >= brick[i+2] && Ball_y-Ball_radius <= brick[i+2]+brick_height){
						if(Ball_x+Ball_radius == brick[i+1] || Ball_x-Ball_radius == brick[i+1]+brick_width){
							brickSmash(i);
						}
						else if(Ball_x+Ball_radius > brick[i+1] && Ball_x-Ball_radius < brick[i+1]+brick_width){
							brickSmash(i);
						}
						$("#score h2").text(score);
					}
				}
				else {
					if(Ball_y+Ball_radius >= brick[i+2] && Ball_y-Ball_radius <= brick[i+2]+brick_height){
						if(Ball_x+Ball_radius == brick[i+1] || Ball_x-Ball_radius == brick[i+1]+brick_width){
							Balldx = -Balldx;
							brickSmash(i);
						}
						else if(Ball_x+Ball_radius > brick[i+1] && Ball_x-Ball_radius < brick[i+1]+brick_width){
							Balldy = -Balldy;
							brickSmash(i);
						}
						$("#score h2").text(score);
					}
				}
			}
		}

		// 아이템 먹었을 때
		for(var i=0; i<item_array.length; i=i+3){
			if(item_array[i] == 1){
				if((Ball_y+Ball_radius+Bheight >= item_array[i+2] && Ball_y-Ball_radius-Bheight <= item_array[i+2]+item_height)
					&& Ball_x+Ball_radius+Bwidth >= item_array[i+1] && Ball_x-Ball_radius-Bwidth <= item_array[i+1]+item_width){
					item_array[i] = 0;
					score += 50;
					item_count += 1;
					$("#score h2").text(score);
					$("#item").text("아이템 : " + item_count + "/" + item_total);
					//아이템 그림이 선명해지는 작업 추가 김영록
					$("#" + "img" + item_count).css("opacity","1");
					if(item_count >= item_total){
						start = !start;
					}
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
//김시현 벽돌 색깔별 이벤트
function brickSmash(i) {
	if(brick[i] == 1) {
		brick[i]--;
		score += 20;
	}
	else if(brick[i] == 2) {
		//R스킬 사용 중일 때
		if(BS === "R") {
			brick[i] = 0;;
			score += 40;
		}
		else {
			brick[i]--;
			score += 20;
		}
	}
	//G스킬 사용 중일 때
	else if(brick[i] == 3 && !(BS === "G")) {
		life -= 1;
		$("#life h2").text("");
		for(var i=0; i<life; i++) $("#life h2").append("♥");
	}
	else if(brick[i] == 4) {
		brick[i] = 0;
		if(Rnum==0) Rnum++;
		score += 20;
	}
	else if(brick[i] == 5) {
		brick[i] = 0;
		if(Gnum==0) Gnum++;
		score += 20;
	}
	else if(brick[i] == 6) {
		brick[i] = 0;
		if(Bnum==0) Bnum++;
		score += 20;
	}
}

//김영록
function gameover(){ // 게임오버시 나타나는 창
	clearInterval(interval);
	context.clearRect(0,0,canvas_width,canvas_height); // 게임화면 지우기
	context.font = 'italic 30pt Arial'
	context.fillText("게임 오버 다시 시작하려면 스페이스바 키를 눌러주세요!", canvas_width/6-150, canvas_height/2);
}
//김영록
function gameclear(){ // 게임 클리어시 나타나는 창
	clearInterval(interval);

	context.clearRect(0,0,canvas_width,canvas_height); // 게임화면 지우기
	context.font = 'italic 30pt Arial'
	context.fillText("게임클리어! 다음단계로 넘어가려면 스페이스바 를 눌러주세요!", canvas_width/6-150, canvas_height/2);

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
    if(!start){
		Ball_x = paddle_x + 100;//Ball의 초기 위치 및 재생성 위치는 paddle의 위
		Ball_y = paddle_y - 50;
	}
}

//김영록
function mapR(){ //1단계 벽돌배치
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
function itemR(){ // 1단계 아이템 배치
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
function mapG(){ //2단계 벽돌배치
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
	brick.push(2);
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
function itemG(){ //2단계 아이템 배치
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
function mapB(){ //3단계 벽돌배치
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
function itemB(){ //2단계 아이템 배치
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