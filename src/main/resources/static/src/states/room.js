Spacewar.roomState = function(game) {

}

var deletedChar = false;

Spacewar.roomState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering *ROOM* state");
		}
	},

	preload : function() {

	},

	create : function() {
		//mostrar datos sala
		nameRoom = game.add.text(50, 100, game.global.myPlayer.room.name, {
			font: "42px Arial",
			fill: "#ffff66"
		});
		modeRoom = game.add.text(50, 200, ("Room's play mode: " + game.global.myPlayer.room.mode), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		difficultyRoom = game.add.text(50, 250,("Room's difficulty: " + game.global.myPlayer.room.difficulty), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		maxPlayersRoom = game.add.text(50, 300,("Room's maximum number of players: " + game.global.myPlayer.room.maxPlayers), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		numPlayersRoom = game.add.text(50, 350,("Room's number of players: " + game.global.myPlayer.room.numPlayers), {
			font: "24px Arial",
			fill: "#ffff66"
		}); 

		start = game.add.button(500, 480, 'boton', botonStart, this, 1, 0);
		textNextButton = game.add.text(510, 480, "START", {
			font: "24px Arial",
			fill: "#000000"
		})
	},

	update : function() {
		if (game.global.myPlayer.room.numPlayers == game.global.myPlayer.room.maxPlayers) {
			game.state.start('gameState')
		}
	}
}


function botonStart(){
	if (game.global.myPlayer.room.numPlayers > 1) {
		game.state.start('gameState')
	}
}