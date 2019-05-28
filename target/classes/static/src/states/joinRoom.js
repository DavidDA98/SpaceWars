Spacewar.joinRoomState = function(game) {

}

var salaElegida;
var i;
var page = 0;
var arraybuttons = [];
var arraytexts = [];

Spacewar.joinRoomState.prototype = {

	init : function() {
		game.global.myPlayer.room = {name : -1}
	},

	preload : function() {
		getRooms();
	},

	create : function() {
		game.add.button(700, 500, 'mas_salas', morerooms, this, 1, 0);
		game.add.button(200, 500, 'menos_salas', lessrooms, this, 1, 0);
		game.add.button(10, 10, 'atras', back, this, 1, 0);
		game.add.button(900, 10, 'aleatorio', random, this, 1, 0);
		game.add.button(400, 10, 'refresh', refresh, this, 1, 0);
	},

	update : function() {
		if (salaElegida == game.global.myPlayer.room.name) {
			game.state.start('matchmakingState')
		}
	}
}

async function getRooms() {
	if (game.global.DEBUG_MODE) {
		console.log("[DEBUG] Entering **Join Room** state");
	}
	message = {
		event : 'GET ROOMS'
	}
	game.global.socket.send(JSON.stringify(message))
	
	let promise = new Promise(resolve => {
		(function waitForRooms(){
            if (game.global.rooms != undefined) {
            	return resolve();
            }
            setTimeout(waitForRooms, 30);
        })();
	});
	
	await promise;

	showonscreen();
}

function join(room, event, nombreSala) {
	salaElegida = nombreSala;
	message = {
		event : 'JOIN ROOM',
		room : nombreSala
	}
	game.global.socket.send(JSON.stringify(message))
}

function back() {
	game.state.start('chooseRoomState')
}

function random() {
	join(0, 0, game.global.rooms[Math.floor(Math.random() * game.global.rooms.length)].name);
}
function refresh(){
	showonscreen();
}

function showonscreen() {
	for(i = 0; i < 8; i++){
		if(arraybuttons[i] != undefined) {
			arraybuttons[i].destroy();
			arraybuttons[i] = undefined;
		}
		if(arraytexts[i] != undefined) {
			arraytexts[i].destroy();
			arraytexts[i] = undefined;
		}
	}
	for(i = 0; i < 8; i++) {
		if(game.global.rooms.length > i + page) {
			arraybuttons[i] = game.add.button(50, 100 + i * 50, 'boton');
			arraybuttons[i].onInputDown.add(join, this, 0, game.global.rooms[i + page].name);
			arraytexts[i] = game.add.text(150, 100 + i * 50, game.global.rooms[i + page].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
		}
	}
}

function morerooms() {
	if(game.global.rooms.length > 8 + page){
		page += 8;
		showonscreen();
	}
}

function lessrooms() {
	if(page != 0){
		page -= 8;
		showonscreen();
	}
}