import React from "react";
import axios from "axios";
import moment from "moment";
import { MasonryContainer, ExploreContainer, Column, ImageContainer, Image, StyledModal, ModalContainer, TopWrapper, StyledLink, Avatar, AuthorInfo, UserName, Updated, StyledCross, Photo, Footer, BrokenHeartIcon, StyledBrokenHeart, StyledStar } from "./Explore.styles";

export default class Explore extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false,
        modalPhoto: null,
        showModal: false,
        likedPhotos: []
    };

    setInStorage = (photo) => {
        localStorage.setItem("liked", JSON.stringify(photo))
    }

    getPhotos = async () => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/photos?page=1&per_page=12&order_by=latest&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(data[i]);
            }
            //console.log(masonry)
            this.setState({ photos: masonry });
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
        const likedPhotos = this.state.likedPhotos
        const isDuplicate = likedPhotos.some((likedPhoto) => likedPhoto.id === photo.id)
        if (isDuplicate) return;
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
            <ExploreContainer>
                <MasonryContainer>
                    {photos &&
                        photos.map((column) => {
                            return (
                                <Column>
                                    {column.map((photo, index) => {
                                        return (
                                            <ImageContainer>
                                                <Image onClick={this.handleOpenModal(index)} alt={photo.alt_description} src={photo.urls.regular} />
                                            </ImageContainer>

                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
                {/* {modalPhoto &&
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

                    </StyledModal>} */}

            </ExploreContainer>
        );
    }
}