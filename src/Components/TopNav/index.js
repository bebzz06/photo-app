import styled from 'styled-components'
import Search from "../Search"
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
      <Search />
      <Icons />
    </TopNavContainer>
  </div>)
}