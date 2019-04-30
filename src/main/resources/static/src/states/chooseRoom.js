Spacewar.chooseRoomState = function(game) {

}

Spacewar.chooseRoomState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **Choose Room** state");
		}
	},

	preload : function() {

	},

	create : function() {
		game.state.start('newRoomState')
	},

	update : function() {

	}
}