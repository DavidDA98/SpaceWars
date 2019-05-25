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
		mes = "";
		game.input.keyboard.addCallbacks(this, null, null, keyPress);
		backSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
		enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		mes = game.add.text(5, 580, "Message: ", {
			font: "12px Courier",
			fill: "#ffff66"
		});

		//mostrar datos sala
		nameRoom = game.add.text(centerX, 30, game.global.room.name, {
			font: "42px Arial",
			fill: "#ffff66"
		});
		modeRoom = game.add.text(10, 60, ("Room's play mode: " + game.global.room.mode), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		difficultyRoom = game.add.text(10, 90,("Room's difficulty: " + game.global.room.difficulty), {
			font: "24px Arial",
			fill: "#ffff66"
		});
		maxPlayersRoom = game.add.text(10, 120,("Room's maximum number of players: " + game.global.room.maxPlayers), {
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
		if(backSpace.isUp && deletedChar == true){
			deletedChar = false;
		}
		if (backSpace.isDown && deletedChar == false){
			if (mes != null && mes.length > 0) {
				mes = mes.substring(0, mes.length - 1);
				mes.setText("Message: " + mes);
				
			}
			deletedChar = true;
		}
		if (enter.isDown){
			if (mes != null && mes.length <= 120){
				sendMessage(mes);
				mes = "";
			}
			else{
				console.log("Invalid Message");
			}
		}
	
		game.state.start('gameState')// cuando se controle bien el timer esto se quita
	}
}

function sendMessage (textMes){
	/*	let message = {
		event : 'NEW MESSAGE',
		sender : game.global.myPlayer.name,
		message : mes
	}
	*/

}

 function reciebeMessage(){
	//de alguna forma aquí se recibe el mensaje y se llama a screenMessage(mensajeRecibido) para que lo muestre por pantalla
 }


function screenMessage(textMesRec){
	limText = 8;
	numberMes = 0;
	if (numberMes < limText){
		//creamos el primer mensaje
		if (numberMes == 0){
			chatText[numberMes] = game.add.text(5, 565, (textMesRec.username, ": ", textMesRec.Message), {
				font: "12px Courier",
				fill: "#ffff66"
			});
			numerMes++;
		}//rellenamos el array
		else{
			for (j = 0; j < numberMes; j++){
				chatText[j].position.y = chatText[j].position.y - (15*j); 
			}chatText[numberMes] = game.add.text(5, 565, (textMesRec.username, ": ", textMesRec.Message), {
				font: "12px Courier",
				fill: "#ffff66"
			});
			numerMes++;
		}	
	}
	else{
		//subimos todos los mensajes anteriores una posición, borrando el más antiguo
		for (i = 0; i < (limText - 1); i++){
			chatText[i] = chatText[i+1];
		}//el nuevo mensaje se pone en la útilma posición del array
		chatText[limText] = game.add.text(5, 565, (textMesRec.username, ": ", textMesRec.Message), {
			font: "12px Courier",
			fill: "#ffff66"
		});
	

	}
}

function keyPress(char){
	mes += char;
	mes.setText("Message: " + mes);
	
}