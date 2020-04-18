import React, { useRef, useEffect } from 'react';
import { leaveRoom } from '../../api';
import { StyledModal, StyledModalContent, StyledModalClose, StyledLoader } from '../../StyledComponents';

const WaitingForOtherPlayer = props => {
	const ref = useRef(null);
	useEffect(() => {
		const handleOutsideClick = e => {
			if (!(ref.current).contains(e.target)) {
				props.isGameInSearch(props.gameInSearch);
				leaveRoom(props.roomID, props.playerID);
			}
		};
		document.addEventListener('click', handleOutsideClick);
		return (() => document.removeEventListener('click', handleOutsideClick));
	},[props]);
	return (
		<StyledModal>
			<StyledModalContent ref={ref}>
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