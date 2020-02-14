import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
	margin-top: 4rem;
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
		padding-bottom: 75%;
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
	@keyframes fadeIn {
		0%   { opacity: 0; }
		100% { opacity: 1; }
	  }
`;


