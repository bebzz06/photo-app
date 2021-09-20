import styled from 'styled-components'
import Heart from '../../images/Heart.svg'
import Scan from '../../images/Scan.svg'
import Camera from "../../images/Camera.svg"
import { Link } from 'react-router-dom';
const Icon = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
  text-decoration: none;
  justify-content: center;
  background-color: rgb(249, 250, 251);
  

`
const StyledCamera = styled.div`
background: url(${Camera}) no-repeat center center;
width: 49px;
height: 49px;
background-color: white;
border-radius: 5px; 
`
const StyledHeart = styled.div`
background: url(${Heart}) no-repeat center center;
width: 49px;
height: 49px;
background-color:rgb(249, 250, 251);
border-radius: 5px;
`
const StyledScan = styled.div`
background: url(${Scan}) no-repeat center center;
width: 49px;
height: 49px;
background-color: white;
border-radius: 5px;
`
const Label = styled.div`
font-size: 8px;
color: rgb(153,153,153);
`

export default function Icons() {
    return (<>
        <Icon to={"/explore"}>
            <StyledCamera />
            <Label>Photos</Label>
        </Icon>
        <Icon to={"/favorites"}>
            <StyledHeart />
            <Label>Saved</Label>
        </Icon>
        <Icon to={"/"}>
            <StyledScan />
            <Label>Theme</Label>
        </Icon>
    </>)
}