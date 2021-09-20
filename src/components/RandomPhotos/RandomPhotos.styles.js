import styled from "styled-components";
import BrokenHeart from "images/Iconly-Broken-Heart.svg";
import Star from "images/Star.svg";
import ThreeDots from "images/ThreeDots.svg";
import Cross from "images/Icon-metro-cross.svg"
import { Link } from "react-router-dom";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
export const Post = styled.div`
display: flex;
max-width: 830px;
margin-top: 16px;
border-radius: 4px;
flex-direction: column;
align-items: center;
padding-left: 32px;
padding-right: 37px;
`
export const TopWrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
padding-left: 32px;
padding-right: 37px;
align-items: center;
`
export const StyledLink = styled(Link)`
text-decoration: none;
color: rgb(0,0,0);
display: flex;
align-items: center;
`
export const Avatar = styled.img`
width: 57px;
height: 57px;
border-radius: 8px;
margin-top: 27px;
margin-bottom: 24px;
`
export const AuthorInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 18px;
margin-top: 34px;
margin-bottom: 24px;
`
export const UserName = styled.div`
font-weight: 600;
font-size: 14px;
text-align: start;
`
export const Updated = styled.div`
font-size: 14px;
text-align: start;
opacity: 0.39;
`
export const StyledThreeDots = styled.div`
background: url(${ThreeDots}) no-repeat center center;
width: 31px;
height: 31px;
cursor: pointer;
`
export const PhotoDescription = styled.div`
font-size: 15px;
font-weight: 500;
width: 100%;
text-align: left;
margin-bottom: 16px;
`
export const PhotoWrapper = styled.div`
position: relative;
width: 100%;
height: 100%;
min-height: 530px;
padding-left: 35px;
padding-right: 35px;
`
export const Photo = styled.img`
width: 100%;
height: 100%;
min-height: 530px;
min-width: 830px;
border-radius: 8px;
cursor: pointer;
`
export const Footer = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
padding: 27px;
`

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