import React from "react";
import styled from "styled-components";
import { TopNav } from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Collection, Explore, Favorites, SearchCollections, SearchPhotos, User } from "pages";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

body{
  font-family: Poppins;
  text-align: center;
  background-color: rgb (249,250,251);
  color: rgb (0,0,0)
}

`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border: 10px solid white;
`;
export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Container>
        <TopNav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search/photos/:searchTerm" component={SearchPhotos} />
          <Route path="/search/collections/:searchTerm" component={SearchCollections} />
          <Route path="/explore" component={Explore} />
          <Route path="/user/:username" component={User} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/collection/:id" component={Collection} />
        </Switch>
      </Container>
    </Router>
  );
}

