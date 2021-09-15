import styled from 'styled-components'
import { ReactComponent as Camera } from '../../images/Camera.svg'
import { ReactComponent as Heart } from '../../images/Heart.svg'
import { ReactComponent as Scan } from '../../images/Scan.svg'
import { Link } from 'react-router-dom';

const Icon = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Icons() {
    return (<>
        <Icon>
            <Camera />
            <Link to={"/explore"}>Photos</Link>
        </Icon>
        <Icon>
            <Heart />
            <Link to={"/favorites"}> Saved</Link>
        </Icon>
        <Icon>
            <Scan />
            <Link to={"/"}>Theme</Link>
        </Icon>
    </>)
}