import React from 'react';
import { StyledModal, StyledModalContent, StyledButton, StyledModalBtnGroup } from '../../StyledComponents';
import { socket, joinRandomRoom } from '../../api';

const OtherPlayerLeftGame = props => {
	return (
		<StyledModal>
			<StyledModalContent>
			<h3>Yhteys toiseen pelaajaan katkesi</h3>
			<StyledModalBtnGroup>
				<StyledButton onClick={() => {
					props.isGameInSearch(props.gameInSearch)
					props.clearRoomID()
					props.clearCards()
					props.clearOpponentCardOpen()
					props.clearTimer(props.gameTimer)
					props.clearGameDuration()
					props.clearCardsOpened()
					joinRandomRoom(socket.id)
					props.setPoints(0)
					props.setOpponentPoints(0)
				}}
				>
					Etsi uusi peli
				</StyledButton>
				<StyledButton onClick={() => {
					props.setRoomAsNotReady()
					props.clearRoomID()
					props.clearCards()
					props.clearOpponentCardOpen()
					props.clearPlayerLeftRoom()
					props.setPoints(0)
					props.setOpponentPoints(0)
				}}
				>
					Aloitussivulle
				</StyledButton>
			</StyledModalBtnGroup>
			</StyledModalContent>
		</StyledModal>
	);
}

export default OtherPlayerLeftGame;