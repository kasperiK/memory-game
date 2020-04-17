import React from 'react';
import { StyledCard } from '../../StyledComponents';

const Card = (props) => (
		<StyledCard
			className={`Card${props.cardOpen ? ' open' : ''}${props.pairFound ? ' pairFound' : ''}`}
			onClick={() => {
				if (!props.pairFound && !props.cardOpen) {
					props.setCardIsOpen(props.id, props.pairID, props.cardOpen)
					props.openCard(props.roomID, {"id": props.id, "pairID": props.pairID, "isOpen": props.cardOpen});
				}
			}}
		>
		{props.cardOpen && <img src={props.image} alt=""/>}
		</StyledCard>
);

export default Card;