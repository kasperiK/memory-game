import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from '../StyledComponents';
import DashboardPage from '../components/Dashboard/DashboardPage';
import GamePage from '../components/Game/GamePage';

const AppRouter = () => (
<BrowserRouter>
	<GlobalStyles />
	<div>
		<Switch>
			<Route path="/" component={ DashboardPage } exact={true} />
			<Route path="/game" component={ GamePage } />
		</Switch>
	</div>
</BrowserRouter>
);

export default AppRouter;