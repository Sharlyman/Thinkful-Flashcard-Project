import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import DeckHome from "../Decks/DeckHome";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <DeckHome />
          </Route>
          </Switch>
      </div>
    </div>
  );
}

export default Layout;
