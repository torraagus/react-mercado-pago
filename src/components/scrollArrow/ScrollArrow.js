import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";

const Arrow = styled.div`
	position: fixed;
	right: 2rem;
	bottom: 2rem;
	z-index: 1;
	cursor: pointer;
	animation: fadeIn 1s;
	transition: opacity 1s;
    opacity: 0.5;
	border-radius: 45px;
	background-color: #f3558e;
	color: #faee1c;
	-webkit-box-shadow: 10px 10px 5px 0px #651a1b31;
	-moz-box-shadow: 10px 10px 5px 0px #651a1b2f;
	box-shadow: 5px 5px 5px 0px #651a1b27;
	:hover {
		opacity: 1;
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.5;
		}
	}
	@media screen and (max-width: 1024px) {
		opacity: 1;
		animation: none;
        transition: none;
    }
    
`;

const ScrollArrow = ({ onArrowPressed, show }) => {

	const handleOnClick = () => {
		onArrowPressed();
	};

	return (
		<Arrow onClick={handleOnClick}>
			<AiFillCloseCircle
				size={60}
				style={{ display: show ? "flex" : "none" }}
			/>
		</Arrow>
	);
};

export default ScrollArrow;
