import moment from "moment";
import { StyledModal, ModalContainer, TopWrapper, StyledLink, Avatar, AuthorInfo, UserName, Updated, StyledCross, Photo, Footer, BrokenHeartIcon, StyledBrokenHeart, StyledStar } from "./Modal.styles"
import { connect } from "react-redux";
import { handleLike } from "../../store/randomPhotos/randomPhotosActions"
import { StyledFilledStar } from "components/RandomPhotos/RandomPhotos.styles"

function Modal({ photo, handleModal, likedPhotos, handleLike }) {

    return (
        <>
            < StyledModal>
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
                        <div onClick={() => handleLike(photo)}>
                            {likedPhotos[photo.id] ? <StyledFilledStar /> : <StyledStar />}
                        </div>
                    </Footer>
                </ModalContainer>
            </StyledModal>
        </>

    )

}

const mapStateToProps = (state) => ({
    likedPhotos: state.likedPhotos.photos
})
const mapDispatchToProps = {
    handleLike
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)