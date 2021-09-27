import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
max-width: 900px;
margin-top: 46px;
align-self: center;
`
export const Header = styled.div`
text-align: start;
margin-bottom: 20px;
font-weight: 600;
opacity: 0.39;
`
export const Gallery = styled.div`
width: 100%;
display: flex;
`
export const ImageContainer = styled.div`
position: relative;
margin-bottom: 28px;
width: 160px;
height: 234px;
flex-basis: 100%;
margin-left: 11px;
margin-right: 11px;
`
export const Image = styled.img`
width: 160px;
height: 234px;
border-radius: 8px;
object-fit: cover;
`



