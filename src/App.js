import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import User from "./pages/User";
import Favorites from "./pages/Favorites";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
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