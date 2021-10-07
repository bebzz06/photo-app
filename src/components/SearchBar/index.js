import { useState } from "react";
import { withRouter } from "react-router";
import { FormContainer, StyledInput, StyledBrokenSearch } from "./SearchBar.styles"

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.history.push(`/search/photos/${searchTerm}`)
        setSearchTerm("");
    }
    return (
        <FormContainer>
            <StyledBrokenSearch />
            <form onSubmit={handleSubmit}>
                <StyledInput
                    onChange={handleChange}
                    placeholder="Search..."
                    value={searchTerm}
                />
            </form>
        </FormContainer>
    )
}

export default withRouter(SearchBar);