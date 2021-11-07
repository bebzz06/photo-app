import { Modal } from "components";
import { useState } from "react";
import { connect } from "react-redux";
import { FavoritesContainer, MasonryContainer, Column, ImageContainer, Image } from "./Favorites.styles";
import { useMasonry } from "utils";


function Favorites({ likedPhotos, hasError }) {
    const [currentCol, setCurrentCol] = useState(-1);
    const [currentPhoto, setCurrentPhoto] = useState(-1);
    const [showModal, setShowModal] = useState(-1);
    // eslint-disable-next-line

    const handleModal = (columnIndex, photoIndex) => {
        setShowModal(columnIndex);
        setCurrentCol(columnIndex);
        setCurrentPhoto(photoIndex);
    }

    let newPhotos = Object.values(likedPhotos)
    const { layout: masonry } = useMasonry(newPhotos);


    return (
        <FavoritesContainer>
            {!masonry[0].length ? 'Click on the star to save your favorite photos!' :
                <MasonryContainer>
                    {likedPhotos && masonry.map((column, columnIndex) => {
                        return (
                            <Column>
                                {column.map((photo, photoIndex) => {
                                    return (
                                        <ImageContainer>
                                            <Image onClick={() => { handleModal(columnIndex, photoIndex) }} alt={photo.alt_description} src={photo.urls.regular} />
                                        </ImageContainer>
                                    )
                                })}
                            </Column>
                        )
                    })}
                </MasonryContainer>
            }
            {showModal > -1 && Object.keys(likedPhotos).length &&
                < Modal photo={masonry[currentCol][currentPhoto]} handleModal={handleModal} />}
            {hasError && <h1>ERROR</h1>}
        </FavoritesContainer>
    )
}

const mapStateToProps = (state) => ({
    likedPhotos: state.likedPhotos.photos,
    hasError: state.likedPhotos.hasError
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)