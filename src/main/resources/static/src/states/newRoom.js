Spacewar.newRoomState = function(game) {

}

var deletedChar = false;

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
			font: "65px Arial",
			fill: "#ffff66"
		});
		game.add.button(480, 480, 'boton', createRoom, this, 1, 0);
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
				mode : 1,
				maxPlayers : 2,
				difficulty : 5
			}
		game.global.socket.send(JSON.stringify(message))
	}
}