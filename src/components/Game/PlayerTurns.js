import React from 'react';
import { StyledPlayerTurns, StyledOverlay } from '../../StyledComponents';

const PlayerTurns = props => (
	<div>
	<StyledPlayerTurns>
		<h2>Vuoro</h2>
		{!props.isOpponentsTurn ? <p>Sinun vuorosi</p> : <p>Vastustajan vuoro</p>}
	</StyledPlayerTurns>
	{props.isOpponentsTurn &&
		<StyledOverlay></StyledOverlay>
	}
	</div>
);

export default PlayerTurns;