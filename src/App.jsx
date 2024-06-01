import React from "react";
import Item from "./component/Item";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ItemDetails from "./component/ItemDetails";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Item />} />
					<Route exact path="details" element={<ItemDetails />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
