import React from "react";
import axios from "axios";
import { Container, Wrapper, ProfilePicture, InfoContainer, Name, PortfolioLink, Statistics, TotalPhotosWrapper, TotalPhotos, FollowersCountWrapper, FollowersCount, Label, MasonryContainer, Column, ImageContainer, Image } from "./User.styles";

export default class User extends React.Component {
    state = {
        user: null,
        isLoading: false,
        hasError: false,
        photoList: null

    }
    getUser = async (user) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/users/${user}?photos&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            this.setState({ user: data });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };


    componentDidMount() {
        this.getUser(this.props.match.params.username);
        this.getPhotos(this.props.match.params.username);
    }

    getPhotos = async (user) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/users/${user}/photos?&per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            let masonry = [[], [], []];
            for (let i = 0; i < 12; i++) {
                masonry[i % 3].push(data[i]);
            }
            this.setState({ photoList: masonry });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    render() {
        const { user, photoList } = this.state;
        return (
            <Container>
                {user &&
                    <Wrapper>
                        <ProfilePicture alt='profile' src={user.profile_image.large} />
                        <InfoContainer>
                            <Name>{user.first_name}</Name>
                            <PortfolioLink href={user.portfolio_url}>Portofolio</PortfolioLink>
                            <Statistics>
                                <TotalPhotosWrapper>
                                    <TotalPhotos>{user.total_photos} </TotalPhotos>
                                    <Label>Photos</Label>
                                </TotalPhotosWrapper>
                                <FollowersCountWrapper>
                                    <FollowersCount>{user.followers_count}</FollowersCount>
                                    <Label>Followers</Label>
                                </FollowersCountWrapper>
                            </Statistics>
                        </InfoContainer>
                    </Wrapper>}
                <MasonryContainer>
                    {photoList &&
                        photoList.map((column) => {
                            return (
                                <Column>
                                    {column.map((item) => {
                                        return (
                                            <ImageContainer>
                                                <Image alt={item.alt_description} src={item.urls.regular} />
                                            </ImageContainer>

                                        );
                                    })}
                                </Column>
                            );
                        })}
                </MasonryContainer>

            </Container>




        )
    }
}