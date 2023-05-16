$(document).ready(function(){

	$("#start").click(function(){
		$("#button_field").hide();
		$("#stage").show();
		//$(".interfaceMenu").show();
	});

	$("#red").click(function(){
		$("#stage").hide();
		$(".interfaceMenu").show();
	});
	$("#green").click(function(){
		$("#stage").hide();
		$(".interfaceMenu").show();
	});
	$("#blue").click(function(){
		$("#stage").hide();
		$(".interfaceMenu").show();
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
