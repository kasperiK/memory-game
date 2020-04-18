import React,  {useState, useEffect } from 'react';
import CardList from '../Game/CardList';
import GameHeader from './GameHeader';
import GameStatistics from './GameStatistics';
import WaitingForOtherPlayer from '../Modals/WaitingForOtherPlayer';
import OtherPlayerLeftGame from '../Modals/OtherPlayerLeftGame';
import { openCard } from '../../api';

let gameTimer;

const GamePage = (
	{
		roomID,
		cards,
		opponentCardOpen,
		playerLeftRoom,
		gameInSearch,
		isGameInSearch,
		playerID,
		setRoomAsNotReady,
		clearRoomID,
		clearCards,
		clearOpponentCardOpen,
		clearPlayerLeftRoom
	}
) => {
	const [gameCards, setGameCards] = useState([]);
	const [cardsOpened, setCardsOpened] = useState([]);
	const [gameDuration, setGameDuration] = useState({seconds: 0, formattedDuration: ''});
	const [allPairsFound, setAllPairsFound] = useState(false);
	const [isOpponentCardOpen, setIsOpponentCardOpen] = useState({});
	const [isOpponentInGame, setIsOpponentInGame] = useState(true);
	const setCardIsOpen = ((id, pairID, isOpen) => {
		if (cardsOpened.length === 2) {
			return;
		}	else {
			setGameCards([
				...gameCards.map((card) => {
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
	const clearTimer = timer => {
		window.clearTimeout(timer);
	};
	const clearGameDuration = () => {
		setGameDuration({seconds: 0, formattedDuration: ''});
	};
	const clearCardsOpened = () => {
		setCardsOpened([]);
	}
	useEffect(() => {
		if (cardsOpened.length === 2) {
			const setIsPair = () => {
				const card1 = cardsOpened[0];
				const card2 = cardsOpened[1];
				if (card1.pairID === card2.pairID && card1.cardID !== card2.cardID) {
					setGameCards([
						...gameCards.map((card) => {
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
						setGameCards([
							...gameCards.map((card) => {
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
		return () => {};
	}, [gameCards, cardsOpened]);
	useEffect(() => {
		const setAreAllPairsFound = () => {
			const allCards = gameCards;
			if (allCards.length) {
				const allPairsAreFound = allCards.every(item => item.pairFound === true);
				setAllPairsFound(allPairsAreFound);
			}
		};
		setAreAllPairsFound();
		return () => ({});
	}, [gameCards])
	useEffect(() => {
		if (!isOpponentInGame) return;
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
			clearTimer(gameTimer);
		};
	},[isOpponentInGame, gameDuration])
	useEffect(() => {
		allPairsFound && clearTimer(gameTimer);
	},[allPairsFound])
	useEffect(() => {
		if (cards) setGameCards(cards);
	},[cards])
	useEffect(() => {
		setIsOpponentCardOpen(opponentCardOpen);
	},[opponentCardOpen])
	useEffect(() => {
		setIsOpponentInGame(!playerLeftRoom);
	},[playerLeftRoom])
	useEffect(() => {
		if (Object.keys(isOpponentCardOpen).length === 0 && isOpponentCardOpen.constructor === Object) return;
		setGameCards(c => {
			const cardsArr = [
				...c.map((card) => {
					if (card.id === isOpponentCardOpen.id) card.isOpen = !isOpponentCardOpen.isOpen;
					return card;
				})]
			;
			return cardsArr;
		});
		setCardsOpened(c => {
			const cardsOpenedArr = [...c,
			{
				cardID: isOpponentCardOpen.id,
				pairID: isOpponentCardOpen.pairID
			}
		];
		return cardsOpenedArr;
		});
		return () => {};
	}, [isOpponentCardOpen])
	return (
		<div>
			<GameHeader />
			<CardList
				gameCards={gameCards}
				setCardIsOpen={setCardIsOpen}
				openCard={openCard}
				roomID={roomID}
			/>
			<GameStatistics
				formattedGameDuration={gameDuration.formattedDuration}
			/>
			{(!isOpponentInGame && !gameInSearch) &&
				<OtherPlayerLeftGame
					isGameInSearch={isGameInSearch}
					setRoomAsNotReady={setRoomAsNotReady}
					clearRoomID={clearRoomID}
					clearCards={clearCards}
					clearOpponentCardOpen={clearOpponentCardOpen}
					clearPlayerLeftRoom={clearPlayerLeftRoom}
					gameTimer={gameTimer}
					clearTimer={clearTimer}
					clearGameDuration={clearGameDuration}
					clearCardsOpened={clearCardsOpened}
				/>
			}
			{ gameInSearch &&
				<WaitingForOtherPlayer
					gameInSearch={gameInSearch}
					isGameInSearch={isGameInSearch}
					playerID={playerID}
					roomID={roomID}
				/>
			}
		</div>
	);
}

export default GamePage;
