import { useState } from "react";
import Star from "images/Star.svg";
import styled from "styled-components";


export const StyledStar = styled.div`
background: url(${Star}) no-repeat center center;
width: 31px;
height: 31px;
cursor: pointer;
`
export default function Button({ liked, unliked }) {
    const [isLiked, setIsLiked] = useState(false);
    const handleClick = () => {
        setIsLiked(!isLiked);
    };
    return (
        <StyledStar onClick={handleClick}>{isLiked ? unliked : liked}</StyledStar>
    );
};