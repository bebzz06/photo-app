import React from "react";
import { withRouter } from "react-router";
import { FormContainer, StyledInput, StyledBrokenSearch } from "./SearchBar.styles"

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
            <FormContainer>
                <StyledBrokenSearch />
                <form onSubmit={this.handleSubmit}>
                    <StyledInput
                        onChange={this.handleChange}
                        placeholder="Search..."
                        value={this.state.searchTerm}
                    />
                </form>
            </FormContainer>

        );
    }
}
export default withRouter(SearchBar);