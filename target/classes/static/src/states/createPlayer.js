Spacewar.createPlayerState = function(game) {

}

Spacewar.createPlayerState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **Create Player** state");
		}
	},

	preload : function() {

	},

	create : function() {
		game.state.start('chooseRoomState')
	},

	update : function() {

	}
}