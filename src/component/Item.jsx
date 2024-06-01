import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MealItem.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MyVerticallyCenteredModal from "./ItemDetails";
import { NavLink } from "react-router-dom";

const Item = () => {
	const [data, setData] = useState(null);
	const [originalData, setOriginalData] = useState(null); // Preserve original data
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	const [selectedItems, setSelectedItems] = useState([]); // Track selected items

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://www.themealdb.com/api/json/v1/1/search.php?s="
				);
				setData(response.data.meals);
				setOriginalData(response.data.meals); // Set original data
			} catch (error) {
				setError("Error fetching data. Please try again later.");
				console.error("Error fetching data: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearch(query); // Update search state
		if (query === "") {
			setData(originalData); // Reset to original data if query is empty
			return;
		}
		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(escapedQuery, "i");
		const filtered = originalData.filter((item) => regex.test(item.strMeal));
		setData(filtered);
	};

	const handleCheckboxChange = (event, item) => {
        setSelectedItems(prevSelectedItems => {
            const updatedItems = event.target.checked
                ? [...prevSelectedItems, item]
                : prevSelectedItems.filter(i => i !== item);
            console.log('updatedItems:', updatedItems); // Debugging
            localStorage.setItem('items', JSON.stringify(updatedItems));
            return updatedItems;

        });
    };
    
    

	return (
		<>
			<div className="header">
				<h2> Food Corner</h2>
				<input
					type="text"
					value={search}
					onChange={handleSearch}
					placeholder="search.."
				/>
			</div>
			<div className="meal-item">
				{data &&
					data.map((item) => (
						<div className="item" key={item.idMeal}>
							<NavLink to="/details" state={{ myState: item }}>
								<img
									src={item.strMealThumb}
									alt={item.strMeal}
									width="200"
									height="200"
								/>
								<h3>{item.strMeal}</h3>{" "}
							</NavLink>
							<label>
								<input
									type="checkbox"
									checked={selectedItems.includes(item)} // Check if item is in selectedItems
									onChange={(event) => handleCheckboxChange(event, item)}
								/>
								Add Favourite
							</label>
						</div>
					))}
			</div>
		</>
	);
};

export default Item;
