Spacewar.roomState = function(game) {

}

var deletedChar = false;

Spacewar.roomState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **ROOM** state");
		}
	},

	preload : function() {

	},

	create : function() {
		enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		mes = game.add.text(5, 580, "Message: ", {
			font: "12px Courier",
			fill: "#ffff66"
		});

		//mostrar datos sala
		nameRoom = game.add.text(10, 30, game.global.myPlayer.room.name, {
			font: "42px Arial",
			fill: "#ffff66"
		});
		modeRoom = game.add.text(10, 60, ("Room's play mode: " + game.global.myPlayer.room.mode), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		difficultyRoom = game.add.text(10, 90,("Room's difficulty: " + game.global.myPlayer.room.difficulty), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		maxPlayersRoom = game.add.text(10, 120,("Room's maximum number of players: " + game.global.myPlayer.room.maxPlayers), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		/*numPlayersRoom = game.add.text(10, 150,("Room's number of players: " + game.global.room.numPlayers), {
			font: "24px Arial",
			fill: "#ffff66"
		}); Esto debería mostrar el número de jugadores en la sala en ese momento, pero ese dato nos lo tiene que dar el server
		countDown = game.time.events.add(Phaser.Timer.SECOND * 60, game.state.start('gameState'), this);
		Una cuenta atrás para señalar cuando empezará la partida*/
	},

	update : function() {
		if (enter.isDown) {
			game.state.start('gameState')// cuando se controle bien el timer esto se quita
		}
	}
}