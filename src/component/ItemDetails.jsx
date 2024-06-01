import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ItemDetails.css";
const ItemDetails = () => {
	const [data, setData] = useState(null); // Provide an initial value

	let location = useLocation();

	useEffect(() => {
		if (location.state && location.state.myState) {
			setData(location.state.myState);
		}
	}, [location.state]);

	return (
		<div className="details">
			<div className="ingredients">
				<h2>Ingredients</h2>
				{data && (
					<div className="contain">
						<div className="det">
							{" "}
							<li className="li">{data.strIngredient1}</li>
							<li className="li">{data.strIngredient2}</li>
							<li className="li">{data.strIngredient3}</li>
							<li className="li">{data.strIngredient4}</li>
							<li className="li">{data.strIngredient5}</li>
						</div>
						<div className="img">
							<img
								src={data.strMealThumb}
								alt=""
								srcset=""
								width={240}
								height={240}
							/>
						</div>
					</div>
				)}
			</div>
			<div className="instruction">
				<h2>Instructions:</h2>
				{data && data.strInstructions}
			</div>
		</div>
	);
};

export default ItemDetails;
