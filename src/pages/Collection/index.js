import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import Modal from "components/Modal";
import Button from "components/Button";
import { useState, useEffect, useRef } from "react";
import { CollectionContainer, Header, CoverPhoto, Info, Title, StyledLink, TotalPhotos, MasonryContainer, Column, ImageContainer, Image } from "./Collection.styles";

export default function Collection(props) {
    const [collection, setCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [collectionInfo, setCollectionInfo] = useState(null);
    const [currentCol, setCurrentCol] = useState(-1);
    const [currentPhoto, setCurrentPhoto] = useState(-1);
    const [showModal, setShowModal] = useState(-1);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    // eslint-disable-next-line
    const loadingBar = useRef();

    function useLoadingBar(isLoading, loadingBar) {
        useEffect(() => {
            isLoading ? loadingBar.current.continuousStart() : loadingBar.current.complete();
            // eslint-disable-next-line/exhaustive-deps
        }, [isLoading])
    }

    const getNextPage = () => {
        setPage(page + 1);
    }

    const getInfo = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/collections/${props.match.params.id}?client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            setCollectionInfo(data);
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };
    const getCollection = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/collections/${props.match.params.id}/photos?per_page=12&page=${page}&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            setHasMore(!!data.length);
            if (collection) {
                let newCollection = [...collection]
                for (let i = 0; i < data.length; i++) {
                    newCollection[i % 3].push(data[i]);
                }
                setCollection(newCollection);
            } //first API call
            else {
                let masonry = [[], [], []];
                for (let i = 0; i < data.length; i++) {
                    masonry[i % 3].push(data[i]);
                }
                setCollection(masonry);
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
    };

    useEffect(() => {
        getInfo();

        // eslint-disable-next-line/exhaustive-deps
    }, [])
    useEffect(() => {
        getCollection()
        // eslint-disable-next-line/exhaustive-deps
    }, [page])

    useLoadingBar(isLoading, loadingBar);

    return (
        <CollectionContainer>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            {collectionInfo && <Header>
                <CoverPhoto alt={collectionInfo.cover_photo.alt_description} src={collectionInfo.cover_photo.urls.regular} />
                <Info>
                    <Title>{collectionInfo.title}</Title>
                    <StyledLink to={`/user/${collectionInfo.user.username}`}>{`Author: ${collectionInfo.user.username}`}</StyledLink>
                    <TotalPhotos>{`${collectionInfo.total_photos} photos are found in this collection`}</TotalPhotos>
                    <Button follow='Follow' unfollow='Unfollow' />
                </Info>
            </Header>}
            <InfiniteScroll dataLength={collection}
                next={getNextPage}
                hasMore={hasMore}
                loader={<LoadingBar />}
                endMessage={<h4>End of Photos</h4>}>
                <LoadingBar color={'#80f'} ref={loadingBar} />
                <MasonryContainer>
                    {collection &&
                        collection.map((column, columnIndex) => {
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
            {showModal > -1 && <Modal photo={collection[currentCol][currentPhoto]} showModal={showModal} handleModal={handleModal} />}
            {hasError && <h1>ERROR</h1>}
        </CollectionContainer>
    )
}