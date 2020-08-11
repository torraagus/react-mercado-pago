import styled from "styled-components";

export const Title = styled.h1`
	color: #581b98;
	margin: 2rem 0 0 0;
	padding-top: 1rem;
`;

export const Subtitle = styled.p`
	color: #f3558e;
	letter-spacing: 3px;
	margin: 0;
	margin-bottom: 2rem;
`;

export const Button = styled.button`
	padding: 1rem 3rem 1rem 3rem;
	outline: none;
	border: none;
	color: #faee1c;
	font-weight: bold;
	background-color: #9c1de7;
	border-radius: 15px;

	-webkit-box-shadow: 10px 10px 5px 0px #651a1b31;
	-moz-box-shadow: 10px 10px 5px 0px #651a1b2f;
	box-shadow: 5px 5px 5px 0px #651a1b27;

	:hover {
		cursor: pointer;
		opacity: 90%;
	}

	:active {
		opacity: 75%;
	}
`;
