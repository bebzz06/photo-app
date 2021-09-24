import React from "react";
import axios from "axios";
import { SearchCollectionsContainer, LinksContainer, StyledLink, MasonryContainer, Column, CollectionContainer, Collection } from "./SearchCollections.styles";


export default class SearchCollections extends React.Component {
    state = {
        collections: null,
        isLoading: false,
        hasError: false,
    }

    getCollections = async (searchTerm) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/search/collections?per_page=12&query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(data.results[i]);
            }
            this.setState({ collections: masonry });

        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    componentDidMount() {
        this.getCollections(this.props.match.params.searchTerm);
    }

    render() {
        const { collections } = this.state;

        return (
            <SearchCollectionsContainer>
                <LinksContainer>
                    <StyledLink to={`/search/photos/${this.props.match.params.searchTerm}`}>Photos </StyledLink>
                    <StyledLink to={`/search/collections/${this.props.match.params.searchTerm}`}> Collections</StyledLink>
                </LinksContainer>
                <MasonryContainer>
                    {collections &&
                        collections.map((column) => {
                            return (
                                <Column>
                                    {column.map((collection) => {
                                        return (
                                            <CollectionContainer>
                                                <Collection alt={collection.cover_photo.alt_description} src={collection.cover_photo.urls.regular} />
                                            </CollectionContainer>

                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
            </SearchCollectionsContainer>
        )

    }
}
