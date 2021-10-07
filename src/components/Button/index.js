import { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.div`
width: 139px;
height: 49px;
background-color: rgb(24, 119, 242);
border-radius: 9px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
color: white;
font-weight: 600;
font-size: 14px;

`
export default function Button({ follow, unfollow }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const handleClick = () => {
        setIsFollowing(!isFollowing);
    };
    return (
        <StyledButton onClick={handleClick}>{isFollowing ? unfollow : follow}</StyledButton>
    );
};