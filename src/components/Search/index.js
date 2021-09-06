import React from "react";
export default class Search extends React.Component {
    state = {
        searchTerm: ""
    };

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
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