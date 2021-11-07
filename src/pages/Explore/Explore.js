import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { useEffect } from "react";
import { connect } from "react-redux";
import { MasonryContainer, ExploreContainer, Column, ImageContainer, Image } from "./Explore.styles";
import { getPhotos, handleMasonryModal, resetState } from "../../store/randomPhotos/randomPhotosActions";
import { useMasonry, useLoadingBar } from "utils";
import { Modal } from "components";

function Explore({ randomPhotos, isLoading, hasError, showMasonryModal, getPhotos, handleMasonryModal, resetState }) {

    useEffect(() => {
        getPhotos();
        return function cleaningState() {
            resetState();
        }
        // eslint-disable-next-line/exhaustive-deps
    }, []);

    const { layout: masonry } = useMasonry(randomPhotos);
    const { loadingBar } = useLoadingBar(isLoading);
    return (
        <InfiniteScroll
            dataLength={masonry}
            next={getPhotos}
            hasMore={true}
            loader={<LoadingBar />}>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            <ExploreContainer>
                <MasonryContainer>
                    {masonry.map((column, columnIndex) => {
                        return (
                            <Column>
                                {column.map((photo, photoIndex) => {
                                    return (
                                        <ImageContainer>
                                            <Image onClick={() => handleMasonryModal(columnIndex, photoIndex)} alt={photo.alt_description} src={photo.urls.regular} />
                                        </ImageContainer>
                                    );
                                })}
                            </Column>
                        );
                    })}
                </MasonryContainer>
                {showMasonryModal.currentCol > -1 && <Modal photo={masonry[showMasonryModal.currentCol][showMasonryModal.currentPhoto]} showModal={showMasonryModal.currentCol} handleModal={handleMasonryModal} />}
            </ExploreContainer>
            {hasError && <h1>ERROR</h1>}
        </InfiniteScroll>

    )
}

const mapStateToProps = (state) => ({
    randomPhotos: state.randomPhotos.photos,
    isLoading: state.randomPhotos.isLoading,
    hasError: state.randomPhotos.hasError,
    showMasonryModal: state.randomPhotos.showMasonryModal
})
const mapDispatchToProps = {
    getPhotos,
    handleMasonryModal,
    resetState

}
export default connect(mapStateToProps, mapDispatchToProps)(Explore);
