import styled from "styled-components";

export const ExploreContainer = styled.div`
  display: flex;
  justify-content: center;
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
max-width: 100%;
min-height: 325px;
`
export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;
