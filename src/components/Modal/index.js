import moment from "moment";
import { StyledModal, ModalContainer, TopWrapper, StyledLink, Avatar, AuthorInfo, UserName, Updated, StyledCross, Photo, Footer, BrokenHeartIcon, StyledBrokenHeart, StyledStar } from "./Modal.styles"

export default function Modal({ photo, handleModal, showModal }) {
    return (
        < StyledModal isOpen={showModal}>
            <ModalContainer>
                <TopWrapper>
                    <StyledLink to={`/user/${photo.user.username}`} >
                        <Avatar alt='' src={photo.user.profile_image.large} />
                        <AuthorInfo>
                            <UserName>{photo.user.username}</UserName>
                            <Updated>{moment(Date.parse(photo.updated_at)).fromNow()}</Updated>
                        </AuthorInfo>
                    </StyledLink>
                    <StyledCross onClick={() => handleModal(-1, -1)} />
                </TopWrapper>
                <Photo alt={photo.alt_description} src={photo.urls.regular} />
                <Footer >
                    <BrokenHeartIcon><StyledBrokenHeart />{photo.likes}</BrokenHeartIcon>
                    <StyledStar />
                </Footer>
            </ModalContainer>
        </StyledModal>
    )

}