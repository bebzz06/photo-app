import React from "react";
export default class Search extends React.Component {
    state = {
        search: ""
    };

    handleChange = (e) => {
        this.setState({ search: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ search: "" });
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