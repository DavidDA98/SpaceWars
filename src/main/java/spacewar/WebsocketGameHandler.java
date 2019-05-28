package spacewar;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketGameHandler extends TextWebSocketHandler {

	private static final String PLAYER_ATTRIBUTE = "PLAYER";
	private static final String ROOM_ATTRIBUTE = "ROOM";
	
	private ObjectMapper mapper = new ObjectMapper();
	private AtomicInteger playerId = new AtomicInteger(0);
	private AtomicInteger projectileId = new AtomicInteger(0);
	
	private Map<Room, SpacewarGame> rooms = new ConcurrentHashMap<>();
	private Set<WebSocketSession> sesiones = new CopyOnWriteArraySet<>();
	
	private ScheduledExecutorService scheduler;

	private Lock roomLock = new ReentrantLock();
	private Lock playersLock = new ReentrantLock();
	private Lock schedulerLock = new ReentrantLock();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//Creamos el jugador y lo guardamos como atributo de la sesion
		Player player = new Player(playerId.incrementAndGet(), session);
		session.getAttributes().put(PLAYER_ATTRIBUTE, player);
		
		//Añadimos la sesion al conjunto de las sesiones
		sesiones.add(session);
		
		//Devolvemos los valores del jugador al cliente
		ObjectNode msg;
		synchronized(mapper) {
			msg = mapper.createObjectNode();
		}
		msg.put("event", "JOIN");
		msg.put("id", player.getPlayerId());
		msg.put("shipType", player.getShipType());
		synchronized(session) {
			player.getSession().sendMessage(new TextMessage(msg.toString()));
		}
		
		//Si el chat no esta encendido se activa
		schedulerLock.lock();
		try {
			if (scheduler == null) {
				scheduler = Executors.newScheduledThreadPool(1);
				scheduler.scheduleAtFixedRate(() -> updateChatUsers(), 1, 1, TimeUnit.SECONDS);
			}
		}finally {
			schedulerLock.unlock();
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		try {
			JsonNode node;
			ObjectNode msg;
			synchronized(mapper) {
				node = mapper.readTree(message.getPayload());
				msg = mapper.createObjectNode();
			}
			Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
			SpacewarGame swg;
			Room room;

			switch (node.get("event").asText()) {
			//Cuando recibe un mensaje del chat se lo envia a todos
			case "NEW MESSAGE":
				String chatMsg;
				chatMsg = node.get("sender").asText() + ": " + node.get("message").asText();

				msg.put("event", "NEW MESSAGE");
				msg.put("message", chatMsg);
				
				for(WebSocketSession s : sesiones) {
					synchronized(s) {
						s.sendMessage(new TextMessage(msg.toString()));
					}
				}
				break;
			//Cuando se une un jugador le devuelve su id y nave
			case "JOIN":
				msg.put("event", "JOIN");
				msg.put("id", player.getPlayerId());
				msg.put("shipType", player.getShipType());
				synchronized(player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			//Actualiza el nombre de usuario y la nave de un jugador
			case "UPDATE PLAYER":
				player.setUsername(node.get("username").asText()); 
				player.setShipType(node.get("ship").asText());
				break;
			//Crea una sala
			case "CREATE ROOM":
				boolean alreadyCreated = false;
				roomLock.lock();
				try {
					room = new Room(node.get("name").asText(), node.get("mode").asInt(), node.get("maxPlayers").asInt(), node.get("difficulty").asInt());
					//Comprueba que la sala no exista ya y si existe marca alredyCreated como true
					for(Room r: rooms.keySet()) {
						if (node.get("name").asText() == r.getRoomId()) {
							msg.put("event", "NEW ROOM");
							msg.put("name", -1);
							synchronized(player.getSession()) {
								player.getSession().sendMessage(new TextMessage(msg.toString()));
							}
							alreadyCreated = true;
							break;
						}
					}
					//Si la sala no existia, la guarda en un atributo, crea una instancia del juego y junto a la sala la guarda en el mapa
					if (!alreadyCreated) {
						session.getAttributes().put(ROOM_ATTRIBUTE, room);
					
						swg = new SpacewarGame();
						swg.addPlayer(player);
						rooms.put(room, swg);
					}
				}finally {
					roomLock.unlock();
				}
				//Si la sala no existia le devuelve al jugador los datos de la sala
				if (!alreadyCreated) {
					msg.put("event", "NEW ROOM");
					msg.put("name", room.getRoomId());
					msg.put("mode", room.getMode());
					msg.put("maxPlayers", room.getMaxPlayers());
					msg.put("difficulty", room.getDifficulty());
					msg.put("numPlayers", room.getCurrentPlayers());
					
					player.resetPlayer();
					synchronized(player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}
				break;
			//Une al jugador a una sala
			case "JOIN ROOM":
				boolean found = false;
				String sala = node.get("room").asText();
				//Busca la sala
				for(Room r: rooms.keySet()) {
					if (sala.equals(r.getRoomId())) {
						found = true;
						//La guarda en un atributo
						session.getAttributes().put(ROOM_ATTRIBUTE, r);
						swg = rooms.get(r);
						playersLock.lock();
						//Comprueba si hay espacio y añade el jugador al juego
						try {
							if (r.getMaxPlayers() > r.getCurrentPlayers()) {
								swg.addPlayer(player);
								r.updateCurrentPlayers(1);
								if (r.getMaxPlayers() == r.getCurrentPlayers()) {
									r.setFull(true);
								}
							} else {
								found = false;
							}
						}finally {
							playersLock.unlock();
						}
						
						//Si ha encontrado la sala le manda los datos al jugador
						if (found) {
							msg.put("event", "NEW ROOM");
							msg.put("name", r.getRoomId());
							msg.put("mode", r.getMode());
							msg.put("maxPlayers", r.getMaxPlayers());
							msg.put("difficulty", r.getDifficulty());
							msg.put("numPlayers", r.getCurrentPlayers());
							
							player.resetPlayer();
							synchronized(player.getSession()) {
								player.getSession().sendMessage(new TextMessage(msg.toString()));
							}
						}
						break;
					}
				}
				
				//Si no ha encontrado la sala le devulve un error
				if (!found) {
					msg.put("event", "NEW ROOM");
					msg.put("name", -1);
					synchronized(player.getSession()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				}
				break;
			//Te borra de la sala y si esta vacia detiene el juego
			case "LEAVE ROOM":
				room = (Room) session.getAttributes().get(ROOM_ATTRIBUTE);
				
				synchronized(room) {
					room.updateCurrentPlayers(-1);
					if (room.getCurrentPlayers() == 0) {
						rooms.remove(room).stopGameLoop();
					}
				}
				
				player.getSession().getAttributes().put(ROOM_ATTRIBUTE, "");
				break;
			//Devuelve todas las salas creadas
			case "GET ROOMS":
				ArrayNode arrayNodeRooms;
				synchronized(mapper) {
					arrayNodeRooms = mapper.createArrayNode();
				}
				msg.put("event", "GET ROOMS");
				for(Room r: rooms.keySet()) {
					if (!r.isFull()) {
						ObjectNode jsonRoom;
						synchronized(mapper) {
							jsonRoom = mapper.createObjectNode();
						}
						jsonRoom.put("name", r.getRoomId());
						jsonRoom.put("mode", r.getMode());
						jsonRoom.put("maxPlayers", r.getMaxPlayers());
						jsonRoom.put("difficulty", r.getDifficulty());
						arrayNodeRooms.addPOJO(jsonRoom);
					}
				}
				msg.putPOJO("rooms", arrayNodeRooms);
				synchronized(player.getSession()) {
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			//Se actualiza el movimiento del jugador si su vida es mayor a 0
			case "UPDATE MOVEMENT":
				if (player.getHealth() <= 0) {
					break;
				}
				//Solo gasta propulsor si avanza, no si gira o dispara
				if (player.getThruster() > 0) {
					player.loadMovement(node.path("movement").get("thrust").asBoolean(),
							node.path("movement").get("brake").asBoolean(),
							node.path("movement").get("rotLeft").asBoolean(),
							node.path("movement").get("rotRight").asBoolean());
					if (node.path("movement").get("thrust").asBoolean()) {
						player.setThruster(player.getThruster() - 1);
					}
				} else {
					player.loadMovement(false,
							node.path("movement").get("brake").asBoolean(),
							node.path("movement").get("rotLeft").asBoolean(),
							node.path("movement").get("rotRight").asBoolean());
				}
				if (node.path("bullet").asBoolean() && player.getAmmo() > 0) {
					player.setAmmo(player.getAmmo() - 1);
					room = (Room) session.getAttributes().get(ROOM_ATTRIBUTE);
					swg = rooms.get(room);
					
					Projectile projectile = new Projectile(player, this.projectileId.incrementAndGet());
					swg.addProjectile(projectile.getId(), projectile);
				}
				break;
			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
		//Si estaba en una sala se le borra de esta
		if (session.getAttributes().get(ROOM_ATTRIBUTE) instanceof Room) {
			Room room = (Room) session.getAttributes().get(ROOM_ATTRIBUTE);
			SpacewarGame swg = rooms.get(room);
			swg.removePlayer(player, false);
			
			//Si se ha vaciado se elimina
			synchronized(room) {
				room.updateCurrentPlayers(-1);
				if (room.getCurrentPlayers() == 0) {
					rooms.remove(room).stopGameLoop();
				}
			}
		}
		
		//Se borra la sesion del conjunto y si se queda vacio se para el chat
		sesiones.remove(session);
		
		schedulerLock.lock();
		try {
			if (sesiones.isEmpty()) {
				scheduler.shutdown();
				scheduler = null;
			}
		} finally {
			schedulerLock.unlock();
		}
	}
	
	//Manejador del chat
	private void updateChatUsers() {
		ObjectNode msg;
		ArrayNode arrayNodeUsuarios;
		synchronized(mapper) {
			msg = mapper.createObjectNode();
			arrayNodeUsuarios = mapper.createArrayNode();
		}
		
		msg.put("event", "updateChatUsers");
		//Para cada sesion se guarda el nombre de usuario y su sala
		for (WebSocketSession session : sesiones) {
			Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
			
			ObjectNode jsonUsuario;
			synchronized(mapper) {
				jsonUsuario = mapper.createObjectNode();
			}
			jsonUsuario.put("name", player.getUsername());
			
			if (session.getAttributes().get(ROOM_ATTRIBUTE) instanceof Room) {
				Room room = (Room) session.getAttributes().get(ROOM_ATTRIBUTE);
				jsonUsuario.put("room", "En sala: " + room.getRoomId());
			} else {
				jsonUsuario.put("room", "En menus");
			}
			arrayNodeUsuarios.addPOJO(jsonUsuario);
		}
		msg.putPOJO("usuarios", arrayNodeUsuarios);
		//Se envia el mensaje a todas las sesiones
		for(WebSocketSession s : sesiones) {
			try {
				synchronized(s) {
					s.sendMessage(new TextMessage(msg.toString()));
				}
			} catch (IOException e) {
				System.out.println("Se intento enviar un mensaje a la sesion: " + s + " pero ya se habia desconectado");
			}
		}
	}
}
