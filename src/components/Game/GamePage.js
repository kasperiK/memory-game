import React,  {useState, useEffect } from 'react';
import cardData from '../../cardData';
import CardList from '../Game/CardList';
import GameHeader from './GameHeader';
import shuffleCards from '../../utils';

const GamePage = () => {
	const [cards, setCards] = useState([]);
	const [cardsOpened, setCardsOpened] = useState([]);
	const setCardIsOpen = (id, pairID, isOpen) => {
		if (cardsOpened.length >= 2) {
			return;
		}	else {
			setCards([
				...cards.map((card) => {
					if (card.id === id)	card.isOpen = !isOpen;
					return card;
				})
			])
			setCardsOpened([
				...cardsOpened,
				{
					cardID: id,
					pairID
				}
			])
		}
	};
	useEffect(() => {
		if (cardsOpened.length >= 2) {
		const setIsPair = () => {
			const card1 = cardsOpened[0];
			const card2 = cardsOpened[1];
			if (card1.pairID === card2.pairID && card1.cardID !== card2.cardID) {
				setCards([
					...cards.map((card) => {
						if (card.id === card1.cardID || card.id === card2.cardID) card.pairFound = true;
						return card;
					})
				])
			}	else {
				setTimeout(() => {
					setCards([
						...cards.map((card) => {
							if (!card.pairFound) card.isOpen = false;
							return card;
						})
					])
				}, 1000);
			}
			setCardsOpened([]);
		};
		setIsPair();
		}
	}, [cards, cardsOpened]);
	useEffect(() => {
		setCards(shuffleCards(cardData));
	},[])
	return (
		<div>
			<GameHeader />
			<CardList
				cards={cards}
				setCardIsOpen={setCardIsOpen}
			/>
		</div>
	);
}

export default GamePage;
