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



export default class SearchCollections extends React.Component {
    state = {
        collections: null,
        isLoading: false,
        hasError: false

    }
    getCollections = async (searchTerm) => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/search/collections?per_page=12&query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            this.setState({ collections: data });

        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };

    componentDidMount() {
        this.getCollections(this.props.match.params.searchTerm);
    }

    render() {
        const { collections } = this.state;

        return (
            <div>
                <Container>
                    <Link to={`/search/photos/${this.props.match.params.searchTerm}`}>Photos </Link>
                    <Link to={`/search/collections/${this.props.match.params.searchTerm}`}> Collections</Link>
                </Container>
                <Masonry breakpointCols={3} className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {collections && collections.results.map((result) => {
                        return (
                            <img alt={result.cover_photo.alt_description} src={result.cover_photo.urls.small} />
                        )
                    })}

                </Masonry>
            </div>

        )
    }
}