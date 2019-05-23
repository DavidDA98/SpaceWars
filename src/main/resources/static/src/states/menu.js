Spacewar.menuState = function(game) {

}

Spacewar.menuState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **MENU** state");
		}
	},

	preload : function() {
		// In case JOIN message from server failed, we force it
		if (typeof game.global.myPlayer.id == 'undefined') {
			if (game.global.DEBUG_MODE) {
				console.log("[DEBUG] Forcing joining server...");
			}
			let message = {
				event : 'JOIN'
			}
			game.global.socket.send(JSON.stringify(message))
		}
	},

	create : function() {
	     play = game.add.button(480, 280, 'boton', botonPlay, this, 1, 0);
	     textPlayButton = game.add.text(497, 285, "PLAY", {
				font: "24px Arial",
				fill: "#000000"
			})
	},

	update : function() {
		
	}
}
function botonPlay () {
	game.state.start('createPlayerState')
}