import React from "react";
import { withRouter } from "react-router";
class SearchBar extends React.Component {
    state = {
        searchTerm: ""
    };

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push(`/search/photos/${this.state.searchTerm}`)
        this.setState({ searchTerm: "" });

    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    placeholder="Search..."
                    value={this.state.searchTerm}
                ></input>
            </form>
        );
    }
}
export default withRouter(SearchBar);