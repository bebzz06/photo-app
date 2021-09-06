import React from "react";
import { withRouter } from "react-router";
class SearchBar extends React.Component {
    state = {
        search: "",
    };

    handleChange = (e) => {
        this.setState({ search: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ search: "" });
        this.props.history.push("/search/photos")
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    placeholder="Search..."
                    value={this.state.search}
                ></input>
            </form>
        );
    }
}
export default withRouter(SearchBar);