import React from "react";
import axios from "axios";

const withPhotos = (Component) => {
    return class extends React.Component {
        state = {
            photos: null,
            isLoading: false,
            hasError: false,
            modalPhoto: null,
            showModal: false,
            likedPhotos: []
        }
        getPhotos = async () => {
            this.setState({ isLoading: true });
            try {
                const url = `${process.env.REACT_APP_ENDPOINT}/photos/random?count=12&client_id=${process.env.REACT_APP_API_KEY}`
                const { data } = await axios(url);
                //console.log(data);
                this.setState({ photos: data });
            } catch (err) {
                this.setState({ hasError: true, isLoading: false });
            }
        };

        handleOpenModal = (i) => {
            this.setState({ modalPhoto: this.state.photos[i] })
            this.setState({ showModal: true })
        }

        handleCloseModal = () => {
            this.setState({ showModal: false })
        }

        handleLike = (photo) => {
            //check for duplicate
            const likedPhotos = this.state.likedPhotos
            const isDuplicate = likedPhotos.some((likedPhoto) => likedPhoto.id === photo.id)
            if (isDuplicate) return;
            //set photo as liked
            const photos = [...this.state.likedPhotos, photo];
            const newPhotos = photos.filter((photo) => {
                if (photo.liked_by_user === false) {
                    photo.liked_by_user = !photo.liked_by_user
                }
                return photo
            });
            this.setState({ likedPhotos: newPhotos })
        }

        // componentDidMount() {
        //     this.getPhotos();
        // }


        render() {
            console.log(this.state.likedPhotos, 'withPhotos')
            return (
                <div>
                    <Component config={this.state} getPhotos={this.getPhotos} handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal} handleLike={this.handleLike} />
                </div>
            )

        }
    }
}
export default withPhotos;
