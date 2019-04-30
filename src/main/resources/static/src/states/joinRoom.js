Spacewar.joinRoomState = function(game) {

}

Spacewar.joinRoomState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **Join Room** state");
		}
	},

	preload : function() {

	},

	create : function() {
		game.state.start('matchmakingState')
	},

	update : function() {

	}
}