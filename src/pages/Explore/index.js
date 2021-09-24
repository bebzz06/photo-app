import React from "react";
import axios from "axios";
import { MasonryContainer, ExploreContainer, Column, ImageContainer, Image } from "./Explore.styles";
import Modal from "components/Modal";

export default class Explore extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false,
        currentCol: -1,
        currentPhoto: -1,
        showModal: -1,
        likedPhotos: []
    };

    setInStorage = (photo) => {
        localStorage.setItem("liked", JSON.stringify(photo))
    }

    getPhotos = async () => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&orientation=landscape&order_by=latest&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(data[i]);
            }
            this.setState({ photos: masonry });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };
    handleModal = (columnIndex, photoIndex) => {
        this.setState({ showModal: columnIndex, currentCol: columnIndex, currentPhoto: photoIndex })
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
        const { photos, showModal, currentCol, currentPhoto } = this.state;
        return (
            <ExploreContainer>
                <MasonryContainer>
                    {photos &&
                        photos.map((column, columnIndex) => {
                            return (
                                <Column>
                                    {column.map((photo, photoIndex) => {
                                        return (
                                            <ImageContainer>
                                                <Image onClick={() => this.handleModal(columnIndex, photoIndex)} alt={photo.alt_description} src={photo.urls.regular} />
                                            </ImageContainer>
                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
                {showModal > -1 && <Modal photo={photos[currentCol][currentPhoto]} showModal={showModal} handleModal={this.handleModal} />}

            </ExploreContainer>
        );
    }
}