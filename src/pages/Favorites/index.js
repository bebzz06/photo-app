import React from "react";
import { FavoritesContainer, MasonryContainer, Column, ImageContainer, Image } from "./Favorites.styles";
export default class Favorites extends React.Component {
    state = {
        likedPhotos: [],
        isLoading: false,
    }


    getFromStorage = async () => {
        this.setState({ isLoading: true })
        try {
            const photos = JSON.parse(localStorage.getItem("liked"))
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(photos[i]);
            }
            this.setState({ likedPhotos: masonry || [] })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }

    componentDidMount() {
        this.getFromStorage();
    }
    render() {
        const { likedPhotos } = this.state;

        return (
            <FavoritesContainer>
                <div>Saved Photos</div>
                <MasonryContainer>
                    {likedPhotos && likedPhotos.map((column) => {
                        return (
                            <Column>
                                {column.map((photo) => {
                                    return (
                                        <ImageContainer>
                                            <Image alt={photo.alt_description} src={photo.urls.regular} />
                                        </ImageContainer>
                                    )
                                })}
                            </Column>
                        )
                    })}
                </MasonryContainer>
            </FavoritesContainer>


        )
    }
}
