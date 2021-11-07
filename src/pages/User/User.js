import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { Container, Wrapper, ProfilePicture, InfoContainer, Name, PortfolioLink, Statistics, TotalPhotosWrapper, TotalPhotos, FollowersCountWrapper, FollowersCount, Label, MasonryContainer, Column, ImageContainer, Image } from "./User.styles";
import { useLoadingBar } from "utils";
import { Modal } from "components";

export default function User(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [photoList, setPhotoList] = useState(null);
    const [user, setUser] = useState(null);
    const [currentCol, setCurrentCol] = useState(-1);
    const [currentPhoto, setCurrentPhoto] = useState(-1);
    const [showModal, setShowModal] = useState(-1);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    // eslint-disable-next-line


    const getUser = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/users/${props.match.params.username}?photos&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            setUser(data);
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };
    const getNextPage = () => {
        setPage(page + 1);
    }
    const getPhotos = async () => {
        setIsLoading(true);

        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/users/${props.match.params.username}/photos?&per_page=12&page=${page}&orientation=landscape&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            setHasMore(!!data.length);
            if (photoList) {
                const newPhotoList = [...photoList];
                for (let i = 0; i < data.length; i++) {
                    newPhotoList[i % 3].push(data[i]);
                }
                setPhotoList(newPhotoList);
            } else {
                const masonry = [[], [], []];
                for (let i = 0; i < data.length; i++) {
                    masonry[i % 3].push(data[i]);
                }
                setPhotoList(masonry);
            }
            setIsLoading(false);
        } catch (err) {
            setHasError(true);
            setIsLoading(false);
        }
    };

    const handleModal = (columnIndex, photoIndex) => {
        setShowModal(columnIndex);
        setCurrentCol(columnIndex);
        setCurrentPhoto(photoIndex);
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getPhotos()
        // eslint-disable-next-line/exhaustive-deps
    }, [page])
    const { loadingBar } = useLoadingBar(isLoading);

    return (
        <Container>
            <>
                <LoadingBar color={'#80f'} ref={loadingBar} />
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
                {user && photoList && < InfiniteScroll dataLength={photoList}
                    next={getNextPage}
                    hasMore={hasMore}
                    loader={<LoadingBar />}
                    endMessage={<h4>End of Photos</h4>}>
                    <MasonryContainer >
                        {
                            photoList.map((column, columnIndex) => {
                                return (
                                    <Column>
                                        {column.map((item, photoIndex) => {
                                            return (
                                                <ImageContainer>
                                                    <Image onClick={() => handleModal(columnIndex, photoIndex)} alt={item.alt_description} src={item.urls.regular} />
                                                </ImageContainer>
                                            )
                                        })}
                                    </Column>
                                );
                            })}
                    </MasonryContainer>
                </InfiniteScroll>}
                {showModal > -1 && <Modal photo={photoList[currentCol][currentPhoto]} showModal={showModal} handleModal={handleModal} />}
                {hasError && <h1>ERROR</h1>}
            </>
        </Container >
    )
}