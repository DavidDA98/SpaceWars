package spacewar;

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

	public String getRoomId() {
		return roomId;
	}

	public int getMode() {
		return mode;
	}

	public int getMaxPlayers() {
		return maxPlayers;
	}

	public int getDifficulty() {
		return difficulty;
	}
}
