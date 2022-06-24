import React from "react";
import Home from "../Components/Home";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Components/CreateDeck";
import Deck from "../Components/Deck";
import EditDeck from "../Components/EditDeck";
import EditCard from "../Components/EditCard";
import AddCard from "../Components/AddCard";
import Study from "../Components/Study"

import { Switch, Route } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
      <Switch>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId">
            <Deck />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
          
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
