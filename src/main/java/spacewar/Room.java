package spacewar;

public class Room {
	private final String roomId;
	private final int mode;
	private final int maxPlayers;
	private final int difficulty;
	private int currentPlayers;
	private boolean full;
	
	public Room(String roomId, int mode, int maxPlayers, int difficulty) {
		this.roomId = roomId;
		this.mode = mode;
		this.maxPlayers = maxPlayers;
		this.difficulty = difficulty;
		this.currentPlayers = 1; //el jugador que crea la sala
		this.full = false;
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
	
	public void updateCurrentPlayers(int n) {
		currentPlayers += n;
	}

	public boolean isFull() {
		return full;
	}

	public void setFull(boolean full) {
		this.full = full;
	}
}