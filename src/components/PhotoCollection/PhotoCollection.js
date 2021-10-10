import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect, useRef } from "react";
import { Container, Image, Header, Gallery, ImageContainer } from "./PhotoCollection.styles";
import { Link } from "react-router-dom";

export default function PhotoCollection() {
    const [collections, setCollections] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    // eslint-disable-next-line
    const loadingBar = useRef();

    function useLoadingBar(isLoading, loadingBar) {
        useEffect(() => {
            isLoading ? loadingBar.current.continuousStart() : loadingBar.current.complete();
            // eslint-disable-next-line/exhaustive-deps
        }, [isLoading])
    }

    const getCollections = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/collections?&per_page=5&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            setCollections(data);
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getCollections()
        // eslint-disable-next-line/exhaustive-deps
    }, []);

    useLoadingBar(isLoading, loadingBar);

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
