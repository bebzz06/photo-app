import styled from 'styled-components'
import { ReactComponent as Camera } from '../../images/Camera.svg'
import { ReactComponent as Heart } from '../../images/Heart.svg'
import { ReactComponent as Scan } from '../../images/Scan.svg'

const Icon = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Icons() {
    return (<>
        <Icon>
            <Camera />
            Photos
        </Icon>
        <Icon>
            <Heart />
            Saved
        </Icon>
        <Icon>
            <Scan />
            Theme
        </Icon>
    </>)
}