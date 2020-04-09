import React,  {useState, useEffect } from 'react';
import CardList from '../Game/CardList';
import GameHeader from './GameHeader';
import GameStatistics from './GameStatistics';
import { openCard } from '../../api';

let gameTimer;

const GamePage = props => {
	const [cards, setCards] = useState([]);
	const [cardsOpened, setCardsOpened] = useState([]);
	const [gameDuration, setGameDuration] = useState({seconds: 0, formattedDuration: ''});
	const [allPairsFound, setAllPairsFound] = useState(false);
	const [opponentCardOpen, setOpponentCardOpen] = useState({});
	const setCardIsOpen = ((id, pairID, isOpen) => {
		if (cardsOpened.length === 2) {
			return;
		}	else {
			setCards([
				...cards.map((card) => {
					if (card.id === id)	card.isOpen = !isOpen;
					return card;
				})
			]);
			setCardsOpened([
				...cardsOpened,
				{
					cardID: id,
					pairID
				}
			]);
		}
	});
	useEffect(() => {
		if (cardsOpened.length === 2) {
			const setIsPair = () => {
				const card1 = cardsOpened[0];
				const card2 = cardsOpened[1];
				if (card1.pairID === card2.pairID && card1.cardID !== card2.cardID) {
					setCards([
						...cards.map((card) => {
							if (card.id === card1.cardID || card.id === card2.cardID) card.pairFound = true;
							return card;
						})
					]);
				}	else {
					const cardItem = document.querySelectorAll('.Card');
					[...cardItem].forEach((item) => {
						item.classList.add('disabled');
					});
					setTimeout(() => {
						setCards([
							...cards.map((card) => {
								if (!card.pairFound) card.isOpen = false;
								return card;
							})
						]);
						[...cardItem].forEach((item) => {
							item.classList.remove('disabled');
						});
					}, 1000);
				}
				setCardsOpened([]);
			};
		setIsPair();
		}
		return () => ({});
	}, [cards, cardsOpened]);
	useEffect(() => {
		const setAreAllPairsFound = () => {
			const allCards = cards;
			if (allCards.length) {
				const allPairsAreFound = allCards.every(item => item.pairFound === true);
				setAllPairsFound(allPairsAreFound);
			}
		};
		setAreAllPairsFound();
		return () => ({});
	}, [cards])
	useEffect(() => {
		const setGamePlayedDuration = () => {
			const minutes = Math.floor(gameDuration.seconds / 60);
			const seconds = gameDuration.seconds - (minutes * 60) + 1;
			let formattedTime;
			formattedTime = minutes > 0 ? `${minutes}m ${seconds}s` : `${gameDuration.seconds + 1}s`;
			setGameDuration({
				...gameDuration,
				seconds: gameDuration.seconds + 1,
				formattedDuration: formattedTime
			});
		}
		gameTimer = setTimeout(() => {
			setGamePlayedDuration();
		}, 1000);
		return () => {
			window.clearTimeout(gameTimer);
		};
	},[gameDuration])
	useEffect(() => {
		allPairsFound && window.clearTimeout(gameTimer);
	},[allPairsFound])
	useEffect(() => {
		if (props.cards) setCards(props.cards);
		setOpponentCardOpen(props.opponentCardOpen);
	},[props])
	useEffect(() => {
		if (Object.keys(opponentCardOpen).length === 0 && opponentCardOpen.constructor === Object) return;
		setCards(c => {
			const cardsArr = [
				...c.map((card) => {
					if (card.id === opponentCardOpen.id) card.isOpen = !opponentCardOpen.isOpen;
					return card;
				})]
			;
			return cardsArr;
		});
		setCardsOpened(c => {
			const cardsOpenedArr = [...c,
			{
				cardID: opponentCardOpen.id,
				pairID: opponentCardOpen.pairID
			}
		];
		return cardsOpenedArr;
		});
		return () => ({});
	}, [opponentCardOpen])
	return (
		<div>
			<GameHeader />
			<CardList
				cards={cards}
				setCardIsOpen={setCardIsOpen}
				openCard={openCard}
				roomID={props.roomID}
			/>
			<GameStatistics
				formattedGameDuration={gameDuration.formattedDuration}
			/>
		</div>
	);
}

export default GamePage;
