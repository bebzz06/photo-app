import React from "react";
import Home from "pages/Home";
import Search from "pages/Search";
import Explore from "pages/Explore";
import User from "pages/User";
import Favorites from "pages/Favorites";
import TopNav from "components/TopNav";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Container = styled.div`
  width: 1900 px;
  height: 1425 px;
`;
export default function App() {
  return (
    <Router>
      <Container>
        <TopNav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search/photos/:searchTerm" component={Search} />
          <Route path="/explore" component={Explore} />
          <Route path="/user/:username" component={User} />
          <Route path="/favorites" component={Favorites} />
        </Switch>
      </Container>
    </Router>
  );
}
