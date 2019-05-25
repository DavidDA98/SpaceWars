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
		game.load.image('mas_salas', 'assets/interface/mas_salas.png')
		game.load.image('atras', 'assets/interface/atras.png')
		game.load.image('aleatorio', 'assets/interface/aleatorio.png')
		game.load.image('refresh', 'assets/interface/refrescar.png')
	},

	create : function() {
		game.state.start('menuState')
	},

	update : function() {

	}
}