import React from "react";
import axios from "axios";
import { Container, Image } from "./PhotoCollection.styles";

export default class PhotoCollection extends React.Component {
    state = {
        collections: null,
        isLoading: false,
        hasError: false,
    }
    getCollections = async () => {
        this.setState({ isLoading: true });
        try {
            const url = `${process.env.REACT_APP_ENDPOINT}/collections?&per_page=5&client_id=${process.env.REACT_APP_API_KEY}`
            const { data } = await axios(url);
            this.setState({ collections: data });
        } catch (err) {
            this.setState({ hasError: true, isLoading: false });
        }
    };


    componentDidMount() {
        this.getCollections();
    }
    render() {
        const { collections } = this.state;
        return (
            <>
                <div>Recommendations </div>
                <Container>

                    {collections && collections.map((collection) => {
                        return (
                            <Image alt={collection.cover_photo.alt_description} src={collection.cover_photo.urls.small} />
                        )
                    })}
                </Container>
            </>


        )
    }
}