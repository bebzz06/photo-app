import React from "react";
import axios from "axios";
import styled from "styled-components";

const MasonryContainer = styled.div`
  display: flex;
  width: 932px;
  height: 1274px;
`;
const HomeContainer = styled.div`
  display: flex;
  width: 1900px;
  height: 1333px;
`;
const Column = styled.div`
  width: 33.33%;
  padding: 24px 15px;
`;
const Image = styled.img`
  width: 100%;
  border-radius: 5%;
  padding-bottom: 15px;
`;
export default class Home extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false
    };

    getPhotos = async () => {
        this.setState({ isLoading: true });
        try {
            const { data } = await axios(
                "https://api.unsplash.com/photos?page=1&per_page=12&order_by=latest&client_id=IHsyeMCMhd6I9URatMcGCgV_MR4TRXZTdGXkYAtuoKk"
            );
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
            <HomeContainer>
                <MasonryContainer>
                    {photos &&
                        photos.map((columns) => {
                            return (
                                <Column>
                                    {columns.map((photo) => {
                                        return (
                                            <Image alt={photo.alt_description} src={photo.urls.raw} />
                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>
            </HomeContainer>
        );
    }
}