Spacewar.joinRoomState = function(game) {

}

var arrayrooms = [];
var text1;
var text2;
var text3;
var text4;
var arraycont;
var i = 0;

Spacewar.joinRoomState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **Join Room** state");
		}
		message = {
			event : 'GET ROOMS'
		}
		game.global.socket.send(JSON.stringify(message))
	},

	preload : function() {
		arrayrooms = game.global.rooms;

		if(arrayrooms.lenght >= 4){
			text1 = arrayrooms[0].room;
			text2 = arrayrooms[1].room;
			text3 = arrayrooms[2].room;
			text4 = arrayrooms[3].room;

			arraycont = 4
		}
		else if(arrayrooms.lenght == 3){
			text1 = arrayrooms[0].room;
			text2 = arrayrooms[1].room;
			text3 = arrayrooms[2].room;

			arraycont = 3
		}
		else if(arrayrooms.lenght == 2){
			text1 = arrayrooms[0].room;
			text2 = arrayrooms[1].room;

			arraycont = 2
		}
		else if(arrayrooms.lenght == 1){
			text1 = arrayrooms[0].room;

			arraycont = 1
		}
		else if(arrayrooms.lenght == 0){

			arraycont = 0
		}
		
	},

	create : function() {
		showonscreen();
		
		next = game.add.button(400, 700, 'boton', morerooms, this, 1, 0);
		next.style.width = '100px';
		next.style.height = '100px';
	},

	update : function() {
		
	}
}

function join () {
	message = {
		event : 'JOIN ROOM'
	}
	game.global.socket.send(JSON.stringify(message))
	//game.state.start('matchmakingState')
}

function morerooms() {
	if(arrayrooms.lenght - arraycont >= 4){
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
	}
}

function back() {
	game.state.start('chooseRoomState')
}

function showonscreen(){
	switch(arraycont){
		case 0:
			empty = game.add.button(400, 100, 'boton', back, this, 1, 0);
			textPlayButton = game.add.text(450, 110, 'NO HAY SALAS CREADAS', {
				font: "24px Arial",
				fill: "#000000"
			})
			empty.style.width = '400px';
			empty.style.height = '100px';
			break;
		
		case 1 + (4*i):
			join1 = game.add.button(50, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(150, 110, text1, {
				font: "24px Arial",
				fill: "#000000"
			})
			join1.style.width = '400px';
			join1.style.height = '100px';
			break;

		case 2 + (4*i):
			join1 = game.add.button(50, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(150, 110, text1, {
				font: "24px Arial",
				fill: "#000000"
			})
			join1.style.width = '400px';
			join1.style.height = '100px';
	
			join2 = game.add.button(200, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(350, 110, text2, {
				font: "24px Arial",
				fill: "#000000"
			})
			join2.style.width = '400px';
			join2.style.height = '100px';
			break;

		case 3 + (4*i):
			join1 = game.add.button(50, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(150, 110, text1, {
				font: "24px Arial",
				fill: "#000000"
			})
			join1.style.width = '400px';
			join1.style.height = '100px';
	
			join2 = game.add.button(200, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(350, 110, text2, {
				font: "24px Arial",
				fill: "#000000"
			})
			join2.style.width = '400px';
			join2.style.height = '100px';
	
			join3 = game.add.button(350, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(550, 110, text3, {
				font: "24px Arial",
				fill: "#000000"
			})
			join3.style.width = '400px';
			join3.style.height = '100px';
			break;

		case 4 + (4*i):
			join1 = game.add.button(50, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(150, 110, text1, {
				font: "24px Arial",
				fill: "#000000"
			})
			join1.style.width = '400px';
			join1.style.height = '100px';
	
			join2 = game.add.button(200, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(350, 110, text2, {
				font: "24px Arial",
				fill: "#000000"
			})
			join2.style.width = '400px';
			join2.style.height = '100px';
	
			join3 = game.add.button(350, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(550, 110, text3, {
				font: "24px Arial",
				fill: "#000000"
			})
			join3.style.width = '400px';
			join3.style.height = '100px';
	
			join4 = game.add.button(500, 100, 'boton', join, this, 1, 0);
			textPlayButton = game.add.text(750, 110, text4, {
				font: "24px Arial",
				fill: "#000000"
			})
			join4.style.width = '400px';
			join4.style.height = '100px';

			arraycont = arraycont + 4;
	}
	i++;
}