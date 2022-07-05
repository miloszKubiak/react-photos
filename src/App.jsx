import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const CLIENT_ID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const MAIN_URL = `https://api.unsplash.com/photos/`;
const SEARCH_URL = `https://api.unsplash.com/search/photos/`;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);

	const fetchImages = async () => {
		setLoading(true);
		let url;
		url = `${MAIN_URL}${CLIENT_ID}`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return <h2>dupa</h2>;
}

export default App;
