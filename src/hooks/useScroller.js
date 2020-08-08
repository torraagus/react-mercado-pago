import React from "react";

export const useScroller = () => {
	const scrollTo = (offset) => {
		window.scrollTo({
			top: offset,
			behavior: "smooth",
		});
	};
	return { scrollTo };
};
