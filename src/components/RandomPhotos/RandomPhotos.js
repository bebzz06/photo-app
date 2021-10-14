import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { Modal } from "components";
import { useState, useEffect, useRef } from "react";
import {
    Container, Post, TopWrapper, StyledLink, Avatar, AuthorInfo,
    UserName, Updated, PhotoDescription, PhotoWrapper, Photo, Footer, BrokenHeartIcon,
    StyledBrokenHeart, StyledStar, StyledThreeDots
} from "./RandomPhotos.styles"
import { connect } from "react-redux";
import { getPhotos, handleModal, resetState } from "../../store/randomPhotos/randomPhotosActions";


function RandomPhotos({ randomPhotos, isLoading, hasError, showModal, getPhotos, handleModal, resetState }) {

    const [likedPhotos, setLikedPhotos] = useState([]);
    // eslint-disable-next-line
    const loadingBar = useRef();

    function useLoadingBar(isLoading, loadingBar) {
        useEffect(() => {
            isLoading ? loadingBar.current.continuousStart() : loadingBar.current.complete();
            // eslint-disable-next-line/exhaustive-deps
        }, [isLoading])
    }

    const setInStorage = (photo) => {
        localStorage.setItem("liked", JSON.stringify(photo))
    }

    const handleLike = (photo, i) => {
        //check for duplicate
        const liked = likedPhotos
        const isDuplicate = liked.some((likedPhoto) => likedPhoto.id === photo.id)
        if (isDuplicate) return;
        //set photo as liked
        const photos = [...likedPhotos, photo];
        const newPhotos = photos.filter((photo) => {
            if (photo.liked_by_user === false) {
                photo.liked_by_user = !photo.liked_by_user
            }
            return photo
        });
        setLikedPhotos(newPhotos);
        setInStorage(newPhotos);

    }
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
                            <StyledStar onClick={() => handleLike(photo)} />
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
    showModal: state.randomPhotos.showModal
})
const mapDispatchToProps = {
    getPhotos,
    handleModal,
    resetState
}
export default connect(mapStateToProps, mapDispatchToProps)(RandomPhotos);