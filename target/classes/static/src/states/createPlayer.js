Spacewar.createPlayerState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **Create Player** state");
		}
	},

	preload : function() {

	},

	create : function() {
		game.global.myPlayer.name = "";
		game.input.keyboard.addCallbacks(this, null, null, keyPress);
		backSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
		text = game.add.text(50, 180, "User name: ", {
			font: "65px Arial",
			fill: "#ffff66"
		});
		next = game.add.button(480, 480, 'boton', botonNext, this, 1, 0);
		
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

function botonNext(){
	game.state.start('chooseRoomState')
}