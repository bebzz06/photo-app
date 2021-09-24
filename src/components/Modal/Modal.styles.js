import styled from "styled-components";
import BrokenHeart from "images/Iconly-Broken-Heart.svg";
import Star from "images/Star.svg";
import Cross from "images/Icon-metro-cross.svg"
import { Link } from "react-router-dom";

export const StyledModal = styled.div`
background-color: rgb(154, 154, 154);
width: 100%;
height: 100%;
position: fixed;
opacity: 0.98;
top: 0px;
left: 0px;
z-index: 999;
`
export const ModalContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: fixed;
inset: 0px;
margin: auto;
border-radius: 4px;
z-index: 1000;
background-color: white;
max-height: 890px;
max-width: 830px;
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
export const StyledCross = styled.div`
background: url(${Cross}) no-repeat center center;
width: 31px;
height: 31px;
cursor: pointer;
`
export const Photo = styled.img`
width: 100%;
height: 100%;
min-height: 530px;
min-width: 830px;
border-radius: 8px;
cursor: pointer;
object-fit: cover;
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