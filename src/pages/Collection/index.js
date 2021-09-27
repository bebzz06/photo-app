
import React from "react";
import axios from 'axios';
import Modal from "components/Modal";
import { CollectionContainer, Header, CoverPhoto, Info, Title, StyledLink, TotalPhotos, Follow, MasonryContainer, Column, ImageContainer, Image } from "./Collection.styles";

export default class Collection extends React.Component {
    state = {
        collection: null,
        isLoading: false,
        hasError: false,
        currentCol: -1,
        currentPhoto: -1,
        showModal: -1,
        collectionInfo: null,
        likedPhotos: []
    }
    getInfo = async (id) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/collections/${id}?client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            this.setState({ collectionInfo: data });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    getCollection = async (id) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/collections/${id}/photos?per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(data[i]);
            }
            this.setState({ collection: masonry });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };
    handleModal = (columnIndex, photoIndex) => {
        this.setState({ showModal: columnIndex, currentCol: columnIndex, currentPhoto: photoIndex })
    }

    componentDidMount() {
        this.getInfo(this.props.match.params.id)
        this.getCollection(this.props.match.params.id)

    }

    render() {
        const { collection, showModal, currentCol, currentPhoto, collectionInfo } = this.state;
        return (
            <CollectionContainer>
                {collectionInfo && <Header>
                    <CoverPhoto alt={collectionInfo.cover_photo.alt_description} src={collectionInfo.cover_photo.urls.regular} />
                    <Info>
                        <Title>{collectionInfo.title}</Title>
                        <StyledLink to={`/user/${collectionInfo.user.username}`}>{`Author: ${collectionInfo.user.username}`}</StyledLink>
                        <TotalPhotos>{`${collectionInfo.total_photos} photos are found in this collection`}</TotalPhotos>
                        <Follow>Follow</Follow>
                    </Info>
                </Header>}

                <MasonryContainer>
                    {collection &&
                        collection.map((column, columnIndex) => {
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
                {showModal > -1 && <Modal photo={collection[currentCol][currentPhoto]} showModal={showModal} handleModal={this.handleModal} />}
            </CollectionContainer>



        )
    }
}