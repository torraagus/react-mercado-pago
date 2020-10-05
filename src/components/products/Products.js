import React, { useState } from "react";
import { Product, Description, List, Price, Img } from "./products.style";
import { products } from "./dummy.products";

export const Products = ({ onProductSelected }) => {
	const [selected, setSelected] = useState(-1);

	const handleOnClickProduct = (prod, index) => {
		onProductSelected(prod);
		setSelected(index);
	};

	return (
		<List>
			{products.map((p, i) => (
				<Product
					isSelected={selected === i}
					key={p.id}
					onClick={() => handleOnClickProduct(p, i)}
				>
					<Img
						src={require(`../../images/img${p.id}.jpg`)}
						alt={`photo#${i}`}
					/>
					<Description>{p.desc}</Description>
					<Price>${p.price}</Price>
				</Product>
			))}
		</List>
	);
};
