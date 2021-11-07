import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { Modal } from "components";
import { useEffect } from "react";
import { CollectionContainer, Header, CoverPhoto, Info, Title, StyledLink, TotalPhotos, StyledButton, MasonryContainer, Column, ImageContainer, Image } from "./Collection.styles";
import { useLoadingBar, useMasonry } from "utils"
import { connect } from 'react-redux';
import { getInfo, resetInfo, getCollectionFeed, handleModal, getNextPage, resetCollectionFeed } from 'store/collectionFeed/collectionFeedActions';

function Collection({ collectionInfo, isLoading, hasError, collectionFeed, page, hasMore, showModal, getInfo, resetInfo, getCollectionFeed, handleModal, getNextPage, resetCollectionFeed, ...rest }) {

    useEffect(() => {
        getInfo(rest.match.params.id);
        // eslint-disable-next-line/exhaustive-deps
    }, [])

    useEffect(() => {
        getCollectionFeed(rest.match.params.id)

        // eslint-disable-next-line/exhaustive-deps
    }, [page])

    useEffect(() => {
        resetInfo();
        resetCollectionFeed();
        // eslint-disable-next-line/exhaustive-deps
    }, [rest.match.params.id])


    const { loadingBar } = useLoadingBar(isLoading);
    const { layout: collection } = useMasonry(collectionFeed);

    return (
        <CollectionContainer>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            {collectionInfo && <Header>
                <CoverPhoto alt={collectionInfo.cover_photo.alt_description} src={collectionInfo.cover_photo.urls.regular} />
                <Info>
                    <Title>{collectionInfo.title}</Title>
                    <StyledLink to={`/user/${collectionInfo.user.username}`}>{`Author: ${collectionInfo.user.username}`}</StyledLink>
                    <TotalPhotos>{`${collectionInfo.total_photos} photos are found in this collection`}</TotalPhotos>
                </Info>
            </Header>}
            <InfiniteScroll dataLength={collection}
                next={getNextPage}
                hasMore={hasMore}
                loader={<LoadingBar />}
                endMessage={<h4>End of Photos</h4>}>
                <LoadingBar color={'#80f'} ref={loadingBar} />
                <MasonryContainer>
                    {collection.map((column, columnIndex) => {
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
            {showModal.currentCol > -1 && <Modal photo={collection[showModal.currentCol][showModal.currentPhoto]} showModal={showModal.currentCol} handleModal={handleModal} />}
            {hasError && <h1>ERROR</h1>}
        </CollectionContainer>
    )
}
const mapStateToProps = (state) => ({
    collectionInfo: state.collectionFeed.collectionInfo,
    isLoading: state.collectionFeed.isLoading,
    hasError: state.collectionFeed.hasError,
    collectionFeed: state.collectionFeed.collectionFeed,
    page: state.collectionFeed.page,
    hasMore: state.collectionFeed.hasMore,
    showModal: state.collectionFeed.showModal


})
const mapDispatchToProps = {
    getInfo,
    resetInfo,
    getCollectionFeed,
    handleModal,
    getNextPage,
    resetCollectionFeed
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)