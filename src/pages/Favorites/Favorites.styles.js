import styled from "styled-components";
import BrokenHeart from "images/Iconly-Broken-Heart.svg";
import Star from "images/Star.svg";
import Cross from "images/Icon-metro-cross.svg"


export const FavoritesContainer = styled.div`
display: flex;
flex-direction: column;
`;
export const MasonryContainer = styled.div`
display: flex;
width: 928px;
height: auto;
padding-top: 20px;
padding-left: 14px;
padding-right: 14px;
`;

export const Column = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 15px;
`;

export const ImageContainer = styled.div`
position: relative;
margin-bottom: 28px;
max-width: 265px;
min-height: 265px;;
`
export const Image = styled.img`
width: 100%;
height: 100%;
border-radius: 8px;
object-fit: cover;
`;
export const BrokenHeartIcon = styled.div`
display: flex;
flex-direction: column;
`
export const StyledBrokenHeart = styled.div`
background: url(${BrokenHeart}) no-repeat center center;
width: 31px;
height: 31px;
cursor: pointer;
`
export const StyledStar = styled.div`
background: url(${Star}) no-repeat center center;
width: 31px;
height: 31px;
cursor: pointer;
`

export const StyledCross = styled.div`
background: url(${Cross}) no-repeat center center;
width: 31px;
height: 31px;
cursor: pointer;
`