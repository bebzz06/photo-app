import React from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import "./styles.css";


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
            this.setState({ photoList: data });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };


    render() {
        const { user, photoList } = this.state;
        return (
            <div>
                {user &&
                    <>
                        <img alt='profile' src={user.profile_image.large} />
                        <h1>{user.first_name}</h1>
                        <h1>{user.portfolio_url}</h1>
                        <div>
                            <h2>Photos - {user.total_photos} </h2>
                            <h2> Followers - {user.followers_count}</h2>
                        </div>
                    </>}
                <Masonry breakpointCols={3} className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {photoList && photoList.map((item) => {
                        return (
                            <img alt={item.alt_description} src={item.urls.small} />
                        )
                    })}

                </Masonry>

            </div>




        )
    }
}