import React from 'react';
import Card from '../Game/Card';
import { StyledCardList } from '../../StyledComponents';

const CardList = (props) => (
	<StyledCardList>
		{
			props.cards.map((item) => (
				<Card
					key={item.id}
					id={item.id}
					pairID={item.pairID}
					image={item.img}
					cardOpen={item.isOpen}
					pairFound={item.pairFound}
					setCardIsOpen={props.setCardIsOpen}
					openCard={props.openCard}
					roomID={props.roomID}
				/>
			))
		}
	</StyledCardList>
);

export default CardList;
