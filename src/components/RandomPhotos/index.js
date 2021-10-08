import axios from "axios";
import moment from "moment";
import Modal from "components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect, useRef } from "react";
import { Container, Post, TopWrapper, StyledLink, Avatar, AuthorInfo, UserName, Updated, PhotoDescription, PhotoWrapper, Photo, Footer, BrokenHeartIcon, StyledBrokenHeart, StyledStar, StyledThreeDots } from "./RandomPhotos.styles"


export default function RandomPhotos() {
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showModal, setShowModal] = useState(-1);
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
    const getPhotos = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&orientation=landscape&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            !photos ? setPhotos(data) : setPhotos([...photos, ...data]);
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }

    }
    const handleModal = (i) => {
        setShowModal(i);
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
        // eslint-disable-next-line/exhaustive-deps
    }, [])

    useLoadingBar(isLoading, loadingBar);
    return (
        <InfiniteScroll dataLength={photos}
            next={getPhotos}
            hasMore={true}
            loader={<LoadingBar />}>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            <Container>{photos && photos.map((photo, index) => {
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
                {showModal > -1 && <Modal photo={photos[showModal]} handleModal={handleModal} />}
            </Container>
            {hasError && <h1>ERROR</h1>}
        </InfiniteScroll>
    )
}