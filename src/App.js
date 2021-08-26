import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import User from "./pages/User";
import Favorites from "./pages/Favorites";
import TopNav from "./Components/TopNav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <TopNav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
