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
		 game.stage.backgroundColor = "#191970";
	     play = game.add.button(480, 280, 'boton', botonPlay, this, 1, 0);
	},

	update : function() {
		
	}
}
function botonPlay () {
    while (!typeof game.global.myPlayer.id !== 'undefined') {
		game.state.start('lobbyState')
	}
}