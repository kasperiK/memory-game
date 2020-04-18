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
	const [playerLeftRoom, setPlayerLeftRoom] = useState(false);

	const isGameInSearch = gameInSearchStatus => {
		setGameInSearch(!gameInSearchStatus);
	};
	const setRoomAsNotReady = () => {
		setRoomReady(false);
	};
	const clearRoomID = () => {
		setRoomID();
	};
	const clearCards = () => {
		setCards();
	};
	const clearOpponentCardOpen = () => {
		setOpponentCardOpen({});
	};
	const clearPlayerLeftRoom = () => {
		setPlayerLeftRoom(false);
	};
	useEffect(() => {
		socket.on('joined room', rooms => {
			const room = rooms.filter(room => room.players.includes(socket.id))[0];
			setRoomID(room.roomID);
			if (room.players.length === 2) {
				setRoomReady(true);
				setCards(room.cards);
				setGameInSearch(false);
				clearPlayerLeftRoom();
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
			clearPlayerLeftRoom();
		});
		socket.on('player left room', () => {
			setPlayerLeftRoom(true);
		});
		socket.on('opponent opened card', cardData => {
			const cardToOpen = cardData;
			setOpponentCardOpen(cardToOpen);
		});
	},[]);
  return (
	<div>
		<GlobalStyles />
		{roomReady
			? <GamePage
				roomID={roomID}
				cards={cards}
				opponentCardOpen={opponentCardOpen}
				playerLeftRoom={playerLeftRoom}
				gameInSearch={gameInSearch}
				isGameInSearch={isGameInSearch}
				playerID={playerID}
				setRoomAsNotReady={setRoomAsNotReady}
				clearRoomID={clearRoomID}
				clearCards={clearCards}
				clearOpponentCardOpen={clearOpponentCardOpen}
				clearPlayerLeftRoom={clearPlayerLeftRoom}
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
