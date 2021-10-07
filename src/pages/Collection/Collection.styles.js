import styled from "styled-components";
//import Button from "components/Button";
import { Link } from "react-router-dom";

export const CollectionContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;
export const Header = styled.div`
display: flex;
justify-content: center;
margin-top: 70px;
`
export const CoverPhoto = styled.img`
width: 183px;
height: 183px;
border-radius: 8px;
`
export const Info = styled.div`
display: flex;
flex-direction: column;
text-align: start;
justify-content: space-between;
height: 183px;
padding-left: 40px;
`
export const Title = styled.div`
font-size: 24px;
font-weight: 600;
`
export const StyledLink = styled(Link)`
width: 545px;
overflow-wrap: break-word;
font-size: 15px;
text-decoration: none;
color: black;
`

export const TotalPhotos = styled.div`
color: rgb(123, 123, 123);
opacity: 0.39;
`
// export const StyledButton = styled(Button)`
// width: 139px;
// height: 49px;
// background-color: rgb(24, 119, 242);
// border-radius: 9px;
// cursor: pointer;
// display: flex;
// justify-content: center;
// align-items: center;
// color: white;
// font-weight: 600;
// font-size: 14px;
// `

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
max-width: 100%;
min-height: 325px;
`
export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;
