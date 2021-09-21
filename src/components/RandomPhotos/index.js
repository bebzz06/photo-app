import React from "react";
import axios from "axios";
import moment from "moment";
import { Container, Post, TopWrapper, StyledLink, Avatar, AuthorInfo, UserName, Updated, PhotoDescription, PhotoWrapper, Photo, Footer, BrokenHeartIcon, StyledBrokenHeart, StyledStar, StyledThreeDots, StyledModal, ModalContainer, StyledCross } from "./RandomPhotos.styles"
export default class RandomPhotos extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false,
        modalPhoto: null,
        showModal: false,
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

    handleOpenModal = (i) => {
        console.log(i);
        this.setState({ modalPhoto: this.state.photos[i] })
        this.setState({ showModal: true })
    }

    handleCloseModal = () => {
        this.setState({ showModal: false })
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
        const { photos, modalPhoto } = this.state;
        return (
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
                            <StyledThreeDots onClick={() => this.handleOpenModal(index)} />
                        </TopWrapper>
                        <PhotoDescription>{photo.description}</PhotoDescription>
                        <PhotoWrapper>
                            <Photo onClick={() => this.handleOpenModal(index)} alt={photo.alt_description} src={photo.urls.regular} />
                        </PhotoWrapper>
                        <Footer>
                            <BrokenHeartIcon><StyledBrokenHeart />{photo.likes}</BrokenHeartIcon>
                            <StyledStar onClick={() => this.handleLike(photo)} />
                        </Footer>
                    </Post>
                )
            })}

                {modalPhoto &&
                    < StyledModal isOpen={this.state.showModal} contentLabel='photo'>
                        <ModalContainer>
                            <TopWrapper>
                                <StyledLink to={`/user/${modalPhoto.user.username}`} >
                                    <Avatar alt='' src={modalPhoto.user.profile_image.large} />
                                    <AuthorInfo>
                                        <UserName>{modalPhoto.user.username}</UserName>
                                        <Updated>{moment(Date.parse(modalPhoto.updated_at)).fromNow()}</Updated>
                                    </AuthorInfo>
                                </StyledLink>
                                <StyledCross onClick={this.handleCloseModal} />
                            </TopWrapper>
                            <Photo alt={modalPhoto.alt_description} src={modalPhoto.urls.regular} />
                            <Footer >
                                <BrokenHeartIcon><StyledBrokenHeart />{modalPhoto.likes}</BrokenHeartIcon>
                                <StyledStar />
                            </Footer>
                        </ModalContainer>

                    </StyledModal>}
            </Container>
        )

    }
}