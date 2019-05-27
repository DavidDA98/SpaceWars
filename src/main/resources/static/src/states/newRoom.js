Spacewar.newRoomState = function(game) {

}

var deletedChar = false;
var modo = "Modo 1";
var nummode = 0;
var dificultad = 1;
var modetext;
var difficultytext;

Spacewar.newRoomState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **New Room** state");
		}
		game.global.myPlayer.room = {name : -1}
	},

	preload : function() {
		
	},

	create : function() {
		roomName = "";
		game.input.keyboard.addCallbacks(this, null, null, keyPressRoom);
		backSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
		text = game.add.text(50, 180, "Room name: ", {
			font: "40px Arial",
			fill: "#ffff66"
		});

		game.add.button(500, 500, 'boton', gamemode, this, 1, 0);
		modetext = game.add.text(250, 300, modo, {
			font: "24px Arial",
			fill: "#FFFFFF"
		})

		game.add.button(500, 500, 'boton', difficultylevel, this, 1, 0);
		difficultytext = game.add.text(750, 300, dificultad, {
			font: "24px Arial",
			fill: "#FFFFFF"
		})

		game.add.button(500, 500, 'boton', createRoom, this, 1, 0);
	},

	update : function() {
		if(backSpace.isUp && deletedChar == true){
			deletedChar = false;
		}
		if (backSpace.isDown && deletedChar == false){
			if (roomName != null && roomName.length > 0) {
				roomName = roomName.substring(0, roomName.length - 1);
				text.setText("Room name: " + roomName);
			}
			deletedChar = true;
		}
		
		if (roomName == game.global.myPlayer.room.name) {
			game.state.start('matchmakingState');
		}
	}
}


function keyPressRoom(char){
	roomName += char;
	text.setText("Room name: " + roomName);
}


function createRoom(){
	if(roomName != ""){
		message = {
				event : 'CREATE ROOM',
				name : roomName,
				mode : nummode,
				maxPlayers : 2,
				difficulty : 5
			}
		game.global.socket.send(JSON.stringify(message))
	}
}

function gamemode(){
	if(nummode == 0){
		modetext = undefined;
		modo = "Modo 2";
		modetext = game.add.text(250, 300, modo, {
			font: "24px Arial",
			fill: "#FFFFFF"
		});
		nummode = 1;
	}
	else if(nummode == 1){
		modo = "Modo 1"
		numode = 0;
	}
}

function difficultylevel(){
	if(dificultad < 5){
		difficultytext = undefined;
		dificultad++;
		difficultytext = game.add.text(750, 300, dificultad, {
			font: "24px Arial",
			fill: "#FFFFFF"
		})
	}
	else if(dificultad == 5){
		difficultytext = undefined;
		dificultad = 1;
		difficultytext = game.add.text(750, 300, dificultad, {
			font: "24px Arial",
			fill: "#FFFFFF"
		})
	}
}