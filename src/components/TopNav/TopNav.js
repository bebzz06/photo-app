import styled from 'styled-components'
import SearchBar from 'components/SearchBar';
import Icons from "components/Icons";

const TopNavContainer = styled.div`
  display: flex;
  height: 64px;
  width: 900px;
  justify-content: space-between;
`;
export default function TopNav() {
  return (
    <TopNavContainer>
      <SearchBar />
      <Icons />
    </TopNavContainer>
  )
}