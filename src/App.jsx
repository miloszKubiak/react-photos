import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const CLIENT_ID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const MAIN_URL = `https://api.unsplash.com/photos/`;
const SEARCH_URL = `https://api.unsplash.com/search/photos/`;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);

	const fetchImages = async () => {
		setLoading(true);
		let url;
		const urlPage = `&page=${page}`;
		url = `${MAIN_URL}${CLIENT_ID}${urlPage}`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			setPhotos((oldPhotos) => {
				return [...oldPhotos, ...data];
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchImages();
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			if (
				!loading &&
				window.innerHeight + window.scrollY >=
					document.body.scrollHeight - 2
			) {
				setPage((oldPage) => {
					return oldPage + 1;
				});
			}
		});

		return () => window.removeEventListener("scroll", event);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("dupa");
	};

	return (
		<>
			<SearchSection>
				<Form>
					<Input type="text" placeholder="search" />
					<SubmitBtn type="submit" onClick={handleSubmit}>
						<FaSearch />
					</SubmitBtn>
				</Form>
			</SearchSection>
			<PhotosSection>
				<PhotosCenter>
					{photos.map((photo) => {
						return <Photo key={photo.id} {...photo} />;
					})}
				</PhotosCenter>
				{loading && <Text>Loading...</Text>}
			</PhotosSection>
		</>
	);
}

export default App;

const SearchSection = styled.section`
	padding: 6rem 0 0 0;
	width: 90vw;
	max-width: 1170px;
	margin: 0 auto;
`;

const Form = styled.form`
	display: flex;
	@media screen and (min-width: 576px) {
		max-width: 620px;
	}
`;

const Input = styled.input`
	width: 70%;
	padding: 0.8rem 1.2rem;
	border: none;
	text-transform: capitalize;
	letter-spacing: 0.2rem;
	font-size: 1.4rem;
	border-bottom: 0.2rem solid #333;
	background: transparent;
	outline: none;
	&::placeholder {
		color: #444;
	}
`;

const SubmitBtn = styled.button`
	padding: 0.8rem 1.6rem;
	border: none;
	font-size: 1.4rem;
	border-bottom: 0.2rem solid #333;
	background: transparent;
	color: #444;
`;

const PhotosSection = styled.section`
	padding: 5rem 0;
`;

const PhotosCenter = styled.div`
	width: 90vw;
	max-width: 1170px;
	margin: 0 auto;
	display: grid;
	gap: 2rem;
	@media screen and (min-width: 576px) {
		grid-template-columns: repeat(auto-fill, minmax(368px, 1fr));
	}
`;

const Text = styled.h2`
	text-align: center;
	padding: 3rem;
`;
