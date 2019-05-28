package spacewar;

import java.io.IOException;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class SpacewarGame {

	public final static SpacewarGame INSTANCE = new SpacewarGame();

	private final static int FPS = 30;
	private final static long TICK_DELAY = 1000 / FPS;
	public final static boolean DEBUG_MODE = true;
	public final static boolean VERBOSE_MODE = true;

	ObjectMapper mapper = new ObjectMapper();
	private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	// GLOBAL GAME ROOM
	private Map<String, Player> players = new ConcurrentHashMap<>();
	private Map<Integer, Projectile> projectiles = new ConcurrentHashMap<>();
	private AtomicInteger numPlayers = new AtomicInteger();

	public SpacewarGame() {

	}
	
	//Añade a un jugador, avisa a los demas y si es el primero inicia el gameloop
	public void addPlayer(Player player) {
		ObjectNode msg;
		synchronized(mapper) {
			msg = mapper.createObjectNode();
		}
		
		msg.put("event", "NEW PLAYER");
		
		this.broadcast(msg.toString());
		
		players.put(player.getSession().getId(), player);

		int count = numPlayers.getAndIncrement();
		if (count == 0) {
			this.startGameLoop();
		}
	}
	
	//Devuelve los jugadores
	public Collection<Player> getPlayers() {
		return players.values();
	}

	//Borra un jugador y avisa a los demas
	//Si updateSelf es true, avisa al propio jugador eliminado
	public void removePlayer(Player player, boolean updateSelf) {
		players.remove(player.getSession().getId());

		int count = this.numPlayers.decrementAndGet();
		if (count == 0) {
			this.stopGameLoop();
		}
		
		ObjectNode msg;
		synchronized(mapper) {
			msg = mapper.createObjectNode();
		}
		
		msg.put("event", "REMOVE PLAYER");
		msg.put("id", player.getPlayerId());
		
		this.broadcast(msg.toString());
		if (updateSelf) {
			try {
				synchronized(player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
			} catch (IOException e) {}
		}
	}

	//Añade un proyectil
	public void addProjectile(int id, Projectile projectile) {
		projectiles.put(id, projectile);
	}
	
	//Devuelve todos los proyectiles
	public Collection<Projectile> getProjectiles() {
		return projectiles.values();
	}

	//Borra un proyectil
	public void removeProjectile(Projectile projectile) {
		projectiles.remove(projectile.getId(), projectile);
	}

	//Inicia el gameloop
	public void startGameLoop() {
		scheduler = Executors.newScheduledThreadPool(1);
		scheduler.scheduleAtFixedRate(() -> tick(), TICK_DELAY, TICK_DELAY, TimeUnit.MILLISECONDS);
	}

	//Para el gameloop
	public void stopGameLoop() {
		if (scheduler != null) {
			scheduler.shutdown();
		}
	}

	//Manda un mensaje a todos los jugadores
	public void broadcast(String message) {
		for (Player player : getPlayers()) {
			try {
				synchronized(player.getSession()) {
					player.getSession().sendMessage(new TextMessage(message.toString()));
				}
			} catch (Throwable ex) {
				System.err.println("Execption sending message to player " + player.getSession().getId());
				ex.printStackTrace(System.err);
				this.removePlayer(player, false);
			}
		}
	}

	//Funcion que maneja cada tick del servidor
	private void tick() {
		ObjectNode json;
		ArrayNode arrayNodePlayers;
		ArrayNode arrayNodeProjectiles;
		synchronized(mapper) {
			json = mapper.createObjectNode();
			arrayNodePlayers = mapper.createArrayNode();
			arrayNodeProjectiles = mapper.createArrayNode();
		}

		long thisInstant = System.currentTimeMillis();
		Set<Integer> bullets2Remove = new HashSet<>();
		boolean removeBullets = false;

		try {
			// Update players
			for (Player player : getPlayers()) {
				player.calculateMovement();

				ObjectNode jsonPlayer;
				synchronized(mapper) {
					jsonPlayer = mapper.createObjectNode();
				}
				jsonPlayer.put("id", player.getPlayerId());
				jsonPlayer.put("name", player.getUsername());
				jsonPlayer.put("shipType", player.getShipType());
				jsonPlayer.put("posX", player.getPosX());
				jsonPlayer.put("posY", player.getPosY());
				jsonPlayer.put("facingAngle", player.getFacingAngle());
				jsonPlayer.put("health", player.getHealth());
				jsonPlayer.put("ammo", player.getAmmo());
				jsonPlayer.put("thruster", player.getThruster());
				jsonPlayer.put("score", player.getScore());
				arrayNodePlayers.addPOJO(jsonPlayer);
			}

			// Update bullets and handle collision
			for (Projectile projectile : getProjectiles()) {
				projectile.applyVelocity2Position();

				// Handle collision
				for (Player player : getPlayers()) {
					if ((projectile.getOwner().getPlayerId() != player.getPlayerId()) && player.intersect(projectile)) {
						//Al impactar un disparo le baja la vida
						player.setHealth(player.getHealth() - 20);
						projectile.setHit(true);
						
						//Aumenta la puntuacion del jugador que disparo
						Player otherPlayer = players.get(projectile.getOwner().getSession().getId());
						otherPlayer.setScore(otherPlayer.getScore() + 10);
						
						//Si mato al jugador le da puntos extra
						if (player.getHealth() == 0) {
							otherPlayer.setScore(otherPlayer.getScore() + 100);
							this.removePlayer(player, true);
						}
						
						break;
					}
				}

				ObjectNode jsonProjectile;
				synchronized(mapper) {
					jsonProjectile = mapper.createObjectNode();
				}
				jsonProjectile.put("id", projectile.getId());

				if (!projectile.isHit() && projectile.isAlive(thisInstant)) {
					jsonProjectile.put("posX", projectile.getPosX());
					jsonProjectile.put("posY", projectile.getPosY());
					jsonProjectile.put("facingAngle", projectile.getFacingAngle());
					jsonProjectile.put("isAlive", true);
				} else {
					removeBullets = true;
					bullets2Remove.add(projectile.getId());
					jsonProjectile.put("isAlive", false);
					if (projectile.isHit()) {
						jsonProjectile.put("isHit", true);
						jsonProjectile.put("posX", projectile.getPosX());
						jsonProjectile.put("posY", projectile.getPosY());
					}
				}
				arrayNodeProjectiles.addPOJO(jsonProjectile);
			}

			if (removeBullets)
				this.projectiles.keySet().removeAll(bullets2Remove);

			json.put("event", "GAME STATE UPDATE");
			json.putPOJO("players", arrayNodePlayers);
			json.putPOJO("projectiles", arrayNodeProjectiles);

			this.broadcast(json.toString());
		} catch (Throwable ex) {

		}
	}
}