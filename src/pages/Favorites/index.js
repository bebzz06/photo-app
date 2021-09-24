import React from "react";
import Modal from "components/Modal";
import { FavoritesContainer, MasonryContainer, Column, ImageContainer, Image } from "./Favorites.styles";
export default class Favorites extends React.Component {
    state = {
        likedPhotos: [],
        isLoading: false,
        currentCol: -1,
        currentPhoto: -1,
        showModal: -1
    }


    getFromStorage = async () => {
        this.setState({ isLoading: true })
        try {
            const photos = JSON.parse(localStorage.getItem("liked"))
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(photos[i]);
            }
            this.setState({ likedPhotos: masonry || [] })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }
    handleModal = (columnIndex, photoIndex) => {
        this.setState({ showModal: columnIndex, currentCol: columnIndex, currentPhoto: photoIndex })
    }



    componentDidMount() {
        this.getFromStorage();
    }
    render() {
        const { likedPhotos, showModal, currentCol, currentPhoto } = this.state;
        return (
            <FavoritesContainer>
                <div>Saved Photos</div>
                <MasonryContainer>
                    {likedPhotos && likedPhotos.map((column, columnIndex) => {
                        return (
                            <Column>
                                {column.map((photo, photoIndex) => {
                                    return (
                                        <ImageContainer>
                                            <Image onClick={() => { this.handleModal(columnIndex, photoIndex) }} alt={photo.alt_description} src={photo.urls.regular} />
                                        </ImageContainer>
                                    )
                                })}
                            </Column>
                        )
                    })}
                </MasonryContainer>
                {showModal > -1 &&
                    < Modal photo={likedPhotos[currentCol][currentPhoto]} showModal={showModal} handleModal={this.handleModal} />}
            </FavoritesContainer>


        )
    }
}
