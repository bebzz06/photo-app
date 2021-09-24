import React from "react";
import axios from "axios";
import Modal from "components/Modal";
import { SearchPhotosContainer, LinksContainer, StyledLink, MasonryContainer, Column, ImageContainer, Image } from "./SearchPhotos.styles";


export default class SearchPhotos extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false,
        showModal: -1,
        currentCol: -1,
        currentPhoto: -1,
        likedPhotos: []

    }
    getPhotos = async (searchTerm) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/search/photos?per_page=12&orientation=landscape&order_by=latest&query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
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
    handleModal = (columnIndex, photoIndex) => {
        this.setState({ showModal: columnIndex, currentCol: columnIndex, currentPhoto: photoIndex })
    }
    componentDidMount() {
        this.getPhotos(this.props.match.params.searchTerm);
    }

    componentDidUpdate(prevProps) {

        if (this.props.match.params.searchTerm !== prevProps.match.params.searchTerm) {
            this.getPhotos(this.props.match.params.searchTerm)
        }
    }

    render() {
        const { photos, showModal, currentCol, currentPhoto } = this.state;
        return (
            <SearchPhotosContainer>
                <LinksContainer>
                    <StyledLink to={`/search/photos/${this.props.match.params.searchTerm}`}>Photos </StyledLink>
                    <StyledLink to={`/search/collections/${this.props.match.params.searchTerm}`}> Collections</StyledLink>
                </LinksContainer>
                <MasonryContainer>
                    {photos &&
                        photos.map((column, columnIndex) => {
                            return (
                                <Column>
                                    {column.map((photo, photoIndex) => {
                                        return (
                                            <ImageContainer>
                                                <Image onClick={() => this.handleModal(columnIndex, photoIndex)} alt={photo.alt_description} src={photo.urls.regular} />
                                            </ImageContainer>

                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
                {showModal > -1 && <Modal photo={photos[currentCol][currentPhoto]} showModal={showModal} handleModal={this.handleModal} />}
            </SearchPhotosContainer>


        )
    }
}