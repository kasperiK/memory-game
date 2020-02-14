import React from 'react';
import { StyledCard } from '../../StyledComponents';

const Card = (props) => (
		<StyledCard
			className={`${props.cardOpen ? 'open' : ''}${props.pairFound ? ' pairFound' : ''}`}
			onClick={() => {
				!props.pairFound && !props.cardOpen &&
				props.setCardIsOpen(props.id, props.pairID, props.cardOpen)
			}}
		>
		{props.cardOpen && <img src={props.image} alt=""/>}
		</StyledCard>
);

export default Card;