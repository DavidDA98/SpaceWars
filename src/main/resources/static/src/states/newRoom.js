Spacewar.newRoomState = function(game) {

}

Spacewar.newRoomState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **New Room** state");
		}
	},

	preload : function() {
		
	},

	create : function() {
		roomName = "";
		game.input.keyboard.addCallbacks(this, null, null, keyPress);
		backSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
		text = game.add.text(50, 180, "Room name: ", {
			font: "65px Arial",
			fill: "#ffff66"
		});
		game.add.button(480, 480, 'boton', botonNext, this, 1, 0);
	},

	update : function() {
		if(backSpace.isUp && deletedChar == true){
			deletedChar = false;
		}
		if (backSpace.isDown && deletedChar == false){
			if (roomName != null && roomName.length > 0) {
				rommName = roomName.substring(0, roomName.length - 1);
				text.setText("User name: " + roomName);
			}
			deletedChar = true;
		}
	}
}


function keyPress(char){
	roomName += char;
	text.setText("User name: " + roomName);
}


function botonNext(){
	if(roomName != null){
		message = {
				event : 'NEW ROOM'
				room : roomName
			}
		game.global.socket.send(JSON.stringify(message))
		game.state.start('matchmakingState')
	}
}