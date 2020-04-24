import React from 'react';
import { StyledStats } from '../../StyledComponents';

const GameHeader = props => (
	<StyledStats>
		<div className="duration">
			<h2>Pelin kesto</h2>
			{props.formattedGameDuration && <p>{props.formattedGameDuration}</p>}
		</div>
		<div>
			<h2>Pisteet</h2>
			<div className="points">
				<div>
					<h4>Sinä</h4>
					<h3>{props.points}</h3>
				</div>
				<div>
					<h4>Vastustaja</h4>
					<h3>{props.opponentPoints}</h3>
				</div>
			</div>
		</div>
	</StyledStats>
);

export default GameHeader;