import cardData from '../src/cardData';
import shuffleCards from '../src/utils';

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

const joinRandomRoom = id => {
    socket.emit('join random room', id);
};

const cardsForRoom = roomID => {
	socket.emit('cards for room', roomID, shuffleCards(cardData));
};

export { socket, joinRandomRoom, cardsForRoom };
