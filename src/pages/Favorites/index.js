import React from "react";
import ReactModal from "react-modal";
import moment from "moment";
import styled from "styled-components";
import { TopWrapper, StyledLink, Avatar, AuthorInfo, Photo, Footer } from "components/RandomPhotos/RandomPhotos.styles";
import { FavoritesContainer, MasonryContainer, Column, ImageContainer, Image, BrokenHeartIcon, StyledBrokenHeart, StyledStar, StyledCross } from "./Favorites.styles";
export default class Favorites extends React.Component {
    state = {
        likedPhotos: [],
        isLoading: false,
        modalPhoto: null,
        showModal: false
    }


    getFromStorage = async () => {
        this.setState({ isLoading: true })
        try {
            const photos = JSON.parse(localStorage.getItem("liked"))
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(photos[i]);
            }
            console.log(masonry);
            this.setState({ likedPhotos: masonry || [] })
        } catch (err) {
            this.setState({ isLoading: false })
        }

    }
    handleOpenModal = (i) => {
        this.setState({ modalPhoto: this.state.likedPhotos[i] })
        this.setState({ showModal: true })
    }

    handleCloseModal = () => {
        this.setState({ showModal: false })
    }
    componentDidMount() {
        this.getFromStorage();
    }
    render() {
        const { likedPhotos, modalPhoto } = this.state;
        //console.log(likedPhotos)
        //console.log(modalPhoto)

        return (
            <FavoritesContainer>
                <div>Saved Photos</div>
                <MasonryContainer>
                    {likedPhotos && likedPhotos.map((column) => {
                        return (
                            <Column>
                                {column.map((photo, index) => {
                                    return (
                                        <ImageContainer>
                                            <Image onClick={() => this.handleOpenModal(index)} alt={photo.alt_description} src={photo.urls.regular} />
                                        </ImageContainer>
                                    )
                                })}
                            </Column>
                        )
                    })}
                </MasonryContainer>
                {/* {modalPhoto &&
                    < ReactModal isOpen={this.state.showModal} contentLabel='photo' >
                        <TopWrapper>
                            <StyledLink to={`/user/${modalPhoto.user.username}`} >
                                <Avatar alt='' src={modalPhoto.user.profile_image.large} />
                                <AuthorInfo>
                                    <div>{modalPhoto.user.username}</div>
                                    <div>{moment(Date.parse(modalPhoto.updated_at)).fromNow()}</div>
                                </AuthorInfo>
                            </StyledLink>
                            <StyledCross onClick={this.handleCloseModal} />
                        </TopWrapper>
                        <div>{modalPhoto.description}</div>
                        <Photo alt={modalPhoto.alt_description} src={modalPhoto.urls.regular} />
                        <Footer >
                            <BrokenHeartIcon><StyledBrokenHeart />{modalPhoto.likes}</BrokenHeartIcon>
                            <StyledStar />
                        </Footer>
                    </ReactModal>} */}
            </FavoritesContainer>


        )
    }
}
