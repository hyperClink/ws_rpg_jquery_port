
let timeS = 0,
timeM = 0,
timeS_str = " ",
timeM_str = " ",

idleoffset = 0,
player_flip_offset = 0,
player_speed = 0.8,

window_size = (innerWidth+innerHeight)/50,

scroll = false,
x_scroll = 0,

attack = false,
left = false,
right = false;

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
var xPos = 10;
bg_pos = window.innerWidth,
heightSprite = 0;

var m,s,m_g,s_g,
m='0'+0,
s=0,
m_g=0,
s_g=0;

//обрабатываем события с клавиатуры
$(document).keypress(function(event){
	//если надата клавиша D то движемся вправо

	if(event.key=="d" || event.key=="D"){
		right = true;
	}

	//если нажата клавиша A, то движемся влево
	else if(event.key=="a" || event.key=="d"){
		left = true;
	};

});

$(document).keyup(function(event){
	//если надата клавиша D то движемся вправо

	if(event.key=="d" || event.key=="D"){
		right = false;
		heightSprite = 0;
	}

	//если нажата клавиша A, то движемся влево
	else if(event.key=="a" || event.key=="d"){
		left = false;
		heightSprite = 0;
	}

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
	sprite_idle(0);
	console.log('ok');
	setInterval(timer, 1000);
	setInterval(control_handler_sprite, 70);
	setInterval(control_handler_movement, 10);
};
//функция анимации спрайта
function sprite_right(yS){
	//передвигаем квадрат захвата картинки на каждом шаге вправо на 120px
	$('.player').css("background", "url(assets/img/walkin2.png)" + "120" + "px " + yS + "px");
	yS -= 323.275;
	return yS;
};
//передвигаем квадрат захвата картинки на каждом шаге влево на -120px
function sprite_left(yS){
	$('.player').css("background", "url(assets/img/walkin2.png)" + "0" + "px " + yS + "px");
	yS -= 323.275;
	return yS;
};

function sprite_idle(yS){
	$('.player').css("background", "url(assets/img/idle2.png)" + idleoffset + "px " + yS + "px");
	yS += 117.8;
	return yS;
};

function bg(yS){
	$('.screen-game').css("background-position", yS + "px " + innerHeight +"px");
	yS += 3;
	return yS;
};

//реализация таймера
function timer2(){
//если секунд меньше 10, то прибавляем единицу и к секундам спреди добавляем '0' на каждом шаге
	if (s_g<10){
		s_g+=1;
		s='0'+s_g;
	}
	//если секунд больше 9 и меньше 59, то прибавляем единицу
	if (s_g>9 && s_g<59){
		s_g+=1;
		s=s_g;
	}
	//если секунд =59, то к минтам прибавляем 1 и реализуем минуты как секунды ранее
	if (s_g==59){
		s_g=0;
		if (m_g<10){
			m_g+=1
			m='0'+m_g;
		}else{
			m_g+=1;
			m=m_g;
		}
	}
//выводим время в формате 00:00
	return $('.timer').html("Time: "+m+":"+s);

}

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

	if (left==true && right==false){
		idleoffset = 120;
		player_flip_offset = -40;
	};

	if (right==true && left==false){
		idleoffset = 0;
		player_flip_offset = 0;
	}

	if (left==true && attack==false && right==false){

		$('.player').css("margin-left", xPos+player_flip_offset+"px");
		heightSprite = sprite_right(heightSprite);
		if(heightSprite == 0){
			heightSprite = 2694;
		};

	};

	if (right==true && attack==false && left==false){

		$('.player').css("margin-left", xPos+player_flip_offset+"px");
		heightSprite = sprite_left(heightSprite);
	};

	if ( (left==false && right==false) || (left==true && right==true) ){
		sprite_idle(0);
	};

};

function control_handler_movement(){
	if (left==true && attack==false){
		if(xPos>innerWidth/2-(window_size)-50 || x_scroll>=0){
			xPos-=player_speed;
			scroll = false;
		}else{
			x_scroll+=player_speed;
			bg(x_scroll);
			scroll = true;
		};
	};

		if (right==true && attack==false){
			if(xPos<innerWidth/2-(window_size) || (x_scroll-xPos)<=$('.screen-game').width){
				xPos+=player_speed;
				scroll = false;
			}else{
				x_scroll-=player_speed;
				bg(x_scroll);
				scroll = true;
			};
		};
	};
