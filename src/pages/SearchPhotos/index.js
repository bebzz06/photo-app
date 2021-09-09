import React from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import "./styles.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
display: flex;
justify-content: center;
`
export default class SearchPhotos extends React.Component {
    state = {
        photos: null,
        isLoading: false,
        hasError: false

    }
    getPhotos = async (searchTerm) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/search/photos?per_page=12&order_by=latest&query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            this.setState({ photos: data });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    componentDidMount() {
        this.getPhotos(this.props.match.params.searchTerm);
    }

    componentDidUpdate(prevProps) {

        if (this.props.match.params.searchTerm !== prevProps.match.params.searchTerm) {
            this.getPhotos(this.props.match.params.searchTerm)
        }
    }

    render() {
        console.log(this.props)
        const { photos } = this.state;
        return (
            <div>
                <Container>
                    <Link to={`/search/photos/${this.props.match.params.searchTerm}`}>Photos </Link>
                    <Link to={`/search/collections/${this.props.match.params.searchTerm}`}> Collections</Link>
                </Container>
                <Masonry breakpointCols={3} className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {photos && photos.results.map((result) => {
                        return (
                            <img alt={result.alt_description} src={result.urls.small} />
                        )
                    })}

                </Masonry>
            </div>

        )
    }
}