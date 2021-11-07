import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "components";
import { SearchPhotosContainer, HeaderContainer, LinksContainer, StyledLink, MasonryContainer, Column, ImageContainer, Image } from "./SearchPhotos.styles";
import { useLoadingBar } from "utils";

export default function SearchPhotos(props) {
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentCol, setCurrentCol] = useState(-1);
    const [currentPhoto, setCurrentPhoto] = useState(-1);
    const [showModal, setShowModal] = useState(-1);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPhotos, setTotalPhotos] = useState(null);
    // eslint-disable-next-line

    const getNextPage = () => {
        setPage(page + 1);
    }
    const getPhotos = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/search/photos?per_page=12&page=${page}&orientation=landscape&order_by=latest&query=${props.match.params.searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            setTotalPhotos(data.total)
            setHasMore(!!data.results.length);
            if (photos) {
                const newPhotos = [...photos]
                for (let i = 0; i < data.results.length; i++) {
                    newPhotos[i % 3].push(data.results[i]);
                }
                setPhotos(newPhotos);
            } else {
                let masonry = [[], [], []];
                for (let i = 0; i < data.results.length; i++) {
                    masonry[i % 3].push(data.results[i]);
                }
                setPhotos(masonry);
            }
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };
    const handleModal = (columnIndex, photoIndex) => {
        setShowModal(columnIndex);
        setCurrentCol(columnIndex);
        setCurrentPhoto(photoIndex);
    }

    useEffect(() => {
        getPhotos()
        // eslint-disable-next-line/exhaustive-deps
    }, [page]);

    useEffect(() => {
        setPhotos(null);
        setPage(1);
        // eslint-disable-next-line/exhaustive-deps

    }, [props.match.params.searchTerm])

    useEffect(() => {
        if (photos === null && page === 1) {
            getPhotos();
            // eslint-disable-next-line/exhaustive-deps
        }
    }, [photos, page])

    const { loadingBar } = useLoadingBar(isLoading);

    return (
        <SearchPhotosContainer>
            <HeaderContainer>
                <div>{`Search results for "${props.match.params.searchTerm}"`}</div>
                <div>{totalPhotos} photos were found</div>
            </HeaderContainer>
            <LinksContainer>
                <StyledLink to={`/search/photos/${props.match.params.searchTerm}`}>Photos </StyledLink>
                <StyledLink to={`/search/collections/${props.match.params.searchTerm}`}> Collections</StyledLink>
            </LinksContainer>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            <InfiniteScroll dataLength={photos}
                next={getNextPage}
                hasMore={hasMore}
                loader={<LoadingBar />}
                endMessage={<h4>End of Photos</h4>}>
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
            </InfiniteScroll>
            {showModal > -1 && <Modal photo={photos[currentCol][currentPhoto]} showModal={showModal} handleModal={handleModal} />}
            {hasError && <h1>ERROR</h1>}
        </SearchPhotosContainer>
    )

}
