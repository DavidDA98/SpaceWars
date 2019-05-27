package spacewar;

import java.util.Random;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Player extends Spaceship {
	private final int DEF_HEALTH = 100;
	private final int DEF_AMMO = 8;
	private final int DEF_THRUSTER = 500;

	private final WebSocketSession session;
	private final int playerId;
	private String shipType;
	private String username;
	
	private int health;
	private int ammo;
	private int thruster;
	
	private int score;

	public Player(int playerId, WebSocketSession session) {
		this.playerId = playerId;
		this.session = session;
		this.shipType = this.getRandomShipType();
		this.username = "Anonymous";
		
		this.health = DEF_HEALTH;
		this.ammo = DEF_AMMO;
		this.thruster = DEF_THRUSTER;
		
		this.score = 0;
	}

	public int getPlayerId() {
		return this.playerId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public WebSocketSession getSession() {
		return this.session;
	}

	public void sendMessage(String msg) throws Exception {
		this.session.sendMessage(new TextMessage(msg));
	}

	public String getShipType() {
		return shipType;
	}
	
	public void setShipType(String shipType) {
		this.shipType = shipType;
	}

	public int getHealth() {
		return health;
	}

	public void setHealth(int health) {
		this.health = health;
	}

	public int getAmmo() {
		return ammo;
	}

	public void setAmmo(int ammo) {
		this.ammo = ammo;
	}

	public int getThruster() {
		return thruster;
	}

	public void setThruster(int thruster) {
		this.thruster = thruster;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	private String getRandomShipType() {
		String[] randomShips = { "blue", "darkgrey", "green", "metalic", "orange", "purple", "red" };
		String ship = (randomShips[new Random().nextInt(randomShips.length)]);
		ship += "_0" + (new Random().nextInt(5) + 1) + ".png";
		return ship;
	}
	
	public void resetPlayer() {
		health = DEF_HEALTH;
		ammo = DEF_AMMO;
		thruster = DEF_THRUSTER;
		
		score = 0;
	}
}
