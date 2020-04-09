import React, { useState, useEffect } from 'react';
import { socket, cardsForRoom } from '../src/api';
import { GlobalStyles } from './StyledComponents';
import DashboardPage from './components/Dashboard/DashboardPage';
import GamePage from './components/Game/GamePage';

const App = () => {
	const [roomReady, setRoomReady] = useState(false);
	const [roomID, setRoomID] = useState();
	const [cards, setCards] = useState();
	const [opponentCardOpen, setOpponentCardOpen] = useState({});
	useEffect(() => {
		socket.on('joined room', rooms => {
			const room = rooms.filter(room => room.players.includes(socket.id))[0];
			if (room.players.length === 2) {
				setRoomReady(true);
				setRoomID(room.roomID);
				setCards(room.cards);
			}	else {
				cardsForRoom(room.roomID);
			}
		});
		socket.on('lets play', room => {
			setRoomID(room.roomID);
			setRoomReady(true);
			setCards(room.cards);
		});
		socket.on('player left room', () => {
			setRoomReady(false);
			setRoomID();
			setCards();
		});
		socket.on('opponent opened card', cardData => {
			const cardToOpen = cardData;
			setOpponentCardOpen(cardToOpen);
		});
	},[]);
  return (
	<div>
		<GlobalStyles />
		{roomReady && roomID
			? <GamePage
			roomID={roomID}
			cards={cards}
			opponentCardOpen={opponentCardOpen}
			/>
			: <DashboardPage />
		}
	</div>
  );
}

export default App;
