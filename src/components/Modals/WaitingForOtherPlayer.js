import React from 'react';
import { leaveRoom } from '../../api';
import { StyledModal, StyledModalContent, StyledModalClose, StyledLoader } from '../../StyledComponents';

const WaitingForOtherPlayer = props => {
	return (
		<StyledModal>
			<StyledModalContent>
			<StyledModalClose
				onClick={() => {
					leaveRoom(props.roomID, props.playerID);
					props.isGameInSearch(props.gameInSearch)
				}}
			>
				x
			</StyledModalClose>
			<h3>Etsitään peliä</h3>
			<StyledLoader />
			</StyledModalContent>
		</StyledModal>
	);
}

export default WaitingForOtherPlayer;