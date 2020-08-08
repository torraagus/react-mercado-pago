import React, { useState } from "react";
import styled from "styled-components";

const Description = styled.p`
	letter-spacing: 3px;
`;

const Price = styled.p`
	font-weight: bold;
	font-size: 24px;
	color: #581b98;
`;

const Img = styled.img`
	// width: 90%;
	height: 50%;

	@media (max-width: 400px) {
		height: 40%;
	}
`;

const List = styled.div`
	display: flex;
	width: 90vw;
	padding-bottom: 1rem;
    overflow-x: scroll;
    margin-top: 2rem;
`;

const Product = styled.div`
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

export const Products = ({ onProductSelected }) => {
	const [selected, setSelected] = useState(-1);
	const products = [
		{ id: "01", img: "./images/img01.png", desc: "Prod #1", price: 156.99 },
		{ id: "02", img: "../images/img01.png", desc: "Prod #2", price: 299.99 },
		{ id: "03", img: "../../images/img01.png", desc: "Prod #3", price: 75.49 },
		{ id: "04", img: "../images/img01.png", desc: "Prod #4", price: 520.99 },
		{ id: "05", img: "../../images/img01", desc: "Prod #5", price: 499.99 },
		{ id: "06", img: "../../images/img01", desc: "Prod #6", price: 1359.29 },
		{ id: "07", img: "../../images/img01", desc: "Prod #7", price: 2099.50 },
		{ id: "08", img: "./img01.png", desc: "Prod #8", price: 629.99 },
	];

	const handleOnClickProduct = (prod, index) => {
		onProductSelected(prod);
		setSelected(index);
	};

	return (
		<List>
			{products.map((p, i) => (
                <Product
					isSelected={selected == i}
					key={p.id}
					onClick={() => handleOnClickProduct(p, i)}
				>
					<Img
						src={require(`../../images/img${p.id}.png`)}
						alt={`photo#${i}`}
					/>
					<Description>{p.desc}</Description>
					<Price>${p.price}</Price>
				</Product>
			))}
		</List>
	);
};
