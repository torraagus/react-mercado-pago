import styled from "styled-components";

export const Description = styled.p`
	letter-spacing: 3px;
`;

export const Price = styled.p`
	font-weight: bold;
	font-size: 24px;
	color: #581b98;
`;

export const Img = styled.img`
	// width: 90%;
	height: 50%;

	@media (max-width: 400px) {
		height: 40%;
	}
`;

export const List = styled.div`
    display: flex;
    width: 90vw;
    // flex-wrap: wrap;
    // align-items: center;
    // justify-content: center;
    // min-height 80vh;
	padding-bottom: 1rem;
	overflow-x: scroll;
	margin-top: 2rem;
`;

export const Product = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	height: 350px;
	margin: 0.5rem;
	background-color: white;
	-webkit-box-shadow: 10px 10px 5px 0px #651a1b31;
	-moz-box-shadow: 10px 10px 5px 0px #651a1b2f;
	box-shadow: 5px 5px 5px 0px #651a1b27;
	border: ${(props) => (props.isSelected ? "2px solid #9c1de7" : "none")};

	:hover {
		cursor: pointer;
		-webkit-box-shadow: 10px 10px 5px 0px #f3558e;
		-moz-box-shadow: 10px 10px 5px 0px #f3558e;
		box-shadow: 5px 5px 5px 0px #f3558e;
	}

	:active {
		cursor: pointer;
		opacity: 75%;
	}
`;
