Spacewar.joinRoomState = function(game) {

}

var salaElegida;

Spacewar.joinRoomState.prototype = {

	init : function() {
		game.global.myPlayer.room = {name : -1}
	},

	preload : function() {
		getRooms();
	},

	create : function() {
		next = game.add.button(400, 700, 'boton', morerooms, this, 1, 0);
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

function join(nombreSala) {
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

function showonscreen(){
	switch(game.global.rooms.length){
		case 0:
			empty = game.add.button(400, 100, 'boton', back, this, 1, 0);
			textPlayButton = game.add.text(450, 110, 'NO HAY SALAS CREADAS', {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
			break;
		
		case 1:
			join1 = game.add.button(50, 100, 'boton', function() { join(game.global.rooms[0].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 100, game.global.rooms[0].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
			break;

		case 2:
			join1 = game.add.button(50, 100, 'boton', function() { join(game.global.rooms[0].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 100, game.global.rooms[0].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
	
			join2 = game.add.button(50, 150, 'boton', function() { join(game.global.rooms[1].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 150, game.global.rooms[1].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
			break;

		case 3:
			join1 = game.add.button(50, 100, 'boton', function() { join(game.global.rooms[0].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 100, game.global.rooms[0].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
	
			join2 = game.add.button(50, 150, 'boton', function() { join(game.global.rooms[1].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 150, game.global.rooms[1].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
	
			join3 = game.add.button(50, 200, 'boton', function() { join(game.global.rooms[2].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 200, game.global.rooms[2].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
			break;

		case 4:
			join1 = game.add.button(50, 100, 'boton', function() { join(game.global.rooms[0].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 100, game.global.rooms[0].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
	
			join2 = game.add.button(50, 150, 'boton', function() { join(game.global.rooms[1].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 150, game.global.rooms[1].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
	
			join3 = game.add.button(50, 200, 'boton', function() { join(game.global.rooms[2].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 200, game.global.rooms[2].name, {
				font: "24px Arial",
				fill: "#000000"
			})
	
			join4 = game.add.button(50, 250, 'boton', function() { join(game.global.rooms[3].name) }, this, 1, 0);
			textPlayButton = game.add.text(150, 250, game.global.rooms[3].name, {
				font: "24px Arial",
				fill: "#FFFFFF"
			})
	}
}

function morerooms() {
	/*if(arrayrooms.lenght - arraycont >= 4){
		text1 = arrayrooms[0].room;
		text2 = arrayrooms[1].room;
		text3 = arrayrooms[2].room;
		text4 = arrayrooms[3].room;

		arraycont = 4
	}
	else if(arrayrooms.lenght - arraycont == 3){
		text1 = arrayrooms[0].room;
		text2 = arrayrooms[1].room;
		text3 = arrayrooms[2].room;

		arraycont = 3
	}
	else if(arrayrooms.lenght - arraycont == 2){
		text1 = arrayrooms[0].room;
		text2 = arrayrooms[1].room;

		arraycont = 2
	}
	else if(arrayrooms.lenght - arraycont == 1){
		text1 = arrayrooms[0].room;

		arraycont = 1
	}
	else if(arrayrooms.lenght - arraycont == 0){

		arraycont = 0
	}

	if(arrayrooms[arraycont - 1] != null){
		showonscreen();
	}*/
}