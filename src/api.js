const io = require('socket.io-client');
const socket = io('http://localhost:3000');

const joinRandomRoom = (id) => {
    socket.emit('join random room', id);
};

export { socket, joinRandomRoom };
