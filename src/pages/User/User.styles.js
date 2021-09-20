import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
justify-self: center;
background-color: rgb(249, 250, 251);
`
export const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
`

export const ProfilePicture = styled.img`
display: block;
height: auto;
width: 160px;
border-radius: 8px;
margin-top: 35px;
`
export const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 10px;
`
export const Name = styled.div`
font-size: 24px;
font-weight: 600;
`
export const PortfolioLink = styled.a`
font-size: 18px;
font-weight: 600;
text-decoration: none;
color: rgb(123, 123, 123);
opacity: 0.39;

`
export const Statistics = styled.div`
display: flex;
width: 400px;
margin-top: 25px;
justify-content: center;
`
export const TotalPhotosWrapper = styled.div`
display: flex;
flex-direction: column;
font-size: 32px;
flex-basis: 100%;
`
export const TotalPhotos = styled.div`
font-size: 24px;
font-weight: 600;
`
export const FollowersCountWrapper = styled.div`
display: flex;
flex-direction: column;
font-size: 32px;
flex-basis: 100%;
`
export const FollowersCount = styled.div`
font-size: 24px;
font-weight: 600;
`
export const Label = styled.div`
color: rgb(123, 123, 123);
opacity: 0.39;
text-decoration: none;
font-size: 18px;
`
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