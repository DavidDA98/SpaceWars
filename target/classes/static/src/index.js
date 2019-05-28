window.onload = function() {

	game = new Phaser.Game(1024, 600, Phaser.AUTO, 'gameDiv')

	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : true,
		socket : null,
		myPlayer : {health : 100, ammo : 8, thruster : 500},
		rooms : undefined,
		otherPlayers : [],
		projectiles : []
	}

	// WEBSOCKET CONFIGURATOR
	game.global.socket = new WebSocket("ws://127.0.0.1:8080/spacewar")
	
	game.global.socket.onopen = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection opened.')
		}
	}

	game.global.socket.onclose = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection closed.')
		}
	}
	
	game.global.socket.onmessage = (message) => {
		var msg = JSON.parse(message.data)
		
		switch (msg.event) {
		case 'NEW MESSAGE':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] NEW MESSAGE message recieved')
				console.dir(msg)
			}
			document.getElementById("chat").innerHTML = msg.message + "<br/>" + document.getElementById("chat").innerHTML;
			break
		case 'updateChatUsers':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] updateChatUsers message recieved')
				console.dir(msg)
			}
			document.getElementById("jugadores").innerHTML = "";
			for (var usuario of msg.usuarios) {
				document.getElementById("jugadores").innerHTML = document.getElementById("jugadores").innerHTML + usuario.name + "<br/>" + usuario.room + "<br/>";
			}
			break
		case 'JOIN':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] JOIN message recieved')
				console.dir(msg)
			}
			game.global.myPlayer.id = msg.id
			game.global.myPlayer.shipType = msg.shipType
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] ID assigned to player: ' + game.global.myPlayer.id)
			}
			break
		case 'NEW ROOM' :
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] NEW ROOM message recieved')
				console.dir(msg)
			}
			game.global.myPlayer.room = {
					name : msg.name,
					mode : msg.mode,
					maxPlayers : msg.maxPlayers,
					difficulty : msg.difficulty,
					numPlayers : msg.numPlayers
			}
			break
		case 'GET ROOMS' :
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] GET ROOMS message recieved')
				console.dir(msg)
			}
			game.global.rooms = msg.rooms
			break
		case 'NEW PLAYER' :
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] NEW PLAYER message recieved')
				console.dir(msg)
			}
			
			game.global.myPlayer.room.numPlayers++;
			numPlayersRoom.setText(game.global.myPlayer.room.numPlayers);
			break
		case 'GAME STATE UPDATE' :
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] GAME STATE UPDATE message recieved')
				console.dir(msg)
			}
			if (typeof game.global.myPlayer.image !== 'undefined') {
				for (var player of msg.players) {
					if (game.global.myPlayer.id == player.id) {
						game.global.myPlayer.image.x = player.posX
						game.global.myPlayer.image.y = player.posY
						game.global.myPlayer.image.angle = player.facingAngle
						game.global.myPlayer.health = player.health
						game.global.myPlayer.ammo = player.ammo
						game.global.myPlayer.thruster = player.thruster
						game.global.myPlayer.score = player.score
					} else {
						if (game.global.otherPlayers[player.id] == undefined) {
							console.log("funciono")
							game.global.otherPlayers[player.id] = {
									image : game.add.sprite(player.posX, player.posY, 'spacewar', player.shipType)
							}
							game.global.otherPlayers[player.id].image.anchor.setTo(0.5, 0.5)
							game.global.otherPlayers[player.id].name = player.name;
						} else {
							game.global.otherPlayers[player.id].image.x = player.posX
							game.global.otherPlayers[player.id].image.y = player.posY
							game.global.otherPlayers[player.id].image.angle = player.facingAngle
						}
					}
				}
				
				for (var projectile of msg.projectiles) {
					if (projectile.isAlive) {
						game.global.projectiles[projectile.id].image.x = projectile.posX
						game.global.projectiles[projectile.id].image.y = projectile.posY
						if (game.global.projectiles[projectile.id].image.visible === false) {
							game.global.projectiles[projectile.id].image.angle = projectile.facingAngle
							game.global.projectiles[projectile.id].image.visible = true
						}
					} else {
						if (projectile.isHit) {
							// we load explosion
							let explosion = game.add.sprite(projectile.posX, projectile.posY, 'explosion')
							explosion.animations.add('explosion')
							explosion.anchor.setTo(0.5, 0.5)
							explosion.scale.setTo(2, 2)
							explosion.animations.play('explosion', 15, false, true)
						}
						game.global.projectiles[projectile.id].image.visible = false
					}
				}
			}
			break
		case 'REMOVE PLAYER' :
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] REMOVE PLAYER message recieved')
			}
			
			game.global.myPlayer.room.numPlayers--;
			
			if (msg.id != game.global.myPlayer.id) {
				
				game.global.otherPlayers[msg.id].image.destroy()
				game.global.otherPlayers[msg.id] = undefined
				
				if (game.global.myPlayer.room.numPlayers == 1) {
					game.global.myPlayer.room = undefined
					game.state.start('scoreState');
				}
			} else {
				for (var i = 0; i < game.global.otherPlayers.length; i++) {
					if (game.global.otherPlayers[i] != undefined) {
						game.global.otherPlayers[i].image.destroy()
						game.global.otherPlayers[i] = undefined
					}
				}
				game.global.myPlayer.room = undefined
				game.state.start('scoreState');
			}
			break
		default :
			console.dir(msg)
			break
		}
	}

	// PHASER SCENE CONFIGURATOR
	game.state.add('bootState', Spacewar.bootState)
	game.state.add('preloadState', Spacewar.preloadState)
	game.state.add('menuState', Spacewar.menuState)
	game.state.add('createPlayerState', Spacewar.createPlayerState)
	game.state.add('chooseRoomState', Spacewar.chooseRoomState)
	game.state.add('newRoomState', Spacewar.newRoomState)
	game.state.add('joinRoomState', Spacewar.joinRoomState)
	game.state.add('matchmakingState', Spacewar.matchmakingState)
	game.state.add('roomState', Spacewar.roomState)
	game.state.add('gameState', Spacewar.gameState)
	game.state.add('scoreState', Spacewar.scoreState)

	game.state.start('bootState')

}