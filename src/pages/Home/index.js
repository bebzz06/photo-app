import React from "react";
import axios from "axios";
import styled from "styled-components";

const PhotoContainer = styled.div`
  display: flex;
  width: 932 px;
  height: 1274 px;
  flex-wrap: wrap;
`;
const Image = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
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
                "https://api.unsplash.com/photos?page=1&order_by=latest&client_id=IHsyeMCMhd6I9URatMcGCgV_MR4TRXZTdGXkYAtuoKk"
            );

            this.setState({ photos: data });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    componentDidMount() {
        this.getPhotos();
    }
    render() {
        return (
            <PhotoContainer>
                {this.state.photos &&
                    this.state.photos.map((photo) => (
                        <Image src={photo.urls.raw} alt=""></Image>
                    ))}
            </PhotoContainer>
        );
    }
}