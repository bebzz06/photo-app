import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { SearchCollectionsContainer, LinksContainer, HeaderContainer, StyledLink, MasonryContainer, Column, CollectionContainer, Collection } from "./SearchCollections.styles";
import { useLoadingBar } from "utils";

export default function SearchCollections(props) {
    const [collections, setCollections] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalCollections, setTotalCollections] = useState(null);
    // eslint-disable-next-line

    const getNextPage = () => {
        setPage(page + 1);
    }
    const getCollections = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/search/collections?per_page=12&query=${props.match.params.searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            setTotalCollections(data.total)
            setHasMore(!!data.results.length);
            if (collections) {
                const newCollections = [...collections]
                for (let i = 0; i < data.results.length; i++) {
                    newCollections[i % 3].push(data.results[i]);
                }
                setCollections(newCollections);
            } else {
                let masonry = [[], [], []];
                for (let i = 0; i < data.results.length; i++) {
                    masonry[i % 3].push(data.results[i]);
                }
                setCollections(masonry);
            }
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getCollections();
    }, [page])

    useEffect(() => {
        setCollections(null);
        setPage(1);
    }, [props.match.params.searchTerm])

    useEffect(() => {
        if (collections === null && page === 1) {
            getCollections();
        }
    }, [page, collections])

    const { loadingBar } = useLoadingBar(isLoading);

    return (
        <SearchCollectionsContainer>
            <HeaderContainer>
                <div>{`Search results for "${props.match.params.searchTerm}"`}</div>
                <div>{totalCollections} collections were found</div>
            </HeaderContainer>
            <LinksContainer>
                <StyledLink to={`/search/photos/${props.match.params.searchTerm}`}>Photos </StyledLink>
                <StyledLink to={`/search/collections/${props.match.params.searchTerm}`}> Collections</StyledLink>
            </LinksContainer>
            <InfiniteScroll dataLength={collections}
                next={getNextPage}
                hasMore={hasMore}
                loader={<LoadingBar />}
                endMessage={<h4>End of Photos</h4>}>
                <LoadingBar color={'#80f'} ref={loadingBar} />
                <MasonryContainer>
                    {collections &&
                        collections.map((column) => {
                            return (
                                <Column>
                                    {column.map((collection) => {
                                        return (
                                            <CollectionContainer>
                                                <StyledLink to={`/collection/${collection.id}`}>
                                                    <Collection alt={collection.cover_photo.alt_description} src={collection.cover_photo.urls.regular} />
                                                </StyledLink>
                                            </CollectionContainer>
                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
            </InfiniteScroll>
            {hasError && <h1>ERROR</h1>}
        </SearchCollectionsContainer>
    )
}