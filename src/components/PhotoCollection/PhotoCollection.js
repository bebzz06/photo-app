import LoadingBar from "react-top-loading-bar";
import { useEffect } from "react";
import { Container, Image, Header, Gallery, ImageContainer } from "./PhotoCollection.styles";
import { Link } from "react-router-dom";
import { useLoadingBar } from "../../utils/index"
import { connect } from "react-redux";
import { getCollections } from "store/collectionFeed/collectionFeedActions";

function PhotoCollection({ collections, isLoading, hasError, getCollections }) {
    useEffect(() => {
        getCollections()
        // eslint-disable-next-line/exhaustive-deps
    }, []);

    const { loadingBar } = useLoadingBar(isLoading);

    return (
        <Container>
            <LoadingBar color={'#80f'} ref={loadingBar} />
            <Header>Recommendations </Header>
            <Gallery>
                {collections && collections.map((collection) => {
                    return (
                        <ImageContainer>
                            <Link to={`/collection/${collection.id}`}>
                                <Image alt={collection.cover_photo.alt_description} src={collection.cover_photo.urls.small} />
                            </Link>
                        </ImageContainer>
                    )
                })}
            </Gallery>
            {hasError && <h1>ERROR</h1>}
        </Container>
    )

}

const mapStateToProps = (state) => ({
    isLoading: state.collectionFeed.isLoading,
    hasError: state.collectionFeed.hasError,
    collections: state.collectionFeed.collections

})
const mapDispatchToProps = {
    getCollections
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoCollection);