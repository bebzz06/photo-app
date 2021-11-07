import styled from "styled-components";
import BrokenSearch from "images/BrokenSearch.svg"

export const FormContainer = styled.div`
display: flex;
width: 100%;
flex-direction: row;

`
export const StyledInput = styled.input`
height: 23px;
font-size: 14px;
font-family: Poppins;
border: none;
margin-top: 13px;
margin-left: 33px;
outline: none;

`
export const StyledBrokenSearch = styled.div`
background: url(${BrokenSearch}) no-repeat center center;
background-size: cover;
width: 23px;
height: 23px;
margin-left: 10px;
margin-top: 13px;
background-color: white;
`
