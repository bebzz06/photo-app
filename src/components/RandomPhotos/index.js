import React from "react";
import axios from "axios";
import moment from "moment";
import Modal from "components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Post, TopWrapper, StyledLink, Avatar, AuthorInfo, UserName, Updated, PhotoDescription, PhotoWrapper, Photo, Footer, BrokenHeartIcon, StyledBrokenHeart, StyledStar, StyledThreeDots } from "./RandomPhotos.styles"
export default class RandomPhotos extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false,
        showModal: -1,
        likedPhotos: []
    }
    setInStorage = (photo) => {
        localStorage.setItem("liked", JSON.stringify(photo))
    }
    getPhotos = async () => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&orientation=landscape&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            this.setState({ photos: data });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    handleModal = (i) => {
        this.setState({ showModal: i })
    }

    handleLike = (photo) => {
        //check for duplicate
        const likedPhotos = this.state.likedPhotos
        const isDuplicate = likedPhotos.some((likedPhoto) => likedPhoto.id === photo.id)
        if (isDuplicate) return;
        //set photo as liked
        const photos = [...this.state.likedPhotos, photo];
        const newPhotos = photos.filter((photo) => {
            if (photo.liked_by_user === false) {
                photo.liked_by_user = !photo.liked_by_user
            }
            return photo
        });
        this.setState({ likedPhotos: newPhotos })
        this.setInStorage(newPhotos);
    }

    componentDidMount() {
        this.getPhotos();
    }
    render() {
<<<<<<< HEAD
        const { photos, showModal } = this.state;
=======
        const { photos, modalPhoto } = this.state;
>>>>>>> master
        return (
            <InfiniteScroll dataLength={photos}
                next={this.getPhotos}
                hasMore={true}
                loader={<h4>Loading...</h4>}>

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
                                <StyledThreeDots onClick={() => this.handleModal(index)} />
                            </TopWrapper>
                            <PhotoDescription>{photo.description}</PhotoDescription>
                            <PhotoWrapper>
                                <Photo onClick={() => this.handleModal(index)} alt={photo.alt_description} src={photo.urls.regular} />
                            </PhotoWrapper>
                            <Footer>
                                <BrokenHeartIcon><StyledBrokenHeart />{photo.likes}</BrokenHeartIcon>
                                <StyledStar onClick={() => this.handleLike(photo)} />
                            </Footer>
                        </Post>

                    )
                })}
                    {showModal > -1 && <Modal photo={photos[showModal]} showModal={showModal} handleModal={this.handleModal} />}
                </Container>
            </InfiniteScroll>

        )

    }
}