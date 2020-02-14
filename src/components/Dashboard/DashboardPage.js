import React from 'react';
import { StyledDashboard, StyledButton } from '../../StyledComponents';
import DashboardHeader from './DashboardHeader';

const DashboardPage = () => {
	return (
		<StyledDashboard>
			<DashboardHeader />
			<div>
				<StyledButton>Pelaa heti</StyledButton>
				<StyledButton>Kutsu kaveri</StyledButton>
			</div>
		</StyledDashboard>
	);
}

export default DashboardPage;
