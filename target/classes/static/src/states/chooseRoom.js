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
        game.add.button(300, 200, 'unir_sala', joinRoom, this);
        game.add.button(300, 400, 'nueva_sala', newRoom, this);
	},
	
	update : function() {

	}
}


function joinRoom(){
	game.state.start('joinRoomState')
}


function newRoom(){
	game.state.start('newRoomState')
}