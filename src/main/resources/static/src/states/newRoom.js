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
		game.state.start('matchmakingState')
	},

	update : function() {

	}
}