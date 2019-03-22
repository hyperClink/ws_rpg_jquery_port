//timer variables
let timeS = 0,
timeM = 0,
timeS_str = " ",
timeM_str = " ",

//player
player_speed = 1,

//scaling
window_size = (innerWidth+innerHeight)/50,

//bg scroll
scroll = false,
x_scroll = 0,

//controls
action = "none",

attack = false,
attack_process = false,

block = false,
block_process = false,

left = false,
right = false,
idle = true,

//enemy
enemies = [],
enemy_speed = -10,
id = 0,

//attacks
swords[];

//scale bg)
$('.screen-game').css("width", window.innerWidth + "px");
$('.screen-game').css("height", window.innerHeight + "px");


//panels
$('#next').on("click", function(){
	$('.screen-start').hide();
	$('.screen-ranking').show();
});

$('#again').on("click", function(){
	init();
});

//sprites
var xPos = 10,
player_flip_offset = 0,

bg_pos = window.innerWidth,
heightSprite = 0,

heightSprite_e1 = 0,
enemy_x = 0;

//обрабатываем события с клавиатуры
$(document).keypress(function(event){
	//если надата клавиша D то движемся вправо

	if(event.key=="d" || event.key=="D"){
		right = true;
	}

	//если нажата клавиша A, то движемся влево
	else if(event.key=="a" || event.key=="A"){
		left = true;
	};

	if(event.key=="1" && action == "none"){
		action = "attack";
	};

	if(event.key=="2" && action == "none"){
		action = "block";
	};




});

$(document).keyup(function(event){
	//если надата клавиша D то движемся вправо

	if(event.key=="d" || event.key=="D"){
		right = false;
		if (action=="none"){
			heightSprite = 0;
		};
	}

	//если нажата клавиша A, то движемся влево
	else if(event.key=="a" || event.key=="A"){
		left = false;
		if (action=="none"){
			heightSprite = 0;
		};

	};

});

// основной игровой цикл
function init() {
	//после запуска игры выключаем рейтинг и включаем рыцаря
	$('.screen-ranking').hide();
	$('.player').show();

	//запускаем таймер
	timer();
	bg(0);

	$('.player').css("margin-top", innerHeight - 200 + "px");

	$('.enemy').css("margin-top", -75 + "px");

	setInterval(createEnemy, 4000);

	sprite_idle(0);
	console.log('ok');

	setInterval(timer, 10000);
	setInterval(control_handler_sprite, 50);
	setInterval(control_handler_movement, 10);
	setInterval(enemy, 60);

	enemy_x=innerWidth-90;
};
//функция анимации спрайта
function sprite_right(yS){
	//передвигаем квадрат захвата картинки на каждом шаге вправо на 120px
	$('.player').css("background", "url(assets/img/walkin2.png)" + "0" + "px " + yS + "px");
	$('.player').css("transform", "scaleX(-1)");
	yS -= 107.76;
	return yS;
};
//передвигаем квадрат захвата картинки на каждом шаге влево на -120px
function sprite_left(yS){
	$('.player').css("background", "url(assets/img/walkin2.png)" + "0" + "px " + yS + "px");
	$('.player').css("transform", "scaleX(1)");
	yS -= 107.76;
	return yS;
};

function sprite_idle(yS){
	$('.player').css("background", "url(assets/img/idle2.png)" + 0 + "px " + yS + "px");
	yS -= 111.6;
	return yS;
};

function enemy_dog(yS){
	$('.enemy').css("background", "url(assets/img/spritesheet_rev.png)" + "0" + "px " + yS + "px");
	yS -= 85;
	return yS;
};

function bg(yS){
	$('.screen-game').css("background-position", yS + "px " + innerHeight +"px");
	yS += 3;
	return yS;
};

function sprite_attack(yS){
	$('.player').css("background", "url(assets/img/attack_smol1.png)" + 0 + "px " + yS + "px");
	yS -= 111.6;
	return yS;
};

function sprite_block(yS){
	$('.player').css("background", "url(assets/img/block_smol.png)" + 0 + "px " + yS + "px");
	yS -= 111.6;
	return yS;
};


function timer(){
if (timeS<59){
  timeS++
}else{
  timeS=0;
  timeM++;
};
timeM_str = timeM.toString().padStart(2, "0");
timeS_str = timeS.toString().padStart(2, "0");
$(".timer").text("Time: " + timeM_str + ":" + timeS_str);
};

function control_handler_sprite(){
	if (action == "none"){	

		if ( (left==false && right==false) || (left==true && right==true) ){

			if(idle == false){
				heightSprite = 0;
			};

			idle = true;

		}else{

			if(idle == true){
				heightSprite = 0;
			}
			idle = false;
		};

		if (idle == true){
			heightSprite = sprite_idle(heightSprite);
			if(heightSprite < 0){
				heightSprite = 2003;
			};
		};

		if (left==true && right==false){
			player_flip_offset = -40;
		};

		if (right==true && left==false){
			player_flip_offset = 0;
		};

		if (left==true && action=="none" && right==false){

			$('.player').css("margin-left", xPos+player_flip_offset+"px");
			heightSprite = sprite_right(heightSprite);
			if(heightSprite < 0){
				heightSprite = 2694;
			};

		};

		if (right==true && action=="none" && left==false){

			$('.player').css("margin-left", xPos+player_flip_offset+"px");
			heightSprite = sprite_left(heightSprite);

			if(heightSprite < 0){
				heightSprite = 2694;
			};
		};

}else{
	switch(action){

		case "attack":
			if (attack_process == false){
				heightSprite = 2344;
			};

			attack_process=true;
			heightSprite = sprite_attack(heightSprite);

			if(heightSprite < 0){
				action = "none";
				attack_process=false;
				heightSprite = 0;
			};
			break;

			case "block":
			if (block_process == false){
				heightSprite = 2561;
			};

			block_process=true;
			heightSprite = sprite_block(heightSprite);

			if(heightSprite < 0){
				action = "none";
				block_process=false;
				heightSprite = 0;
			};
			break;

			case "sword-3":
			createSword(3);
			break;

			case "sword-8":
			createSword(8);
			break;

	};
};
};

//cool
function control_handler_movement(){
	if (action == "none"){

		if (xPos>0){
			if (left==true){
				if(xPos>innerWidth/2-(window_size)-50 || x_scroll>=0){
					xPos-=player_speed;
					scroll = false;
				}else{
				x_scroll+=player_speed;
				bg(x_scroll);
				scroll = true;
			};
		};
	};

		if (xPos<innerWidth-125){
			if (right==true){
				if(xPos<innerWidth/2-(window_size) || x_scroll<= -8500){
					xPos+=player_speed;
					scroll = false;
				}else{
					x_scroll-=player_speed;
					bg(x_scroll);
					scroll = true;
				};
			};
		};
	};

};


function enemy(){
	heightSprite_e1 = enemy_dog(heightSprite_e1);

	for (var i = 0; i < enemies.length; i++) {

		if(enemies.length != 'undefined' && enemies.length != 0){
			var div_id = i+id-enemies.length;
			$("#enemy"+enemies[i].id).css("margin-left",enemies[i].x+"px");
			$("#enemy"+enemies[i].id).css("margin-top", -85, "px");

			$("#enemy"+enemies[i].id).css("display", "block");

			enemies[i].x+=enemies[i].speed;

			if (scroll == true){
				if (right == true){
					enemies[i].x-=player_speed;
				};

				if (left == true){
					enemies[i].x+=player_speed;
				};
			};

			if (enemies[i].speed<=0){
			$("#enemy"+enemies[i].id).css("transform", "scaleX(-1)");
		};

			if (enemies[i].x<0-$("#enemy"+enemies[i].id).width() || enemies[i].x>innerWidth-$("#enemy"+enemies[i].id).width()){
				$("#enemy"+enemies[i].id).remove();
				enemies.splice(i--, 1);
			};

		};
	};

};

function createEnemy(){
	enemies.push({x:getRandomInt(innerWidth/2, innerWidth-120), speed:-10, id:id });
	$('.screen-game').append("<div id='enemy" + id + "' class='enemy'> </div>");
	id++;

};

function createSword(countof){
	for (var i = 0; i < countof; i++) {
		swords.push({x:getRandomInt(innerWidth/2, innerWidth-120), y:innerHeight-20});
		$('.screen-game').append("<div id='sword" + id + "' class='sword'> </div>");
		id++;
	};

};

//miscellaneous
function listids(clas){
	var ids = $(clas).map(function () {
	return this.id;
}).get().join();

console.log(ids);
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function coinflip(flip){
return flip*(Math.round(Math.random()) * 2 - 1)
};
