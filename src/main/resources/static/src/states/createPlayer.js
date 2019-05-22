Spacewar.createPlayerState = function(game) {

}
var spaceship;
var deletedChar = false;
var blue1;
var blue2;
var blue3;
var blue4;
var blue5;
var blue6;
var darkgrey1;
var darkgrey2;
var darkgrey3;
var darkgrey4;
var darkgrey5;
var darkgrey6;
var green1;
var green2;
var green3;
var green4;
var green5;
var green6;
var metalic1;
var metalic2;
var metalic3;
var metalic4;
var metalic5;
var metalic6;
var orange1;
var orange2;
var orange3;
var orange4;
var orange5;
var orange6;
var purple1;
var purple2;
var purple3;
var purple4;
var purple5;
var purple6;
var red1;
var red2;
var red3;
var red4;
var red5;
var red6;

Spacewar.createPlayerState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering *Create Player* state");
		}
	},

	preload : function() {

	},

	create : function() {
		//name
		game.global.myPlayer.name = "";
		game.input.keyboard.addCallbacks(this, null, null, keyPress);
		backSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
		text = game.add.text(10, 30, "User name: ", {
			font: "42px Arial",
			fill: "#ffff66"
		});
		//spaceship
		next = game.add.button(475, 480, 'boton', botonNext, this, 1, 0);
		text1 = game.add.text(10, 125, "Choose your spaceship: ", {
			font: "42px Arial",
			fill: "#ffff66"
		})
		text2 = game.add.text(50, 400, "Your spaceship: ", {
			font: "24px Arial",
			fill: "#ffff66"
		});

		//default spaceship
		spaceship = game.add.sprite(500, 400, 'spacewar');
		spaceship.frameName = 'blue_01.png';
		
		//options
		blue1 = game.add.sprite(200, 175, 'spacewar');
		blue1.frameName = 'blue_01.png';
		blue1.inputEnabled = true;
		blue1.input.pixelPerfectClick = true;
		blue1.events.onInputDown.add(changeImage, this);

		blue2 = game.add.sprite(250, 175, 'spacewar');
		blue2.frameName = 'blue_02.png';
		blue2.inputEnabled = true;
		blue2.input.pixelPerfectClick = true;
		blue2.events.onInputDown.add(changeImage, this);

		blue3 = game.add.sprite(300, 175, 'spacewar');
		blue3.frameName = 'blue_03.png';
		blue3.inputEnabled = true;
		blue3.input.pixelPerfectClick = true;
		blue3.events.onInputDown.add(changeImage, this);

		blue4 = game.add.sprite(350, 175, 'spacewar');
		blue4.frameName = 'blue_04.png';
		blue4.inputEnabled = true;
		blue4.input.pixelPerfectClick = true;
		blue4.events.onInputDown.add(changeImage, this);

		blue5 = game.add.sprite(400, 175, 'spacewar');
		blue5.frameName = 'blue_05.png';
		blue5.inputEnabled = true;
		blue5.input.pixelPerfectClick = true;
		blue5.events.onInputDown.add(changeImage, this);

		blue6 = game.add.sprite(450, 175, 'spacewar');
		blue6.frameName = 'blue_06.png';
		blue6.inputEnabled = true;
		blue6.input.pixelPerfectClick = true;
		blue6.events.onInputDown.add(changeImage, this);


		darkgrey1 = game.add.sprite(550, 175, 'spacewar');
		darkgrey1.frameName = 'darkgrey_01.png';
		darkgrey1.inputEnabled = true;
		darkgrey1.input.pixelPerfectClick = true;
		darkgrey1.events.onInputDown.add(changeImage, this);

		darkgrey2 = game.add.sprite(600, 175, 'spacewar');
		darkgrey2.frameName = 'darkgrey_02.png';
		darkgrey2.inputEnabled = true;
		darkgrey2.input.pixelPerfectClick = true;
		darkgrey2.events.onInputDown.add(changeImage, this);

		darkgrey3 = game.add.sprite(650, 175, 'spacewar');
		darkgrey3.frameName = 'darkgrey_03.png';
		darkgrey3.inputEnabled = true;
		darkgrey3.input.pixelPerfectClick = true;
		darkgrey3.events.onInputDown.add(changeImage, this);

		darkgrey4 = game.add.sprite(700, 175, 'spacewar');
		darkgrey4.frameName = 'darkgrey_04.png';
		darkgrey4.inputEnabled = true;
		darkgrey4.input.pixelPerfectClick = true;
		darkgrey4.events.onInputDown.add(changeImage, this);

		darkgrey5 = game.add.sprite(750, 175, 'spacewar');
		darkgrey5.frameName = 'darkgrey_05.png';
		darkgrey5.inputEnabled = true;
		darkgrey5.input.pixelPerfectClick = true;
		darkgrey5.events.onInputDown.add(changeImage, this);

		darkgrey6 = game.add.sprite(800, 175, 'spacewar');
		darkgrey6.frameName = 'darkgrey_06.png';
		darkgrey6.inputEnabled = true;
		darkgrey6.input.pixelPerfectClick = true;
		darkgrey6.events.onInputDown.add(changeImage, this);


		green1 = game.add.sprite(200, 225, 'spacewar');
		green1.frameName = 'green_01.png';
		green1.inputEnabled = true;
		green1.input.pixelPerfectClick = true;
		green1.events.onInputDown.add(changeImage, this);

		green2 = game.add.sprite(250, 225, 'spacewar');
		green2.frameName = 'green_02.png';
		green2.inputEnabled = true;
		green2.input.pixelPerfectClick = true;
		green2.events.onInputDown.add(changeImage, this);
		
		green3 = game.add.sprite(300, 225, 'spacewar');
		green3.frameName = 'green_03.png';
		green3.inputEnabled = true;
		green3.input.pixelPerfectClick = true;
		green3.events.onInputDown.add(changeImage, this);

		green4 = game.add.sprite(350, 225, 'spacewar');
		green4.frameName = 'green_04.png';
		green4.inputEnabled = true;
		green4.input.pixelPerfectClick = true;
		green4.events.onInputDown.add(changeImage, this);

		green5 = game.add.sprite(400, 225, 'spacewar');
		green5.frameName = 'green_05.png';
		green5.inputEnabled = true;
		green5.input.pixelPerfectClick = true;
		green5.events.onInputDown.add(changeImage, this);

		green6 = game.add.sprite(450, 225, 'spacewar');
		green6.frameName = 'green_06.png';
		green6.inputEnabled = true;
		green6.input.pixelPerfectClick = true;
		green6.events.onInputDown.add(changeImage, this);


		metalic1 = game.add.sprite(550, 225, 'spacewar');
		metalic1.frameName = 'metalic_01.png';
		metalic1.inputEnabled = true;
		metalic1.input.pixelPerfectClick = true;
		metalic1.events.onInputDown.add(changeImage, this);
		
		metalic2 = game.add.sprite(600, 225, 'spacewar');
		metalic2.frameName = 'metalic_02.png';
		metalic2.inputEnabled = true;
		metalic2.input.pixelPerfectClick = true;
		metalic2.events.onInputDown.add(changeImage, this);

		metalic3 = game.add.sprite(650, 225, 'spacewar');
		metalic3.frameName = 'metalic_03.png';
		metalic3.inputEnabled = true;
		metalic3.input.pixelPerfectClick = true;
		metalic3.events.onInputDown.add(changeImage, this);
		
		metalic4 = game.add.sprite(700, 225, 'spacewar');
		metalic4.frameName = 'metalic_04.png';
		metalic4.inputEnabled = true;
		metalic4.input.pixelPerfectClick = true;
		metalic4.events.onInputDown.add(changeImage, this);
		
		metalic5 = game.add.sprite(750, 225, 'spacewar');
		metalic5.frameName = 'metalic_05.png';
		metalic5.inputEnabled = true;
		metalic5.input.pixelPerfectClick = true;
		metalic5.events.onInputDown.add(changeImage, this);
		
		metalic6 = game.add.sprite(800, 225, 'spacewar');
		metalic6.frameName = 'metalic_06.png';
		metalic6.inputEnabled = true;
		metalic6.input.pixelPerfectClick = true;
		metalic6.events.onInputDown.add(changeImage, this);


		orange1 = game.add.sprite(200, 275, 'spacewar');
		orange1.frameName = 'orange_01.png';
		orange1.inputEnabled = true;
		orange1.input.pixelPerfectClick = true;
		orange1.events.onInputDown.add(changeImage, this);

		orange2 = game.add.sprite(250, 275, 'spacewar');
		orange2.frameName = 'orange_02.png';
		orange2.inputEnabled = true;
		orange2.input.pixelPerfectClick = true;
		orange2.events.onInputDown.add(changeImage, this);

		orange3 = game.add.sprite(300, 275, 'spacewar');
		orange3.frameName = 'orange_03.png';
		orange3.inputEnabled = true;
		orange3.input.pixelPerfectClick = true;
		orange3.events.onInputDown.add(changeImage, this);

		orange4 = game.add.sprite(350, 275, 'spacewar');
		orange4.frameName = 'orange_04.png';
		orange4.inputEnabled = true;
		orange4.input.pixelPerfectClick = true;
		orange4.events.onInputDown.add(changeImage, this);

		orange5 = game.add.sprite(400, 275, 'spacewar');
		orange5.frameName = 'orange_05.png';
		orange5.inputEnabled = true;
		orange5.input.pixelPerfectClick = true;
		orange5.events.onInputDown.add(changeImage, this);

		orange6 = game.add.sprite(450, 275, 'spacewar');
		orange6.frameName = 'orange_06.png';
		orange6.inputEnabled = true;
		orange6.input.pixelPerfectClick = true;
		orange6.events.onInputDown.add(changeImage, this);


		purple1 = game.add.sprite(550, 275, 'spacewar');
		purple1.frameName = 'purple_01.png';
		purple1.inputEnabled = true;
		purple1.input.pixelPerfectClick = true;
		purple1.events.onInputDown.add(changeImage, this);
		
		purple2 = game.add.sprite(600, 275, 'spacewar');
		purple2.frameName = 'purple_02.png';
		purple2.inputEnabled = true;
		purple2.input.pixelPerfectClick = true;
		purple2.events.onInputDown.add(changeImage, this);
		
		purple3 = game.add.sprite(650, 275, 'spacewar');
		purple3.frameName = 'purple_03.png';
		purple3.inputEnabled = true;
		purple3.input.pixelPerfectClick = true;
		purple3.events.onInputDown.add(changeImage, this);
		
		purple4 = game.add.sprite(700, 275, 'spacewar');
		purple4.frameName = 'purple_04.png';
		purple4.inputEnabled = true;
		purple4.input.pixelPerfectClick = true;
		purple4.events.onInputDown.add(changeImage, this);
		
		purple5 = game.add.sprite(750, 275, 'spacewar');
		purple5.frameName = 'purple_05.png';
		purple5.inputEnabled = true;
		purple5.input.pixelPerfectClick = true;
		purple5.events.onInputDown.add(changeImage, this);
		
		purple6 = game.add.sprite(800, 275, 'spacewar');
		purple6.frameName = 'purple_06.png';
		purple6.inputEnabled = true;
		purple6.input.pixelPerfectClick = true;
		purple6.events.onInputDown.add(changeImage, this);


		red1 = game.add.sprite(375, 325, 'spacewar');
		red1.frameName = 'red_01.png';
		red1.inputEnabled = true;
		red1.input.pixelPerfectClick = true;
		red1.events.onInputDown.add(changeImage, this);
		
		red2 = game.add.sprite(425, 325, 'spacewar');
		red2.frameName = 'red_02.png';
		red2.inputEnabled = true;
		red2.input.pixelPerfectClick = true;
		red2.events.onInputDown.add(changeImage, this);
		
		red3 = game.add.sprite(475, 325, 'spacewar');
		red3.frameName = 'red_03.png';
		red3.inputEnabled = true;
		red3.input.pixelPerfectClick = true;
		red3.events.onInputDown.add(changeImage, this);
		
		red4 = game.add.sprite(525, 325, 'spacewar');
		red4.frameName = 'red_04.png';
		red4.inputEnabled = true;
		red4.input.pixelPerfectClick = true;
		red4.events.onInputDown.add(changeImage, this);
		
		red5 = game.add.sprite(575, 325, 'spacewar');
		red5.frameName = 'red_05.png';
		red5.inputEnabled = true;
		red5.input.pixelPerfectClick = true;
		red5.events.onInputDown.add(changeImage, this);
		
		red6 = game.add.sprite(625, 325, 'spacewar');
		red6.frameName = 'red_06.png';
		red6.inputEnabled = true;
		red6.input.pixelPerfectClick = true;
		red6.events.onInputDown.add(changeImage, this);
		
		
		
	},

	update : function() {
		
		if(backSpace.isUp && deletedChar == true){
			deletedChar = false;
		}
		if (backSpace.isDown && deletedChar == false){
			if (game.global.myPlayer.name != null && game.global.myPlayer.name.length > 0) {
				game.global.myPlayer.name = game.global.myPlayer.name.substring(0, game.global.myPlayer.name.length - 1);
				text.setText("User name: " +game.global.myPlayer.name);
				
			}
			deletedChar = true;
		}
	}
}
function keyPress(char){
	game.global.myPlayer.name += char;
	text.setText("User name: " +game.global.myPlayer.name);
	
}

function changeImage(image){
	spaceship.frameName = image.frameName;
	spaceship.sprite = image.sprite;
	game.global.myPlayer.shipType = image.frameName;
}

function botonNext(){
	let message = {
			event : 'UPDATE PLAYER',
			username : game.global.myPlayer.name,
			ship : game.global.myPlayer.shipType
		}
	game.global.socket.send(JSON.stringify(message));

	game.state.start('chooseRoomState')
}