import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
	}
	body {
		font-family: 'Open Sans', sans-serif;
		background-color: #333333;
	}
	h1 {
		margin-top: 0;
	}
`;

export const StyledDashboard = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`;

export const StyledHeader = styled.div`
	margin-top: 2rem;
	margin-bottom: 2rem;
	color: white;
	text-align: center;
`;

export const StyledButton = styled.button`
	border: 1px solid #00a7f1;
	background-color: #333333;
	color: #00a7f1;
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	padding: .75rem 1.5rem;
	cursor: pointer;
	:hover {
		background-color: rgba(0, 167, 241, 0.08);
	}
	+ button {
		margin-left: 1rem;
	}
`;

export const StyledCardList = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 10px;
	margin-top: 3rem;
	@media only screen and (min-width: 600px) {
		margin-top: 4rem;
	}
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
	@media only screen and (min-width: 600px) {
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	}
	@media only screen and (min-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(234px, 1fr));
	}
	@media only screen and (min-width: 992px) {
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	}
	@media only screen and (min-width: 1100px) {
		grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
	}
	@media only screen and (min-width: 1270px) {
		grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
	}
	grid-auto-rows: 1fr;
	grid-gap: 20px 10px;
	:before {
		content: '';
		width: 0;
		padding-bottom: 85%;
		grid-row: 1 / 1;
		grid-column: 1 / 1;
	}
	> *:first-child {
		grid-row: 1 / 1;
		grid-column: 1 / 1;
	}
`;

export const StyledCard = styled.div`
	height: 100%;
	margin-bottom: 8px;
	background-color: #00a7f1;
	border-radius: .25rem;
	border: 5px solid #fff;
	box-shadow: 1px 0px 5px 0px rgba(255,255,255,0.15);
	cursor: pointer;
	transition: ease-out all .25s;
	position: relative;
	:hover {
		background: rgba(44, 167, 241, .8);
	}
	> img {
		width: 100%;
		height: 100%;
		position: absolute;
		object-fit: cover;
	}
	&.open {
		> img {
			animation: fadeIn .5s forwards ease-out;
		}
	}
	&.disabled {
		pointer-events: none;
	}
	@keyframes fadeIn {
		0%   { opacity: 0; }
		100% { opacity: 1; }
	  }
`;

export const StyledStats = styled.div`
	margin-top: 3rem;
	@media only screen and (min-width: 600px) {
		margin-top: 4rem;
	}
	margin-bottom: 2rem;
	color: white;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media only screen and (min-width: 600px) {
		flex-direction: row;
		align-items: start;
	}
	& .duration {
		margin-bottom: 2rem;
		@media only screen and (min-width: 600px) {
			margin-bottom: 0;
			margin-right: 6rem;
		}
		& p {
			margin: 0;
		}
	}
	& .points {
		display: flex;
		justify-content: center;
		& h4 {
			border-bottom: 1px solid;
			margin-top: 0;
		}
		& > div {
			padding: 0 30px;
			&:first-child {
				color: #07c307;
			}
			&:last-child {
				color: #ff1818;
			}
		}
	}
`;

export const StyledModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledModalContent = styled.div`
	position: relative;
	width: 100%;
	max-width: 600px;
	margin: 0 1rem;
	background: #303844;
	color: #ffffff;
	padding: 2rem;
	padding-top: 50px;
	text-align: center;
	border-radius: .25rem;
	box-shadow: 1px 0px 5px 0px rgba(48,56,68,.5);
	& h3 {
		margin: 0;
		font-weight: normal;
	}
`;

export const StyledModalClose = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: .5rem;
	padding-top: 0;
	font-size: 20px;
	cursor: pointer;
`;

export const StyledLoader = styled.div`
	color: #ffffff;
	font-size: 8px;
	margin: 0 auto;
	margin-bottom: 35px;
	position: relative;
	text-indent: -9999em;
	transform: translateZ(0);
	animation-delay: -0.16s;
	border-radius: 50%;
	width: 2.5em;
	height: 2.5em;
	animation-fill-mode: both;
	animation: loader 1.8s infinite ease-in-out;
	:before, :after {
		content: '';
		position: absolute;
		top: 0;
		border-radius: 50%;
		width: 2.5em;
		height: 2.5em;
		animation-fill-mode: both;
		animation: loader 1.8s infinite ease-in-out;
	}
	:before {
		left: -3.5em;
  		animation-delay: -0.32s;
	}
	:after {
		left: 3.5em;
	}
	@keyframes loader {
		0%,
		80%,
		100% {
			box-shadow: 0 2.5em 0 -1.3em;
		}
		40% {
			box-shadow: 0 2.5em 0 0;
		}
	}
`;




