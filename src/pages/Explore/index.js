import React from "react";
import axios from "axios";
import { MasonryContainer, ExploreContainer, Column, Image } from "./Explore.styles";

export default class Explore extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false
    };

    getPhotos = async () => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/photos?page=1&per_page=12&order_by=latest&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(data[i]);
            }

            this.setState({ photos: masonry });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    componentDidMount() {
        this.getPhotos();
    }
    render() {
        const { photos } = this.state;
        return (
            <ExploreContainer>
                <MasonryContainer>
                    {photos &&
                        photos.map((columns) => {
                            return (
                                <Column>
                                    {columns.map((photo) => {
                                        return (
                                            <Image alt={photo.alt_description} src={photo.urls.regular} />
                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
            </ExploreContainer>
        );
    }
}