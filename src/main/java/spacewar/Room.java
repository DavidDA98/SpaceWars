package spacewar;

import org.springframework.web.socket.WebSocketSession;

public class Room {
	private final String roomId;
	private final int mode;
	private final int maxPlayers;
	private final int difficulty;
	
	public Room(String roomId, int mode, int maxPlayers, int difficulty) {
		this.roomId = roomId;
		this.mode = mode;
		this.maxPlayers = maxPlayers;
		this.difficulty = difficulty;
	}
}
