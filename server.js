const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let serverRooms = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', socket => {
	socket.on('join random room', id => {
		if (serverRooms.length) {
			const firstNotFullRoom = serverRooms.filter(room => room.players.length < 2)[0];
			if (firstNotFullRoom) {
				if (firstNotFullRoom.roomID === id) return;
				socket.join(firstNotFullRoom.roomID);
				const matchingRoom = serverRooms.find(matchingRoom => matchingRoom && matchingRoom.roomID === firstNotFullRoom.roomID);
				matchingRoom && matchingRoom.players.push(id);
				socket.to(matchingRoom.roomID).emit('lets play', matchingRoom);
			}	else {
				if (serverRooms.some(room => room.players.includes(id))) return;
				socket.join(id);
				serverRooms.push({"roomID": id, "players": [id]});
			}
		}	else {
			socket.join(id);
			serverRooms.push({"roomID": id, "players": [id]});
		}
		socket.emit('joined room', serverRooms);
	});

	socket.on('cards for room', (roomID, cardData) => {
		let room = serverRooms.find(room => room && room.roomID === roomID);
		const cards = cardData;
		serverRooms = serverRooms.map(serverRoom => {
			if (serverRoom.roomID === room.roomID) {
				serverRoom = { ...serverRoom, cards}
			}
			return serverRoom;
		});
	});

	socket.on('card opened', (roomID, cardData) => {
		socket.to(roomID).emit('opponent opened card', cardData);
	});

	// TODO for playing with friend
	// socket.on('check for room', (id, roomcode) => {
	// 	const isRoom = serverRooms.some(room => room === roomcode);
	// 	if (isRoom) {
	// 		socket.join(roomcode);
	// 		socket.to(`${roomcode} host`).emit('add player', id, roomcode);
	// 		socket.emit('joined room');
	// 	} else {
	// 		socket.emit('no room found');
	// 	}
	// });

	socket.on('disconnect', () => {
		const leftRoom = serverRooms.filter(room => room.players.includes(socket.id))[0];
		if (!leftRoom) return;
		leftRoom.players.forEach(player => {
			socket.leave(player);
		});
		serverRooms = serverRooms.filter(room => room.roomID !== leftRoom.roomID);
		socket.to(leftRoom.roomID).emit('player left room', serverRooms);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});