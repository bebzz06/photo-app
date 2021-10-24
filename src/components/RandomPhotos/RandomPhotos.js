import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { Modal } from "components";
import { useEffect, useRef } from "react";
import {
    Container, Post, TopWrapper, StyledLink, Avatar, AuthorInfo,
    UserName, Updated, PhotoDescription, PhotoWrapper, Photo, Footer, BrokenHeartIcon,
    StyledBrokenHeart, StyledStar, StyledFilledStar, StyledThreeDots
} from "./RandomPhotos.styles"
import { connect } from "react-redux";
import { getPhotos, handleModal, resetState, handleLike } from "../../store/randomPhotos/randomPhotosActions";


function RandomPhotos({ randomPhotos, isLoading, hasError, showModal, getPhotos, handleModal, resetState, handleLike, likedPhotos }) {

    const loadingBar = useRef();

    function useLoadingBar(isLoading, loadingBar) {
        useEffect(() => {
            isLoading ? loadingBar.current.continuousStart() : loadingBar.current.complete();
            // eslint-disable-next-line/exhaustive-deps
        }, [isLoading])
    }

    // 
    useEffect(() => {
        getPhotos();
        return function cleaningState() {
            resetState();
        }
        // eslint-disable-next-line/exhaustive-deps
    }, []);

    useLoadingBar(isLoading, loadingBar);
    return (
        <InfiniteScroll dataLength={randomPhotos}
            next={getPhotos}
            hasMore={true}
            loader={<LoadingBar />}>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            <Container>{randomPhotos.map((photo, index) => {
                return (
                    <Post>
                        <TopWrapper>
                            <StyledLink to={`/user/${photo.user.username}`}>
                                <Avatar alt='' src={photo.user.profile_image.large} />
                                <AuthorInfo>
                                    <UserName>{photo.user.username}</UserName>
                                    <Updated>{moment(Date.parse(photo.updated_at)).fromNow()}</Updated>
                                </AuthorInfo>
                            </StyledLink>
                            <StyledThreeDots onClick={() => handleModal(index)} />
                        </TopWrapper>
                        <PhotoDescription>{photo.description}</PhotoDescription>
                        <PhotoWrapper>
                            <Photo onClick={() => handleModal(index)} alt={photo.alt_description} src={photo.urls.regular} />
                        </PhotoWrapper>
                        <Footer>
                            <BrokenHeartIcon><StyledBrokenHeart />{photo.likes}</BrokenHeartIcon>
                            <div onClick={() => handleLike(photo)}>
                                {likedPhotos[photo.id] ? <StyledFilledStar /> : <StyledStar />}
                            </div>
                        </Footer>
                    </Post>
                )
            })}
                {showModal > -1 && <Modal photo={randomPhotos[showModal]} handleModal={handleModal} />}
            </Container>
            {hasError && <h1>ERROR</h1>}
        </InfiniteScroll>
    )
}

const mapStateToProps = (state) => ({
    randomPhotos: state.randomPhotos.photos,
    isLoading: state.randomPhotos.isLoading,
    hasError: state.randomPhotos.hasError,
    showModal: state.randomPhotos.showModal,
    likedPhotos: state.likedPhotos.photos
})
const mapDispatchToProps = {
    getPhotos,
    handleModal,
    resetState,
    handleLike
}
export default connect(mapStateToProps, mapDispatchToProps)(RandomPhotos);