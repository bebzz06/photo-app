import React from "react";
import withPhotos from "components/withPhotos";
import ReactModal from "react-modal"
import moment from "moment";
import { Link } from "react-router-dom";
import { ReactComponent as BrokenHeart } from "images/Iconly-Broken-Heart.svg";
import { ReactComponent as Star } from "images/Star.svg";
import { ReactComponent as ThreeDots } from "images/ThreeDots.svg";
import { ReactComponent as Cross } from "images/Icon-metro-cross.svg"
import { Container, TopWrapper, Avatar, AuthorInfo, Photo, Footer } from "./RandomPhotos.styles"

class RandomPhotos extends React.Component {

    componentDidMount() {
        this.props.getPhotos()
    }
    render() {
        const { photos, modalPhoto, showModal } = this.props.config
        return (
            <div>
                {photos && photos.map((photo, index) => {
                    return (
                        <Container>
                            <TopWrapper>

                                <Link to={`/user/${photo.user.username}`}>
                                    <Avatar alt='' src={photo.user.profile_image.large} />
                                    <AuthorInfo>
                                        <div>{photo.user.username}</div>
                                        <div>{moment(Date.parse(photo.updated_at)).fromNow()}</div>
                                    </AuthorInfo>
                                </Link>
                                <ThreeDots onClick={() => this.props.handleOpenModal(index)} />
                            </TopWrapper>
                            <div>{photo.description}</div>
                            <Photo onClick={() => this.props.handleOpenModal(index)} alt={photo.alt_description} src={photo.urls.regular} />
                            <Footer>
                                <div><BrokenHeart />{photo.likes}</div>
                                <Star onClick={() => this.props.handleLike(photo)} />
                            </Footer>
                        </Container>
                    )
                })}
                {modalPhoto &&
                    < ReactModal isOpen={showModal} contentLabel='photo' >
                        <TopWrapper>
                            <Link to={`/user/${modalPhoto.user.username}`} >
                                <Avatar alt='' src={modalPhoto.user.profile_image.large} />
                                <AuthorInfo>
                                    <div>{modalPhoto.user.username}</div>
                                    <div>{moment(Date.parse(modalPhoto.updated_at)).fromNow()}</div>
                                </AuthorInfo>
                            </Link>
                            <Cross onClick={this.props.handleCloseModal} />
                        </TopWrapper>
                        <div>{modalPhoto.description}</div>
                        <Photo alt={modalPhoto.alt_description} src={modalPhoto.urls.regular} />
                        <Footer >
                            <div><BrokenHeart />{modalPhoto.likes}</div>
                            <Star />
                        </Footer>
                    </ReactModal>}
            </div>
        )
    }
}



export default withPhotos(RandomPhotos);
// export default class RandomPhotos extends React.Component {
//     state = {
//         photos: null,
//         isLoading: false,
//         hasError: false,
//         modalPhoto: null,
//         showModal: false,
//         likedPhotos: []
//     }
//     getPhotos = async () => {
//         this.setState({ isLoading: true });
//         try {
//             const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&client_id=${process.env.REACT_APP_API_KEY}`
//             const { data } = await axios(url);
//             //console.log(data);
//             this.setState({ photos: data });
//         } catch (err) {
//             this.setState({ hasError: true, isLoading: false });
//         }
//     };

//     handleOpenModal = (i) => {
//         this.setState({ modalPhoto: this.state.photos[i] })
//         this.setState({ showModal: true })
//     }

//     handleCloseModal = () => {
//         this.setState({ showModal: false })
//     }

//     handleLike = (photo) => {
//         //check for duplicate
//         const likedPhotos = this.state.likedPhotos
//         const isDuplicate = likedPhotos.some((likedPhoto) => likedPhoto.id === photo.id)
//         if (isDuplicate) return;
//         //set photo as liked
//         const photos = [...this.state.likedPhotos, photo];
//         const newPhotos = photos.filter((photo) => {
//             if (photo.liked_by_user === false) {
//                 photo.liked_by_user = !photo.liked_by_user
//             }
//             return photo
//         });
//         this.setState({ likedPhotos: newPhotos })
//     }

//     componentDidMount() {
//         this.getPhotos();
//     }
//     render() {
//         console.log(this.state.likedPhotos)
//         const { photos, modalPhoto } = this.state;
//         return (
//             <div>{photos && photos.map((photo, index) => {
//                 return (
//                     <Container>
//                         <TopWrapper>

//                             <Link to={`/user/${photo.user.username}`}>
//                                 <Avatar alt='' src={photo.user.profile_image.large} />
//                                 <AuthorInfo>
//                                     <div>{photo.user.username}</div>
//                                     <div>{moment(Date.parse(photo.updated_at)).fromNow()}</div>
//                                 </AuthorInfo>
//                             </Link>
//                             <ThreeDots onClick={() => this.handleOpenModal(index)} />
//                         </TopWrapper>
//                         <div>{photo.description}</div>
//                         <Photo onClick={() => this.handleOpenModal(index)} alt={photo.alt_description} src={photo.urls.regular} />
//                         <Footer>
//                             <div><BrokenHeart />{photo.likes}</div>
//                             <Star onClick={() => this.handleLike(photo)} />
//                         </Footer>
//                     </Container>
//                 )
//             })}

//                 {modalPhoto &&
//                     < ReactModal isOpen={this.state.showModal} contentLabel='photo' >
//                         <TopWrapper>
//                             <Link to={`/user/${modalPhoto.user.username}`} >
//                                 <Avatar alt='' src={modalPhoto.user.profile_image.large} />
//                                 <AuthorInfo>
//                                     <div>{modalPhoto.user.username}</div>
//                                     <div>{moment(Date.parse(modalPhoto.updated_at)).fromNow()}</div>
//                                 </AuthorInfo>
//                             </Link>
//                             <Cross onClick={this.handleCloseModal} />
//                         </TopWrapper>
//                         <div>{modalPhoto.description}</div>
//                         <Photo alt={modalPhoto.alt_description} src={modalPhoto.urls.regular} />
//                         <Footer >
//                             <div><BrokenHeart />{modalPhoto.likes}</div>
//                             <Star />
//                         </Footer>
//                     </ReactModal>}
//             </div>
//         )

//     }
// }