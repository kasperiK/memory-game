import React from 'react';
import { StyledDashboard, StyledButton } from '../../StyledComponents';
import DashboardHeader from './DashboardHeader';
import { socket, joinRandomRoom } from '../../api';

const DashboardPage = (props) => {
	const findRandomGame = () => {
		joinRandomRoom(socket.id);
	};
	return (
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
	);
}

export default DashboardPage;
