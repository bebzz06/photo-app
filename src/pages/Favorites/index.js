import Modal from "components/Modal";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect, useRef } from "react";
import { FavoritesContainer, MasonryContainer, Column, ImageContainer, Image } from "./Favorites.styles";

export default function Favorites() {
    const [likedPhotos, setLikedPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentCol, setCurrentCol] = useState(-1);
    const [currentPhoto, setCurrentPhoto] = useState(-1);
    const [showModal, setShowModal] = useState(-1);
    // eslint-disable-next-line
    const loadingBar = useRef();

    function useLoadingBar(isLoading, loadingBar) {
        useEffect(() => {
            isLoading ? loadingBar.current.continuousStart() : loadingBar.current.complete();
            // eslint-disable-next-line/exhaustive-deps
        }, [isLoading])
    }

    const getFromStorage = async () => {
        setIsLoading(true);
        try {
            const photos = JSON.parse(localStorage.getItem("liked"))
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(photos[i]);
            }
            setLikedPhotos(masonry || [])
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    }
    const handleModal = (columnIndex, photoIndex) => {
        setShowModal(columnIndex);
        setCurrentCol(columnIndex);
        setCurrentPhoto(photoIndex);
    }

    useEffect(() => {
        getFromStorage();
        // eslint-disable-next-line/exhaustive-deps
    }, [])

    useLoadingBar(isLoading, loadingBar)

    return (
        <FavoritesContainer>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            <div>Saved Photos</div>
            <MasonryContainer>
                {likedPhotos && likedPhotos.map((column, columnIndex) => {
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
            {showModal > -1 &&
                < Modal photo={likedPhotos[currentCol][currentPhoto]} showModal={showModal} handleModal={handleModal} />}
            {hasError && <h1>ERROR</h1>}
        </FavoritesContainer>
    )
}