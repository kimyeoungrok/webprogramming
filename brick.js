// 변수 선언부(김영록)
var canvas; // 캔버스 객체
var context; // context

var canvas_width; // 캔버스 너비
var canvas_height; // 캔버스 높이

var paddle_x; // paddle x위치
var paddle_y; // paddle y위치
var paddle_width = [200, 150, 100]; // paddle 너비
var paddle_height = 30; // paddle 높이
var paddleC = ["white", "gray", "black"];
var pdlIndx = 0;

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
var space = false; // 스페이스바 누름 여부
//RGB 키 입력 확인 변수
var key = false;

var life = 3; // 라이프
var score = 0; //점수
var brick_count = 0; //벽돌 개수

var red_piece = new Image(); /* 아이템 보석 조각 모양으로 변경 -송찬우-*/
red_piece.src = "img/red_piece.png"
var green_piece = new Image(); /* 아이템 보석 조각 모양으로 변경 -송찬우-*/
green_piece.src = "img/green_piece.png"
var blue_piece = new Image(); /* 아이템 보석 조각 모양으로 변경 -송찬우-*/
blue_piece.src = "img/blue_piece.png"


var Rwidth = 0;
var Rheight = 0;
var item_width = 50; // 아이템 가로 길이
var item_height = 50; // 아이템 세로 길이
var item_x; // 아이템 x위치
var item_y; // 아이템 y위치
var item_array = []; //아이템 위치 저장
var item_count = 0; //먹은 아이템 개수
var item_total = 0; //아이템 총 개수

// var Rnum = 100; //김시현 색깔별 스킬 횟수 -> 삭제
// var Gnum = 100;
// var Bnum = 100;

var level_count = 1; // 레벨을 나타내는 변수

var boss_x = 450; // 보스 x좌표 위치
var boss_y = 100; // 보스 y좌표 위치
var boss_dx = 1; // 보스 x좌표 속도
//보스 이미지 생성
var bossImage1 = new Image();
bossImage1.src = "img/boss1.png"
var bossImage2 = new Image();
bossImage2.src = "img/boss2.png";
var boss_width = 150; //보스 크기
var boss_height = 150; //보스 크기

var boss_blackball_x = 450; // 보스 검은공 위치(공격)
var boss_blackball_y = 250; // 보스 검은공 위치
var boss_blackball_dy= 4; //보스 검은 공 떨어지는 속도
var boss_blackball_radius = 10; //보스 검은 공 반지름 크기
var boss_HP = 450; //보스 체력
var boss_flag = true;

var interval; //인터벌 객체

//배경음악 오디오 객체 생성
var audio=new Audio();
audio.src="audio/audio1.mp3";
audio.loop=true;

var effvolume=0.5;
//효과음 재생 함수
function playSound(source,volume){
	var audio2 = new Audio();
	audio2.src=source;
	audio2.play();
	audio2.volume=volume;
}

$(document).ready(function(){

    
    change_position($("#container"));
    change_position($("#ending"));//5.26부 추가 -송찬우-
	
	$("#start").click(function(){
		$("#button_field").hide();
		$("#stage").show();
		audio.src="./audio/audio1.mp3";
		audio.play();
		$("#container").css("background-image","url('img/init_village.jpg')"); // 보스 처치 후 다시 시작할때 배경 초기화 - 송찬우-
	});

	$("#red").click(function(){
		$("#stage").hide();
		$("#interface").show();
		// 김영록 추가 수정 + 송찬우 추가 수정
		$("#mycanvas").show();
		level_count = 1;
		canvas_width = parseInt($("#mycanvas").attr("width"));
		canvas_height = parseInt($("#mycanvas").attr("height"));
		paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
		paddle_y = canvas_height-paddle_height; //paddle y축 위치 변경 -송찬우
        
	    Ball_x = paddle_x + 100;//Ball의 초기 위치 및 재생성 위치는 paddle의 위
		Ball_y = paddle_y - 50;
		console.log(Ball_x);
		console.log(Ball_y);
		init();
	});
	$("#green").click(function(){
		$("#stage").hide();
		$("#interface").show();
		// 김영록 추가 수정 + 송찬우 추가 수정
		$("#mycanvas").show();
		level_count = 2;
		canvas_width = parseInt($("#mycanvas").attr("width"));
		canvas_height = parseInt($("#mycanvas").attr("height"));
		paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
		paddle_y = canvas_height-paddle_height; //paddle y축 위치 변경 -송찬우-
		
		Ball_x = paddle_x + 100;//Ball의 초기 위치 및 재생성 위치는 paddle의 위
		Ball_y = paddle_y - 50;
		console.log(Ball_x);
		console.log(Ball_y);
		init();
	});
	$("#blue").click(function(){
		$("#stage").hide();
		$("#interface").show();
		// 김영록 추가 수정 + 송찬우 추가 수정
		$("#mycanvas").show();
		level_count = 3;
		canvas_width = parseInt($("#mycanvas").attr("width"));
		canvas_height = parseInt($("#mycanvas").attr("height"));
		paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
		paddle_y = canvas_height-paddle_height; //paddle y축 위치 변경 - 송찬우-
        
        Ball_x = paddle_x + 100;//Ball의 초기 위치 및 재생성 위치는 paddle의 위
		Ball_y = paddle_y - 50;
		console.log(Ball_x);
		console.log(Ball_y);
		init();
	});

	$("#boss").click(function(){
		$("#stage").hide();
		$("#interface").show();
		// 김영록 추가 수정 + 송찬우 추가 수정
		$("#mycanvas").show();
		level_count = 4;
		canvas_width = parseInt($("#mycanvas").attr("width"));
		canvas_height = parseInt($("#mycanvas").attr("height"));
		paddle_x = (canvas_width-paddle_width)/2; //paddle x축 위치
		paddle_y = canvas_height-paddle_height; //paddle y축 위치 변경 -송찬우-

		Ball_x = paddle_x + 100;//Ball의 초기 위치 및 재생성 위치는 paddle의 위
		Ball_y = paddle_y - 50;
		console.log(Ball_x);
		console.log(Ball_y);
		init();
	})

	var bgmvolume=parseFloat($("#bgm_volume").val())/100;
	$("#bgm_volume").change(function()	{
		bgmvolume = parseFloat($("#bgm_volume").val())/100;
		audio.volume=bgmvolume;
	});
	//효과음
	effvolume=parseFloat($("#effect_volume").val())/100;
	$("#effect_volume").change(function(){
		effvolume=parseFloat($("#effect_volume").val())/100;
	});
	$("button").mouseover(function(){
		playSound("audio/button_sound.mp3",effvolume);
	});
	$("button").click(function(){
		playSound("audio/buttonclick_sound.mp3",effvolume);
	})
	$(".stage_field h1").mouseover(function(){
		playSound("audio/button_sound.mp3",effvolume);
	})

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

		change_position($(".story_div")); /*스토리 영역 가운데 배치 위해 추가 -송찬우*/
		$(".story_div").fadeIn();
	});

	$(".story_div").each(function(){
		$(this).click(function(){
			$(this).fadeOut();
			playSound("./audio/storychangeaudio.wav",effvolume);
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
		var l = ($(window).width()-obj.width())/2; /* 5/22 y축 좌표 삭제 -송찬우-*/
		obj.css({left:l});
	}
	
	$(window).resize(function(){
		change_position($(".popup"));
		change_position($("#container")); /* container, stroy_div추가 송찬우 */
		change_position($(".story_div")); 
		change_position($("#ending")); //5.26 추가 -송찬우-
	});

	$("#back").click(function(){
		$("#stage").hide();
		$("#button_field").show();
	});

});


//김영록 맵 초기화
function init(){

	$(document).on("mousemove", mouseMoveHandler);
	// $(document).on("keydown",function(e){
	// 	if(e.key == " "){
	// 		start = !start;
	// 	}
	// 	console.log(e.key); //트러블 슈팅 : 한글키는 인식안됨
	// });
	boss_blackball_x = 450; // 보스 검은공 위치(공격)
	boss_blackball_y = 250; // 보스 검은공 위치
	boss_blackball_dy= 4; //보스 검은 공 떨어지는 속도
	boss_blackball_radius = 10; //보스 검은 공 반지름 크기
	boss_HP = 450; //보스 체력
	pdlIndx = 0; //패들 상태

	canvas = document.getElementById("mycanvas");
	context = canvas.getContext('2d');
	canvas.style.cursor = 'none'; //김시현 커서 숨김
	brick = [];
	item_array = [];
	$("#item-image-level1").hide();
	$("#item-image-level2").hide();
	$("#item-image-level3").hide();
	//스킬 블록 초기화 과정
	
	for(var i=1; i<4; i++){ //RGB블록 활성화 김영록
		$("#skill" + i).css("opacity","0.3");
	}
	
	if(level_count == 1){
		mapR();
		itemR();
		imagemakingR(); // 게임 클리어 조건 이미지 구현(게임 정보 란에있는 루비그림 투명화 작업 김영록) - 송찬우 수정-
		Balldx = 5;
		Balldy = 5;
		
		$("#interface").show();// 클리어나 실패 화면 후 인터페이스 다시 나타나게끔 - 송찬우 -
		$("#item-image-level" + level_count).show();
	}
	else if(level_count == 2){
		mapG();
		itemG();
		imagemakingG(); // 게임 클리어 조건 이미지 구현(게임 정보 란에있는 루비그림 투명화 작업 김영록) - 송찬우 수정-
		// 레벨에 따라 속도 빨라지게
		Balldx = 7;
		Balldy = 7;
		
		$("#interface").show();// 클리어나 실패 화면 후 인터페이스 다시 나타나게끔 - 송찬우 -
		$("#item-image-level" + level_count).show();
	}
	else if(level_count == 3){
		mapB();
		itemB();
		imagemakingB(); // 게임 클리어 조건 이미지 구현(게임 정보 란에있는 루비그림 투명화 작업 김영록) - 송찬우 수정-
		// 레벨에 따라 속도 빨라지게
		Balldx = 9;
		Balldy = 9;
		
		$("#interface").show(); // 클리어나 실패 화면 후 인터페이스 다시 나타나게끔 - 송찬우 -
		$("#item-image-level" + level_count).show();
	}
	else if(level_count == 4){
		// life = 3;
		// score = 0;
		// item_count = 0;
		// item_total = 0;
		// BCIndex = 0;
		// Ball_x = paddle_x + 100;
		// Ball_y = paddle_y - 50;
		// 레벨에 따라 속도 빨라지게
		Balldx = 9;
		Balldy = 9;
		mapBoss();
		//itemB();
		//imagemakingB(); // 게임 클리어 조건 이미지 구현(게임 정보 란에있는 루비그림 투명화 작업 김영록)
		$("#interface").show(); // 클리어나 실패 화면 후 인터페이스 다시 나타나게끔 - 송찬우 -
		$("#item-image-level4").css({"display":"block"})  /*보스맵에서 비는 인터페이스 창 채우기 위해 수정 -송찬우*/
	}
	if(level_count != 1){
		for(var i=1; i<level_count; i++){ //RGB블록 활성화 김영록
			$("#skill" + i).css("opacity","1");
		}
	}
	//draw(); 
	interval = setInterval(draw,20);

}
//1단계 게임 클리어 조건 이미지 구현, 맵의 아이템 용어와 혼동 여지 있어서 용어 수정하였습니다. - 송찬우 -
function imagemakingR(){
	for(var i=1; i<item_array.length; i++) {
		// 수정 5/21 김영록
		$(".level" + level_count + "-image" + ">" + "#" + "img" + i).css("opacity","0.3");
	}
}
//2단계 게임 클리어 조건 이미지 구현 - 송찬우 수정-
function imagemakingG(){
	for(var i=1; i<item_array.length; i++) {
		// 수정 5/21 김영록
		$(".level" + level_count + "-image" + ">" + "#" + "img" + i).css("opacity","0.3");
	}
}
//3단계 게임 클리어 조건 이미지 구현 - 송찬우 수정-
function imagemakingB(){
	for(var i=1; i<item_array.length; i++) {
		$(".level" + level_count + "-image" + ">" + "#" + "img" + i).css("opacity","0.3");
	}
}
//김영록
function draw(){
	context.clearRect(0,0,canvas_width,canvas_height);
	//김영록(05/20) 게임오버, 클리어시 키 값 안먹히는 현상 고치기 위해 위 코드의 위치를 위로 올렸음
	
	if(start){
		$(document).on("keydown", function(k){
			if(k.key == "r" && !key && score > 50) Rskill();
			else if(k.key == "g" && !key && score > 100) Gskill();
			else if(k.key == "b" && !key && score > 100) Bskill();
			// 방향키 dx값 변경 해봤는데 흠... 고려 필요
			// else if(k.key == "ArrowRight") {
			// 	Balldx += 0.001;
			// }
			// else if(k.key == "ArrowLeft") {
			// 	Balldx -= 0.001;
			// }
		});
	}else{
		$(document).on("keydown",function(e){
			if(e.key == " "){ // 스페이스바 대신 q값으로 바꿈 김영록(05/20)
				
				if(life <= 0){
					start = false;
					console.log("다시시작");
					console.log(start);
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
				else if(level_count != 4 && item_count >= item_total){
					start = false;
					//볼 위치 수정
					Ball_x = paddle_x + paddle_width[pdlIndx]/2;;
					Ball_y = paddle_y - 50;
					// 다음단계로 넘어갈시 공이 위로 뜨는 현상 제지하기 위함
					Balldx = 5;
					Balldy = 5;
					life = 3;
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
				else{
					start=true;
				}

			
			}
			
			//console.log(e.key); //트러블 슈팅 : 한글키는 인식안됨
		});
	}
	if(life <= 0) { // 생명이 고갈되면 게임오버 화면으로 전환
		start = false;
		console.log("게임오버" + start + interval);
		gameover();
		audio.src="./audio/audio1.mp3"; //게임 오버시 첫bgm으로 변경
		audio.play();
	}
	else if(level_count == 1 && item_count >= item_total){ // 아이템을 모두 모으면 클리어 화면으로 전환 수정(05/20) : 4단계는 먹는 아이템 없음(빛의 조각)
		start = false;
		console.log("게임클리어" + start + item_count + " : " + item_total);
		level_count += 1;
		gameclear();
		audio.src="./audio/audio2.mp3"; //1단계 클리어시 bgm 변경
		audio.play();
	}
	else if(level_count == 2 && item_count >= item_total){ // 아이템을 모두 모으면 클리어 화면으로 전환 수정(05/20) : 4단계는 먹는 아이템 없음(빛의 조각)
		start = false;
		console.log("게임클리어" + start + item_count + " : " + item_total);
		level_count += 1;
		gameclear();
		audio.src="./audio/audio3.mp3"; //2단계 클리어시 bgm 변경
		audio.play();
	}
	/*
	else if(level_count<3 && item_count >= item_total){ // 아이템을 모두 모으면 클리어 화면으로 전환 수정(05/20) : 4단계는 먹는 아이템 없음(빛의 조각)
		start = false;
		console.log("게임클리어" + start + item_count + " : " + item_total);
		level_count += 1;
		gameclear();
	}*/
	else if(level_count == 3 && item_count >= item_total){
		start = false;
		level_count += 1;
		Ball_x = paddle_x + 100;
		Ball_y = paddle_y - 50;
		// // 다음단계로 넘어갈시 공이 위로 뜨는 현상 제지하기 위함
		// Balldx = 5;
		// Balldy = 5;
		// Ball_x = paddle_x + 100;
		// Ball_y = paddle_y - 50;
		// life = 3;
		// console.log("다음단계");
		item_count = 0;
		item_total = 0;
		audio.src="./audio/boss_audio.mp3";
		audio.play();
		clearInterval(interval); // 보스 맵으로 넘어갈때 공이 비정상적으로 빨라지는 현상 막기 위함 김영록
		init();
	}
	//보스 처치
	else if(level_count==4 && boss_HP <= 0){
		start = false;
		audio.src="./audio/audio4-2.mp3";
		audio.play();
		playSound("./audio/stageclearaudio.mp3",effvolume);
		gameending(); // 엔딩화면
	}
	else{
		drawPaddle();
		drawBall();
		if(level_count == 4){
			// makebrick(); // 검은 벽돌만 생성
			makeboss(); // 보스 생성 메소드
			makebossattack(); // 보스 공격 메소드(검은 공 1개 생성)
		}
		makebrick();
		makeitem();
		moveBall();
	}

	// else if(level_count == 4){ // 보스맵 생성
	// 	console.log(boss_dx);
	// 	drawPaddle();
	// 	drawBall();
		
	// 	//moveboss(); // 보스 움직이는 메소드
	// 	//movebossattack(); // 보스 공격 움직이는 메소드
	// 	moveBall();
	// }
}
//김영록
function drawPaddle(){
	context.beginPath();
	context.fillStyle = paddleC[pdlIndx];
	context.fillRect(paddle_x,paddle_y,paddle_width[pdlIndx],paddle_height); // 항상 가운데에 배치
	context.closePath();
}

//김영록
function drawBall(){
	if(BS === "R") {
		context.beginPath();
		context.fillStyle = "pink";
		context.arc(Ball_x,Ball_y,(Ball_radius+Rwidth),0,2.0*Math.PI,false); // 항상 가운데에 배치
		context.fill();
		context.closePath();
	}
	context.beginPath();
	context.fillStyle = BallColor(BS);
	context.arc(Ball_x,Ball_y,Ball_radius,0,2.0*Math.PI,false); // 항상 가운데에 배치   
	context.fill();
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
			context.fillStyle = "black";
			context.fillRect(brick[i+1],brick[i+2],brick_width,brick_height); 
			context.closePath();
		}
	}
}
//김영록
function makeitem(){
	if(level_count == 1){ //1단계일때는 빨간색 아이템
		for(var i=0; i<item_array.length; i=i+3){ 
		if(item_array[i] == 1){
			/*context.beginPath();
			context.fillStyle = "red";
			context.fillRect(item_array[i+1],item_array[i+2],item_width,item_height);  아이템 보석 조각 모양으로 변경 -송찬우-*/
            context.drawImage(red_piece,item_array[i+1],item_array[i+2],item_width,item_height);
			}
		
		}
	}
	else if(level_count == 2){
		for(var i=0; i<item_array.length; i=i+3){ 
		if(item_array[i] == 1){
			/*context.beginPath();
			context.fillStyle = "red";
			context.fillRect(item_array[i+1],item_array[i+2],item_width,item_height);  아이템 보석 조각 모양으로 변경 -송찬우-*/
            context.drawImage(green_piece,item_array[i+1],item_array[i+2],item_width,item_height);
			}
		
		}
	}
	else if(level_count == 3){
		for(var i=0; i<item_array.length; i=i+3){ 
		if(item_array[i] == 1){
			/*context.beginPath();
			context.fillStyle = "red";
			context.fillRect(item_array[i+1],item_array[i+2],item_width,item_height);  아이템 보석 조각 모양으로 변경 -송찬우-*/
            context.drawImage(blue_piece,item_array[i+1],item_array[i+2],item_width,item_height);
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
		&& Ball_x+Ball_radius <= paddle_x+paddle_width[pdlIndx] && Balldy > 0){
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
			Ball_x = paddle_x + paddle_width[pdlIndx]/2;;
			Ball_y = paddle_y - 50;
		}
		if(level_count == 4){
			//패들에 보스 공격 맞았을 때 pdlIndx 감소
			if(boss_blackball_y + boss_blackball_radius >= paddle_y && boss_blackball_y - boss_blackball_radius <= paddle_y + paddle_height && boss_blackball_x - boss_blackball_radius >= paddle_x && boss_blackball_x + boss_blackball_radius <= paddle_x + paddle_width[pdlIndx]){
				boss_blackball_y = boss_y;
				boss_blackball_x = boss_x + boss_width/2;
				pdlIndx < 2 ? pdlIndx++ : null;
			}
			//보스 오른쪽 맞추었을 때
			if(Ball_x + Ball_radius >= boss_x && Ball_x - Ball_radius <= boss_x && Ball_y + Ball_radius <= boss_y+boss_height && Ball_y - Ball_radius >= boss_y){
				console.log("보스 오른쪽!");
				
				Balldx = -Balldx;
				Ball_x = boss_x - Ball_radius - 1;
				boss_HP -= 30;
				playSound("./audio/bosshit.mp3",effvolume);
			}
			//보스 왼쪽 맞추었을 때
			else if(Ball_x - Ball_radius <= boss_x + boss_width&& Ball_x + Ball_radius >= boss_x + boss_width && Ball_y + Ball_radius <= boss_y+boss_height && Ball_y - Ball_radius >= boss_y){
				console.log("보스 왼쪽!");
				
				Balldx = -Balldx;
				Ball_x = boss_x +boss_width + Ball_radius +1;
				boss_HP -= 30;
				playSound("./audio/bosshit.mp3",effvolume);
			}
			//보스 아래쪽 맞추었을 때
			else if(Ball_y - Ball_radius <= boss_y + boss_height && Ball_y + Ball_radius >= boss_y + boss_height && Ball_x + Ball_radius >= boss_x && Ball_x - Ball_radius <= boss_x + boss_width){
				console.log("보스 아래쪽!");
				
				Balldy = -Balldy;
				Ball_y = boss_y + boss_height + Ball_radius +1;
				boss_HP -= 30;
				playSound("./audio/bosshit.mp3",effvolume);
			}
			//보스 위쪽 맞추었을 때
			else if(Ball_y + Ball_radius >= boss_y && Ball_y - Ball_radius <= boss_y && Ball_x + Ball_radius >= boss_x && Ball_x - Ball_radius <= boss_x + boss_width){
				console.log("보스 위쪽!");
				
				Balldy = -Balldy;
				Ball_y = boss_y - Ball_radius - 1;
				boss_HP -= 30;
				playSound("./audio/bosshit.mp3",effvolume);
			}
			//보스 폭주 기능
			if(boss_HP <= 200){
				if(boss_dx < 0){
					boss_dx = -3;
				}
				else{
					boss_dx = 3;
				}
				boss_blackball_dy= 8; //보스 검은 공 떨어지는 속도
			}
			
			
		}


		// 벽돌충돌 이벤트						//가로로 맞았을 때 x축 방향 변화 (김시현 수정)
		for(var i=0; i<brick.length; i=i+3) {
			if(brick[i] > 0) {
				//R스킬 사용 중일 때
				if(BS === "B" && !(brick[i] == 3)) {
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
					// if(Ball_y+Ball_radius >= brick[i+2] && Ball_y-Ball_radius <= brick[i+2]+brick_height){
					// 	if(Ball_x+Ball_radius == brick[i+1] || Ball_x-Ball_radius == brick[i+1]+brick_width){
					// 		Balldx = -Balldx;
					// 		brickSmash(i);
					// 	}
					// 	else if(Ball_x+Ball_radius > brick[i+1] && Ball_x-Ball_radius < brick[i+1]+brick_width){
					// 		Balldy = -Balldy;
					// 		brickSmash(i);
					// 	}
					// 	$("#score h2").text(score);
					// }
					//블록 오른쪽 맞추었을 때
					//김영록 수정(5/22) 이유 : 검정색 벽돌의 옆쪽을 맞추었을경우 충돌 이벤트가 연속으로 감지되어 생명이 한번에 다 깎여버리는 현상 발생 그래서 블럭을 맞추면 강제로 벚어나도록 구현
					if(Ball_x + Ball_radius >= brick[i+1] && Ball_x - Ball_radius <= brick[i+1] && Ball_y + Ball_radius <= brick[i+2]+brick_height && Ball_y - Ball_radius >= brick[i+2]){
						console.log("블럭 오른쪽!");
						Balldx = -Balldx;
						Ball_x = brick[i+1] - Ball_radius - 1;
						brickSmash(i);
					}
					//블록 왼쪽 맞추었을 때
					else if(Ball_x - Ball_radius <= brick[i+1] + brick_width && Ball_x + Ball_radius >= brick[i+1] + brick_width && Ball_y + Ball_radius <= brick[i+2]+brick_height && Ball_y - Ball_radius >= brick[i+2]){
						console.log("블럭 왼쪽!");
						Balldx = -Balldx;
						Ball_x = brick[i+1] + brick_width + Ball_radius +1;
						brickSmash(i);
					}
					//보스 아래쪽 맞추었을 때
					else if(Ball_y - Ball_radius <= brick[i+2] + brick_height && Ball_y + Ball_radius >= brick[i+2] + brick_height && Ball_x + Ball_radius >= brick[i+1] && Ball_x - Ball_radius <= brick[i+1] + brick_width){
						console.log("블럭 아래쪽!");
						
						Balldy = -Balldy;
						Ball_y = brick[i+2] + brick_height + Ball_radius +1;
						brickSmash(i);
					}
					//보스 위쪽 맞추었을 때
					else if(Ball_y + Ball_radius >= brick[i+2] && Ball_y - Ball_radius <= brick[i+2] && Ball_x + Ball_radius >= brick[i+1] && Ball_x - Ball_radius <= brick[i+1] + brick_width){
						console.log("블럭 위쪽!");
						
						Balldy = -Balldy;
						Ball_y = brick[i+2] - Ball_radius - 1;
						brickSmash(i);
					}
				}
			}
		}

		// 아이템 먹었을 때
		for(var i=0; i<item_array.length; i=i+3){
			if(item_array[i] == 1){
				if((Ball_y+Ball_radius+Rheight >= item_array[i+2] && Ball_y-Ball_radius-Rheight <= item_array[i+2]+item_height)
					&& Ball_x+Ball_radius+Rwidth >= item_array[i+1] && Ball_x-Ball_radius-Rwidth <= item_array[i+1]+item_width){
					playSound("audio/piece_sound.mp3",effvolume);
					item_array[i] = 0;
					score += 50;
					item_count += 1;
					$("#score h2").text(score);
					$("#item").text("아이템 : " + item_count + "/" + item_total);
					//아이템 그림이 선명해지는 작업 추가 김영록
					$(".level" + level_count + "-image" + ">" + "#" + "img" + item_count).css("opacity","1");
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
		$("#score h2").text(score);
		playSound("./audio/breakaudio.mp3",effvolume);
	}
	else if(brick[i] == 2) {
		//B스킬 사용 중일 때
		if(BS === "B") {
			brick[i] = 0;;
			score += 40;
			$("#score h2").text(score);
			playSound("./audio/breakaudio.mp3",effvolume);
		}
		else {
			brick[i]--;
			score += 20;
			$("#score h2").text(score);
			playSound("./audio/crackaudio.mp3",effvolume);
		}
	}
	//G스킬 사용 중일 때
	else if(brick[i] == 3 && !(BS === "G")) {
		life -= 1;
		$("#life h2").text("");
		for(var i=0; i<life; i++) $("#life h2").append("♥");
	}
}

//김시현 R스킬 메소드
function Rskill() {
	console.log("r스킬");
	score -= 50;
	$("#score h2").text(score);
	BS = "R";
	key = true;
	Rwidth = 25;
	Rheight = 25;
	setTimeout(function(){
		key = false;
		BS = "N";
		Rwidth = 0;
		Rheight = 0;
	},3000);
}

//김시현 G스킬 메소드
function Gskill() {
	console.log("g스킬");
	score -= 100;
	$("#score h2").text(score);
	BS = "G";
	key = true;
	setTimeout(function(){key = false; BS = "N";},3000);
}

//김시현 B스킬 메소드
function Bskill() {
	console.log("b스킬");
	score -= 100;
	$("#score h2").text(score);
	BS = "B";
	key = true;
	Bwidth = 25;
	Bheight = 25;
	setTimeout(function(){key = false; BS = "N";},3000);
}

//김영록, 5/26부 추가 및 수정 -송찬우
function gameover(){ // 게임오버시 나타나는 창
	clearInterval(interval);
	$("#interface").hide();// 인터페이스 화면 지우기 - 송찬우-
	playSound("./audio/witchlaugh_sound.mp3",effvolume);
	context.clearRect(0,0,canvas_width,canvas_height); // 게임화면 지우기
	$("#gameover_div").fadeIn("fast");
	setTimeout(function(){
		$("#gameover_div").fadeOut("fast");
	},2000);
	$("#container").css({
		"background-image": "url('img/init_village.jpg')",
	}); // 게임 오버 시 배경 색 변경

	context.font = 'italic 30pt Arial';
	context.textAlign = "center";
	context.fillStyle = "black"; // 글자 색상을 검정색으로 설정
	context.fillText("Game Over! Press Space Bar", canvas_width/2, canvas_height/2);
}
//김영록

function gameclear(){ // 게임 클리어시 나타나는 창, 5/26부 추가 및 수정 -송찬우-
	
	var background_count=level_count-1
	clearInterval(interval);
	context.clearRect(0,0,canvas_width,canvas_height); // 게임화면 지우기
	$("#interface").hide();// 인터페이스 화면 지우기 - 송찬우-
	context.font = 'italic 30pt Arial';
    context.textAlign = "center";
    context.fillStyle = "white"; // 글자 색상을 검정색으로 설정
    if (background_count == 1) {
    	var text1 = "Tip) 점수를 소모하면 스킬을 사용할 수 있어!!";
        var text2 = "Game Clear! Press Space Bar";
        var lineHeight = 80; // 줄 간격 설정
        var y = canvas_height/2 - lineHeight/2; // 첫 번째 줄의 y 좌표

        context.fillText(text1, canvas_width/2, y); // 첫 번째 줄 그리기
        context.fillText(text2, canvas_width/2, y + lineHeight); // 두 번째 줄 그리기
    } else if (background_count == 2) {
    	var text1 = "Tip) 검정 벽돌에 닿으면 큰일나 알고 있지??";
    	var text2 = "Game Clear! Press Space Bar";
    	var lineHeight = 80; // 줄 간격 설정
    	var y = canvas_height/2 - lineHeight/2; // 첫 번째 줄의 y 좌표

    	context.fillText(text1, canvas_width/2, y); // 첫 번째 줄 그리기
    	context.fillText(text2, canvas_width/2, y + lineHeight); // 두 번째 줄 그리기
    } else if (background_count == 3) {
    	var text1 = "Tip) 빨강: 크기 증가, 초록: 보호, 파랑: 자석, 색깔별 스킬 꼭 기억해!!";
    	var text2 = "Game Clear! Press Space Bar";
    	var lineHeight = 80; // 줄 간격 설정
    	var y = canvas_height/2 - lineHeight; // 첫 번째 줄의 y 좌표
    	context.fillText(text1, canvas_width/2, y); // 첫 번째 줄 그리기
    	context.fillText(text2, canvas_width/2, y + lineHeight); // 두 번째 줄 그리기
    }


	$("#container").css({
		"background-image": "url('img/clear" + background_count + ".jpg')",
		"transition-property":"background-image",
		"transition-duration":"5s"
	}); // 게임 클리어 시 배경 색 변경
	

}

//김영록 보스 생성
function makeboss(){
	if(boss_dx > 0 && boss_x + boss_width >= canvas_width){
		boss_dx *= -1;
	}
	if(boss_dx < 0 && boss_x <= 0){
		boss_dx *= -1;
	}
	if(boss_dx < 0){
		bossImage = bossImage1;
	}
	else{
		bossImage = bossImage2;
	}
	context.fillStyle = "red";
	context.fillRect(boss_x - boss_HP/4, boss_y-20, boss_HP, 10);
	context.drawImage(bossImage, boss_x, boss_y, boss_width, boss_height);
	boss_x += boss_dx;
}
//김영록 보스 공격
function makebossattack(){
	if(boss_blackball_y > canvas_height) {
		boss_blackball_y = 250;
		boss_blackball_x = boss_x + boss_width/2;
	}

	context.beginPath();
	context.arc(boss_blackball_x, boss_blackball_y,boss_blackball_radius, 0, 2.0*Math.PI, false);
	context.fillStyle = "black";
	context.fill();
	context.closePath();
	boss_blackball_y += boss_blackball_dy;
}

// 게임 엔딩 페이지(보스 처치시) 제작 김영록, 5/26 송찬우 추가 
function gameending() {
  clearInterval(interval);
  exscore=score;

  $("#interface").hide();
  // 김영록 추가 수정
  $("#mycanvas").hide();
  $("#container").hide();
  $("#ending").fadeIn();
  console.log("ending");
  playSound("./audio/storychangeaudio.wav", effvolume);

  function showTextOneByOne(element, text, interval) {
    var index = 0;
    var timer = setInterval(function() {
      if (index < text.length) {
        element.append(text[index]);
        index++;
      } else {
        clearInterval(timer);
        $("#ending>p").append("<br>당신의 점수는 <span id='scoreDisplay'></span>점입니다"); // 점수 표시 줄 추가
        showScore();
      }
    }, interval);
  }

  $("#ending").ready(function() {
    setTimeout(function() {
      showTextOneByOne($("#ending>p"), "축하합니다! 당신은 마녀를 무찌르고 마을의 색깔 조각을 모두 되찾았습니다!! ", 100);
    }, 100);

  });

  setTimeout(function(){
  	$("#ending").hide();
    $("#container").show();
    $("#button_field").show();
    $("#ending>p").empty();

  },20000) // 최대 점수 계산 후 시간 변화 예정

  $("#container").css({
    "background-image": "url('img/allclear.jpg')"
  }); 

  function showScore() {
    var targetScore = exscore;
    var currentScore = -1; // 현재 점수
    var scoreInterval = 50; // 점수 변경 간격 (밀리초)

    var scoreTimer = setInterval(function() {
      if (currentScore < targetScore) {
        currentScore+=1; // 현재 점수 증가, 최대 점수 계산 후 증가 폭 변화 예정
        $("#scoreDisplay").text(currentScore); // 점수 표시
      } else {
        clearInterval(scoreTimer); // 점수 변경 완료 후 타이머 종료
      }
    }, scoreInterval);
  }

  // 초기화 작업

  boss_dx = 1;
  boss_blackball_dy = 4;
  boss_HP = 450; //보스 피 원상복구 : 이렇게 안하면 보스 클리어 후 다시 보스맵 선택시 엔딩 화면으로 바로 넘어감
  life = 3; // 생명력 원상 복구
  score=0; 
  $("#life h2").text("");
  for (var i = 0; i < life; i++) { // 생명 그림 나타나도록 구현
    $("#life h2").append("♥");
  }
  $("#score h2").text(score); // 다시 시작시 점수, 생명, 먹은 아이템 개수 초기화
}


//김영록
function mouseMoveHandler(e) {
	
    var relativeX = e.clientX - context.canvas.offsetLeft;

    if(relativeX >= 0 && relativeX <= canvas.width){
        paddle_x = relativeX - paddle_width[pdlIndx];
        if(paddle_x < 0) {
        	paddle_x = 0;
        }
        else if(paddle_x > relativeX - paddle_width[pdlIndx]) {
        	paddle_x = canvas_width;
        }
        // console.log(paddle_x);
    }
    if(!start){
		Ball_x = paddle_x + paddle_width[pdlIndx]/2;;//Ball의 초기 위치 및 재생성 위치는 paddle의 위
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
	brick.push(2);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 200;
	brick.push(2);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 320;
	brick_y = 270;
	brick.push(3);
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

	item_x = 30;
	item_y = 400;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 800;
	item_y = 400;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 30;
	item_y = 150;
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

	item_x = 30;
	item_y = 400;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 800;
	item_y = 400;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 30;
	item_y = 150;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 800;
	item_y = 100;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 800;
	item_y = 300;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

	item_x = 30;
	item_y = 500;
	item_array.push(1);
	item_array.push(item_x);
	item_array.push(item_y);
	item_total += 1;

} 

function mapBoss(){ //보스 단계 벽돌 배치 테스트 위해서 일반 벽돌로 설정 나중에 검은 벽돌로 바꾸는 것을 권장
	brick_x = 450;
	brick_y = 30;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 200;
	brick_y = 300;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	brick_x = 800;
	brick_y = 300;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	/*brick_x = 450;
	brick_y = 500;
	brick.push(1);
	brick.push(brick_x);
	brick.push(brick_y);
	brick_count += 1;
	패들과 너무 가까운 블록 삭제 - 송찬우-*/
	
}
