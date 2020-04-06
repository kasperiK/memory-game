import React, { useState, useEffect } from 'react';
import { socket } from '../src/api';
import { GlobalStyles } from './StyledComponents';
import DashboardPage from './components/Dashboard/DashboardPage';
import GamePage from './components/Game/GamePage';

const App = () => {
	const [roomReady, setRoomReady] = useState(false);
	useEffect(() => {
		socket.on('joined room', rooms => {
			console.log('joined');
			console.log(socket.id);
			const room = rooms.filter(room => room.players.includes(socket.id))[0];
			if (room.players.length === 2) setRoomReady(true);
		});
		socket.on('lets play', room => {
			console.log('lets play');
			console.log(room);
			setRoomReady(true);
		});
		socket.on('player left room', rooms => {
			console.log('player left room');
			console.log(rooms);
			setRoomReady(false);
		});
	},[]);
  return (
	<div>
		<GlobalStyles />
		{roomReady
			? <GamePage />
			: <DashboardPage />
		}
	</div>
  );
}

export default App;
