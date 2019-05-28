function sendMessage() {
	let sender;
	if (game.global.myPlayer.name == "") {
		sender = "Anonymous";
	} else {
		sender = game.global.myPlayer.name;
	}
	
	let message = {
		event : 'NEW MESSAGE',
		sender : sender,
		message : document.getElementById("chatInput").value
	}
	
	game.global.socket.send(JSON.stringify(message));
	document.getElementById("chatInput").value = "";
}