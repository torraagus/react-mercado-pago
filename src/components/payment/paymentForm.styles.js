import styled from "styled-components";

export const SubmitBtn = styled.input`
	background-color: #581b98;
	color: #faee1c;
	font-weight: bold;
	outline: none;
	border: none;
	text-transform: uppercase;
	height: 50px;
	width: 40%;
	align-self: center;
	text-indent: 0;
	border-radius: 15px;
	letter-spacing: 2px;
	margin-top: 2rem;

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

	@media (max-width: 512px) {
		margin-top: 1rem;
		width: 100%;
	}
`;

export const Select = styled.select`
	height: 40px;
	text-indent: 0.25rem;
	letter-spacing: 1px;
`;

export const Form = styled.form`
	width: 40%;
	display: ${(props) => (props.isVisible ? "none" : "flex")};
	flex-wrap: wrap;
	margin: 2rem 0 1rem 0;
	padding-bottom: 2rem;
	// justify-content: center;
	// background-color: tomato;

	@media (max-width: 1366px) {
		width: 60%;
	}

	@media (max-width: 1024px) {
		width: 70%;
	}

	@media (max-width: 768px) {
		width: 80%;
	}

	@media (max-width: 512px) {
		width: 90%;
		// height: 40vh;
		// overflow-y: auto;
	}
`;

export const InputWrapper = styled.p`
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 100%;
	margin: 0.5rem 0.25rem 0.5rem 0.25rem;

	@media (max-width: 2000px) {
		:nth-child(1),
		:nth-child(2) {
			width: 47%;
		}

		:nth-child(6),
		:nth-child(9) {
			width: 100%;
		}

		:nth-child(3),
		:nth-child(4),
		:nth-child(7) {
			width: 31%;
		}

		:nth-child(8) {
			width: 65%;
		}

		:nth-child(5) {
			width: 31%;
		}
	}

	@media (max-width: 768px) {
		width: 100%;

		:nth-child(3),
		:nth-child(4),
		:nth-child(7) {
			width: 31%;
		}

		:nth-child(8) {
			width: 65%;
		}

		:nth-child(5) {
			width: 31%;
		}
	}

	@media (max-width: 512px) {
		width: 100%;

		:nth-child(n) {
			width: 100%;
		}
	}
`;

export const Input = styled.input`
	height: 34px;
	text-indent: 0.5rem;
	letter-spacing: 1px;

	:focus {
		outline: none;
		border: 1px solid #f3558e;
		border-bottom: 2px solid #9c1de7;
		border-left: 2px solid #9c1de7;
		background-color: #9d1de713;
	}
`;

export const Label = styled.label`
	letter-spacing: 2px;
	margin-bottom: 0.5rem;
`;

export const CardWrapper = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	background-color: #581b98;
	width: 100vw;
	padding: 1rem 0 1rem 0;

	@media (min-width: 768px) {
		width: 75vw;
	}
`;

export const ErrorWrapper = styled.div`
	border: 1px solid #ff304f;
	border-bottom: 3px solid #ff304f;
	padding-bottom: 0.5rem;
	margin-top: 1rem;
	border-radius: 0 0 15px 15px;
	text-align: left;
	width: 40%;
	// background-color: #ff304f;
	color: #ff304f;

	@media (max-width: 1366px) {
		width: 60%;
	}

	@media (max-width: 1024px) {
		width: 70%;
	}

	@media (max-width: 768px) {
		width: 80%;
	}

	@media (max-width: 512px) {
		width: 90%;
	}
`;

export const Error = styled.p`
	text-transform: uppercase;
	font-size: 18px;
	font-weight: bold;
	margin: 0;
	background-color: #ff304f;
	padding: 1rem;
	color: white;
	letter-spacing: 1px;
	display: flex;
	align-items: center;
`;

export const ErrorMessage = styled.p`
	padding-left: 1rem;
	letter-spacing: 2px;
	::first-letter {
		text-transform: capitalize;
	}
`;

export const ErrorList = styled.ul`
	list-style: none;
	padding: 0;
`;

export const ErrorCause = styled.li`
	padding-left: 1rem;
	letter-spacing: 1px;
	font-weight: 500;
`;

export const CauseDescription = styled.p`
	margin: 0;
	display: inline-block;
	::first-letter {
		text-transform: capitalize;
	}
`;
