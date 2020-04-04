const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const serverRooms = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', socket => {
	console.log('a user connected');

	// socket.on('join room', roomcode => {
	// 	socket.join(roomcode);
	// });

	// socket.on('add room', roomcode => {
	// 	serverRooms.push(roomcode);
	// });

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

	socket.on('disconnect', reason => {
		console.log('disconnected:', reason);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});