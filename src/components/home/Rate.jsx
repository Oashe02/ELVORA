import { Star } from "lucide-react";
import React from "react";

const Rate = ({ currentRate, size }) => {
	let arrOfStar = [];
	for (let i = 0; i < 5; i++) {
		if (currentRate) {
			if (i >= currentRate) {
				arrOfStar.push(
					<Star key={i} size={size} color="#9FA09C" weight="fill" />,
				);
			} else {
				arrOfStar.push(
					<Star key={i} size={size} color="#ECB018" weight="fill" />,
				);
			}
		}
	}
	return <div className="rate flex">{arrOfStar}</div>;
};

export default Rate;
