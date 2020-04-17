import React from 'react';
import { StyledDashboard, StyledButton } from '../../StyledComponents';
import DashboardHeader from './DashboardHeader';
import { socket, joinRandomRoom } from '../../api';
import WaitingForOtherPlayer from '../Modals/WaitingForOtherPlayer';

const DashboardPage = props => {
	const findRandomGame = () => {
		joinRandomRoom(socket.id);
	};
	return (
		<div>
		<StyledDashboard>
			<DashboardHeader />
			<div>
				<StyledButton
					onClick={findRandomGame}
				>
					Pelaa heti</StyledButton>
				<StyledButton>Kutsu kaveri</StyledButton>
			</div>
		</StyledDashboard>
		{ props.gameInSearch &&
			<WaitingForOtherPlayer
				gameInSearch={props.gameInSearch}
				isGameInSearch={props.isGameInSearch}
				playerID={props.playerID}
				roomID={props.roomID}
			/>
		}
		</div>
	);
}

export default DashboardPage;
