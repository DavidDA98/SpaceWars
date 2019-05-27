Spacewar.scoreState = function(game) {

}

Spacewar.scoreState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **SCORE** state");
		}
	},

	preload : function() {
		
	},

	create : function() {
		finalPunt = game.add.text(20, 200, "Final Score: " + game.global.myPlayer.score, {
			font: "42px Arial",
			fill: "#ffff66"
        });
        end = game.add.button(450, 480, 'boton', botonEnd, this, 1, 0);
		textEndButton = game.add.text(450, 480, "MENU", {
			font: "24px Arial",
			fill: "#000000"
		})
	},

	update : function() {
        
	}
}

function botonEnd(){
    game.state.start('menuState')
}