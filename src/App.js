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
	const [gameInSearch, setGameInSearch] = useState(false);
	const [playerID, setPlayerID] = useState();

	const isGameInSearch = gameInSearchStatus => {
		setGameInSearch(!gameInSearchStatus);
	};
	useEffect(() => {
		socket.on('joined room', rooms => {
			const room = rooms.filter(room => room.players.includes(socket.id))[0];
			setRoomID(room.roomID);
			if (room.players.length === 2) {
				setRoomReady(true);
				setCards(room.cards);
				setGameInSearch(false);
			}	else {
				cardsForRoom(room.roomID);
				setGameInSearch(true);
				setPlayerID(socket.id);
			}
		});
		socket.on('lets play', room => {
			setRoomID(room.roomID);
			setRoomReady(true);
			setCards(room.cards);
			setGameInSearch(false);
		});
		socket.on('player left room', () => {
			setRoomReady(false);
			setRoomID();
			setCards();
			setOpponentCardOpen({});
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
			: <DashboardPage
				gameInSearch={gameInSearch}
				isGameInSearch={isGameInSearch}
				roomID={roomID}
				playerID={playerID}
			/>
		}
	</div>
  );
}

export default App;
