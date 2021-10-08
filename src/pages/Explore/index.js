import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Modal from "components/Modal";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect, useRef } from "react";
import { MasonryContainer, ExploreContainer, Column, ImageContainer, Image } from "./Explore.styles";


export default function Explore() {
    const [photos, setPhotos] = useState(null);
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
    const getPhotos = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&orientation=landscape&order_by=latest&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            if (photos) {
                let newPhotos = [...photos]
                for (let i = 0; i < data.length; i++) {
                    newPhotos[i % 3].push(data[i]);
                }
                setPhotos(newPhotos);
            }
            else {
                let masonry = [[], [], []];
                for (let i = 0; i < data.length; i++) {
                    masonry[i % 3].push(data[i]);
                }
                setPhotos(masonry);
            }
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
        getPhotos();
        // eslint-disable-next-line/exhaustive-deps
    }, [])

    useLoadingBar(isLoading, loadingBar);
    return (
        <InfiniteScroll
            dataLength={photos}
            next={getPhotos}
            hasMore={true}
            loader={<LoadingBar />}>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            <ExploreContainer>
                <MasonryContainer>
                    {photos &&
                        photos.map((column, columnIndex) => {
                            return (
                                <Column>
                                    {column.map((photo, photoIndex) => {
                                        return (
                                            <ImageContainer>
                                                <Image onClick={() => handleModal(columnIndex, photoIndex)} alt={photo.alt_description} src={photo.urls.regular} />
                                            </ImageContainer>
                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
                {showModal > -1 && <Modal photo={photos[currentCol][currentPhoto]} showModal={showModal} handleModal={handleModal} />}
            </ExploreContainer>
            {hasError && <h1>ERROR</h1>}
        </InfiniteScroll>

    )
}
