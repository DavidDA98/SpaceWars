package spacewar;

public class Room {
	private final String roomId;
	private final int mode;
	private final int maxPlayers;
	private final int difficulty;
	private int currentPlayers;
	
	public Room(String roomId, int mode, int maxPlayers, int difficulty) {
		this.roomId = roomId;
		this.mode = mode;
		this.maxPlayers = maxPlayers;
		this.difficulty = difficulty;
		this.currentPlayers = 1; //el jugador que crea la sala
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
	
	public int getCurrentPlayers() {
		return currentPlayers;
	}
	
	public void updateCurrentPlayers() {
		currentPlayers++;
	}
}