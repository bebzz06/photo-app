import styled from 'styled-components'
import SearchBar from "../SearchBar"
import Icons from "../Icons"

const TopNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 64px;
  width: 894px;
`;
export default function TopNav() {
  return (<div>
    <TopNavContainer>
      <SearchBar />
      <Icons />
    </TopNavContainer>
  </div>)
}