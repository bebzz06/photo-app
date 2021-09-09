import React from "react";
import axios from "axios";
import moment from "moment";
import { ReactComponent as BrokenHeart } from "images/Iconly-Broken-Heart.svg";
import { ReactComponent as Star } from "images/Star.svg";
import { ReactComponent as ThreeDots } from "images/ThreeDots.svg";
import { Container, TopWrapper, Author, Avatar, AuthorInfo, Photo, Footer } from "./RandomPhotos.styles"
export default class RandomPhotos extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false

    }
    getPhotos = async () => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            this.setState({ photos: data });
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
            <>{photos && photos.map((photo) => {
                return (
                    <Container>
                        <TopWrapper>
                            <Author>
                                <Avatar alt='' src={photo.user.profile_image.large} />
                                <AuthorInfo>
                                    <div>{photo.user.username}</div>
                                    <div>{moment(Date.parse(photo.updated_at)).fromNow()}</div>
                                </AuthorInfo>
                            </Author>
                            <ThreeDots />
                        </TopWrapper>
                        <div>{photo.description}</div>
                        <Photo alt={photo.alt_description} src={photo.urls.regular} />
                        <Footer>
                            <div><BrokenHeart />{photo.likes}</div>
                            <Star />
                        </Footer>

                    </Container>
                )
            })}</>
        )

    }
}