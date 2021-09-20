import React from "react";
import axios from "axios";
import { SearchPhotosContainer, LinksContainer, StyledLink, MasonryContainer, Column, ImageContainer, Image } from "./SearchPhotos.styles";


export default class SearchPhotos extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false

    }
    getPhotos = async (searchTerm) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/search/photos?per_page=12&order_by=latest&query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(data.results[i]);
            }
            this.setState({ photos: masonry });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    componentDidMount() {
        this.getPhotos(this.props.match.params.searchTerm);
    }

    componentDidUpdate(prevProps) {

        if (this.props.match.params.searchTerm !== prevProps.match.params.searchTerm) {
            this.getPhotos(this.props.match.params.searchTerm)
        }
    }

    render() {
        const { photos } = this.state;
        return (
            <SearchPhotosContainer>
                <LinksContainer>
                    <StyledLink to={`/search/photos/${this.props.match.params.searchTerm}`}>Photos </StyledLink>
                    <StyledLink to={`/search/collections/${this.props.match.params.searchTerm}`}> Collections</StyledLink>
                </LinksContainer>
                <MasonryContainer>
                    {photos &&
                        photos.map((column) => {
                            return (
                                <Column>
                                    {column.map((photo) => {
                                        return (
                                            <ImageContainer>
                                                <Image alt={photo.alt_description} src={photo.urls.regular} />
                                            </ImageContainer>

                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
            </SearchPhotosContainer>

        )
    }
}