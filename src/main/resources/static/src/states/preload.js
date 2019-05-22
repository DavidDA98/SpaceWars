Spacewar.preloadState = function(game) {

}

Spacewar.preloadState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** state");
		}
	},

	preload : function() {
		game.load.atlas('spacewar', 'assets/atlas/spacewar.png',
				'assets/atlas/spacewar.json',
				Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
		game.load.atlas('explosion', 'assets/atlas/explosion.png',
				'assets/atlas/explosion.json',
				Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
		game.load.image('boton', 'assets/interface/boton.png')
		game.load.image('nueva_sala', 'assets/interface/nueva_sala.png')
		game.load.image('unir_sala', 'assets/interface/unir_sala.png')
	},

	create : function() {
		game.state.start('menuState')
	},

	update : function() {

	}
}