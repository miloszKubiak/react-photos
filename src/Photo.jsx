import React from "react";
import styled from "styled-components";

const Photo = ({
	urls: { regular },
	alt_description,
	likes,
	user: {
		name,
		portfolio_url,
		profile_image: { medium },
	},
}) => {
	return (
		<Card>
			<Image src={regular} alt={alt_description} />
			<Info>
				<Wrapper>
					<Name>{name}</Name>
					<Likes>{likes} likes</Likes>
				</Wrapper>
				<Details href={portfolio_url}>
					<UserImg src={medium} alt={name} />
				</Details>
			</Info>
		</Card>
	);
};

export default Photo;

const Info = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 1rem;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	transform: translateY(100%);
	color: white;
	transition: all 0.3s linear;
`;

const Card = styled.article`
	position: relative;
	height: 17rem;
	overflow: hidden;
	&:hover ${Info} {
		transform: translateY(0);
	}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	display: block;
	object-fit: cover;
`;


const Name = styled.h4`
	margin-bottom: 0.5rem;
`;

const Likes = styled.p`
	margin-bottom: 0;
`;

const UserImg = styled.img`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
`;

const Wrapper = styled.div``;
const Details = styled.a``;
